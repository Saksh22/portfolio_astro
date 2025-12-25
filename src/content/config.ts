import { defineCollection, z } from "astro:content";

const site = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    location: z.string(),
    headline: z.string(),
    tags: z.array(z.string()),
    quote: z.string(),
  }),
});

const experience = defineCollection({
  type: "content",
  schema: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    order: z.number().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    github: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    color: z.enum(["blue", "purple", "amber"]).optional(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const skills = defineCollection({
  type: "content",
  schema: z.object({
    intro: z.string(),
    categories: z.array(
      z.object({
        title: z.string(),
        icon: z.enum(["code", "server", "palette", "users", "brain"]),
        skills: z.array(z.string()),
      })
    ),
  }),
});

const fun = defineCollection({
  type: "content",
  schema: z.object({
    intro: z.string(),
    currentlyLearning: z.string(),
    facts: z.array(
      z.object({
        emoji: z.string(),
        fact: z.string(),
      })
    ),
    media: z.object({
      type: z.enum(["video", "gif"]).optional(),
      url: z.string().optional(), // Can be URL or local path like /videos/my-video.mp4
      thumbnail: z.string().optional(), // Can be URL or local path like /images/thumb.jpg
      caption: z.string().optional(),
    }).optional(),
  }),
});

const contact = defineCollection({
  type: "content",
  schema: z.object({
    intro: z.string(),
    email: z.string().email().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    phone: z.string().optional(),
    preferred: z.enum(["email", "linkedin", "github", "phone"]).optional(),
  }),
});


export const collections = { site, experience, projects, skills, fun, contact };
