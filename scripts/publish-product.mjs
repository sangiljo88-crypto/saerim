#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const CONTENT_PRODUCTS_DIR = path.join(process.cwd(), "content", "products");

const REQUIRED_KEYS = [
  "name",
  "category",
  "shortDescription",
  "longDescription",
  "origin",
  "processing",
  "usage",
  "packageInfo",
  "shippingInfo",
  "smartstoreUrl",
  "gmarketUrl",
  "image",
];

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const nowIso = new Date().toISOString();

const getArgValue = (flag) => {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
};

const inputPath = getArgValue("--input");
const statusArg = getArgValue("--status");

if (!inputPath) {
  console.error("Usage: node scripts/publish-product.mjs --input <json-file> [--status draft|published]");
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, "utf-8");
let payload;

try {
  payload = JSON.parse(raw);
} catch (error) {
  console.error(`Invalid JSON input: ${String(error)}`);
  process.exit(1);
}

for (const key of REQUIRED_KEYS) {
  if (!payload[key] || String(payload[key]).trim().length === 0) {
    console.error(`Missing required field: ${key}`);
    process.exit(1);
  }
}

if (!Array.isArray(payload.keySellingPoints) || payload.keySellingPoints.length === 0) {
  console.error("keySellingPoints must be a non-empty array");
  process.exit(1);
}

if (
  payload.contentVisuals &&
  (!Array.isArray(payload.contentVisuals) ||
    payload.contentVisuals.length < 2 ||
    payload.contentVisuals.length > 4)
) {
  console.error("contentVisuals must be an array with 2 to 4 items when provided");
  process.exit(1);
}

const slugCandidate = payload.slug ? String(payload.slug).trim() : slugify(String(payload.name));
if (!slugCandidate) {
  console.error("Could not derive slug. Provide payload.slug with ASCII slug value.");
  process.exit(1);
}

const product = {
  ...payload,
  id: payload.id || `prd-${slugCandidate}`,
  slug: slugCandidate,
  wholesaleAvailable: Boolean(payload.wholesaleAvailable),
  featured: Boolean(payload.featured),
  status: statusArg || payload.status || "published",
  createdAt: payload.createdAt || nowIso,
  updatedAt: nowIso,
};

if (!fs.existsSync(CONTENT_PRODUCTS_DIR)) {
  fs.mkdirSync(CONTENT_PRODUCTS_DIR, { recursive: true });
}

const outputPath = path.join(CONTENT_PRODUCTS_DIR, `${product.slug}.json`);
fs.writeFileSync(outputPath, `${JSON.stringify(product, null, 2)}\n`, "utf-8");

console.log(`Published product content: ${outputPath}`);
console.log(`Product URL slug: /products/${product.slug}`);
