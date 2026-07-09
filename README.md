# 새림 브랜드 플랫폼

"대한민국 외식 산업을 준비하는 식품 인프라" — 유한회사 새림의 B2B 브랜드 플랫폼입니다.

브랜드 시스템(철학·아키텍처·디자인·데이터 구조)은 `docs/brand-system/` 4개 문서에 정의되어 있으며,
모든 페이지는 이 문서를 기준으로 만들어졌습니다.

## 구조

```
HOME → WHY → BRAND → BUSINESS → PRODUCT → FACTORY → QUALITY → OEM → NEWS → STORE → CONTACT
```

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

## 콘텐츠 수정 방법

| 하고 싶은 일 | 위치 |
|---|---|
| Hero 문구·통계·연락처 변경 | /admin/settings |
| 제품 추가·수정 | /admin/products |
| 공장·브랜드·뉴스 관리 | /admin/factories, /admin/brands, /admin/news |
| Hero를 영상으로 교체 | 영상을 `public/videos/`에 넣고 /admin/settings의 Hero 미디어에 `/videos/파일명.mp4` 입력 |
| 디자인 토큰 변경 | `tailwind.config.ts` + `docs/brand-system/03-design-system.md` |
