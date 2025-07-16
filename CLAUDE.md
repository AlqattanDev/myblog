# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub-synced blog system built with Astro that automatically pulls content from a separate `blog-content` repository. The system uses webhook-triggered rebuilds for near real-time updates while maintaining static site performance.

## Architecture

### Two-Repository System
- **This repository (`blog-code`)**: Contains the Astro site code, components, and build configuration
- **Content repository (`blog-content`)**: Contains markdown posts, assets, and content configuration

### Content Flow
1. User pushes markdown files to `blog-content` repository
2. GitHub webhook triggers rebuild of this site
3. Astro fetches content via GitHub API during build
4. Static site deploys to GitHub Pages with custom domain

### Key Technologies
- **Astro**: Static site generator with content collections
- **GitHub API**: Content fetching during build time
- **GitHub Webhooks**: Automated rebuild triggers
- **GitHub Pages**: Hosting with custom domain support

## URL Structure
Blog posts use simple slug-only URLs (`/my-first-post`) derived from markdown filenames. No date prefixes or complex paths.

## Content Features
- Advanced markdown parsing with frontmatter
- Mermaid diagram support
- Syntax highlighting with copy buttons
- Dark/light theme system with animated transitions
- System preference detection with localStorage persistence

## Development Commands

```bash
# Development server with hot reload
yarn dev

# Build for production
yarn build

# Preview production build locally
yarn preview

# Add integrations (e.g., yarn astro add react)
yarn astro add [integration]
```

## Build Strategy
- **Development**: Local Astro dev server with mock content or GitHub API calls
- **Production**: Static generation triggered by webhooks from content repository
- **Content Updates**: 2-minute delay acceptable for reliability over real-time updates

## GitHub Integration
The site fetches content from the separate `blog-content` repository during build time, not at runtime, to maintain performance and avoid API rate limits during high traffic.