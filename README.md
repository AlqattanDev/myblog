# GitHub-Synced Astro Blog

A modern, production-ready blog system that automatically fetches content from a separate GitHub repository and deploys via GitHub Actions.

## 🌟 Features

- **📡 GitHub Integration**: Automatically syncs content from external repository
- **🎨 Modern Design**: Dark/light theme with smooth transitions
- **⚡ Fast Performance**: Static site generation with Astro
- **📝 Advanced Markdown**: Mermaid diagrams, syntax highlighting, typography
- **📱 Responsive**: Beautiful design on all devices
- **🔄 Auto-Deploy**: Webhook-triggered rebuilds when content changes

## 🏗️ Architecture

This blog uses a **two-repository architecture**:

1. **Blog Code** (this repo): Astro site, components, styling, deployment
2. **Blog Content** (`blog-content` repo): Markdown posts, assets, media

When you push content to the content repository, GitHub webhooks automatically trigger a rebuild and deployment of the blog.

## 🚀 Live Site

Visit the live blog at: **https://alqattandev.github.io/myblog/**

## 🛠️ Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## 📖 Content Management

See [GITHUB_INTEGRATION.md](./GITHUB_INTEGRATION.md) for detailed setup instructions.

### Quick Start:
1. Create posts in the `blog-content` repository
2. Push changes to trigger automatic rebuild
3. Site updates automatically within ~2 minutes

## 🔧 Tech Stack

- **Framework**: Astro 5.11+ with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Content**: GitHub API + Astro Content Collections
- **Deployment**: GitHub Actions → GitHub Pages
- **Features**: MDX, Mermaid, Syntax Highlighting

Built with ❤️ and deployed automatically via GitHub Actions.