# Content Collections

This folder stores structured content that can be created by:
- an admin form workflow
- an AI generation workflow

Collections:
- `content/categories/*.json`
- `content/products/*.json`

Rules:
- one JSON file per entry
- file name should match slug (`{slug}.json`)
- product entries with `"status": "draft"` are excluded from page generation
- product entries with `"status": "published"` are included in dynamic routes
