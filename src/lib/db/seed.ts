import type { DatabaseSync } from "node:sqlite";

/**
 * 최초 실행 시 1회 주입되는 시드 데이터.
 * 이후의 모든 콘텐츠 관리는 /admin 에서 한다.
 */

const BRANDS = [
  {
    slug: "saerim",
    name: "새림",
    nameEn: "SAERIM",
    tagline: "대한민국 외식 산업을 준비하는 식품 인프라",
    description:
      "생산·품질·OEM을 책임지는 마스터 브랜드입니다. 군산·김제·용인 세 공장의 생산 역량 위에서 모든 서브 브랜드가 움직입니다.",
    role: "master",
    target: "B2B 바이어 · 파트너사",
    sort: 1,
  },
  {
    slug: "gukbap-exchange",
    name: "전국국밥거래소",
    nameEn: "GUKBAP EXCHANGE",
    tagline: "사장님의 새벽 장보기를 끝냅니다",
    description:
      "돈두·내장·탕육 등 국탕류 핵심 원료를 국밥·순댓국 매장에 직송하는 새림의 B2B 채널 브랜드입니다.",
    role: "sub",
    target: "국밥 · 순댓국 매장",
    sort: 2,
  },
  {
    slug: "yuksik-note",
    name: "육식노트",
    nameEn: "YUKSIK NOTE",
    tagline: "아는 사람만 알던 부위, 당신의 시그니처가 됩니다",
    description:
      "뽈항정·관자살·설하살 등 뒷고기 특수부위를 다루는 새림의 채널 브랜드입니다. 고기 전문점과 소비자를 함께 만납니다.",
    role: "sub",
    target: "고기 전문점 · 일반 소비자",
    sort: 3,
  },
  {
    slug: "yeomgane-bapsang",
    name: "염가네밥상",
    nameEn: "YEOMGANE BAPSANG",
    tagline: "새림의 상표 등록 자사 브랜드",
    description:
      "편육·국탕 등 새림이 직접 만든 제품을 소비자에게 전하는 상표 등록 자사 브랜드입니다.",
    role: "sub",
    target: "일반 소비자",
    sort: 4,
  },
  {
    slug: "chueok-dwitgogi",
    name: "추억의 뒷고기",
    nameEn: "CHUEOK DWITGOGI",
    tagline: "뒷고기 한 점의 추억을 담은 자사 브랜드",
    description:
      "꼬들살·뽈살 등 뒷고기 특수부위 구이 라인의 상표 등록 자사 브랜드입니다.",
    role: "sub",
    target: "일반 소비자 · 구이 전문점",
    sort: 5,
  },
];

const FACTORIES = [
  {
    slug: "gunsan",
    name: "군산공장",
    code: "GUNSAN",
    role: "본사 · 돼지 부산물 원스톱 생산",
    symbolSentence: "국밥 한 그릇의 기준이 시작되는 곳",
    description:
      "새림의 본사이자 심장입니다. 부지 3,668㎡ · 제조시설 1,203㎡ 규모에서 도축 직후의 돈두·내장류를 하루 1,500두(약 7톤) 세척·열처리·포장까지 원스톱 처리해 전국으로 직송합니다. 세절·원료보관·돈두가공·열가공·내포장·외포장·냉장·냉동 — 8개 전용 작업실을 분리 운영해 교차오염을 구조적으로 차단합니다.",
    address: "전북특별자치도 군산시 옥산면 산성로 154",
    capabilities: [
      "돈두·내장 열처리 일 1,500두 (약 7톤)",
      "포장육 생산 일 10톤 · 양념육 가공 일 5톤",
      "스킨 · 진공 · MAP · 열성형 · 레토르트 포장",
      "8개 전용 작업실 분리 운영 · 폐수처리장(일 50톤)",
    ],
    certifications: ["HACCP 식육포장처리업", "HACCP 축산물가공업", "ISO 9001 · 14001"],
    image: "/images/company/branch-hq-product.jpg",
    sort: 1,
  },
  {
    slug: "gimje",
    name: "김제공장",
    code: "GIMJE",
    role: "돼지 부산물 세척 · 가열 전문 라인",
    symbolSentence: "가장 까다로운 공정을 도맡는 곳",
    description:
      "돈두·내장류 등 돼지 부산물의 세척과 가열(열처리) 공정을 전담합니다. 잡내와 위생을 결정짓는 가장 까다로운 전처리 단계를 표준화된 기준으로 처리해, 군산 본사와 함께 국탕류 생산의 한 축을 담당합니다.",
    address: "전북특별자치도 김제시",
    capabilities: ["부산물 정제수 세척", "가열 · 열처리", "급속 냉각", "위생 검수 · 냉동 포장"],
    certifications: ["HACCP"],
    image: "/images/company/gimje-washing.jpg",
    sort: 2,
  },
  {
    slug: "yongin",
    name: "용인공장",
    code: "YONGIN",
    role: "햄 · 육가공 OEM/B2B 생산",
    symbolSentence: "브랜드의 주문이 제품이 되는 곳",
    description:
      "햄·육가공 제품의 OEM/B2B 생산을 담당합니다. 파트너 브랜드의 레시피와 규격을 표준화된 공정으로 구현합니다.",
    address: "경기도 용인시",
    capabilities: ["햄·소시지 가공", "OEM 생산", "B2B 납품 규격 대응", "공정 표준화"],
    certifications: ["HACCP"],
    image: "/images/company/branch-yongin-product.jpg",
    sort: 3,
  },
];

const PRODUCTS = [
  {
    slug: "boiled-pork-head-slice",
    name: "삶은 돈두 슬라이스",
    brandSlug: "gukbap-exchange",
    factorySlug: "gunsan",
    category: "국탕류",
    summary: "아침 손질 없이 바로 뚝배기에 올리는 머릿고기",
    story:
      "국밥집 사장님이 매일 아침 가장 먼저 확인하는 것은 머릿고기의 상태입니다. 새림은 그 확인을 공장에서 대신합니다. 당일 입고된 돈두를 표준 공정으로 삶고 슬라이스해, 매장에서는 뚝배기에 올리기만 하면 되도록 준비합니다.",
    features: ["국밥·수육 주력 원료", "균일 슬라이스", "잡내 저감 표준 공정"],
    process: "입고 검수 → 세척 → 열처리 → 이물 검수 → 슬라이스 → 급속 냉각 → 냉동 포장",
    packaging: "냉동 1kg 포장 · 오전 10시 이전 주문 당일 출고",
    useCases: ["국밥 · 순댓국", "수육 · 머릿고기 플레이트", "편육 반찬 납품"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/boiled-pork-head-slice.jpg",
    featured: true,
    sort: 1,
  },
  {
    slug: "boiled-small-intestine-slice",
    name: "삶은 소창 슬라이스",
    brandSlug: "gukbap-exchange",
    factorySlug: "gunsan",
    category: "국탕류",
    summary: "잡내 손질을 건너뛰고 바로 토핑하는 소창",
    story:
      "소창은 손질이 8할입니다. 새림은 정제수 세척과 열처리 기준을 표준화해 잡내를 줄이고, 국밥 토핑에 바로 쓸 수 있는 두께로 슬라이스해 공급합니다.",
    features: ["균일 커팅", "잡내 저감 공정", "조리 즉시 투입"],
    process: "원료 검수 → 정제수 세척 → 열처리 → 슬라이스 → 금속검출 → 냉동 포장",
    packaging: "냉동 1kg 포장 · 대량 주문 별도 물류 협의",
    useCases: ["순댓국 · 내장탕", "곱창 토핑", "매장용 소분 메뉴"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/boiled-small-intestine-slice.jpg",
    featured: true,
    sort: 2,
  },
  {
    slug: "boiled-heart-slice",
    name: "삶은 염통 슬라이스",
    brandSlug: "gukbap-exchange",
    factorySlug: "gunsan",
    category: "국탕류",
    summary: "단골이 \"이 집 염통 있죠?\" 하고 다시 찾게 만드는 부재료",
    story:
      "염통은 식감으로 기억되는 부위입니다. 새림은 특유의 쫄깃함을 유지하면서 잡내를 최소화하는 전처리 기준을 세워, 국밥 고명과 안주 토핑 어디에나 바로 쓸 수 있게 만들었습니다.",
    features: ["담백한 맛", "쫄깃한 식감", "높은 재구매율"],
    process: "전처리 세척 → 열처리 → 위생 검수 → 규격 슬라이스 → 냉동 포장",
    packaging: "냉동 1kg 포장 · 정기 납품 스케줄 운영",
    useCases: ["순댓국 · 내장탕", "술안주 토핑", "곱창전골"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/boiled-heart-slice.jpg",
    featured: true,
    sort: 3,
  },
  {
    slug: "boiled-osori-gamtu",
    name: "삶은 오소리감투",
    brandSlug: "gukbap-exchange",
    factorySlug: "gunsan",
    category: "국탕류",
    summary: "우리 국밥만의 식감 층을 만들어 주는 마지막 한 겹",
    story:
      "국밥의 완성도는 식감의 층에서 갈립니다. 오소리감투는 그 마지막 층을 채우는 부위입니다. 세척과 열처리 기준을 강화해 전문점 수준의 품질로 공급합니다.",
    features: ["특수부위 식감", "국밥 풍미 강화", "안정적인 납품"],
    process: "세척 → 열처리 → 냉각 → 위생 검수 → 규격 포장",
    packaging: "냉동 1kg 포장 · 전국 냉동 직송",
    useCases: ["국밥 · 내장탕", "곱창 메뉴", "매장 특화 토핑"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/boiled-osori-gamtu.jpg",
    featured: false,
    sort: 4,
  },
  {
    slug: "ppolhangjeong-500g",
    name: "뽈항정 500g",
    brandSlug: "yuksik-note",
    factorySlug: "gunsan",
    category: "뒷고기류",
    summary: "산지에서만 팔리던 뽈항정을 우리 가게 메뉴판에 올릴 수 있습니다",
    story:
      "한 마리에서 소량만 나오는 부위는 유통이 어려워 산지에서만 소비되곤 했습니다. 새림은 도축·발골 시스템을 직접 운영하기에 뽈항정을 안정적으로 모아 전국에 공급할 수 있습니다.",
    features: ["희소 특수부위", "고소한 풍미", "매장 인기 품목"],
    process: "당일 도축 → 당일 발골 → 선별 정형 → 진공 포장 → 냉동 출고",
    packaging: "냉동 500g 진공 포장 · 300kg 이상 대량 별도 협의",
    useCases: ["숯불구이", "뒷고기 전문점 메인", "캠핑 구이"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/ppolhangjeong-500g.jpg",
    featured: true,
    sort: 5,
  },
  {
    slug: "gwanjasal-300g",
    name: "관자살 300g",
    brandSlug: "yuksik-note",
    factorySlug: "gunsan",
    category: "뒷고기류",
    summary: "계량 없이 봉지째 굽는 300g — 아는 손님이 먼저 찾는 눈꽃살",
    story:
      "눈꽃살로도 불리는 관자살은 아는 손님이 먼저 찾는 부위입니다. 매장 조리에 맞는 규격으로 정형·계량해, 사이드부터 메인까지 바로 투입할 수 있게 준비했습니다.",
    features: ["쫀득한 식감", "희소 부위", "매장용 규격 포장"],
    process: "정밀 발골 → 정형 → 중량 계량 → 진공 포장",
    packaging: "냉동 300g 진공 포장 · 오전 주문 당일 출고",
    useCases: ["뒷고기 구이", "직화 메뉴", "특수부위 플래터"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/gwanjasal-300g.jpg",
    featured: true,
    sort: 6,
  },
  {
    slug: "seolhasal-300g",
    name: "설하살 300g",
    brandSlug: "yuksik-note",
    factorySlug: "gunsan",
    category: "뒷고기류",
    summary: "어느 로트를 받아도 같은 식감으로 구워지는 설하살",
    story:
      "설하살은 부위별 편차가 큰 만큼 정형 기준이 품질을 결정합니다. 새림 기준으로 선별·정형해 매장 조리 결과를 일정하게 유지합니다.",
    features: ["식감 차별화", "선별 정형", "안정 물량 공급"],
    process: "도축 직후 발골 → 선별 정형 → 위생 검수 → 냉동 포장",
    packaging: "냉동 300g 진공 포장 · 박스 단위 도매가 운영",
    useCases: ["뒷고기 전문점 메인", "숯불구이", "세트 메뉴"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/seolhasal-300g.jpg",
    featured: true,
    sort: 7,
  },
];

const MORE_PRODUCTS = [
  {
    slug: "boiled-daechang",
    name: "삶은 돈대창",
    brandSlug: "gukbap-exchange",
    factorySlug: "gunsan",
    category: "국탕류",
    summary: "냄새 잡는 게 일이던 대창을, 데우기만 하면 되게",
    story:
      "대창은 손질과 삶기에서 맛이 갈립니다. 새림은 도축 직후 세척과 가열 기준을 표준화해, 매장에서는 냄새 걱정 없이 바로 조리에 넣을 수 있는 상태로 공급합니다.",
    features: ["잡내 저감 열처리", "균일 세척 기준", "업소용 대용량 대응"],
    process: "입고 검수 → 정제수 세척 → 열처리 → 금속검출 → 냉동 포장",
    packaging: "냉동 벌크/진공 · 업소용 대용량 · 오전 10시 이전 주문 당일 출고",
    useCases: ["곱창전골 · 대창전골", "국밥 토핑", "구이 메뉴 부재료"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/boiled-daechang.jpg",
    featured: false,
    sort: 8,
  },
  {
    slug: "modeum-naejang",
    name: "모둠내장 (소창·염통·오소리)",
    brandSlug: "gukbap-exchange",
    factorySlug: "gunsan",
    category: "국탕류",
    summary: "부위별로 따로 살 필요 없이, 한 박스로 국밥 토핑 완성",
    story:
      "순댓국 한 그릇에는 서너 가지 내장이 들어갑니다. 부위별로 거래처를 두면 품질도 납기도 제각각이 됩니다. 새림은 소창·염통·오소리감투를 같은 공정 기준으로 삶아 한 구성으로 담았습니다.",
    features: ["3개 부위 한 구성", "동일 공정 기준의 균일 품질", "재고 관리 단순화"],
    process: "부위별 세척 → 열처리 → 냉각 → 조합 계량 → 냉동 포장",
    packaging: "냉동 1kg 포장 · 정기 납품 스케줄 운영",
    useCases: ["순댓국 · 내장탕", "모둠 안주 플레이트", "곱창전골"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/modeum-naejang.jpg",
    featured: false,
    sort: 9,
  },
  {
    slug: "meori-banbeol",
    name: "머리 반벌",
    brandSlug: "gukbap-exchange",
    factorySlug: "gunsan",
    category: "국탕류",
    summary: "직접 삶아 쓰는 매장을 위한 반벌 원료 — 손질은 새림이 끝냈습니다",
    story:
      "육수와 편육을 직접 내는 매장은 원료 상태가 곧 그날의 맛입니다. 새림은 하루 1,500두 열처리 라인의 검수 기준 그대로, 깨끗하게 손질한 반벌 원료를 공급합니다.",
    features: ["일 1,500두 라인의 검수 기준", "직접 삶는 매장용 원료", "안정 물량 공급"],
    process: "입고 검수 → 세척 → 정형 → 위생 검수 → 냉장/냉동 포장",
    packaging: "냉장 -2~10℃ / 냉동 -18℃ 이하 · 업소용 규격",
    useCases: ["국밥 육수 · 편육 직접 조리", "머릿고기 플레이트", "순대국 전문점"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/meori-banbeol.jpg",
    featured: false,
    sort: 10,
  },
  {
    slug: "gan-heopa-yeomtong",
    name: "간 · 허파 · 염통",
    brandSlug: "gukbap-exchange",
    factorySlug: "gunsan",
    category: "국탕류",
    summary: "순대 한 접시의 곁들임을 부위별 규격으로",
    story:
      "순대 접시의 완성은 곁들임 내장입니다. 새림은 간·허파·염통을 부위별 규격으로 생산해, 매장이 필요한 구성만큼 조합해 쓸 수 있게 했습니다.",
    features: ["부위별 규격 생산", "필요한 구성만 조합 가능", "당일 출고 체계"],
    process: "부위별 검수 → 세척 → 열처리 → 슬라이스 → 냉동 포장",
    packaging: "냉동 부위별 소분 · 업소용 대용량 대응",
    useCases: ["순대 곁들임", "내장탕", "술안주 구성"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/gan-heopa-yeomtong.jpg",
    featured: false,
    sort: 11,
  },
  {
    slug: "boiled-makchang",
    name: "삶은 막창",
    brandSlug: "yuksik-note",
    factorySlug: "gunsan",
    category: "뒷고기류",
    summary: "삶는 시간 없이 바로 굽기 들어가는 막창",
    story:
      "막창구이의 병목은 초벌입니다. 새림이 세척과 삶기를 끝내서 보내면, 매장은 불 위에 올리는 일만 남습니다. 회전이 빨라지고 맛은 일정해집니다.",
    features: ["초벌(삶기) 완료 상태 공급", "잡내 저감 공정", "구이 회전율 상승"],
    process: "세척 → 열처리(삶기) → 냉각 → 위생 검수 → 냉동 포장",
    packaging: "냉동 진공 포장 · 박스 단위 도매가 운영",
    useCases: ["막창구이 전문점", "숯불 초벌 메뉴", "포장마차 안주"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/boiled-makchang.jpg",
    featured: false,
    sort: 12,
  },
  {
    slug: "raw-makchang",
    name: "생막창",
    brandSlug: "yuksik-note",
    factorySlug: "gunsan",
    category: "뒷고기류",
    summary: "우리 가게 방식대로 초벌하고 싶은 매장을 위한 생막창",
    story:
      "초벌 방식이 곧 시그니처인 매장이 있습니다. 그런 매장을 위해 세척·손질만 새림 기준으로 끝낸 생막창을 준비했습니다. 삶는 방식은 사장님의 것입니다.",
    features: ["세척·손질 완료 생물 공급", "매장별 초벌 방식 자유", "도축 직후 신선 출고"],
    process: "도축 직후 입고 → 정제수 세척 → 손질 → 위생 검수 → 냉장/냉동 포장",
    packaging: "냉장/냉동 선택 · 진공 포장",
    useCases: ["막창구이 전문점", "직화 초벌 메뉴", "전골용"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/raw-makchang.jpg",
    featured: false,
    sort: 13,
  },
  {
    slug: "doraechang",
    name: "도래창",
    brandSlug: "yuksik-note",
    factorySlug: "gunsan",
    category: "뒷고기류",
    summary: "메뉴판에 '도래창' 세 글자를 올릴 수 있는 몇 안 되는 공급처",
    story:
      "도래창은 물량이 적어 취급처 자체가 드뭅니다. 도축·발골 라인을 직접 운영하는 새림이기에 안정적으로 모아 공급할 수 있습니다. 경쟁 매장과 메뉴로 달라지십시오.",
    features: ["희소 부위 안정 수급", "직영 라인 직송", "차별화 메뉴 재료"],
    process: "도축 직후 발골 → 선별 → 세척 → 위생 검수 → 냉동 포장",
    packaging: "냉동 진공 포장 · 물량 사전 협의",
    useCases: ["특수부위 구이 전문점", "도래창 전골", "한정 메뉴"],
    oemAvailable: true,
    storeUrl: "https://vo.la/RFDWcIg",
    image: "/images/products/doraechang.jpg",
    featured: false,
    sort: 14,
  },
];

const QUALITY_STEPS = [
  {
    stepNo: 1,
    name: "입고",
    nameEn: "RECEIVING",
    summary: "원료가 공장에 도착하는 순간부터 기록이 시작됩니다.",
    detail: "원료육·부재료의 이력 정보와 운송 온도를 확인하고, 입고 시각과 함께 로트 단위로 기록합니다.",
    metric: "입고 차량 온도 -18℃ 이하(냉동) · 이력제 확인 100%",
  },
  {
    stepNo: 2,
    name: "검수",
    nameEn: "INSPECTION",
    summary: "기준에 미달하는 원료는 라인에 오르지 못합니다.",
    detail: "관능 검사와 규격 검사를 거쳐 부적합 원료를 격리합니다. 검수 기록은 로트별로 보관합니다.",
    metric: "전 로트 검수 · 부적합 원료 즉시 반품",
  },
  {
    stepNo: 3,
    name: "가공",
    nameEn: "PROCESSING",
    summary: "세척·열처리·정형 — 제품군별로 분리된 표준 공정.",
    detail: "국탕류와 뒷고기류의 공정 라인을 분리 운영해 교차 오염을 차단하고 품질 편차를 줄입니다.",
    metric: "열처리 중심온도 관리 · 공정별 작업 표준서 운영",
  },
  {
    stepNo: 4,
    name: "금속검출",
    nameEn: "METAL DETECTION",
    summary: "모든 제품이 금속검출기를 통과해야 다음 단계로 갑니다.",
    detail: "포장 전 전 제품 금속검출기 통과. 검출 시 해당 로트 전체를 격리해 원인을 추적합니다.",
    metric: "FE 2mm · SUS 5mm 금속검출 전수 · 조도 1,000lux 클린룸 이물검수",
  },
  {
    stepNo: 5,
    name: "미생물 관리",
    nameEn: "MICROBIAL CONTROL",
    summary: "보이지 않는 위험까지 정기 검사로 관리합니다.",
    detail: "제품·설비·작업환경의 미생물을 정기 검사하고, 기준 초과 시 생산을 중단하고 원인을 제거합니다.",
    metric: "세균·항생제 잔류검사 상시 · 주 1회 위생교육",
  },
  {
    stepNo: 6,
    name: "포장",
    nameEn: "PACKAGING",
    summary: "진공·열성형·벌크 — 용도에 맞는 포장 규격.",
    detail: "매장 사용 단위에 맞춘 소분 포장부터 대량 벌크까지, 표시 사항과 중량을 검증한 뒤 밀봉합니다.",
    metric: "중량 검수 전수 · 표시사항 더블 체크",
  },
  {
    stepNo: 7,
    name: "콜드체인",
    nameEn: "COLD CHAIN",
    summary: "출고부터 도착까지 온도가 끊기지 않습니다.",
    detail: "급속 냉각 후 냉동 보관, 냉동 차량과 냉동 택배로 배송 전 구간의 온도를 유지합니다.",
    metric: "냉장 -2~10℃ · 냉동 -18℃ 이하 · 배송 전 실시간 온도체크 · 냉동탑차 8대",
  },
  {
    stepNo: 8,
    name: "출고",
    nameEn: "SHIPPING",
    summary: "오전 10시 이전 주문은 당일 출고가 원칙입니다.",
    detail: "주문 마감 즉시 피킹·검수 후 출고합니다. 로트 번호로 어떤 제품이 어디로 갔는지 추적할 수 있습니다.",
    metric: "오전 주문 당일 출고 · 로트 추적 100%",
  },
];

const NEWS = [
  {
    slug: "brand-platform-launch",
    title: "새림, 브랜드 플랫폼으로의 전환을 시작합니다",
    category: "스토리",
    summary: "제품을 파는 회사에서, 외식 산업을 준비하는 인프라로. 새림이 브랜드 체계를 정비합니다.",
    body: "새림은 2014년 군산에서 시작해 축산 제조 한 길을 걸어왔습니다.\n\n이제 새림은 전국국밥거래소, 육식노트 두 채널 브랜드와 군산·김제·용인 세 공장을 하나의 체계로 묶어, 파트너의 성장을 뒷받침하는 식품 인프라로 전환합니다.\n\n브랜드가 늘어나도 품질의 기준은 하나입니다. 새림의 8단계 품질 여정은 모든 브랜드, 모든 공장에 동일하게 적용됩니다.",
    coverImage: "/images/company/hero-main-photo4.jpg",
    publishedAt: "2026-07-01",
  },
  {
    slug: "quality-journey",
    title: "입고에서 출고까지 — 새림의 8단계 품질 여정",
    category: "스토리",
    summary: "국밥 한 그릇의 신뢰는 공장의 여덟 단계에서 만들어집니다.",
    body: "새림의 품질관리는 원료가 공장에 도착하는 순간 시작됩니다.\n\n입고, 검수, 가공, 금속검출, 미생물 관리, 포장, 콜드체인, 출고 — 여덟 단계 각각에 관리 기준 수치가 있고, 모든 로트가 기록으로 남습니다.\n\n자세한 내용은 QUALITY 페이지에서 인터랙티브로 확인할 수 있습니다.",
    coverImage: "/images/company/photo2.jpg",
    publishedAt: "2026-07-05",
  },
  {
    slug: "oem-partnership-open",
    title: "OEM 파트너십 상담을 시작합니다",
    category: "공지",
    summary: "당신의 브랜드 뒤에 새림이 서겠습니다. 햄·육가공, 국탕류, HMR OEM 상담 접수를 시작합니다.",
    body: "용인공장의 햄·육가공 라인과 김제공장의 부산물 세척·가열 라인에서 파트너 브랜드의 제품을 생산합니다.\n\n레시피 구현, 규격 설계, 표시사항 검토까지 새림의 품질 체계 안에서 진행됩니다.\n\nOEM 페이지에서 생산 가능 품목을 확인하고 문의를 남겨주세요.",
    coverImage: "/images/company/branch-yongin-product.jpg",
    publishedAt: "2026-07-08",
  },
];

const STORE_LINKS = [
  {
    name: "네이버 스마트스토어",
    description: "새림 제품을 소량 단위로 바로 구매할 수 있습니다.",
    url: "https://vo.la/RFDWcIg",
    kind: "smartstore",
    sort: 1,
  },
  {
    name: "카카오 채널 상담",
    description: "도매·정기 납품 상담을 카카오톡으로 빠르게 시작하세요.",
    url: "https://open.kakao.com/o/pRSmEn9h",
    kind: "kakao",
    sort: 2,
  },
];

const SETTINGS: Record<string, string> = {
  hero_title_1: "식당은 손님을 맞이합니다.",
  hero_title_2: "새림은 식당을 준비합니다.",
  hero_sub: "내일 아침, 확인할 것은 손님뿐입니다.",
  hero_media: "/images/company/hero-main-photo4.jpg",
  stat_founded: "2014",
  stat_revenue: "235.6억",
  stat_partners: "55개사",
  stat_items: "116개",
  stat_daily: "1,500두",
  partners:
    "선진·하이포크, 농협 목우촌, 팜스코, 이마트, 이마트 트레이더스, 홈플러스, 쿠팡, 마켓컬리, 오아시스마켓, bhc, 하림산업, 더바른정·권사부, 군산 학교급식",
  contact_tel: "063-464-8681",
  contact_fax: "063-464-8683",
  contact_email: "info@saerim.kr",
  contact_address: "전북특별자치도 군산시 옥산면 산성로 154",
  contact_kakao: "https://open.kakao.com/o/pRSmEn9h",
};

export function seedIfEmpty(db: DatabaseSync) {
  const row = db.prepare("SELECT COUNT(*) AS c FROM brands").get() as { c: number };
  if (row.c > 0) return;

  const tx = () => {
    const insBrand = db.prepare(
      "INSERT INTO brands (slug,name,name_en,tagline,description,role,target,sort) VALUES (?,?,?,?,?,?,?,?)",
    );
    for (const b of BRANDS) {
      insBrand.run(b.slug, b.name, b.nameEn, b.tagline, b.description, b.role, b.target, b.sort);
    }

    const insFactory = db.prepare(
      "INSERT INTO factories (slug,name,code,role,symbol_sentence,description,address,capabilities,certifications,image,sort) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    );
    for (const f of FACTORIES) {
      insFactory.run(
        f.slug, f.name, f.code, f.role, f.symbolSentence, f.description, f.address,
        JSON.stringify(f.capabilities), JSON.stringify(f.certifications), f.image, f.sort,
      );
    }

    const insProduct = db.prepare(
      `INSERT INTO products
        (slug,name,brand_slug,factory_slug,category,summary,story,features,process,packaging,use_cases,oem_available,store_url,image,featured,sort)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    );
    for (const p of [...PRODUCTS, ...MORE_PRODUCTS]) {
      insProduct.run(
        p.slug, p.name, p.brandSlug, p.factorySlug, p.category, p.summary, p.story,
        JSON.stringify(p.features), p.process, p.packaging, JSON.stringify(p.useCases),
        p.oemAvailable ? 1 : 0, p.storeUrl, p.image, p.featured ? 1 : 0, p.sort,
      );
    }

    const insStep = db.prepare(
      "INSERT INTO quality_steps (step_no,name,name_en,summary,detail,metric) VALUES (?,?,?,?,?,?)",
    );
    for (const s of QUALITY_STEPS) {
      insStep.run(s.stepNo, s.name, s.nameEn, s.summary, s.detail, s.metric);
    }

    const insNews = db.prepare(
      "INSERT INTO news (slug,title,category,summary,body,cover_image,published_at) VALUES (?,?,?,?,?,?,?)",
    );
    for (const n of NEWS) {
      insNews.run(n.slug, n.title, n.category, n.summary, n.body, n.coverImage, n.publishedAt);
    }

    const insLink = db.prepare(
      "INSERT INTO store_links (name,description,url,kind,sort) VALUES (?,?,?,?,?)",
    );
    for (const l of STORE_LINKS) {
      insLink.run(l.name, l.description, l.url, l.kind, l.sort);
    }

    const insSetting = db.prepare("INSERT INTO settings (key,value) VALUES (?,?)");
    for (const [key, value] of Object.entries(SETTINGS)) {
      insSetting.run(key, value);
    }
  };

  db.exec("BEGIN");
  try {
    tx();
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}
