import type { Locale } from "@/lib/i18n/config";

// 장날은 별도 운영 법인의 협업 플랫폼이다. 새림의 법인·공식 SNS와 동일시하지 않는다.
export const JANGNAL_URL = "https://jangnal.store/";
export const jangnalCopy: Record<Locale, { label: string; title: string; body: string; note: string; cta: string }> = {
  ko: {
    label: "공동구매 협업 채널",
    title: "식품 공동구매 플랫폼, 장날",
    body: "새림의 식품 제조·공급 기반과 크리에이터의 콘텐츠를 연결하는 공동구매 협업을 장날에서 상담할 수 있습니다. 육가공·국밥·간편식 등 제품군을 살펴보고 시식, 상품 구성과 판매 일정을 함께 검토하세요.",
    note: "장날 운영사는 주식회사 백년커머스입니다. 새림은 제조·공급 기반으로 참여하며, 개별 상품의 제조·판매자와 실제 공급 조건은 장날의 상품 안내 및 상담에서 확인합니다.",
    cta: "장날 공식 홈페이지",
  },
  en: {
    label: "Group-buying collaboration",
    title: "Jangnal — a food group-buying platform",
    body: "Explore group-buying collaborations that connect SAERIM’s food manufacturing and supply capabilities with creators through Jangnal. Discuss product ranges, tastings, configurations and sales schedules.",
    note: "Jangnal is operated by 주식회사 백년커머스 (a separate operating company) SAERIM participates through manufacturing and supply. Check each product’s manufacturer, seller and supply conditions on Jangnal or during consultation.",
    cta: "Visit Jangnal’s official website",
  },
  zh: {
    label: "团购合作渠道",
    title: "Jangnal 장날 — 食品团购平台",
    body: "通过Jangnal，可咨询将SAERIM的食品生产与供应基础和创作者内容相结合的团购合作。了解肉制品、汤饭、方便食品等产品类别，并协商试吃、产品组合与销售安排。",
    note: "Jangnal由주식회사 백년커머스（独立运营公司）运营。SAERIM参与生产与供应，具体产品的生产商、销售方及供货条件请以Jangnal的产品说明与咨询结果为准。",
    cta: "访问Jangnal官方网站",
  },
};
