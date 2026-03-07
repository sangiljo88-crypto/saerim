# Product Publishing Architecture

## Goal

Enable future admin forms or AI workflows to create products from structured data and publish landing pages automatically.

## Current Architecture (Implemented)

1. Seed layer:
   - `src/data/products.ts`
   - `src/data/categories.ts`

2. Content collection layer:
   - `content/products/*.json`
   - `content/categories/*.json`

3. Validation + loading:
   - `src/lib/content/schema.ts` (Zod schema)
   - `src/lib/content/file-store.ts` (JSON file loader)

4. Catalog service merge:
   - `src/lib/catalog.ts`
   - Merges seed data + content collection
   - `status: "draft"` is excluded
   - `status: "published"` is routable

5. Route generation:
   - `src/app/products/[slug]/page.tsx` → `generateStaticParams()` uses `getAllProducts()`
   - `src/app/categories/[slug]/page.tsx` → `generateStaticParams()` uses `getAllCategories()`

## Publish Flow (Admin/AI Ready)

- Admin form or AI tool produces structured JSON payload
- Payload is written to `content/products/{slug}.json`
- Status set to `published`
- Next build runs
- Product route `/products/{slug}` is generated automatically

## CLI Bridge (Implemented)

Use this command as a bridge until a real admin UI/API is added:

```bash
npm run publish:product -- --input /absolute/path/to/product.json
```

Optional status override:

```bash
npm run publish:product -- --input /absolute/path/to/product.json --status draft
```

## JSON Contract

Use `content/templates/product.template.json` as the schema template.

Minimum required fields include:
- `name`, `category`, `shortDescription`, `longDescription`
- `keySellingPoints`, `origin`, `processing`, `usage`
- `packageInfo`, `shippingInfo`
- `smartstoreUrl`, `gmarketUrl`, `image`

Optional publishing metadata:
- `status` (`draft` | `published`)
- `heroVisual`, `contentVisuals`

## Future Extension Points

1. Replace CLI with `POST /api/admin/products` endpoint.
2. Add auth and role policy before write operations.
3. Store content in DB/headless CMS instead of local files.
4. Trigger CI build/redeploy automatically after publish.
5. Add webhook to regenerate sitemap and feed channels.
