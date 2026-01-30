import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    order: z.number(),
    status: z.enum(["completed", "ongoing", "wip"]).default("completed"),
    caseStudySlug: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          icon: z.string().optional()
        })
      )
      .optional()
  })
});

const caseStudiesCollection = defineCollection({
  type: "content",
  schema: z.object({
    tag: z.string(),
    title: z.string(),
    subtitle: z.string(),
    version: z.string(),
    roleLabel: z.string(),
    role: z.string(),
    timelineLabel: z.string(),
    timeline: z.string(),
    deliverablesLabel: z.string(),
    deliverables: z.string(),
    challengeLabel: z.string(),
    challengeTitle: z.string(),
    challengeBody: z.string(),
    challengeMetrics: z.array(z.object({ value: z.string(), label: z.string() })),
    stackLabel: z.string(),
    stackTitle: z.string(),
    stackBody: z.string(),
    stack: z.array(z.string()),
    outcomeLabel: z.string(),
    outcomes: z.array(z.object({ title: z.string(), text: z.string() })),
    console: z.object({
      filename: z.string(),
      languageTag: z.string().optional(),
      code: z.string(),
      statusLabel: z.string(),
      statusState: z.enum(["success", "warning", "error", "info"])
    }),
    outcome: z.object({
      metric: z.string(),
      title: z.string(),
      body: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string()
    }),
    published: z.boolean().default(true)
  })
});

export const collections = {
  projects: projectsCollection,
  "case-studies": caseStudiesCollection
};
