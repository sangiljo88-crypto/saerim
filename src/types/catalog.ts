export type VisualAsset = {
  src?: string;
  alt: string;
  caption: string;
  tone?: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  shortDescription: string;
  intro: string;
  whyItMatters: string;
  heroTagline: string;
  highlights: string[];
  tone: "sunset" | "sea" | "forest" | "night" | "sand" | "stone";
  heroVisual?: VisualAsset;
  contentVisuals?: VisualAsset[];
  status?: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  keySellingPoints: string[];
  origin: string;
  processing: string;
  usage: string;
  packageInfo: string;
  shippingInfo: string;
  smartstoreUrl: string;
  gmarketUrl: string;
  wholesaleAvailable: boolean;
  featured: boolean;
  image: string;
  heroVisual?: VisualAsset;
  contentVisuals?: VisualAsset[];
  status?: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
};
