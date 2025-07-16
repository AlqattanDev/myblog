You are working on the GitHub-synced Astro blog project. The user has requested to create or regenerate documentation with the arguments: "$ARGUMENTS"

## Auto-Loaded Project Context:
@/CLAUDE.md
@/PROJECT_SPEC.md

## CRITICAL: AI-Optimized Documentation Principles
All documentation must be optimized for AI consumption and future-proofing:
- **Structured & Concise**: Use clear sections, lists, and hierarchies. Provide essential information only.
- **Contextually Complete**: Include necessary context, decision rationale ("why"), and cross-references.
- **Pattern-Oriented**: Make architectural patterns, conventions, and data flow explicit.
- **Modular & Scalable**: Structure for partial updates and project growth.
- **Cross-references**: Link related concepts with file paths, function names, and stable identifiers

---

## Step 1: Analyze & Strategize

Using the auto-loaded project context, analyze the user's request and determine the optimal documentation strategy.

### 1.1. Parse Target & Assess Complexity
**Action**: Analyze `$ARGUMENTS` to identify the documentation need and scope.

**Blog Project Documentation Areas:**
- **Core Architecture**: Two-repository system and GitHub integration
- **Content System**: Astro content collections and markdown processing
- **Theme System**: Dark/light mode and CSS architecture
- **Deployment**: GitHub Pages and webhook configuration
- **Development**: Local development and build processes

**Complexity Assessment Criteria:**
- **Codebase Size**: File count and lines of code in target area
- **Technology Mix**: Astro, Tailwind, GitHub API integration
- **Architectural Complexity**: Two-repository sync and static generation
- **Existing Documentation**: Current state of CLAUDE.md and PROJECT_SPEC.md

### 1.2. Select Strategy
Think deeply about this documentation generation task based on the blog project context.

**Strategy Logic:**
- **Direct Creation**: Simple documentation needs (basic feature docs, single component)
- **Focused Analysis**: Moderate complexity (content system, theme architecture)
- **Comprehensive Analysis**: High complexity (full architecture, GitHub integration)

---

## Step 2: Information Gathering (Analysis Phase)

Based on the chosen strategy, gather the necessary information.

### Strategy A: Direct Creation
Proceed directly to **Step 3.1**. Perform lightweight analysis during content generation.

### Strategy B: Focused or Comprehensive Analysis (Sub-Agent Orchestration)

#### 2.1. Sub-Agent Roles
Select from these specialized roles based on complexity assessment:
- **`Blog_Code_Analyzer`**: Astro configuration, content collections, component structure
- **`GitHub_Integration_Mapper`**: Content fetching, webhook setup, API patterns
- **`Theme_System_Analyzer`**: CSS architecture, dark/light mode, responsive design
- **`Content_Flow_Mapper`**: Markdown processing, frontmatter, URL generation
- **`Deployment_Validator`**: GitHub Pages setup, domain configuration, build process

#### 2.2. Launch Sub-Agents
**Execution Plan:**
- **Focused Analysis (2-3 agents)**: Based on specific documentation need
- **Comprehensive Analysis (3-5 agents)**: For full system documentation

**CRITICAL: Launch agents in parallel using a single message with multiple Task tool invocations for optimal performance.**

**Task Template:**
```
Task: "As the [Agent_Role], analyze the blog codebase to support documentation generation.

Your focus: [role-specific goal, e.g., 'analyzing Astro content collection patterns and GitHub integration']

Standard workflow:
1. Review auto-loaded project context (CLAUDE.md, PROJECT_SPEC.md)
2. Analyze the relevant blog components for your specialized area
3. Return structured findings for documentation generation

Return a comprehensive summary of your findings for this role."
```

---

## Step 3: Documentation Generation

Think deeply about synthesizing findings and generating comprehensive blog-specific documentation.

### 3.1. Content Synthesis & Generation

#### For Direct Creation (No Sub-Agents)
**Blog-First Analysis Methodology:**
1. **Project Structure Analysis**: Map Astro file organization and content flow using Glob/LS
2. **GitHub Integration Analysis**: Use Grep to identify API patterns and webhook handling
3. **Theme Pattern Extraction**: Read CSS and component files for theme architecture
4. **Content System Analysis**: Examine content collections and markdown processing
5. **Existing Documentation Assessment**: Read current CLAUDE.md and PROJECT_SPEC.md

#### For Sub-Agent Strategies  
**Blog Synthesis Integration Process:**
1. **Compile Core Findings**: Merge agent findings for immediate documentation generation
2. **Extract Blog-Wide Patterns**: Identify system-wide patterns across two repositories
3. **Resolve Information Conflicts**: When code contradicts existing docs, use code as source of truth
4. **Identify Documentation Gaps**: Find areas needing new documentation
5. **Apply Blog Conventions**: Use patterns from CLAUDE.md and PROJECT_SPEC.md
6. **Content Flow Mapping**: Document the content-to-deployment pipeline

#### Content Generation Process
**Blog Documentation Approach:**
1. **Select Template**: Choose based on documentation type
2. **Apply Blog Context**: Focus on two-repository architecture and static generation
3. **Include GitHub Patterns**: Document webhook integration and content syncing
4. **Document Theme System**: Include dark/light mode and responsive patterns
5. **Ensure Completeness**: Cover content flow, build process, and deployment

### 3.2. Template Guidelines

**Blog Architecture Documentation:**
```markdown
# Blog Architecture Documentation

## Two-Repository System
[Explanation of blog-code vs blog-content repositories]

## Content Flow
[Content creation to deployment pipeline]

## GitHub Integration
[API usage, webhooks, and synchronization patterns]

## Build Process
[Astro static generation and GitHub Pages deployment]

## Theme System
[Dark/light mode implementation and CSS architecture]
```

**Feature-Specific Documentation:**
```markdown
# [Feature] Implementation

## Architecture
[How this feature integrates with blog system]

## Implementation Patterns
[Astro-specific patterns and conventions]

## GitHub Integration
[How this affects content fetching or deployment]

## Theme Considerations
[Dark/light mode support and responsive design]

## Development Workflow
[Local testing and deployment considerations]
```

---

## Step 4: Finalization & Blog-Specific Housekeeping

### 4.1. Write Documentation File
**Action**: Write the generated content to the appropriate location.

### 4.2. Update Documentation Registry
**For blog project documentation:**
- Update CLAUDE.md if architectural patterns are documented
- Consider PROJECT_SPEC.md updates for specification changes
- Maintain consistency with existing blog documentation structure

### 4.3. Quality Validation
**Blog-Specific Validation:**
- Verify two-repository architecture is correctly documented
- Confirm GitHub integration patterns are accurate
- Check theme system documentation for completeness
- Validate content flow and deployment process

### 4.4. Architecture Validation & Recommendations
**Compare findings against CLAUDE.md and PROJECT_SPEC.md:**
- **Technology Stack**: Verify documented vs actual stack
- **Architecture Patterns**: Implementation vs specification
- **GitHub Integration**: Actual vs planned integration
- **Content System**: Current vs specified content handling

### 4.5. Blog Content Hierarchy Management
**Manage blog documentation efficiently:**
- Avoid duplication between CLAUDE.md and feature docs
- Maintain clear separation between architecture and implementation
- Create appropriate cross-references between documents
- Ensure navigation clarity for development workflows

---

## Step 5: Generate Summary

Provide a comprehensive summary including:

### Documentation Creation Results
- **Documentation type and purpose** (Architecture, Feature, or Component)
- **Strategy used** (Direct Creation, Focused Analysis, or Comprehensive Analysis)
- **Key blog patterns documented** (GitHub integration, content flow, theme system)
- **File updates made** (new docs, CLAUDE.md updates)

### Blog Architecture Intelligence
**Based on analysis, provide structured recommendations:**

#### Critical Updates Needed
- **File**: [specific documentation file]
- **Issue**: [inconsistency with blog implementation]
- **Recommendation**: [specific update needed]
- **Evidence**: [code references from blog codebase]

#### Blog System Enhancement Opportunities  
- **Gap Identified**: [missing blog documentation area]
- **Scope**: [what should be documented]
- **Rationale**: [why this matters for blog development]
- **Implementation Evidence**: [blog-specific code patterns]

#### Documentation Health Assessment
- **Alignment Score**: [consistency between docs and blog implementation]
- **Most Accurate Areas**: [well-documented blog components]
- **Areas Needing Attention**: [documentation gaps or inconsistencies]
- **Blog Development Priority**: [recommended documentation improvements]

#### Content Migration Results
**Document blog documentation hierarchy changes:**

- **Content Organized**: [how blog documentation is structured]
- **Cross-References Added**: [navigation between blog docs]
- **Redundancies Eliminated**: [duplicate content removed]
- **Blog Workflow Clarity**: [improved development guidance]

#### Next Documentation Steps
- **Feature Documentation Candidates**: [additional blog features to document]
- **Integration Documentation Needs**: [GitHub or deployment docs needed]
- **Development Workflow Gaps**: [missing development guidance]

---

Now proceed to create/regenerate blog documentation based on the request: $ARGUMENTS