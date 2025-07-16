# 🔧 Blog Command Templates

Specialized command templates for the Astro blog project that coordinate development workflows for blog-specific tasks.

## Overview

These commands are optimized for the GitHub-synced blog system built with Astro. Each command:

- **Understands blog architecture**: Two-repository system with webhook integration
- **Focuses on blog workflows**: Content management, theme system, and deployment
- **Integrates with Astro patterns**: Static generation and content collections
- **Maintains blog context**: Content structure and GitHub integration

### 🚀 Automatic Context Injection

All commands automatically load project context:
- **Blog configuration**: CLAUDE.md and PROJECT_SPEC.md
- **Architecture understanding**: Two-repository system and webhook flow
- **Development patterns**: Astro best practices and blog workflows

## Blog-Specific Commands

### 🚀 `/blog-dev`
**Purpose**: Development workflow setup and guidance for Astro blog features.

**When to use**:
- Starting development on blog features
- Setting up development environment
- Need guidance on Astro patterns
- Working on theme or content systems

**Key areas**: Component development, theme system integration, content processing, and hot reload setup.

### 📝 `/blog-content`
**Purpose**: Content management and analysis for the blog system.

**When to use**:
- Managing blog content structure
- Optimizing markdown processing
- Configuring content collections
- GitHub content integration tasks

**Key areas**: Frontmatter schemas, markdown rendering, GitHub API integration, and content validation.

### 🚀 `/blog-deploy`
**Purpose**: Deployment and GitHub integration management.

**When to use**:
- Setting up webhook integration
- Configuring GitHub Pages deployment
- Managing two-repository sync
- Troubleshooting deployment issues

**Key areas**: GitHub webhooks, Pages configuration, content synchronization, and deployment monitoring.

### 🎨 `/blog-theme`
**Purpose**: Theme system and design implementation.

**When to use**:
- Working on dark/light mode system
- Implementing design changes
- Optimizing responsive design
- Managing Tailwind configuration

**Key areas**: Theme switching, CSS custom properties, typography system, and accessibility.

## General Purpose Commands

### 📊 `/full-context`
**Purpose**: Comprehensive context gathering and analysis when you need deep understanding or plan to execute code changes.

**When to use**:
- Starting work on a new feature or bug
- Need to understand how systems interconnect
- Planning architectural changes
- Any task requiring thorough analysis before implementation

### 🔍 `/code-review` 
**Purpose**: Get multiple expert perspectives on code quality, focusing on high-impact findings rather than nitpicks.

**When to use**:
- After implementing new features
- Before merging important changes
- When you want security, performance, and architecture insights

### 🧠 `/gemini-consult` *(Requires Gemini MCP Server)*
**Purpose**: Engage in deep, iterative conversations with Gemini for complex problem-solving and architectural guidance.

**When to use**:
- Tackling complex architectural decisions
- Need expert guidance on implementation approaches
- Debugging intricate issues across multiple files
- When you need a thinking partner for difficult problems

### 📝 `/update-docs`
**Purpose**: Keep documentation synchronized with code changes, ensuring AI context remains current.

**When to use**:
- After modifying code
- After adding new features
- When project structure changes

### ♻️ `/refactor`
**Purpose**: Intelligently restructure code while maintaining functionality and updating all dependencies.

**When to use**:
- Breaking up large files
- Improving code organization
- Extracting reusable components

### 🤝 `/handoff`
**Purpose**: Preserve context when ending a session or when the conversation becomes too long.

**When to use**:
- Ending a work session
- Context limit approaching
- Switching between major tasks

## Blog Workflow Patterns

### Content Development
```bash
/blog-content "analyze current content structure"  # Understand content system
# ... work on content features ...
/blog-dev "content processing optimization"        # Implement changes
/blog-deploy "test content sync"                   # Verify integration
```

### Theme Development
```bash
/blog-theme "implement dark mode system"           # Design theme system
# ... develop theme components ...
/blog-dev "test theme integration"                 # Verify implementation
/code-review "review theme system"                 # Quality check
```

### Deployment Setup
```bash
/blog-deploy setup                                 # Configure GitHub integration
# ... set up webhooks and pages ...
/blog-content "test content fetching"              # Verify content sync
/blog-dev "test full workflow"                     # End-to-end testing
```

### Feature Development
```bash
/blog-dev "add syntax highlighting with copy buttons" # Start development
# ... implement feature ...
/blog-theme "style code blocks"                    # Theme integration
/code-review "review syntax highlighting feature"   # Quality check
```

## Architecture Understanding

### Two-Repository System
- **blog-code** (this repo): Astro site code and configuration
- **blog-content**: Markdown posts and assets
- **Integration**: GitHub API + webhooks for content sync

### Key Technologies
- **Astro**: Static site generator with content collections
- **Tailwind CSS**: Utility-first styling with theme system
- **GitHub Pages**: Static hosting with custom domain
- **Markdown**: Advanced content parsing with frontmatter

### Content Flow
1. Content updated in blog-content repository
2. Webhook triggers rebuild of blog-code repository  
3. Astro fetches content via GitHub API during build
4. Static site generates with updated content
5. GitHub Pages deploys to custom domain

## Command Integration

Blog-specific commands work together:
- **`/blog-dev`** provides development guidance
- **`/blog-content`** handles content management  
- **`/blog-deploy`** manages GitHub integration
- **`/blog-theme`** handles design system

General commands supplement blog workflows:
- **`/full-context`** for deep analysis
- **`/code-review`** for quality assurance
- **`/gemini-consult`** for complex decisions

## Key Principles

1. **Blog-first approach** - Commands understand the unique blog architecture
2. **Content-driven development** - Always consider content structure impact
3. **GitHub integration** - Respect the two-repository workflow
4. **Performance focused** - Optimize for static generation and fast loading
5. **Theme consistency** - Maintain design system across all features

---

*Commands are optimized for the Astro blog project described in CLAUDE.md and PROJECT_SPEC.md.*