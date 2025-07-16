// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkMermaid from 'remark-mermaid';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx()
  ],
  markdown: {
    remarkPlugins: [remarkMermaid],
    shikiConfig: {
      theme: 'github-dark-default',
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
        'markdown'
      ]
    }
  },
  site: 'https://alqattandev.github.io/myblog', // GitHub Pages URL
  base: '/myblog' // Repository name for GitHub Pages subdirectory
});
