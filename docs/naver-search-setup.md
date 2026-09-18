# 새림 네이버 검색 설정

## 대표 주소

- 등록할 사이트: `https://www.saerim.kr`
- 제출할 사이트맵: `https://www.saerim.kr/sitemap.xml`
- 검색 수집 허용: `https://www.saerim.kr/robots.txt`
- 2026-09-19 점검 시 `saerim.kr`(www 없음)은 A 레코드가 없고, `www.saerim.kr`만 Railway에 연결되어 있었다. 가비아 DNS에서 루트 도메인 연결을 별도 설정하고 HTTPS를 확인한 뒤 www 주소로 영구 이동시켜야 한다. 메일용 MX/TXT 레코드는 유지한다.

## 서치어드바이저에서 할 일

1. 회사가 관리할 네이버 계정으로 [서치어드바이저](https://searchadvisor.naver.com/console/board)에 로그인한다.
2. `https://www.saerim.kr`을 등록한다. 이미 있으면 해당 사이트를 연다.
3. HTML 태그 방식의 `naver-site-verification`에서 `content` 값만 복사한다.
4. Railway의 **새림 홈페이지 → saerim → production** 환경변수 `NAVER_SITE_VERIFICATION`에 설정하고 재배포한다. 전체 HTML 태그를 환경변수에 넣지 않는다.
5. 운영 홈페이지 원본의 `<head>`에 해당 태그가 출력되는지 확인하고 네이버에서 소유확인을 마친다. 로그인·보안문자 등 계정 확인은 사용자가 직접 진행한다.
6. 요청 → 사이트맵 제출에 위 사이트맵을 제출한다.
7. 요청 → 웹페이지 수집에서 홈, `/products`, `/business`, `/oem`, `/contact`와 주요 제품 상세 주소를 요청한다. 실제 화면에서 요구하는 전체 URL/상대 경로 형식에 맞춘다.
8. 검증 → URL 검사에서 수집·색인 상태를 확인한다. 이후 `site:www.saerim.kr`, `새림`, `유한회사 새림` 검색과 성과 리포트로 확인한다.

인증 태그가 없다는 사실만으로 미등록을 단정할 수는 없다. HTML 파일 인증 또는 과거 등록 여부는 소유 계정에서 확인해야 한다. 등록·수집 요청은 검색 노출 및 1위를 보장하지 않는다.

## 적용한 홈페이지 설정

- 홈: 새림과 돼지 부산물·머릿고기·육가공 OEM을 설명하는 제목 및 설명.
- 제품: 머릿고기·돼지 내장·뒷고기와 실제 품목별 이름·설명.
- OEM: 육가공 OEM·PB 위탁생산 안내.
- 각 페이지의 title/description과 Open Graph 제목·설명을 일치시키고 대표 이미지·주소를 제공.
- 한국어 회사명과 `새림`의 별칭을 Organization/WebSite 구조화 데이터로 제공.
- `/ko` 및 `/ko/...`는 접두사 없는 한국어 주소로 308 이동. 영어·중국어의 대표 주소 및 hreflang 유지.
- 기존 robots.txt 및 3개 언어 사이트맵 유지. 허위 변경 날짜·리뷰·순위 정보는 추가하지 않음.

## 검증

```sh
npm run build
npm run lint
node scripts/check-seo.mjs https://www.saerim.kr
```

스크립트는 Yeti 사용자 에이전트로 서버 HTML의 제목·설명·대표 주소, 구조화 데이터, 사이트맵, 리다이렉트, 없는 제품의 404를 검사한다. 네이버 내부 색인 상태까지 검사하는 도구는 아니다.

## 공식 참고

- [네이버 검색엔진 최적화](https://searchadvisor.naver.com/guide/seo-basic-intro)
- [제목·설명 작성 기준](https://searchadvisor.naver.com/guide/markup-content)
- [URL 검사](https://searchadvisor.naver.com/guide/url-inspection)
