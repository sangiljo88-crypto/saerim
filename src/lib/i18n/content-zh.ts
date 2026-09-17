/**
 * CMS(DB) 콘텐츠의 중국어 대역표.
 * 키는 DB의 slug / step_no / settings key / store_links id 를 그대로 쓴다.
 * 여기에 없는 항목은 한국어 원문이 그대로 노출된다(누락돼도 화면은 깨지지 않는다).
 */

export const settings: Record<string, string> = {
  hero_title_1: "餐厅招待客人。",
  hero_title_2: "SAERIM 为餐厅做准备。",
  hero_sub: "明天早上，您需要确认的只有客人。",
  stat_partners: "55 家",
  stat_items: "116 种",
  stat_daily: "1,500 头",
  stat_revenue: "235.6 亿韩元",
  partners:
    "鲜进·Hyfork, 农协牧牛村, Farmsco, 易买得 E-mart, 易买得 Traders, Home plus, Coupang, Market Kurly, Oasis Market, bhc, Harim 产业, 群山学校供餐",
  contact_address: "韩国 全罗北道 群山市 玉山面 山城路 154",
  // 해외에서 바로 걸 수 있도록 국가번호를 붙인다
  contact_tel: "+82-63-464-8681",
  contact_fax: "+82-63-464-8683",
};

export type BrandOverlay = { name: string; nameEn: string; tagline: string; description: string; target: string };

export const brands: Record<string, BrandOverlay> = {
  saerim: {
    name: "SAERIM 新林",
    nameEn: "SAERIM",
    tagline: "为韩国餐饮业做准备的食品基础设施",
    description:
      "负责生产、品质与 OEM 的母品牌。所有子品牌都运行在群山·金堤·龙仁三座工厂的生产能力之上。",
    target: "B2B 采购商 · 合作企业",
  },
  "gukbap-exchange": {
    name: "全国汤饭交易所",
    nameEn: "GUKBAP EXCHANGE",
    tagline: "让老板不必再为凌晨采购操心",
    description:
      "将猪头肉、内脏、汤用肉等汤类核心原料直送至汤饭店与血肠汤店的 SAERIM B2B 渠道品牌。",
    target: "汤饭店 · 血肠汤店",
  },
  "yuksik-note": {
    name: "肉食笔记",
    nameEn: "YUKSIK NOTE",
    tagline: "只有内行才懂的部位，将成为您的招牌",
    description:
      "专注猪颊颈肉、雪花肉、舌下肉等特色部位的 SAERIM 渠道品牌，同时面向烤肉专门店与终端消费者。",
    target: "烤肉专门店 · 终端消费者",
  },
};

export type FactoryOverlay = {
  name: string;
  role: string;
  symbolSentence: string;
  description: string;
  address: string;
  capabilities: string[];
  certifications: string[];
};

export const factories: Record<string, FactoryOverlay> = {
  gunsan: {
    name: "群山工厂",
    role: "总部 · 猪副产品一站式生产",
    symbolSentence: "一碗汤饭的标准，从这里开始",
    description:
      "SAERIM 的总部，也是心脏。屠宰后的猪头与内脏，以每日 1,500 头（约 7 吨）的规模完成清洗、热处理与包装的一站式加工，并直送全国。分切、原料保管、猪头加工、热加工、内包装、外包装、冷藏、冷冻 —— 8 个专用作业间独立运营，从结构上阻断交叉污染。",
    address: "韩国 全罗北道 群山市 玉山面 山城路 154",
    capabilities: [
      "猪头·内脏热处理 每日 1,500 头（约 7 吨）",
      "包装肉生产 每日 10 吨 · 调味肉加工 每日 5 吨",
      "贴体 · 真空 · MAP · 热成型 · 蒸煮袋包装",
      "8 个专用作业间独立运营 · 污水处理厂（每日 50 吨）",
    ],
    certifications: ["HACCP 肉类包装处理业", "HACCP 畜产品加工业", "ISO 9001 · 14001（准备中）"],
  },
  gimje: {
    name: "金堤工厂",
    role: "猪副产品清洗 · 加热专线",
    symbolSentence: "承担最讲究的那道工序",
    description:
      "专门负责猪头、内脏等猪副产品的清洗与加热（热处理）工序。以标准化的作业基准，处理直接决定异味与卫生的前处理环节，与群山总部共同支撑汤类原料的生产。",
    address: "韩国 全罗北道 金堤市",
    capabilities: ["副产品纯净水清洗", "加热 · 热处理", "急速冷却", "卫生验收 · 冷冻包装"],
    certifications: ["HACCP"],
  },
  yongin: {
    name: "龙仁工厂",
    role: "火腿 · 肉制品 OEM/B2B 生产",
    symbolSentence: "品牌的订单在这里变成产品",
    description:
      "负责火腿与肉制品的 OEM/B2B 生产，以标准化工艺实现合作品牌的配方与规格要求。",
    address: "韩国 京畿道 龙仁市",
    capabilities: ["火腿·香肠加工", "OEM 生产", "对接 B2B 供货规格", "工艺标准化"],
    certifications: ["HACCP"],
  },
};

export type ProductOverlay = {
  name: string;
  summary: string;
  story: string;
  features: string[];
  process: string;
  packaging: string;
  useCases: string[];
};

export const products: Record<string, ProductOverlay> = {
  "boiled-pork-head-slice": {
    name: "熟制猪头肉片",
    summary: "无需早晨处理，直接下砂锅的猪头肉",
    story:
      "汤饭店老板每天早上第一件事，就是确认猪头肉的状态。SAERIM 把这道确认放在工厂完成：当天入库的猪头以标准工艺煮制并切片，门店只需放进砂锅即可。",
    features: ["汤饭·白切肉主力原料", "厚薄均匀切片", "降低异味的标准工艺"],
    process: "入库验收 → 清洗 → 热处理 → 异物检查 → 切片 → 急速冷却 → 冷冻包装",
    packaging: "冷冻 1kg 包装 · 上午 10 点前下单当日出货",
    useCases: ["汤饭 · 血肠汤", "白切肉 · 猪头肉拼盘", "凉切肉配菜供货"],
  },
  "boiled-small-intestine-slice": {
    name: "熟制猪小肠片",
    summary: "省去去味处理，直接铺在汤面上的小肠",
    story:
      "小肠八成的功夫都在处理上。SAERIM 把纯净水清洗与热处理标准化以降低异味，并切成可直接用作汤饭配料的厚度供应。",
    features: ["切割均匀", "降低异味工艺", "可即刻投入烹饪"],
    process: "原料验收 → 纯净水清洗 → 热处理 → 切片 → 金属检测 → 冷冻包装",
    packaging: "冷冻 1kg 包装 · 大批量订单另行协商物流",
    useCases: ["血肠汤 · 内脏汤", "肥肠配料", "门店分装菜品"],
  },
  "boiled-heart-slice": {
    name: "熟制猪心片",
    summary: "让熟客专程回头问“你们家有猪心吧？”的配料",
    story:
      "猪心是靠口感被记住的部位。SAERIM 制定了在保留特有弹牙口感的同时把异味降到最低的前处理标准，无论作汤饭浇头还是下酒配菜都能直接使用。",
    features: ["味道清爽", "弹牙口感", "复购率高"],
    process: "前处理清洗 → 热处理 → 卫生验收 → 规格切片 → 冷冻包装",
    packaging: "冷冻 1kg 包装 · 提供定期供货排期",
    useCases: ["血肠汤 · 内脏汤", "下酒配料", "肥肠火锅"],
  },
  "boiled-osori-gamtu": {
    name: "熟制猪肚",
    summary: "为自家汤饭增添口感层次的最后一层",
    story:
      "汤饭的完成度取决于口感的层次，而猪肚正是填满最后一层的部位。SAERIM 强化了清洗与热处理标准，以专门店水准的品质供应。",
    features: ["特色部位口感", "提升汤饭风味", "供货稳定"],
    process: "清洗 → 热处理 → 冷却 → 卫生验收 → 规格包装",
    packaging: "冷冻 1kg 包装 · 全国冷冻直送",
    useCases: ["汤饭 · 内脏汤", "肥肠类菜品", "门店特色配料"],
  },
  "ppolhangjeong-500g": {
    name: "猪颊颈肉 500g",
    summary: "过去只在产地流通的部位，如今也能上您的菜单",
    story:
      "一头猪身上产量很小的部位，因为流通困难，往往只能在产地消费。SAERIM 自主运营屠宰与分割产线，因此能够稳定归集猪颊颈肉并供应全国。",
    features: ["稀有特色部位", "香醇风味", "门店人气单品"],
    process: "当日屠宰 → 当日分割 → 挑选整形 → 真空包装 → 冷冻出货",
    packaging: "冷冻 500g 真空包装 · 300kg 以上大批量另议",
    useCases: ["炭火烧烤", "特色部位烤肉店主打", "户外烧烤"],
  },
  "gwanjasal-300g": {
    name: "猪雪花肉 300g",
    summary: "无需称重、整袋即烤的 300g —— 内行客人会主动点的雪花肉",
    story:
      "又被称作雪花肉的这一部位，是内行客人会主动点名的。我们按门店烹饪需求完成整形与计量，从配菜到主菜都能直接投入。",
    features: ["弹嫩口感", "稀有部位", "门店专用规格包装"],
    process: "精细分割 → 整形 → 重量计量 → 真空包装",
    packaging: "冷冻 300g 真空包装 · 上午下单当日出货",
    useCases: ["特色部位烤肉", "直火菜品", "特色部位拼盘"],
  },
  "seolhasal-300g": {
    name: "猪舌下肉 300g",
    summary: "无论收到哪一批，烤出来的口感都一样",
    story:
      "舌下肉各部位差异较大，整形标准直接决定品质。SAERIM 按自有标准挑选并整形，让门店的成品保持稳定一致。",
    features: ["口感差异化", "挑选整形", "供货量稳定"],
    process: "屠宰后即时分割 → 挑选整形 → 卫生验收 → 冷冻包装",
    packaging: "冷冻 300g 真空包装 · 按箱提供批发价",
    useCases: ["特色部位烤肉店主打", "炭火烧烤", "套餐菜单"],
  },
  "boiled-daechang": {
    name: "熟制猪大肠",
    summary: "过去最费功夫去味的大肠，现在只需加热",
    story:
      "大肠的味道取决于处理与煮制。SAERIM 将屠宰后的清洗与加热标准化，门店无需担心异味，可直接投入烹饪。",
    features: ["降低异味的热处理", "统一清洗标准", "可供应餐饮大容量规格"],
    process: "入库验收 → 纯净水清洗 → 热处理 → 金属检测 → 冷冻包装",
    packaging: "冷冻散装/真空 · 餐饮用大容量 · 上午 10 点前下单当日出货",
    useCases: ["肥肠火锅 · 大肠火锅", "汤饭配料", "烤制菜品辅料"],
  },
  "modeum-naejang": {
    name: "什锦内脏（小肠·猪心·猪肚）",
    summary: "不必按部位分别采购，一箱搞定汤饭配料",
    story:
      "一碗血肠汤里通常要放三四种内脏。若按部位分散采购，品质与交期都会参差不齐。SAERIM 以同一套工艺标准煮制小肠、猪心与猪肚，组合成一份配置。",
    features: ["三个部位一份配置", "同一工艺标准，品质均一", "简化库存管理"],
    process: "按部位清洗 → 热处理 → 冷却 → 组合计量 → 冷冻包装",
    packaging: "冷冻 1kg 包装 · 提供定期供货排期",
    useCases: ["血肠汤 · 内脏汤", "什锦下酒拼盘", "肥肠火锅"],
  },
  "meori-banbeol": {
    name: "半只猪头",
    summary: "为自行熬煮的门店准备的半只装原料 —— 处理由 SAERIM 完成",
    story:
      "自行熬制高汤与凉切肉的门店，原料状态就等于当天的味道。SAERIM 以每日 1,500 头热处理产线的同一套验收标准，供应清洗整形到位的半只装原料。",
    features: ["每日 1,500 头产线的验收标准", "适合自行熬煮的门店原料", "供货量稳定"],
    process: "入库验收 → 清洗 → 整形 → 卫生验收 → 冷藏/冷冻包装",
    packaging: "冷藏 -2~10℃ / 冷冻 -18℃ 以下 · 餐饮用规格",
    useCases: ["汤饭高汤 · 自制凉切肉", "猪头肉拼盘", "血肠汤专门店"],
  },
  "gan-heopa-yeomtong": {
    name: "猪肝 · 猪肺 · 猪心",
    summary: "把血肠拼盘的配菜，按部位做成规格品",
    story:
      "一盘血肠的完成度，取决于搭配的内脏。SAERIM 按部位分别生产猪肝、猪肺与猪心，门店可按所需配置自由组合。",
    features: ["按部位规格化生产", "可只组合所需部位", "当日出货体系"],
    process: "按部位验收 → 清洗 → 热处理 → 切片 → 冷冻包装",
    packaging: "冷冻按部位分装 · 可供应餐饮大容量",
    useCases: ["血肠配菜", "内脏汤", "下酒拼盘"],
  },
  "boiled-makchang": {
    name: "熟制猪直肠（烤肠）",
    summary: "省去煮制时间，直接上火烤的烤肠",
    story:
      "烤肠的瓶颈在于预煮。SAERIM 完成清洗与煮制后发货，门店只剩下上火这一步 —— 翻台更快，味道更稳定。",
    features: ["以完成预煮的状态供应", "降低异味工艺", "提升烤制翻台率"],
    process: "清洗 → 热处理（煮制） → 冷却 → 卫生验收 → 冷冻包装",
    packaging: "冷冻真空包装 · 按箱提供批发价",
    useCases: ["烤肠专门店", "炭火预烤菜品", "夜宵摊下酒菜"],
  },
  "raw-makchang": {
    name: "生猪直肠（生烤肠）",
    summary: "为想按自家方式预煮的门店准备的生烤肠",
    story:
      "有些门店的招牌，正是自家的预煮方式。为此我们准备了只按 SAERIM 标准完成清洗与整理的生烤肠 —— 怎么煮，由老板决定。",
    features: ["清洗整理完成的生鲜供应", "各门店可自由决定预煮方式", "屠宰后即时新鲜出货"],
    process: "屠宰后入库 → 纯净水清洗 → 整理 → 卫生验收 → 冷藏/冷冻包装",
    packaging: "冷藏/冷冻可选 · 真空包装",
    useCases: ["烤肠专门店", "直火预烤菜品", "火锅用"],
  },
  doraechang: {
    name: "猪子宫（母猪特色部位）",
    summary: "少数能让您把这道菜写上菜单的供应来源",
    story:
      "这一部位产量极少，能够经手的供应商本就不多。正因为 SAERIM 自主运营屠宰与分割产线，才能稳定归集供应。让您的菜单与周边门店拉开差距。",
    features: ["稀有部位稳定供货", "自营产线直送", "差异化菜单食材"],
    process: "屠宰后即时分割 → 挑选 → 清洗 → 卫生验收 → 冷冻包装",
    packaging: "冷冻真空包装 · 数量需提前协商",
    useCases: ["特色部位烤肉专门店", "特色部位火锅", "限量菜单"],
  },
};

export type QualityOverlay = { name: string; nameEn: string; summary: string; detail: string; metric: string };

export const qualitySteps: Record<number, QualityOverlay> = {
  1: {
    name: "入库",
    nameEn: "RECEIVING",
    summary: "从原料抵达工厂的那一刻起，记录就已开始。",
    detail: "确认原料肉与辅料的溯源信息及运输温度，并连同入库时间按批次记录。",
    metric: "入库车辆温度 -18℃ 以下（冷冻） · 溯源信息确认率 100%",
  },
  2: {
    name: "验收",
    nameEn: "INSPECTION",
    summary: "不达标的原料，不会进入产线。",
    detail: "经过感官检查与规格检查，将不合格原料隔离，验收记录按批次保存。",
    metric: "全批次验收 · 不合格原料即时退货",
  },
  3: {
    name: "加工",
    nameEn: "PROCESSING",
    summary: "清洗、热处理、整形 —— 按产品线分离的标准工艺。",
    detail: "汤类原料与特色部位肉的工艺产线分开运营，阻断交叉污染并减少品质波动。",
    metric: "热处理中心温度管理 · 各工序作业标准书运营",
  },
  4: {
    name: "金属检测",
    nameEn: "METAL DETECTION",
    summary: "所有产品必须通过金属检测机，才能进入下一步。",
    detail: "包装前全部产品通过金属检测机。一经检出，即隔离该批次全部产品并追查原因。",
    metric: "FE 2.0mm 金属检测全检 · 照度 1,000lux 异物检查",
  },
  5: {
    name: "微生物管理",
    nameEn: "MICROBIAL CONTROL",
    summary: "连看不见的风险，也用定期检测来管理。",
    detail: "定期检测产品、设备与作业环境的微生物，超标时立即停产并消除原因。",
    metric: "细菌·抗生素残留检测常态化 · 每周 1 次卫生培训",
  },
  6: {
    name: "包装",
    nameEn: "PACKAGING",
    summary: "真空、热成型、散装 —— 按用途匹配包装规格。",
    detail: "从贴合门店使用单位的分装，到大容量散装，核验标识事项与重量后完成封口。",
    metric: "重量全检 · 标识事项双重核对",
  },
  7: {
    name: "冷链",
    nameEn: "COLD CHAIN",
    summary: "从出库到送达，温度全程不中断。",
    detail: "急速冷却后冷冻保管，以冷冻车与冷冻快递维持配送全程的温度。",
    metric: "冷藏 -2~10℃ · 冷冻 -18℃ 以下 · 发货前实时测温 · 冷冻厢车 8 台",
  },
  8: {
    name: "出货",
    nameEn: "SHIPPING",
    summary: "上午 10 点前的订单，原则上当日出货。",
    detail: "订单截止后即刻拣货、验收并出库。通过批次号可追溯任何产品的去向。",
    metric: "上午订单当日出货 · 批次追溯率 100%",
  },
};

export type NewsOverlay = { title: string; category: string; summary: string; body: string };

export const news: Record<string, NewsOverlay> = {
  "brand-platform-launch": {
    title: "SAERIM 启动品牌平台转型",
    category: "品牌故事",
    summary: "从卖产品的公司，转向为餐饮业做准备的基础设施。SAERIM 重新梳理品牌体系。",
    body: "SAERIM 自 2014 年创立于群山以来，一直专注于畜产制造这一条路。\n\n如今，我们把全国汤饭交易所、肉食笔记两个渠道品牌与群山·金堤·龙仁三座工厂整合为一套体系，转型为支撑合作伙伴成长的食品基础设施。\n\n品牌可以增加，品质标准只有一个。SAERIM 的 8 道品质工序，对所有品牌、所有工厂一视同仁。",
  },
  "quality-journey": {
    title: "从入库到出货 —— SAERIM 的 8 道品质工序",
    category: "品牌故事",
    summary: "一碗汤饭的信赖，是在工厂的八道工序中造就的。",
    body: "SAERIM 的品质管理，从原料抵达工厂的那一刻开始。\n\n入库、验收、加工、金属检测、微生物管理、包装、冷链、出货 —— 八道工序各有管理标准数值，所有批次都会留下记录。\n\n详细内容可在「品质管理」页面以交互方式查看。",
  },
  "oem-partnership-open": {
    title: "OEM 合作咨询正式开放",
    category: "公告",
    summary: "您的品牌背后，由 SAERIM 支撑。火腿肉制品、汤类、HMR 的 OEM 咨询现已开放。",
    body: "我们将在龙仁工厂的火腿·肉制品产线，以及金堤工厂的副产品清洗·加热产线上，生产合作品牌的产品。\n\n从配方落地、规格设计到标签标识审核，全程在 SAERIM 的品质体系内推进。\n\n请在 OEM 页面确认可生产的品类，并留下您的咨询。",
  },
};

export type StoreLinkOverlay = { name: string; description: string };

export const storeLinks: Record<number, StoreLinkOverlay> = {
  1: {
    name: "NAVER 智能商店",
    description: "可以小批量直接购买 SAERIM 的产品。",
  },
  2: {
    name: "KakaoTalk 频道咨询",
    description: "通过 KakaoTalk 快速开始批发与定期供货洽谈。",
  },
};

/** 제품 카테고리 표시명 (필터 값은 한국어 원문 키를 그대로 유지한다) */
export const categories: Record<string, string> = {
  국탕류: "汤类原料",
  뒷고기류: "特色部位肉",
};
