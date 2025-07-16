# /blog-dev

*Development workflow command for Astro blog project.*

## Usage
- `/blog-dev [feature/fix description]` - Start development with proper setup
- `/blog-dev` - Quick development environment check

## Purpose
Ensures proper development environment setup for the Astro blog, including content fetching, theme system, and hot reload functionality.

## Execution

User request: "$ARGUMENTS"

### Step 1: Environment Check
Verify development prerequisites:
- Check if `yarn dev` is already running (warn if needed)
- Verify GitHub token for content fetching (if configured)
- Check Astro configuration for development setup

### Step 2: Development Setup Analysis
Based on the request, determine what needs setup:

**For feature development:**
- Analyze existing components and patterns
- Check theme system integration points
- Review content collection structure
- Identify relevant Astro integrations

**For content system work:**
- Verify GitHub API integration
- Check markdown processing pipeline
- Review frontmatter schema
- Test content collection validation

**For styling/theme work:**
- Check Tailwind configuration
- Review dark/light theme implementation
- Verify CSS custom properties setup
- Test theme toggle functionality

### Step 3: Quick Start Guide
Based on analysis, provide targeted development guidance:

```bash
# Start development server
yarn dev

# Test content fetching (if applicable)
yarn build --draft

# Preview production build
yarn preview
```

### Step 4: Development Context
Provide relevant context for the specific development task:
- Point to key files for the requested feature
- Highlight existing patterns to follow
- Note any blog-specific considerations
- Reference PROJECT_SPEC.md requirements

## Key Development Patterns

### Component Structure
- Follow Astro component conventions
- Use TypeScript for type safety
- Implement proper frontmatter interfaces
- Follow existing layout patterns

### Content Integration
- Respect the two-repository architecture
- Test with mock content during development
- Verify GitHub API integration for production
- Follow URL structure requirements (simple slugs)

### Theme System
- Maintain dark/light mode compatibility
- Use CSS custom properties for theming
- Test theme persistence (localStorage)
- Verify animated transitions

### Performance Considerations
- Static generation optimization
- Image optimization for blog assets
- Minimize JavaScript bundle size
- Follow Astro best practices for SSG

## Integration Points

### Key Files to Consider
- `astro.config.mjs` - Core configuration
- `src/content/config.ts` - Content collections
- `src/layouts/` - Page layouts
- `src/components/` - Reusable components
- `tailwind.config.js` - Styling configuration

### Development Commands
- `yarn dev` - Hot reload development
- `yarn build` - Production build test
- `yarn preview` - Local production preview
- `yarn astro add [integration]` - Add Astro integrations

## Best Practices

1. **Content-First Development**
   - Always consider content structure impact
   - Test with various content types
   - Verify markdown rendering

2. **Theme Consistency**
   - Test in both light and dark modes
   - Verify color contrast and accessibility
   - Maintain design system consistency

3. **Performance Monitoring**
   - Keep bundle size minimal
   - Optimize static generation
   - Test build performance

4. **GitHub Integration**
   - Respect API rate limits
   - Handle content fetching gracefully
   - Consider webhook integration impacts

Now ready for development of: $ARGUMENTS