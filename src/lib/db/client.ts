import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

import { SEED_SETTINGS, seedIfEmpty } from "./seed";

/**
 * SQLite 클라이언트 (Node 내장 node:sqlite — 추가 의존성 없음).
 * - DB 파일: DATA_DIR/saerim.db (기본 ./data)
 * - 최초 실행 시 스키마 생성 + 시드 데이터 주입
 * - Node 22.x에서는 NODE_OPTIONS=--experimental-sqlite 필요 (package.json scripts에 포함)
 */

const SCHEMA = `
CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'sub',
  target TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published'
);

CREATE TABLE IF NOT EXISTS factories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  code TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  symbol_sentence TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  capabilities TEXT NOT NULL DEFAULT '[]',
  certifications TEXT NOT NULL DEFAULT '[]',
  image TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published'
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  brand_slug TEXT NOT NULL DEFAULT '',
  factory_slug TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  story TEXT NOT NULL DEFAULT '',
  features TEXT NOT NULL DEFAULT '[]',
  process TEXT NOT NULL DEFAULT '',
  packaging TEXT NOT NULL DEFAULT '',
  use_cases TEXT NOT NULL DEFAULT '[]',
  oem_available INTEGER NOT NULL DEFAULT 1,
  store_url TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  ingredients TEXT NOT NULL DEFAULT '',
  origin TEXT NOT NULL DEFAULT '',
  shelf_life TEXT NOT NULL DEFAULT '',
  storage TEXT NOT NULL DEFAULT '',
  net_weight TEXT NOT NULL DEFAULT '',
  box_qty TEXT NOT NULL DEFAULT '',
  hs_code TEXT NOT NULL DEFAULT '',
  spec_sheet_url TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  sort INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published'
);

CREATE TABLE IF NOT EXISTS quality_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  step_no INTEGER NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  metric TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'published'
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '스토리',
  summary TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  published_at TEXT NOT NULL DEFAULT (date('now')),
  status TEXT NOT NULL DEFAULT 'published'
);

CREATE TABLE IF NOT EXISTS store_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'store',
  sort INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published'
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL DEFAULT 'general',
  company TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  product_slug TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);
`;

const PRODUCT_SPEC_COLUMNS = [
  "ingredients", "origin", "shelf_life", "storage", "net_weight", "box_qty", "hs_code", "spec_sheet_url",
];

/**
 * 이미 생성된 DB(운영 볼륨 포함)에 적용할 일회성 보정.
 * 시드는 최초 1회만 돌기 때문에, 기존 값 교체는 여기서 처리한다.
 */
function migrate(db: DatabaseSync) {
  // 대표 메일 주소 변경: 네이버 → 회사 도메인
  db.prepare("UPDATE settings SET value=? WHERE key='contact_email' AND value=?").run(
    "info@saerim.kr",
    "serim6408@naver.com",
  );

  // ISO 9001·14001은 미보유(취득 절차 진행 중) — 보유 인증처럼 저장된 기존 값을 "준비 중"으로 바로잡는다
  db.prepare(
    "UPDATE factories SET certifications = replace(certifications, ?, ?) WHERE slug='gunsan'",
  ).run('"ISO 9001 · 14001"', '"ISO 9001 · 14001 (준비 중)"');

  // 제품 스펙 컬럼 (없을 때만 추가)
  const productColumns = new Set(
    (db.prepare("PRAGMA table_info(products)").all() as { name: string }[]).map((c) => c.name),
  );
  for (const column of PRODUCT_SPEC_COLUMNS) {
    if (!productColumns.has(column)) {
      db.exec(`ALTER TABLE products ADD COLUMN ${column} TEXT NOT NULL DEFAULT ''`);
    }
  }

  // 신규 설정 키 (이미 있으면 관리자가 고친 값을 유지)
  const insertSetting = db.prepare("INSERT OR IGNORE INTO settings (key,value) VALUES (?,?)");
  for (const key of ["hero_descriptor", "hero_alt"]) {
    insertSetting.run(key, SEED_SETTINGS[key] ?? "");
  }
}

declare global {
  // Next.js dev 핫리로드 시 커넥션 중복 생성을 막는다.
  var __saerimDb: DatabaseSync | undefined;
}

export function getDb(): DatabaseSync {
  if (globalThis.__saerimDb) return globalThis.__saerimDb;

  const dataDir = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
  mkdirSync(dataDir, { recursive: true });

  const db = new DatabaseSync(path.join(dataDir, "saerim.db"));
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec(SCHEMA);
  seedIfEmpty(db);
  migrate(db);

  globalThis.__saerimDb = db;
  return db;
}
