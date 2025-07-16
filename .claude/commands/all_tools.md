# /all_tools

*Comprehensive tool usage and reference guide for the Astro blog project.*

## Usage
- `/all_tools [category]` - Get detailed tool information for specific category
- `/all_tools` - Overview of all available tools and capabilities

## Purpose
Provides comprehensive reference for all development tools, utilities, and capabilities available for the GitHub-synced Astro blog project.

## Tool Categories

### Blog Development Tools
**Core blog development and workflow tools:**

#### Astro Development
- **astro dev** - Development server with hot reload
- **astro build** - Production build with static generation
- **astro preview** - Preview production build locally
- **astro add** - Add integrations and components

#### Content Management
- **Content collections** - Type-safe content management
- **Frontmatter validation** - Schema-based content validation
- **Markdown processing** - Advanced markdown parsing with extensions
- **Asset optimization** - Image and media optimization

#### Theme System
- **CSS custom properties** - Theme variable management
- **Tailwind utilities** - Utility-first styling
- **Dark/light mode** - Theme switching and persistence
- **Responsive design** - Mobile-first responsive patterns

### GitHub Integration Tools
**Tools for managing the two-repository architecture:**

#### Content Synchronization
- **GitHub API** - Content fetching from blog-content repository
- **Webhook handling** - Automated rebuild triggers
- **Rate limiting** - API usage optimization
- **Content validation** - Ensure content integrity

#### Deployment Pipeline
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated build and deployment
- **Custom domain** - HTTPS domain configuration
- **Build optimization** - Performance and caching

### Development Utilities
**General development and debugging tools:**

#### Code Quality
- **TypeScript** - Type checking and IntelliSense
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Astro check** - Astro-specific validation

#### Testing and Validation
- **Build validation** - Ensure builds succeed
- **Link checking** - Validate internal and external links
- **Content validation** - Verify frontmatter and structure
- **Performance testing** - Core Web Vitals monitoring

#### Package Management
- **yarn** - Package installation and management
- **Dependencies** - Project dependency management
- **Scripts** - Custom build and development scripts
- **Lock files** - Dependency version control

### Claude Code Integration
**AI-powered development assistance:**

#### MCP Server Tools
- **Gemini consultation** - Deep architectural analysis
- **Context7 documentation** - Up-to-date library docs
- **Library resolution** - Framework documentation access

#### Command System
- **Blog-specific commands** - Specialized blog workflows
- **Development commands** - General development patterns
- **Documentation commands** - Context and documentation management

## Tool Integration Patterns

### Blog Development Workflow
```bash
# Start development
yarn dev

# Add new integration
yarn astro add @astrojs/tailwind

# Build and preview
yarn build && yarn preview

# Deploy (automated via GitHub)
git push origin main
```

### Content Management Workflow
```bash
# Content updated in blog-content repository
# → Webhook triggers rebuild
# → GitHub API fetches content
# → Astro generates static site
# → GitHub Pages deploys
```

### Theme Development Workflow
```bash
# Edit theme components
# → Hot reload in development
# → Test in both light/dark modes
# → Verify responsive behavior
# → Build and deploy
```

## Configuration Files

### Core Configuration
- **astro.config.mjs** - Astro framework configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **package.json** - Project dependencies and scripts
- **tsconfig.json** - TypeScript configuration

### Content Configuration
- **src/content/config.ts** - Content collection schemas
- **src/env.d.ts** - Environment type definitions
- **.env** - Environment variables (GitHub tokens, etc.)

### Build Configuration
- **.github/workflows/** - GitHub Actions workflows
- **public/** - Static assets and files
- **dist/** - Built site output

## Environment Variables

### Required Variables
```bash
# GitHub integration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
CONTENT_REPO_OWNER=username
CONTENT_REPO_NAME=blog-content

# Build configuration
PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional Variables
```bash
# Development
DEBUG=true
NODE_ENV=development

# Analytics (if used)
ANALYTICS_ID=G-XXXXXXXXXX
```

## Common Tool Combinations

### Complete Development Setup
```bash
# Install dependencies
yarn install

# Start development
yarn dev

# In another terminal, watch for changes
yarn astro check --watch
```

### Content Development
```bash
# Fetch latest content
yarn build --draft  # Build with draft content

# Preview with content
yarn preview

# Check for issues
yarn astro check
```

### Theme Development
```bash
# Development with theme focus
yarn dev

# Test build performance
yarn build --verbose

# Check accessibility
# Use browser dev tools or accessibility checkers
```

### Deployment Preparation
```bash
# Full validation
yarn build
yarn astro check

# Preview production
yarn preview

# Deploy
git push origin main  # Triggers GitHub Pages deployment
```

## Troubleshooting Tools

### Common Issues
**Build failures:**
- Check `yarn astro check` for errors
- Verify content collection schemas
- Check GitHub API rate limits

**Content sync issues:**
- Verify webhook configuration
- Check GitHub token permissions
- Test API endpoint accessibility

**Theme problems:**
- Validate CSS custom properties
- Check Tailwind purge configuration
- Test theme switching logic

### Debug Commands
```bash
# Verbose build output
yarn build --verbose

# Check Astro configuration
yarn astro info

# Validate content collections
yarn astro check

# Test GitHub API
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/owner/blog-content/contents/posts
```

## Performance Optimization Tools

### Build Optimization
- **Static generation** - Pre-built pages for fast loading
- **Image optimization** - Automatic image processing
- **Code splitting** - Optimized JavaScript bundles
- **CSS optimization** - Minimal CSS with Tailwind purge

### Content Optimization
- **Markdown processing** - Efficient parsing and rendering
- **Asset optimization** - Compressed images and media
- **Caching strategies** - Browser and CDN caching
- **Bundle analysis** - Identify optimization opportunities

### Monitoring Tools
- **Lighthouse** - Performance and accessibility audits
- **Core Web Vitals** - User experience metrics
- **Build time analysis** - Optimization opportunities
- **Bundle size tracking** - Monitor asset sizes

## Advanced Tool Usage

### Custom Integrations
```javascript
// astro.config.mjs - Custom integration example
export default defineConfig({
  integrations: [
    // Blog-specific integrations
    tailwind(),
    mdx(),
    sitemap(),
    // Custom integration
    customBlogIntegration()
  ]
});
```

### Advanced Content Processing
```typescript
// src/content/config.ts - Advanced schema
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.date(),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
  // Advanced validation
  slug: z.string().regex(/^[a-z0-9-]+$/),
});
```

### GitHub API Integration
```typescript
// Advanced content fetching
const content = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/posts`, {
  headers: {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    'If-None-Match': lastETag, // Conditional requests
  }
});
```

This comprehensive tool reference ensures efficient development and deployment of the Astro blog project with all available capabilities properly utilized.