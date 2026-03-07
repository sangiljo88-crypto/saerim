import { z } from "zod";

const visualAssetSchema = z.object({
  src: z.string().min(1).optional(),
  alt: z.string().min(1),
  caption: z.string().min(1),
  tone: z.string().min(1).optional(),
});

const statusSchema = z.enum(["draft", "published"]).optional();

export const categoryContentSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  englishName: z.string().min(1),
  shortDescription: z.string().min(1),
  intro: z.string().min(1),
  whyItMatters: z.string().min(1),
  heroTagline: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
  tone: z.enum(["sunset", "sea", "forest", "night", "sand", "stone"]),
  heroVisual: visualAssetSchema.optional(),
  contentVisuals: z.array(visualAssetSchema).max(4).optional(),
  status: statusSchema,
  createdAt: z.string().min(1).optional(),
  updatedAt: z.string().min(1).optional(),
});

export const productContentSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  keySellingPoints: z.array(z.string().min(1)).min(1),
  origin: z.string().min(1),
  processing: z.string().min(1),
  usage: z.string().min(1),
  packageInfo: z.string().min(1),
  shippingInfo: z.string().min(1),
  smartstoreUrl: z.string().min(1),
  gmarketUrl: z.string().min(1),
  wholesaleAvailable: z.boolean(),
  featured: z.boolean(),
  image: z.string().min(1),
  heroVisual: visualAssetSchema.optional(),
  contentVisuals: z.array(visualAssetSchema).min(2).max(4).optional(),
  status: statusSchema,
  createdAt: z.string().min(1).optional(),
  updatedAt: z.string().min(1).optional(),
});

export type CategoryContent = z.infer<typeof categoryContentSchema>;
export type ProductContent = z.infer<typeof productContentSchema>;
