#!/bin/bash
# Auto Bookmark Hook for jj
# Automatically creates jj git bookmarks after significant tool executions

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_FILE="$SCRIPT_DIR/logs/auto-bookmark.log"

# Ensure log directory exists
mkdir -p "$(dirname "$LOG_FILE")"

# Read input from stdin
INPUT_JSON=$(cat)

# Function to log bookmark events
log_bookmark_event() {
  local event_type="$1"
  local details="$2"
  local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  echo "{\"timestamp\": \"$timestamp\", \"event\": \"$event_type\", \"details\": \"$details\"}" >>"$LOG_FILE"
}

# Function to check if jj is available and we're in a jj repo
check_jj_repo() {
  if ! command -v jj >/dev/null 2>&1; then
    log_bookmark_event "warning" "jj_not_found"
    return 1
  fi

  cd "$PROJECT_ROOT"
  if ! jj status >/dev/null 2>&1; then
    log_bookmark_event "warning" "not_jj_repo"
    return 1
  fi

  return 0
}

# Function to create a bookmark
create_bookmark() {
  local tool_name="$1"
  local timestamp=$(date +"%Y%m%d_%H%M%S")
  local bookmark_name="claude_${tool_name}_${timestamp}"

  cd "$PROJECT_ROOT"

  # Check if there are any changes to bookmark
  if jj status --no-pager | grep -q "Working copy changes:"; then
    if jj git bookmark create "$bookmark_name" 2>/dev/null; then
      log_bookmark_event "bookmark_created" "name:$bookmark_name tool:$tool_name"
      echo "✓ Created bookmark: $bookmark_name" >&2
    else
      log_bookmark_event "bookmark_failed" "name:$bookmark_name tool:$tool_name"
    fi
  else
    log_bookmark_event "no_changes" "tool:$tool_name"
  fi
}

# Main logic
main() {
  # Check if we can use jj
  if ! check_jj_repo; then
    echo '{"continue": true}'
    exit 0
  fi

  # Extract tool information
  local tool_name=$(echo "$INPUT_JSON" | jq -r '.tool_name // ""')
  local tool_result=$(echo "$INPUT_JSON" | jq -r '.tool_result // ""')

  # Only create bookmarks for file modification tools
  case "$tool_name" in
  "Write" | "Edit" | "MultiEdit" | "NotebookEdit")
    # Check if the tool execution was successful
    if echo "$tool_result" | grep -q -E "(successfully|updated|created|modified)" 2>/dev/null; then
      create_bookmark "$tool_name"
    else
      log_bookmark_event "tool_failed" "tool:$tool_name"
    fi
    ;;
  "Bash")
    # For bash commands, check if they might have modified files
    local command=$(echo "$INPUT_JSON" | jq -r '.tool_input.command // ""')
    if echo "$command" | grep -q -E "(git|yarn|npm|touch|mkdir|mv|cp)" 2>/dev/null; then
      # Only bookmark if the command succeeded
      if echo "$tool_result" | grep -q -v "error\|failed\|Error\|Failed" 2>/dev/null; then
        create_bookmark "bash"
      fi
    fi
    ;;
  *)
    # For other tools, don't create bookmarks
    log_bookmark_event "skipped" "tool:$tool_name"
    ;;
  esac

  # Always continue - never block tool execution
  echo '{"continue": true}'
  exit 0
}

# Run main function
main

