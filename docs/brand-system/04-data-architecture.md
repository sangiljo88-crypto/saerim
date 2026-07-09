# 새림 CMS / 데이터 아키텍처

> "새 브랜드·새 공장·새 제품은 데이터 추가로 끝난다."
> 페이지는 DB를 읽어 자동 생성되고, 관리자는 /admin에서 모든 콘텐츠를 관리한다.

## 1. 저장 구조

- 저장소: **SQLite** 단일 파일 (`data/saerim.db`)
- 접근: `src/lib/db/` 저장소(repository) 계층을 통해서만 접근한다.
  페이지·API가 SQL을 직접 만지지 않는다 → 추후 Postgres 전환 시 이 계층만 교체.
- 초기 데이터: `src/lib/db/seed.ts` 가 기존 콘텐츠를 시드한다 (DB 파일이 없을 때 1회).
- 배포(Railway): `/data` 볼륨을 마운트해 DB 파일을 영속화한다.

## 2. 엔티티

```
brands        브랜드 (새림·전국국밥거래소·육식노트·확장)
factories     공장 (군산·김제·용인·확장)
products      제품 (스토리 구조 필드 포함)
quality_steps 품질 8단계 (입고→검수→가공→금속검출→미생물→포장→콜드체인→출고)
news          뉴스/스토리
store_links   외부 스토어 링크 (스마트스토어·카카오 등)
inquiries     문의 접수 (CONTACT/OEM 폼)
settings      사이트 설정 (Hero 문구, 대표 통계, 연락처)
```

## 3. 스키마 요약

### products — 제품은 항상 이 스토리 순서로 노출된다

| 필드 | 의미 | 노출 순서 |
|------|------|----------|
| `story` | 제품 스토리 (왜 만들었나) | 1 |
| `features` | 대표 특징 (JSON 배열) | 2 |
| `process` | 생산 공정 | 3 |
| `packaging` | 포장 규격 | 4 |
| `use_cases` | 활용 사례 (JSON 배열) | 5 |
| `oem_available` | OEM 가능 여부 | 6 |
| `store_url` / 문의 CTA | 구매 또는 문의 | 7 |

공통: `id, slug, name, brand_id(FK), factory_id(FK), category, summary, image, featured, sort, status, created_at, updated_at`

### brands

`id, slug, name, name_en, tagline, description, role(마스터/서브), target, color, logo_image, site_url, sort, status`

### factories

`id, slug, name, code(GUNSAN…), role, symbol_sentence(상징 문장), description, address, capabilities(JSON), certifications(JSON), image, sort, status`

### quality_steps

`id, step_no(1~8), name, name_en, summary, detail, metric(관리 기준 수치), icon, status`

### news

`id, slug, title, category(스토리/보도/공지/ESG), summary, body, cover_image, published_at, status`

### store_links

`id, name, description, url, kind(smartstore/kakao/etc), icon, sort, status`

### inquiries

`id, kind(wholesale/oem/general), company, name, phone, email, message, product_slug, status(new/answered), created_at`

### settings (key-value)

`hero_title, hero_sub, hero_media, stat_founded, stat_revenue, stat_products, contact_*, …`

## 4. 규칙

1. 모든 목록 조회는 `status='published'` + `sort` 순. 관리자만 draft를 본다.
2. 삭제는 소프트 삭제(`status='archived'`). 실수 복구 가능.
3. JSON 필드(배열)는 저장소 계층에서 파싱해 타입으로 반환한다.
4. 이미지 경로는 `/images/…` 상대 경로만 저장 (도메인 독립).

## 5. 관리자 (/admin)

- Basic 인증 (`ADMIN_USER`/`ADMIN_PASSWORD` 환경변수) — middleware에서 차단
- 메뉴: 대시보드 · 제품 · 브랜드 · 공장 · 품질단계 · 뉴스 · 스토어 링크 · 문의함 · 설정
- 모든 편집은 즉시 반영 (ISR 없음, 동적 렌더)
