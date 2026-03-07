import fs from "node:fs";
import path from "node:path";

import type { ZodSchema } from "zod";

import {
  type CategoryContent,
  categoryContentSchema,
  type ProductContent,
  productContentSchema,
} from "@/lib/content/schema";

const CONTENT_ROOT = path.join(process.cwd(), "content");

type CollectionName = "categories" | "products";

const readJsonCollection = <T>(collection: CollectionName, schema: ZodSchema<T>): T[] => {
  const dirPath = path.join(CONTENT_ROOT, collection);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b));

  return files.map((fileName) => {
    const filePath = path.join(dirPath, fileName);
    const raw = fs.readFileSync(filePath, "utf-8");

    try {
      const parsed = JSON.parse(raw) as unknown;
      return schema.parse(parsed);
    } catch (error) {
      throw new Error(`Invalid ${collection} content file: ${filePath}\n${String(error)}`);
    }
  });
};

export const loadFileCategories = (): CategoryContent[] =>
  readJsonCollection("categories", categoryContentSchema);

export const loadFileProducts = (): ProductContent[] =>
  readJsonCollection("products", productContentSchema);

export const getContentRootPath = () => CONTENT_ROOT;
