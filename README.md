# 새림 브랜드 플랫폼

"대한민국 외식 산업을 준비하는 식품 인프라" — 유한회사 새림의 B2B 브랜드 플랫폼입니다.

브랜드 시스템(철학·아키텍처·디자인·데이터 구조)은 `docs/brand-system/` 4개 문서에 정의되어 있으며,
모든 페이지는 이 문서를 기준으로 만들어졌습니다.

## 구조

```
HOME → WHY → BRAND → BUSINESS → PRODUCT → FACTORY → QUALITY → OEM → NEWS → STORE → CONTACT
```

## 다국어 (한국어 / 중국어 간체)

- 한국어: 접두사 없는 기존 URL 그대로 (`https://www.saerim.kr/why`)
- 중국어: `/zh` 접두사 (`https://www.saerim.kr/zh/why`) — 중국 비즈니스 QR 배포용
- 우측 상단 `한국어 | 中文` 토글은 **보고 있던 페이지를 유지한 채** 언어만 전환합니다.
- 문구가 있는 위치
  - 화면 고정 문구: `src/lib/i18n/ko.ts` / `src/lib/i18n/zh.ts` (두 파일의 구조가 동일해야 하며, ko가 타입 원본)
  - CMS(DB) 콘텐츠의 중국어 대역: `src/lib/i18n/content-zh.ts` (제품/공장/브랜드/품질단계/뉴스 slug 기준)
  - 페이지는 DB를 직접 읽지 않고 `src/lib/content.ts`(로케일 반영 계층)를 통해 읽습니다.
- 관리자에서 한국어 콘텐츠를 수정해도 중국어 대역표는 자동으로 바뀌지 않습니다. 제품·뉴스를 추가하면
  `content-zh.ts`에 같은 slug로 번역을 추가하세요(없으면 해당 항목만 한국어로 노출됩니다).
- QR 코드: `public/qr/saerim-zh.png` · `public/qr/saerim-zh.svg` → `https://www.saerim.kr/zh`

- 공개 페이지는 SQLite DB를 읽어 렌더링됩니다 (콘텐츠 수정에 코드 변경 불필요)
- 관리자(/admin)에서 제품·브랜드·공장·품질단계·뉴스·스토어 링크·문의·사이트 설정을 관리합니다
- 문의 폼은 실제로 접수되어 관리자 문의함에 저장됩니다

## 기술 스택

- Next.js (App Router) + TypeScript + Tailwind CSS
- DB: SQLite (Node 내장 `node:sqlite` — 추가 의존성 없음), 파일 위치 `data/saerim.db`
- 관리자 인증: Basic Auth (middleware)

## 실행

**요구사항: Node.js 22.5 이상** (`node -v`로 확인)

```bash
npm install
npm run dev        # http://localhost:3000
```

- 관리자: http://localhost:3000/admin (계정은 `.env`의 ADMIN_USER / ADMIN_PASSWORD)
- 최초 실행 시 `data/saerim.db`가 자동 생성되고 시드 데이터가 주입됩니다
- DB를 초기화하려면 `data/` 폴더를 삭제하고 다시 실행하세요

## 배포 (Railway)

1. 환경변수 설정: `ADMIN_USER`, `ADMIN_PASSWORD`, `DATA_DIR=/data`
2. **볼륨을 `/data`에 마운트** — 없으면 재배포 때마다 CMS 데이터가 초기화됩니다
3. Node 버전 22.5+ 확인 (필요 시 `NIXPACKS_NODE_VERSION=22` 지정)

## 네이버 검색 등록

대표 주소는 `https://www.saerim.kr`입니다. 소유확인 환경변수, 사이트맵 제출 및 검증 방법은
[네이버 검색 설정 안내](docs/naver-search-setup.md)를 참고하세요.

## 콘텐츠 수정 방법

| 하고 싶은 일 | 위치 |
|---|---|
| Hero 문구·통계·연락처 변경 | /admin/settings |
| 제품 추가·수정 | /admin/products |
| 공장·브랜드·뉴스 관리 | /admin/factories, /admin/brands, /admin/news |
| Hero를 영상으로 교체 | 영상을 `public/videos/`에 넣고 /admin/settings의 Hero 미디어에 `/videos/파일명.mp4` 입력 |
| 디자인 토큰 변경 | `tailwind.config.ts` + `docs/brand-system/03-design-system.md` |
