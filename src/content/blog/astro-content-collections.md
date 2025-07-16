---
title: "Working with Astro Content Collections"
description: "A guide to using Astro's content collections for type-safe content management"
date: 2025-07-15
tags: ["astro", "content-collections", "typescript"]
draft: false
---

# Working with Astro Content Collections

Astro's content collections provide a powerful way to manage and organize content with full TypeScript support.

## Benefits of Content Collections

1. **Type Safety**: Schema validation ensures content structure consistency
2. **Developer Experience**: IntelliSense and autocompletion for frontmatter
3. **Performance**: Optimized content loading and processing
4. **Flexibility**: Support for multiple content types and custom schemas

## Schema Definition

Content collections are defined in `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

## Querying Content

You can query content collections using Astro's built-in functions:

```javascript
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
const publishedPosts = await getCollection('blog', ({ data }) => {
  return !data.draft;
});
```

This enables building dynamic, type-safe blogs with excellent developer experience.