You are working on the GitHub-synced Astro blog project. Before proceeding with the user's request "$ARGUMENTS", you need to intelligently gather relevant project context using an adaptive sub-agent strategy.

## Auto-Loaded Project Context:
@/CLAUDE.md
@/PROJECT_SPEC.md

## Step 1: Intelligent Analysis Strategy Decision
Think deeply about the optimal approach based on the project context that has been auto-loaded above. Based on the user's request "$ARGUMENTS" and the project structure/documentation overview, intelligently decide the optimal approach:

### Strategy Options:
**Direct Approach** (0-1 sub-agents):
- When the request can be handled efficiently with targeted documentation reading and direct analysis
- Simple questions about existing code or straightforward tasks

**Focused Investigation** (2-3 sub-agents):
- When deep analysis of a specific area would benefit the response
- For complex single-domain questions or tasks requiring thorough exploration
- When dependencies and impacts need careful assessment

**Multi-Perspective Analysis** (3+ sub-agents):
- When the request involves multiple areas, components, or technical domains
- When comprehensive understanding requires different analytical perspectives
- For tasks requiring careful dependency mapping and impact assessment
- Scale the number of agents based on actual complexity, not predetermined patterns

## Step 2: Autonomous Sub-Agent Design

### For Sub-Agent Approach:
You have complete freedom to design sub-agent tasks based on:
- **Project structure discovered** from the auto-loaded `/docs/ai-context/project-structure.md` file tree
- **Documentation architecture** from the auto-loaded `/docs/ai-context/docs-overview.md`
- **Specific user request requirements**
- **Your assessment** of what investigation approach would be most effective

**CRITICAL: When using sub-agents, always launch them in parallel using a single message with multiple Task tool invocations. Never launch sequentially.**

### Sub-Agent Autonomy Principles:
- **Custom Specialization**: Define agent focus areas based on the specific request and project structure
- **Flexible Scope**: Agents can analyze any combination of documentation, code files, and architectural patterns
- **Adaptive Coverage**: Ensure all relevant aspects of the user's request are covered without overlap
- **Documentation + Code**: Each agent should read relevant documentation files AND examine actual implementation code
- **Dependency Mapping**: For tasks involving code changes, analyze import/export relationships and identify all files that would be affected
- **Impact Assessment**: Consider ripple effects across the codebase, including tests, configurations, and related components
- **Pattern Compliance**: Ensure solutions follow existing project conventions for naming, structure, and architecture
- **Cleanup Planning**: For structural changes, identify obsolete code, unused imports, and deprecated files that should be removed to prevent code accumulation
- **Web Research**: Consider, optionally, deploying sub-agents for web searches when current best practices, security advisories, or external compatibility research would enhance the response

### Sub-Agent Task Design Template:
```
Task: "Analyze [SPECIFIC_COMPONENT(S)] for [TASK_OBJECTIVE] related to user request '$ARGUMENTS'"

Standard Investigation Workflow:
1. Review auto-loaded project context (CLAUDE.md, PROJECT_SPEC.md)
2. (Optionally) Read additional relevant documentation files for architectural context
3. Analyze actual code files in [COMPONENT(S)] for implementation reality
4. For code-related tasks: Map import/export dependencies and identify affected files
5. Assess impact on Astro configuration, content collections, and related components
6. Verify alignment with blog project patterns and conventions
7. For structural changes: Identify obsolete code, unused imports, and files that should be removed
8. Consider GitHub integration impact (webhooks, content fetching, deployment)

Return comprehensive findings that address the user's request from this component perspective, including architectural insights, implementation details, dependency mapping, and practical considerations for safe execution."
```

Example Usage:
```
Content Analysis Task: "Analyze content collection configuration and markdown processing to understand current content structure and identify integration points for user request about adding tag-based filtering"

Theme Implementation Task: "Analyze theme system components including dark/light mode implementation for optimization related to user request about improving theme switching performance, including dependency mapping and CSS custom property usage"

Deployment Task: "Analyze GitHub integration patterns across Astro configuration and content fetching to plan webhook enhancement for user request about real-time content updates, focusing on API rate limits, build triggers, and deployment workflow"
```

## Step 3: Execution and Synthesis

### For Sub-Agent Approach:
Think deeply about integrating findings from all investigation perspectives.
1. **Design and launch custom sub-agents** based on your strategic analysis
2. **Collect findings** from all successfully completed agents
3. **Synthesize comprehensive understanding** by combining all perspectives
4. **Handle partial failures** by working with available agent findings
5. **Create implementation plan** (for code changes): Include dependency updates, affected files, cleanup tasks, and verification steps
6. **Execute user request** using the integrated knowledge from all agents

### For Direct Approach:
1. **Load relevant documentation and code** based on request analysis
2. **Proceed directly** with user request using targeted context

## Step 4: Consider MCP Server Usage (Optional)

After gathering context, you may leverage MCP servers for complex technical questions as specified in the auto-loaded `/CLAUDE.md` Section 4:
- **Gemini Consultation**: Deep analysis of complex coding problems
- **Context7**: Up-to-date documentation for external libraries

## Step 5: Context Summary and Implementation Plan

After gathering context using your chosen approach:
1. **Provide concise status update** summarizing findings and approach:
   - Brief description of what was discovered through your analysis
   - Your planned implementation strategy based on the findings
   - Keep it informative but concise (2-4 sentences max)

Example status updates:
```
"Analysis revealed the content system uses Astro content collections with frontmatter validation and GitHub API integration for content fetching. I'll implement the new tag filtering feature by extending the existing content collection schema and creating a dynamic filtering component that integrates with the current blog layout structure. This will require updating the content config, adding new utility functions, and modifying 2 layout components."

"Found that the theme system currently uses CSS custom properties with a JavaScript toggle for dark/light mode switching. I'll add the requested theme transition animations by extending the existing theme switching logic and adding CSS transitions to the custom property declarations. The implementation will follow the established Tailwind patterns and requires updates to the theme toggle component and global CSS configuration."
```

2. **Proceed with implementation** of the user request using your comprehensive understanding

## Optimization Guidelines

- **Adaptive Decision-Making**: Choose the approach that best serves the specific user request
- **Efficient Resource Use**: Balance thoroughness with efficiency based on actual complexity
- **Comprehensive Coverage**: Ensure all aspects relevant to the user's request are addressed
- **Quality Synthesis**: Combine findings effectively to provide the most helpful response

This adaptive approach ensures optimal context gathering - from lightweight direct analysis for simple requests to comprehensive multi-agent investigation for complex system-wide tasks.

Now proceed with intelligent context analysis for: $ARGUMENTS
