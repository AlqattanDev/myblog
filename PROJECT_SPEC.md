# GitHub-Synced Blog Project Specification

## Overview
A modern blog system that automatically syncs content from a GitHub repository, built with Astro and deployed to GitHub Pages with custom domain support.

## Architecture Decisions

### Framework & Hosting
- **Frontend Framework**: Astro with content collections
- **Hosting**: GitHub Pages with custom domain support
- **Domain**: User's custom domain with HTTPS via Let's Encrypt
- **Build System**: Static site generation with webhook-triggered rebuilds

### Content Management
- **Update Strategy**: Webhook + cache (rebuild on push, ~2min delay)
- **Content Source**: Dedicated GitHub repository
- **Publishing Frequency**: Daily content updates expected
- **Content Format**: Advanced Markdown with frontmatter

### Repository Structure
```
blog-content/              # Content repository
├── posts/
│   ├── my-first-post.md
│   ├── astro-tips-tricks.md
│   └── advanced-topic.md
├── assets/
│   └── images/
└── config.json

blog-code/                 # Site code repository
├── src/
├── public/
├── astro.config.mjs
└── package.json
```

### URL Structure
- **Pattern**: Simple slug only
- **Examples**: 
  - `yourdomain.com/my-first-post`
  - `yourdomain.com/astro-tips-tricks`
- **File naming**: `my-first-post.md` (kebab-case, easy to type/share)

### Content Features
- **Markdown Support**: Advanced markdown parsing
- **Diagrams**: Mermaid integration
- **Code Highlighting**: Syntax highlighting with copy buttons
- **Math**: Not required
- **Interactive Components**: Not necessary for MVP

### Design & UX
- **Base Design**: Inspired by reference design from idea.md
- **Theme System**: Dark/light mode support
  - System preference detection
  - Manual toggle option
  - Persistent user choice (localStorage)
  - Animated transitions between themes
- **Typography**: Modern, readable font stack
- **Layout**: Clean, focused content presentation

### Technical Implementation
- **Content Fetching**: GitHub API integration via webhooks
- **Build Triggers**: Repository push events trigger site rebuilds
- **Caching Strategy**: Static generation with 2-minute update delay
- **Performance**: Optimized for fast loading and SEO
- **API Limits**: Managed via webhook approach (no runtime API calls)

## Trade-offs Accepted
- **2-minute delay** for content updates vs. real-time (chosen for reliability/performance)
- **Static generation** vs. runtime fetching (chosen for speed/SEO)
- **Webhook complexity** vs. simple polling (chosen for efficiency)

## Development Phases
1. **Phase 1**: Repository setup and basic Astro project
2. **Phase 2**: GitHub integration and webhook configuration  
3. **Phase 3**: Content rendering and markdown processing
4. **Phase 4**: Design implementation and theming
5. **Phase 5**: Domain configuration and deployment

## Future Considerations
- Potential migration to real-time updates if traffic allows
- Addition of search functionality
- Comment system integration
- Analytics and performance monitoring
- Content categorization and tagging

---
*Created: July 15, 2025*
*Last Updated: July 15, 2025*