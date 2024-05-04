import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    imageThumb: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    supImage1: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    supImage2: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    platform: z.string(),
    stack: z.string(),
    website: z.string(),
    github: z.string().optional(),
    more: z.string().optional(),
  }),
});

const academicCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    imageThumb: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    supImage1: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    supImage2: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    platform: z.string(),
    stack: z.string(),
    website: z.string(),
    github: z.string(),
  }),
});

export const collections = {
  projects: projectsCollection,
  academics: academicCollection,
};
