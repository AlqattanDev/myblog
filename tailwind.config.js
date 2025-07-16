/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Tiempos Headline', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1e40af',
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        secondary: {
          DEFAULT: '#7c3aed',
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          900: '#4c1d95',
        },
        accent: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
        // Semantic theme-aware colors using CSS custom properties
        theme: {
          'bg-primary': 'var(--theme-bg-primary)',
          'bg-secondary': 'var(--theme-bg-secondary)',
          'bg-tertiary': 'var(--theme-bg-tertiary)',
          'bg-code': 'var(--theme-bg-code)',
          'bg-muted': 'var(--theme-bg-muted)',
          'text-primary': 'var(--theme-text-primary)',
          'text-secondary': 'var(--theme-text-secondary)',
          'text-tertiary': 'var(--theme-text-tertiary)',
          'text-muted': 'var(--theme-text-muted)',
          'text-inverse': 'var(--theme-text-inverse)',
          'border-primary': 'var(--theme-border-primary)',
          'border-secondary': 'var(--theme-border-secondary)',
          'border-muted': 'var(--theme-border-muted)',
          'accent-primary': 'var(--theme-accent-primary)',
          'accent-hover': 'var(--theme-accent-primary-hover)',
          'accent-secondary': 'var(--theme-accent-secondary)',
          'accent-success': 'var(--theme-accent-success)',
          'code-text': 'var(--theme-code-text)',
          'code-bg': 'var(--theme-code-bg)',
          'link': 'var(--theme-link-color)',
          'link-hover': 'var(--theme-link-hover)',
        }
      },
      animation: {
        'theme-transition': 'theme-transition 0.2s ease-in-out',
      },
      keyframes: {
        'theme-transition': {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Custom plugin for theme-aware utilities
    function({ addUtilities, addComponents }) {
      addUtilities({
        '.theme-transition': {
          'transition': 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        },
      });
      
      addComponents({
        '.theme-card': {
          'background-color': 'var(--theme-bg-secondary)',
          'border': '1px solid var(--theme-border-primary)',
          'border-radius': '0.5rem',
          'padding': '1rem',
          'transition': 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
        },
        '.theme-button': {
          'background-color': 'var(--theme-accent-primary)',
          'color': 'var(--theme-text-inverse)',
          'padding': '0.5rem 1rem',
          'border-radius': '0.375rem',
          'border': 'none',
          'transition': 'background-color 0.2s ease-in-out',
          '&:hover': {
            'background-color': 'var(--theme-accent-primary-hover)',
          },
        },
        '.theme-link': {
          'color': 'var(--theme-link-color)',
          'text-decoration': 'none',
          'transition': 'color 0.2s ease-in-out',
          '&:hover': {
            'color': 'var(--theme-link-hover)',
          },
        },
      });
    },
  ],
}