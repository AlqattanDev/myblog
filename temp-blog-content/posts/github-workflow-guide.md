---
title: "GitHub Workflow for Blog Content"
description: "How to use the two-repository workflow for blogging"
date: 2025-01-15
tags: ["workflow", "github", "blogging", "automation"]
draft: false
author: "Ali Alqattan"
---

# GitHub Workflow for Blog Content

This post demonstrates the powerful two-repository workflow for content management.

## Workflow Overview

### Repository Structure

1. **Blog Code Repository** (`myblog`): Contains the Astro application
2. **Content Repository** (`blog-content`): Contains markdown posts

### Writing Process

1. Write posts in the content repository
2. Push changes to trigger automatic rebuilds
3. Blog automatically fetches and displays new content

## Content Features

### Frontmatter Support

```yaml
---
title: "Your Post Title"
description: "Brief description"
date: 2025-01-15
tags: ["tag1", "tag2"]
draft: false
author: "Your Name"
---
```

### Advanced Markdown

**Bold text**, *italic text*, and `inline code` are supported.

### Code Blocks with Syntax Highlighting

```python
def fetch_github_content():
    """Fetch blog content from GitHub API."""
    octokit = Octokit(auth=token)
    response = octokit.rest.repos.getContent({
        owner: 'your-username',
        repo: 'blog-content',
        path: 'posts'
    })
    return response.data
```

### Lists and Organization

- ✅ Automatic content sync
- ✅ Build-time optimization  
- ✅ Graceful error handling
- ✅ Local development support

## Benefits

1. **Separation of Concerns**: Code and content in separate repositories
2. **Collaboration**: Easy for multiple authors to contribute
3. **Performance**: Static generation with GitHub API fetching
4. **Reliability**: Fallback to local content if GitHub is unavailable

This workflow provides the perfect balance of automation and control!