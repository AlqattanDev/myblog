/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0f766e',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        secondary: {
          DEFAULT: '#f8fafc',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          DEFAULT: '#14b8a6',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
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
          'background': 'linear-gradient(135deg, var(--theme-bg-primary) 0%, var(--theme-bg-secondary) 100%)',
          'border': '1px solid var(--theme-border-primary)',
          'border-radius': '0.75rem',
          'padding': '1.5rem',
          'transition': 'all 0.3s ease',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          '&:hover': {
            'transform': 'translateY(-2px)',
            'box-shadow': '0 10px 25px rgba(15, 118, 110, 0.1)',
          },
        },
        '.theme-button': {
          'background': 'linear-gradient(135deg, var(--theme-accent-primary) 0%, var(--theme-accent-secondary) 100%)',
          'color': 'var(--theme-text-inverse)',
          'padding': '0.75rem 1.5rem',
          'border-radius': '0.5rem',
          'border': 'none',
          'font-weight': '500',
          'transition': 'all 0.2s ease',
          '&:hover': {
            'transform': 'translateY(-1px)',
            'box-shadow': '0 4px 12px rgba(15, 118, 110, 0.2)',
          },
        },
        '.theme-link': {
          'color': 'var(--theme-link-color)',
          'text-decoration': 'none',
          'font-weight': '500',
          'border-bottom': '1px dotted var(--theme-accent-primary)',
          'transition': 'all 0.2s ease',
          '&:hover': {
            'color': 'var(--theme-link-hover)',
            'border-bottom-color': 'var(--theme-accent-secondary)',
          },
        },
      });
    },
  ],
}