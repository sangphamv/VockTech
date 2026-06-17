import { defineCollection } from "astro:content";
import { z } from 'astro/zod';
import { glob } from "astro/loaders";

const BlogPosts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      category: z.string().trim(),
      author: z.string().trim(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()),
      image: z.preprocess(
        (val) => typeof val === 'string' && !val.startsWith('./') && !val.startsWith('http') && !val.startsWith('/') ? `./${val}` : val,
        image()
      ),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      series: z.string().optional(),
      seriesOrder: z.number().optional(),
    }),
});

const Categories = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/categories" }),
  schema: z.object({
    title: z.string(),
    color: z.enum(["green", "blue", "orange", "purple", "pink"]),
    description: z.string(),
  }),
});

export const collections = {
  blog: BlogPosts,
  categories: Categories,
};
