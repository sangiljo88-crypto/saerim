/**
 * 새림 CMS 엔티티 타입 — docs/brand-system/04-data-architecture.md 기준.
 * DB 스키마와 1:1로 대응한다.
 */

export type Status = "draft" | "published" | "archived";

export type Brand = {
  id: number;
  slug: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  role: "master" | "sub";
  target: string;
  sort: number;
  status: Status;
};

export type Factory = {
  id: number;
  slug: string;
  name: string;
  code: string;
  role: string;
  symbolSentence: string;
  description: string;
  address: string;
  capabilities: string[];
  certifications: string[];
  image: string;
  sort: number;
  status: Status;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  brandSlug: string;
  factorySlug: string;
  category: string;
  summary: string;
  story: string;
  features: string[];
  process: string;
  packaging: string;
  useCases: string[];
  oemAvailable: boolean;
  storeUrl: string;
  image: string;
  /** 규격·표시사항 — 비어 있으면 화면에 "문의 시 안내"로 표시된다 */
  ingredients: string;
  origin: string;
  shelfLife: string;
  storage: string;
  netWeight: string;
  boxQty: string;
  hsCode: string;
  specSheetUrl: string;
  featured: boolean;
  sort: number;
  status: Status;
};

export type QualityStep = {
  id: number;
  stepNo: number;
  name: string;
  nameEn: string;
  summary: string;
  detail: string;
  metric: string;
  status: Status;
};

export type News = {
  id: number;
  slug: string;
  title: string;
  category: "스토리" | "보도" | "공지" | "ESG";
  summary: string;
  body: string;
  coverImage: string;
  publishedAt: string;
  status: Status;
};

export type StoreLink = {
  id: number;
  name: string;
  description: string;
  url: string;
  kind: string;
  sort: number;
  status: Status;
};

export type Inquiry = {
  id: number;
  kind: "wholesale" | "oem" | "general";
  company: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  productSlug: string;
  status: "new" | "answered";
  createdAt: string;
};

export type Settings = Record<string, string>;
