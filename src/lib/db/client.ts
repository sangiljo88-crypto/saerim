import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

import { seedIfEmpty } from "./seed";

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

  globalThis.__saerimDb = db;
  return db;
}
