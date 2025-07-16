# /blog-theme

*Theme and styling command for the Astro blog design system.*

## Usage
- `/blog-theme [styling task]` - Handle theme-related development
- `/blog-theme dark-mode` - Focus on dark/light mode implementation
- `/blog-theme` - General theme system analysis

## Purpose
Manages the blog's design system, including dark/light theme implementation, Tailwind configuration, typography, and responsive design patterns.

## Execution

User request: "$ARGUMENTS"

### Step 1: Theme System Analysis
Analyze the current design and theme implementation:

**Theme Infrastructure:**
- Check Tailwind CSS configuration
- Review CSS custom properties setup
- Analyze theme toggle implementation
- Verify localStorage persistence

**Design System:**
- Review typography scale and font choices
- Check color palette and contrast ratios
- Analyze spacing and layout patterns
- Verify component design consistency

**Responsive Design:**
- Check mobile-first implementation
- Review breakpoint usage
- Analyze touch-friendly interactions
- Verify accessibility features

### Step 2: Theme Task Analysis
Based on the request, focus on specific theme aspects:

**For dark/light mode work:**
- Analyze current theme toggle implementation
- Review CSS custom property usage
- Check theme persistence mechanism
- Verify smooth theme transitions

**For design system updates:**
- Review component styling patterns
- Check design token usage
- Analyze layout and spacing
- Verify brand consistency

**For responsive design:**
- Check mobile layout adaptation
- Review touch interface optimization
- Analyze content readability
- Verify cross-device compatibility

**For accessibility improvements:**
- Check color contrast ratios
- Review keyboard navigation
- Analyze screen reader compatibility
- Verify WCAG compliance

### Step 3: Theme Configuration Review
Check key theme configuration files:

**Tailwind Configuration:**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      typography: {
        // Custom typography settings
      }
    }
  }
}
```

**CSS Custom Properties:**
```css
:root {
  --color-bg: #ffffff;
  --color-text: #1f2937;
  --color-accent: #3b82f6;
}

[data-theme="dark"] {
  --color-bg: #111827;
  --color-text: #f9fafb;
  --color-accent: #60a5fa;
}
```

**Theme Toggle Implementation:**
- JavaScript for theme switching
- System preference detection
- LocalStorage persistence
- Smooth transition animations

### Step 4: Design System Guidelines
Provide theme development guidance:

**Color System:**
- Semantic color naming
- Consistent contrast ratios
- Dark mode color mappings
- Accessible color combinations

**Typography:**
- Readable font stack
- Appropriate line heights
- Responsive font scaling
- Proper heading hierarchy

**Layout Patterns:**
- Consistent spacing scale
- Responsive grid systems
- Component layout patterns
- Content width optimization

**Interactive Elements:**
- Button and link styling
- Form element theming
- Hover and focus states
- Loading and transition states

## Theme Implementation Patterns

### Dark/Light Mode Setup
**System Preference Detection:**
```javascript
// Detect system preference
const getSystemTheme = () => 
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Initialize theme
const initTheme = () => {
  const stored = localStorage.getItem('theme');
  const theme = stored || getSystemTheme();
  document.documentElement.setAttribute('data-theme', theme);
};
```

**Theme Toggle Component:**
```astro
---
// ThemeToggle.astro
---
<button id="theme-toggle" aria-label="Toggle theme">
  <span class="sr-only">Toggle theme</span>
  <svg class="theme-icon theme-icon-light"><!-- sun icon --></svg>
  <svg class="theme-icon theme-icon-dark"><!-- moon icon --></svg>
</button>

<script>
  // Theme toggle functionality
</script>
```

### CSS Custom Properties Strategy
**Theme Variables:**
```css
:root {
  /* Semantic color tokens */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent-primary: #0ea5e9;
  --border-primary: #e2e8f0;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent-primary: #38bdf8;
  --border-primary: #334155;
}
```

### Component Theming
**Blog Post Styling:**
- Readable typography for long-form content
- Proper code block styling with syntax highlighting
- Image and media responsive handling
- Consistent link and emphasis styling

**Navigation Elements:**
- Header and footer theming
- Menu and navigation consistency
- Active state indicators
- Mobile navigation patterns

## Design System Components

### Typography Scale
```css
.prose {
  --prose-body: var(--text-primary);
  --prose-headings: var(--text-primary);
  --prose-links: var(--accent-primary);
  --prose-code: var(--text-secondary);
  --prose-pre-bg: var(--bg-secondary);
}
```

### Layout Patterns
- **Container**: Max-width content wrapper
- **Grid**: Responsive layout system
- **Card**: Content card patterns
- **Stack**: Vertical spacing utility

### Interactive States
- **Hover**: Subtle color and scale changes
- **Focus**: Clear accessibility indicators
- **Active**: Pressed state feedback
- **Disabled**: Reduced opacity and interaction

## Performance Considerations

### CSS Optimization
- Minimize unused CSS with Tailwind purging
- Use CSS custom properties efficiently
- Implement critical CSS inlining
- Optimize font loading strategies

### Theme Switching Performance
- Avoid layout shifts during theme changes
- Use CSS transitions for smooth changes
- Minimize repaints and reflows
- Cache theme preferences effectively

### Responsive Images
- Implement proper image optimization
- Use responsive image techniques
- Optimize for different screen densities
- Consider dark mode image variants

## Accessibility Standards

### Color and Contrast
- Maintain WCAG AA contrast ratios
- Test color accessibility tools
- Provide alternative indicators beyond color
- Consider color blindness accessibility

### Interactive Elements
- Ensure keyboard navigation support
- Provide clear focus indicators
- Use semantic HTML elements
- Include appropriate ARIA labels

### Content Accessibility
- Use proper heading hierarchy
- Provide alt text for images
- Ensure readable font sizes
- Support screen reader navigation

Ready to work on theme task: $ARGUMENTS