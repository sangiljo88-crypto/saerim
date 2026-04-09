# Premium Dried Seafood Brand Site (Next.js)

전통 쇼핑몰형이 아닌, 카테고리와 스토리 중심의 프리미엄 멀티페이지 랜딩 사이트 샘플입니다.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Catalog service + content collections
  - Seed data: `src/data/categories.ts`, `src/data/products.ts`
  - Publishable content: `content/categories/*.json`, `content/products/*.json`

## Pages

- Home: `/`
- Categories: `/categories`
- Category detail (dynamic): `/categories/[slug]`
- Product detail (dynamic): `/products/[slug]`
- Brand story: `/brand`
- Wholesale inquiry: `/wholesale`
- Contact / location: `/contact`

## Run Locally

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## Add a New Category

1. 빠른 수정은 `src/data/categories.ts`에 추가
2. 발행형 워크플로는 `content/categories/{slug}.json` 추가
3. 필수 필드:
   - `id`, `slug`, `name`, `englishName`
   - `shortDescription`, `intro`, `whyItMatters`, `heroTagline`
   - `highlights`(배열), `tone`
4. 선택 필드:
   - `heroVisual`, `contentVisuals`(2~4개 권장)
   - `status` (`draft` | `published`)
5. 저장 후 `/categories/[slug]` 페이지가 자동 생성됩니다.

## Add a New Product

1. 빠른 수정은 `src/data/products.ts`에 추가
2. 발행형 워크플로는 `content/products/{slug}.json` 추가
3. `category` 값은 기존 카테고리 `slug`와 동일해야 합니다.
4. 필수 필드:
   - `name`, `category`
   - `shortDescription`, `longDescription`, `keySellingPoints`
   - `origin`, `processing`, `usage`
   - `packageInfo`, `shippingInfo`
   - `smartstoreUrl`, `gmarketUrl`, `image`
5. 권장 필드:
   - `id`, `slug`, `wholesaleAvailable`, `featured`
   - `heroVisual`, `contentVisuals`(2~4개 권장)
   - `status` (`draft` | `published`)
6. 저장 후 `/products/[slug]` 상세 페이지와 관련 섹션에 자동 반영됩니다.

## Admin / AI Publishing Bridge

현재는 CLI 브리지로 구조화 데이터 발행을 지원합니다.

```bash
npm run publish:product -- --input /absolute/path/to/product.json
```

`draft` 저장:

```bash
npm run publish:product -- --input /absolute/path/to/product.json --status draft
```

템플릿:
- `content/templates/product.template.json`

아키텍처 문서:
- `docs/product-publishing-architecture.md`

## AI Image Swap Guide

1. 상품/카테고리에 `heroVisual.src`와 `contentVisuals[].src`를 채우면 실제 이미지로 자동 전환됩니다.
2. `src`가 비어 있으면 프리미엄 플레이스홀더가 유지됩니다.
3. 이미지 비율은 공통 컴포넌트 `src/components/ui/ImageSection.tsx`에서 고정 관리됩니다.
# saerim
