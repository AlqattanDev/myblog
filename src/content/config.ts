import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    author: z.string().default('Ali Alqattan'),
  }),
});

export const collections = { blog };