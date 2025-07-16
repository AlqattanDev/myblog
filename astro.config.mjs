// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx()
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-default'
      },
      defaultColor: false,
      cssVariablePrefix: '--shiki-',
      wrap: true,
      langs: [
        'javascript',
        'typescript',
        'python',
        'bash',
        'json',
        'html',
        'css',
        'sql',
        'yaml',
        'markdown',
        'mermaid'
      ]
    }
  },
  site: 'https://alialqattan.dev', // Custom domain URL
  base: '/' // Root path for custom domain
});
