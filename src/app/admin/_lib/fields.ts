import type { AdminTable } from "@/lib/db/repo";

/**
 * 관리자 폼 필드 정의 — 테이블별 편집 가능한 컬럼의 화이트리스트.
 * 여기 없는 컬럼은 관리자에서 수정할 수 없다.
 */

export type FieldType = "text" | "textarea" | "number" | "checkbox" | "list" | "select";

export type Field = {
  column: string;
  label: string;
  type: FieldType;
  options?: string[];
  help?: string;
  required?: boolean;
};

export type TableConfig = {
  table: AdminTable;
  title: string;
  /** 목록에 보여줄 컬럼 (엔티티 매핑 후 키) */
  listColumns: { key: string; label: string }[];
  fields: Field[];
};

const STATUS_FIELD: Field = {
  column: "status",
  label: "상태",
  type: "select",
  options: ["published", "draft"],
  help: "draft는 사이트에 노출되지 않습니다.",
};

export const TABLE_CONFIGS: Record<string, TableConfig> = {
  products: {
    table: "products",
    title: "제품",
    listColumns: [
      { key: "name", label: "제품명" },
      { key: "category", label: "카테고리" },
      { key: "brandSlug", label: "브랜드" },
      { key: "status", label: "상태" },
    ],
    fields: [
      { column: "name", label: "제품명", type: "text", required: true },
      { column: "slug", label: "슬러그(URL)", type: "text", required: true, help: "예: boiled-pork-head-slice" },
      { column: "category", label: "카테고리", type: "text", help: "예: 국탕류 / 뒷고기류" },
      { column: "brand_slug", label: "브랜드 슬러그", type: "text", help: "예: gukbap-exchange / yuksik-note" },
      { column: "factory_slug", label: "생산 공장 슬러그", type: "text", help: "예: gunsan / gimje / yongin" },
      { column: "summary", label: "요약 (한 줄)", type: "text" },
      { column: "story", label: "① 스토리", type: "textarea" },
      { column: "features", label: "② 대표 특징 (줄마다 1개)", type: "list" },
      { column: "process", label: "③ 생산 공정 (→ 로 구분)", type: "text" },
      { column: "packaging", label: "④ 포장 규격", type: "text" },
      { column: "use_cases", label: "⑤ 활용 사례 (줄마다 1개)", type: "list" },
      { column: "oem_available", label: "⑥ OEM 가능", type: "checkbox" },
      { column: "store_url", label: "⑦ 구매 링크", type: "text" },
      { column: "image", label: "대표 이미지 경로", type: "text", help: "/images/products/… (public 폴더 기준)" },
      { column: "featured", label: "홈 대표 노출", type: "checkbox" },
      { column: "sort", label: "정렬 순서", type: "number" },
      STATUS_FIELD,
    ],
  },
  brands: {
    table: "brands",
    title: "브랜드",
    listColumns: [
      { key: "name", label: "브랜드명" },
      { key: "role", label: "역할" },
      { key: "tagline", label: "태그라인" },
      { key: "status", label: "상태" },
    ],
    fields: [
      { column: "name", label: "브랜드명", type: "text", required: true },
      { column: "slug", label: "슬러그", type: "text", required: true },
      { column: "name_en", label: "영문명", type: "text" },
      { column: "tagline", label: "태그라인", type: "text" },
      { column: "description", label: "소개", type: "textarea" },
      { column: "role", label: "역할", type: "select", options: ["master", "sub"] },
      { column: "target", label: "고객", type: "text" },
      { column: "sort", label: "정렬 순서", type: "number" },
      STATUS_FIELD,
    ],
  },
  factories: {
    table: "factories",
    title: "공장",
    listColumns: [
      { key: "name", label: "공장명" },
      { key: "code", label: "코드" },
      { key: "role", label: "역할" },
      { key: "status", label: "상태" },
    ],
    fields: [
      { column: "name", label: "공장명", type: "text", required: true },
      { column: "slug", label: "슬러그", type: "text", required: true },
      { column: "code", label: "코드 (영문 대문자)", type: "text" },
      { column: "role", label: "역할 한 줄", type: "text" },
      { column: "symbol_sentence", label: "상징 문장", type: "text" },
      { column: "description", label: "소개", type: "textarea" },
      { column: "address", label: "주소", type: "text" },
      { column: "capabilities", label: "핵심 역량 (줄마다 1개)", type: "list" },
      { column: "certifications", label: "인증 (줄마다 1개)", type: "list" },
      { column: "image", label: "대표 이미지 경로", type: "text" },
      { column: "sort", label: "정렬 순서", type: "number" },
      STATUS_FIELD,
    ],
  },
  quality: {
    table: "quality_steps",
    title: "품질 단계",
    listColumns: [
      { key: "stepNo", label: "순서" },
      { key: "name", label: "단계명" },
      { key: "metric", label: "관리 기준" },
      { key: "status", label: "상태" },
    ],
    fields: [
      { column: "step_no", label: "순서 (1~8)", type: "number", required: true },
      { column: "name", label: "단계명", type: "text", required: true },
      { column: "name_en", label: "영문명", type: "text" },
      { column: "summary", label: "요약 (한 줄)", type: "text" },
      { column: "detail", label: "상세 설명", type: "textarea" },
      { column: "metric", label: "관리 기준 수치", type: "text" },
      STATUS_FIELD,
    ],
  },
  news: {
    table: "news",
    title: "뉴스 / 스토리",
    listColumns: [
      { key: "title", label: "제목" },
      { key: "category", label: "분류" },
      { key: "publishedAt", label: "게시일" },
      { key: "status", label: "상태" },
    ],
    fields: [
      { column: "title", label: "제목", type: "text", required: true },
      { column: "slug", label: "슬러그", type: "text", required: true },
      { column: "category", label: "분류", type: "select", options: ["스토리", "보도", "공지", "ESG"] },
      { column: "summary", label: "요약", type: "textarea" },
      { column: "body", label: "본문 (빈 줄로 문단 구분)", type: "textarea" },
      { column: "cover_image", label: "커버 이미지 경로", type: "text" },
      { column: "published_at", label: "게시일 (YYYY-MM-DD)", type: "text" },
      STATUS_FIELD,
    ],
  },
  "store-links": {
    table: "store_links",
    title: "스토어 링크",
    listColumns: [
      { key: "name", label: "이름" },
      { key: "kind", label: "종류" },
      { key: "url", label: "URL" },
      { key: "status", label: "상태" },
    ],
    fields: [
      { column: "name", label: "이름", type: "text", required: true },
      { column: "description", label: "설명", type: "text" },
      { column: "url", label: "URL", type: "text", required: true },
      { column: "kind", label: "종류", type: "select", options: ["smartstore", "kakao", "store"] },
      { column: "sort", label: "정렬 순서", type: "number" },
      STATUS_FIELD,
    ],
  },
};

/** 설정 페이지에서 편집하는 키 목록 */
export const SETTING_FIELDS: { key: string; label: string; type: "text" | "textarea" }[] = [
  { key: "hero_title_1", label: "Hero 첫 줄", type: "text" },
  { key: "hero_title_2", label: "Hero 둘째 줄 (강조)", type: "text" },
  { key: "hero_sub", label: "Hero 보조 문장", type: "text" },
  { key: "hero_media", label: "Hero 미디어 경로 (.jpg 또는 .mp4)", type: "text" },
  { key: "stat_founded", label: "통계 — 창립연도", type: "text" },
  { key: "stat_partners", label: "통계 — 거래 파트너", type: "text" },
  { key: "stat_items", label: "통계 — 취급 품목", type: "text" },
  { key: "stat_daily", label: "통계 — 일일 열처리", type: "text" },
  { key: "partners", label: "파트너사 목록 (쉼표로 구분)", type: "textarea" },
  { key: "contact_tel", label: "대표 전화", type: "text" },
  { key: "contact_fax", label: "팩스", type: "text" },
  { key: "contact_email", label: "이메일", type: "text" },
  { key: "contact_address", label: "주소", type: "text" },
  { key: "contact_kakao", label: "카카오 채널 URL", type: "text" },
];
