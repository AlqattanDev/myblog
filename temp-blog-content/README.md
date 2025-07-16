# Blog Content Repository

This repository contains the markdown content for Ali Alqattan's blog.

## Structure

```
blog-content/
├── posts/           # Blog post markdown files
│   ├── hello-github.md
│   └── github-workflow-guide.md
├── assets/          # Images and other assets
│   └── images/
└── README.md        # This file
```

## Writing Posts

Create new markdown files in the `posts/` directory with frontmatter:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO and social sharing"
date: 2025-01-16
tags: ["tag1", "tag2", "tag3"]
draft: false
author: "Ali Alqattan"
heroImage: "/assets/images/hero.jpg"  # Optional
---

# Your Content Here

Write your blog post content using standard markdown...
```

## Automatic Publishing

When you push changes to this repository:
1. A webhook triggers the blog rebuild process
2. The main blog fetches content from this repository
3. New posts are automatically published
4. The site is deployed to GitHub Pages

## Local Development

The blog system falls back to local content during development, so you can:
- Test posts locally before pushing
- Work offline without GitHub API access
- Have different content for development vs production