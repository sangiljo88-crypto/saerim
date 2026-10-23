# 브랜드 아이덴티티 1.0 적용 — QA 기록 (2026-10-24)

> 이후 승인된 전경 Hero·브랜드 설명·김제/용인 영상의 최종 화면은 [공장 영상 QA](../factory-videos-2026/README.md)를 참고한다. 아래 홈 심벌·하단 전경 캡처는 이전 배치 기록이다.

로컬 프로덕션 빌드(`next build` + `next start -p 3100`) 기준. 브라우저 캡처는 0.5~0.6 배율.

## 자동 검사
- `npx tsc --noEmit` 통과 · `npm run lint` 통과 · `npm run build` 성공
- `node scripts/check-seo.mjs http://localhost:3100` — 9개 경로 PASS, sitemap 96 URL, robots, /ko 308, 404

## 수동 검사
| 항목 | 390px | 1024px | 1280px | 1440px |
|---|---|---|---|---|
| 가로 넘침(scrollWidth > innerWidth) | 없음 | 없음 | 없음 | 없음 |
| 헤더 로고↔메뉴 겹침 | 햄버거 | 햄버거 | ko 30px · en 40px 여유 | 여유 |
| 모바일 메뉴 높이 / 마지막 CONTACT 가시 | 780px / 보임 | 736px / 보임 | — | — |
| 메뉴 열기→body overflow hidden, 닫기·링크 이동 후 복원 | 확인 | 확인 | — | — |
| H1 1개 · "새림 공식 홈페이지" H2 · 영어 검색형 H1 | 유지 | 유지 | 유지 | 유지 |
| 언어 전환(ko→en→zh→ko, /contact 유지): html lang · 헤더 홈 링크 · 활성 언어 · 푸터 메뉴/태그라인 모두 전환 | 확인 (LocaleSwitcher를 전체 문서 이동 <a>로) |
| 고운바탕 적용: ko Hero H1·WHY 인용/캠페인·시그니처 / zh·en은 Pretendard | 확인 (`document.fonts`, computed font-family) |

## 캡처
01 홈 Hero(ko 1440) · 02 신뢰 영역+공장 사진 · 03 푸터(역상 락업 256px) · 04 홈 en 1280 · 05 홈 zh · 06 WHY 캠페인 문구 · 07 OEM(보조 그래픽) · 08 QUALITY · 09 제품 상세 en · 10 홈 1024 · 11 홈 390 · 12 모바일 메뉴 390 · 13 푸터 390
