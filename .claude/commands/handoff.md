You are concluding work on the GitHub-synced Astro blog project and need to create a comprehensive handoff for the next AI session. This command intelligently analyzes your current session achievements and updates the handoff document with both auto-detected progress and user-provided context.

## Auto-Loaded Project Context:
@/CLAUDE.md
@/PROJECT_SPEC.md

## Step 1: Process User Arguments

Handle the arguments flexibly:
- **With Arguments**: `$ARGUMENTS` provides user context about what was accomplished or attempted
- **Without Arguments**: Focus purely on auto-detection from session analysis

User provided context: "$ARGUMENTS"

## Step 2: Analyze Current Session Achievements

Think about what was accomplished in this session and how to best capture it for handoff. Review your recent conversation and tool usage to identify significant work:

**Auto-Detect Evidence of:**
- **Blog Component Work** - Astro components added or modified
- **Content System Changes** - content collections, markdown processing updates
- **Theme System Work** - dark/light mode, CSS, responsive design changes
- **GitHub Integration** - webhook setup, content fetching, API changes
- **Configuration Updates** - Astro config, Tailwind, build process changes
- **Documentation Work** - CLAUDE.md, PROJECT_SPEC.md updates
- **Incomplete Work** - features in progress or attempts that didn't complete
- **Blockers Encountered** - issues with GitHub integration, build process, etc.

**Generate Session Summary:**
```
Blog Session Analysis:
- Primary work area: [blog component/system affected]
- Main accomplishments: [key blog achievements]
- Files modified: [list of changed blog files]
- Blog system impact: [content/theme/deployment/integration]
- Status: [completed/in-progress/blocked]
- User context: [if $ARGUMENTS provided]
```

## Step 3: Analyze Current Blog State

Analyze the current blog project state to understand:
- **Existing blog features** and their development status
- **Related ongoing work** that might connect to your session
- **Blog workflow patterns** to maintain consistency
- **Documentation structure** that should be preserved

## Step 4: Determine Update Strategy

Think about how to best update the handoff based on this session's work. Based on your session analysis and current blog project state, decide:

**If Current Work Relates to Existing Task:**
- Update the existing section with new progress
- Add accomplishments to "What Was Accomplished"
- Update "Current Status" and "Current Issue" if resolved
- Modify "Next Steps" based on new state

**If Current Work is New/Unrelated:**
- Create a new section with descriptive title
- Include timestamp for session identification
- Follow existing document structure and formatting

**If Work Completed an Existing Task:**
- Mark the task as completed
- Summarize final outcome
- Consider archiving or removing if fully resolved

## Step 5: Update Blog Project Documentation

Make targeted updates to blog project documentation and create handoff notes:

### For New Sections, Include:
```markdown
## [Task Title] - [Status]

### Current Status
[Brief description of current state]

### What Was Accomplished
[Bulleted list of concrete achievements with file paths]

### Current Issue (if applicable)
[Any blockers or unresolved problems]

### Next Steps to [Objective]
[Actionable items for continuation]

### Key Blog Files to Review
[List of relevant blog files: components, content, config, etc.]

### Context for Next Session
[Important notes for blog development continuity]
```

### For Updates to Existing Sections:
- **Add to accomplishments** without duplicating existing content
- **Update status** if progress changed the situation
- **Modify current issues** if problems were resolved or new ones discovered
- **Refresh next steps** based on new progress

## Step 6: Maintain Document Quality

Ensure your updates follow these guidelines:

**Content Quality:**
- **Specific**: Include exact file paths and technical details
- **Actionable**: Provide clear next steps for continuation
- **Contextual**: Explain the reasoning behind decisions
- **Current**: Reflect the actual state after your session

**Formatting Consistency:**
- Follow existing markdown structure and patterns
- Use consistent heading levels and formatting
- Maintain bullet point styles and organization
- Preserve the document's overall structure

**Information Management:**
- **Don't duplicate** existing information unless updating it
- **Preserve unrelated** sections that weren't part of your work
- **Consolidate** related information rather than fragmenting it
- **Archive completed** work appropriately

## Step 7: Final Verification

Before completing, verify that your handoff:
- **Accurately reflects** what was accomplished in the session
- **Combines** auto-detected technical changes with user-provided context
- **Provides clear direction** for the next AI session
- **Maintains continuity** with existing handoff content
- **Is immediately actionable** for someone picking up the work

## Quality Standards

**Be Comprehensive But Concise:**
- Include all relevant technical details
- Focus on actionable information
- Avoid redundancy with existing content

**Maintain Professional Handoff Quality:**
- Clear problem statements and current status
- Specific file references and technical context
- Logical next steps that build on current progress
- Helpful context that speeds up the next session

This intelligent handoff approach ensures smooth continuity between AI sessions while capturing both the technical reality of what was accomplished and the user's perspective on the work.

Now analyze your session, combine it with the user context "$ARGUMENTS", and update the handoff document accordingly.
