# /blog-content

*Content management command for analyzing and planning blog content structure.*

## Usage
- `/blog-content [content task description]` - Analyze content needs
- `/blog-content preview [post-slug]` - Preview specific post content
- `/blog-content` - General content system analysis

## Purpose
Helps manage the blog content system, including markdown processing, frontmatter validation, GitHub integration, and content structure optimization.

## Execution

User request: "$ARGUMENTS"

### Step 1: Content System Analysis
Analyze the current content architecture:

**Content Collections:**
- Review `src/content/config.ts` for schema validation
- Check content type definitions and frontmatter requirements
- Verify URL generation patterns

**GitHub Integration:**
- Analyze content fetching mechanism
- Check GitHub API integration points
- Review webhook configuration (if applicable)

**Content Processing:**
- Examine markdown rendering pipeline
- Check syntax highlighting configuration
- Review Mermaid diagram integration
- Verify asset handling for images

### Step 2: Content Structure Assessment
Based on the request, focus on relevant areas:

**For new content creation:**
- Review frontmatter schema requirements
- Check existing content patterns
- Verify URL slug generation
- Assess asset organization

**For content optimization:**
- Analyze content performance
- Check markdown processing efficiency
- Review SEO optimization
- Assess content discovery patterns

**For content migration:**
- Map existing content structure
- Plan frontmatter standardization
- Check asset migration needs
- Verify URL preservation

### Step 3: Content Implementation Guide
Provide specific guidance based on analysis:

**Content Structure Best Practices:**
```markdown
---
title: "Post Title"
description: "SEO-friendly description"
publishDate: "2025-01-15"
tags: ["astro", "blog"]
draft: false
---

# Post Title

Content with proper markdown formatting...
```

**Asset Organization:**
- Images in `blog-content/assets/images/`
- Proper alt text for accessibility
- Optimized file sizes for web

**Content Validation:**
- Frontmatter schema compliance
- Markdown syntax validation
- Link verification
- Asset reference checking

### Step 4: Content Workflow Optimization
Recommend workflow improvements:

**Content Creation:**
1. Create markdown file with proper frontmatter
2. Add assets to appropriate directories
3. Test locally with development server
4. Push to blog-content repository
5. Verify webhook triggers rebuild

**Content Updates:**
1. Edit existing markdown files
2. Update frontmatter as needed
3. Optimize images and assets
4. Test rendering locally
5. Deploy via repository push

## Content System Integration

### Key Files
- `src/content/config.ts` - Content collection schemas
- `src/pages/[...slug].astro` - Dynamic post pages
- `src/layouts/BlogPost.astro` - Post layout template
- Content fetching utilities for GitHub API

### Content Features
- **Advanced Markdown**: Rich content with proper parsing
- **Frontmatter Validation**: Type-safe content metadata
- **Asset Management**: Optimized image and media handling
- **SEO Optimization**: Meta tags and structured data
- **Syntax Highlighting**: Code blocks with copy buttons
- **Mermaid Diagrams**: Technical diagram support

### URL Structure
- Simple slug-only URLs: `/my-post-title`
- Derived from filename: `my-post-title.md`
- No date prefixes or complex hierarchies
- SEO-friendly and shareable

## Content Quality Guidelines

### Markdown Standards
- Use semantic heading structure (H1, H2, H3)
- Include descriptive alt text for images
- Use proper code fence syntax with language hints
- Structure content with logical flow

### Frontmatter Requirements
- **title**: Clear, descriptive post title
- **description**: SEO meta description (120-160 chars)
- **publishDate**: ISO date format for sorting
- **tags**: Relevant categorization tags
- **draft**: Boolean for unpublished content

### Performance Considerations
- Optimize images before committing
- Keep markdown files focused and readable
- Use proper heading hierarchy for accessibility
- Include descriptive link text

## GitHub Content Workflow

### Repository Structure
```
blog-content/
├── posts/
│   ├── my-first-post.md
│   ├── astro-tips.md
│   └── advanced-topic.md
├── assets/
│   └── images/
│       ├── hero-image.jpg
│       └── diagram.png
└── config.json
```

### Integration Points
- Content fetching during build process
- Webhook-triggered rebuilds on content updates
- GitHub API rate limit considerations
- Static generation with 2-minute update delay

### Content Sync Process
1. Content pushed to `blog-content` repository
2. Webhook triggers Astro site rebuild
3. GitHub API fetches updated content
4. Static site regenerates with new content
5. Deployment to GitHub Pages with custom domain

Ready to analyze and optimize content system for: $ARGUMENTS