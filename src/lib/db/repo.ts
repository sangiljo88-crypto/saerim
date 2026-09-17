import { getDb } from "./client";
import type {
  Brand,
  Factory,
  Inquiry,
  News,
  Product,
  QualityStep,
  Settings,
  StoreLink,
} from "./types";

/**
 * 저장소(repository) 계층 — 페이지·API는 이 모듈을 통해서만 DB에 접근한다.
 * SQL과 행(row) → 타입 매핑을 여기서 끝낸다. (docs/brand-system/04)
 */

type Row = Record<string, unknown>;

const str = (v: unknown) => String(v ?? "");
const num = (v: unknown) => Number(v ?? 0);
const arr = (v: unknown): string[] => {
  try {
    const parsed = JSON.parse(String(v ?? "[]"));
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};

/* ---------- 매퍼 ---------- */

const toBrand = (r: Row): Brand => ({
  id: num(r.id), slug: str(r.slug), name: str(r.name), nameEn: str(r.name_en),
  tagline: str(r.tagline), description: str(r.description),
  role: str(r.role) as Brand["role"], target: str(r.target),
  sort: num(r.sort), status: str(r.status) as Brand["status"],
});

const toFactory = (r: Row): Factory => ({
  id: num(r.id), slug: str(r.slug), name: str(r.name), code: str(r.code),
  role: str(r.role), symbolSentence: str(r.symbol_sentence), description: str(r.description),
  address: str(r.address), capabilities: arr(r.capabilities), certifications: arr(r.certifications),
  image: str(r.image), sort: num(r.sort), status: str(r.status) as Factory["status"],
});

const toProduct = (r: Row): Product => ({
  id: num(r.id), slug: str(r.slug), name: str(r.name),
  brandSlug: str(r.brand_slug), factorySlug: str(r.factory_slug), category: str(r.category),
  summary: str(r.summary), story: str(r.story), features: arr(r.features),
  process: str(r.process), packaging: str(r.packaging), useCases: arr(r.use_cases),
  oemAvailable: num(r.oem_available) === 1, storeUrl: str(r.store_url), image: str(r.image),
  ingredients: str(r.ingredients), origin: str(r.origin), shelfLife: str(r.shelf_life),
  storage: str(r.storage), netWeight: str(r.net_weight), boxQty: str(r.box_qty),
  hsCode: str(r.hs_code), specSheetUrl: str(r.spec_sheet_url),
  featured: num(r.featured) === 1, sort: num(r.sort), status: str(r.status) as Product["status"],
});

const toQualityStep = (r: Row): QualityStep => ({
  id: num(r.id), stepNo: num(r.step_no), name: str(r.name), nameEn: str(r.name_en),
  summary: str(r.summary), detail: str(r.detail), metric: str(r.metric),
  status: str(r.status) as QualityStep["status"],
});

const toNews = (r: Row): News => ({
  id: num(r.id), slug: str(r.slug), title: str(r.title),
  category: str(r.category) as News["category"], summary: str(r.summary), body: str(r.body),
  coverImage: str(r.cover_image), publishedAt: str(r.published_at),
  status: str(r.status) as News["status"],
});

const toStoreLink = (r: Row): StoreLink => ({
  id: num(r.id), name: str(r.name), description: str(r.description), url: str(r.url),
  kind: str(r.kind), sort: num(r.sort), status: str(r.status) as StoreLink["status"],
});

const toInquiry = (r: Row): Inquiry => ({
  id: num(r.id), kind: str(r.kind) as Inquiry["kind"], company: str(r.company),
  name: str(r.name), phone: str(r.phone), email: str(r.email), message: str(r.message),
  productSlug: str(r.product_slug), status: str(r.status) as Inquiry["status"],
  createdAt: str(r.created_at),
});

/* ---------- 공개 조회 (published만) ---------- */

export function listBrands(): Brand[] {
  return (getDb().prepare("SELECT * FROM brands WHERE status='published' ORDER BY sort").all() as Row[]).map(toBrand);
}

export function listFactories(): Factory[] {
  return (getDb().prepare("SELECT * FROM factories WHERE status='published' ORDER BY sort").all() as Row[]).map(toFactory);
}

export function getFactory(slug: string): Factory | null {
  const r = getDb().prepare("SELECT * FROM factories WHERE slug=? AND status='published'").get(slug) as Row | undefined;
  return r ? toFactory(r) : null;
}

export function listProducts(category?: string): Product[] {
  const db = getDb();
  const rows = category
    ? db.prepare("SELECT * FROM products WHERE status='published' AND category=? ORDER BY sort").all(category)
    : db.prepare("SELECT * FROM products WHERE status='published' ORDER BY sort").all();
  return (rows as Row[]).map(toProduct);
}

export function listFeaturedProducts(): Product[] {
  return (getDb().prepare("SELECT * FROM products WHERE status='published' AND featured=1 ORDER BY sort").all() as Row[]).map(toProduct);
}

export function getProduct(slug: string): Product | null {
  const r = getDb().prepare("SELECT * FROM products WHERE slug=? AND status='published'").get(slug) as Row | undefined;
  return r ? toProduct(r) : null;
}

export function listProductCategories(): string[] {
  const rows = getDb().prepare("SELECT DISTINCT category FROM products WHERE status='published' ORDER BY category").all() as Row[];
  return rows.map((r) => str(r.category)).filter(Boolean);
}

export function listQualitySteps(): QualityStep[] {
  return (getDb().prepare("SELECT * FROM quality_steps WHERE status='published' ORDER BY step_no").all() as Row[]).map(toQualityStep);
}

export function listNews(): News[] {
  return (getDb().prepare("SELECT * FROM news WHERE status='published' ORDER BY published_at DESC").all() as Row[]).map(toNews);
}

export function getNews(slug: string): News | null {
  const r = getDb().prepare("SELECT * FROM news WHERE slug=? AND status='published'").get(slug) as Row | undefined;
  return r ? toNews(r) : null;
}

export function listStoreLinks(): StoreLink[] {
  return (getDb().prepare("SELECT * FROM store_links WHERE status='published' ORDER BY sort").all() as Row[]).map(toStoreLink);
}

export function getSettings(): Settings {
  const rows = getDb().prepare("SELECT key, value FROM settings").all() as Row[];
  return Object.fromEntries(rows.map((r) => [str(r.key), str(r.value)]));
}

/* ---------- 문의 ---------- */

export function createInquiry(input: {
  kind: Inquiry["kind"];
  company: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  productSlug?: string;
}): number {
  const result = getDb()
    .prepare(
      "INSERT INTO inquiries (kind,company,name,phone,email,message,product_slug) VALUES (?,?,?,?,?,?,?)",
    )
    .run(input.kind, input.company, input.name, input.phone, input.email ?? "", input.message ?? "", input.productSlug ?? "");
  return Number(result.lastInsertRowid);
}

/* ---------- 관리자 (draft 포함 전체) ---------- */

const ADMIN_TABLES = {
  brands: { mapper: toBrand, order: "sort" },
  factories: { mapper: toFactory, order: "sort" },
  products: { mapper: toProduct, order: "sort" },
  quality_steps: { mapper: toQualityStep, order: "step_no" },
  news: { mapper: toNews, order: "published_at DESC" },
  store_links: { mapper: toStoreLink, order: "sort" },
} as const;

export type AdminTable = keyof typeof ADMIN_TABLES;

export function adminList<T extends AdminTable>(table: T) {
  const { mapper, order } = ADMIN_TABLES[table];
  const rows = getDb().prepare(`SELECT * FROM ${table} WHERE status != 'archived' ORDER BY ${order}`).all() as Row[];
  return rows.map(mapper as (r: Row) => ReturnType<(typeof ADMIN_TABLES)[T]["mapper"]>);
}

export function adminGetRaw(table: AdminTable, id: number): Row | null {
  return (getDb().prepare(`SELECT * FROM ${table} WHERE id=?`).get(id) as Row | undefined) ?? null;
}

/** 화이트리스트 컬럼만 갱신/삽입한다. */
export function adminUpsert(table: AdminTable, id: number | null, values: Record<string, string | number>): number {
  const db = getDb();
  const cols = Object.keys(values);
  if (cols.length === 0) return id ?? 0;

  if (id) {
    const set = cols.map((c) => `${c}=?`).join(", ");
    db.prepare(`UPDATE ${table} SET ${set} WHERE id=?`).run(...cols.map((c) => values[c]), id);
    return id;
  }
  const placeholders = cols.map(() => "?").join(",");
  const result = db.prepare(`INSERT INTO ${table} (${cols.join(",")}) VALUES (${placeholders})`).run(...cols.map((c) => values[c]));
  return Number(result.lastInsertRowid);
}

export function adminArchive(table: AdminTable, id: number) {
  getDb().prepare(`UPDATE ${table} SET status='archived' WHERE id=?`).run(id);
}

export function adminListInquiries(): Inquiry[] {
  return (getDb().prepare("SELECT * FROM inquiries ORDER BY created_at DESC").all() as Row[]).map(toInquiry);
}

export function adminMarkInquiry(id: number, status: Inquiry["status"]) {
  getDb().prepare("UPDATE inquiries SET status=? WHERE id=?").run(status, id);
}

export function adminCountInquiries(): { total: number; unread: number } {
  const total = (getDb().prepare("SELECT COUNT(*) AS c FROM inquiries").get() as { c: number }).c;
  const unread = (getDb().prepare("SELECT COUNT(*) AS c FROM inquiries WHERE status='new'").get() as { c: number }).c;
  return { total, unread };
}

export function adminSaveSettings(entries: Record<string, string>) {
  const db = getDb();
  const stmt = db.prepare("INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value");
  for (const [key, value] of Object.entries(entries)) {
    stmt.run(key, value);
  }
}
