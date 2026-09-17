/**
 * CMS(DB) 콘텐츠의 영어 대역표. content-zh.ts와 같은 export 구조를 가진다.
 * 키는 DB의 slug / step_no / settings key / store_links id 를 그대로 쓴다.
 * 여기에 없는 항목은 한국어 원문이 그대로 노출된다(누락돼도 화면은 깨지지 않는다).
 * 고유명사·부위명 표기는 GEO·SEO 작업지시서 §14 용어집을 따른다.
 */
import type {
  BrandOverlay,
  FactoryOverlay,
  NewsOverlay,
  ProductOverlay,
  QualityOverlay,
  StoreLinkOverlay,
} from "./content-zh";

export const settings: Record<string, string> = {
  // 영어 메인 H1은 슬로건 대신 설명형 — 바이어 검색어(품목 · 인증 · 지역)가 앞에 온다
  hero_title_1: "Korean pork by-product & processed meat manufacturer,",
  hero_title_2: "HACCP-certified. Made in Gunsan.",
  hero_sub: "Restaurants welcome guests. SAERIM prepares restaurants.",
  hero_descriptor:
    "HACCP-certified B2B manufacturer of pork by-products, specialty cuts and processed meat — supplying franchise HQs, distributors and importers from three plants in Gunsan, Gimje and Yongin.",
  hero_alt:
    "SAERIM Gunsan plant pork head and offal heat-processing line — HACCP-certified pork by-product manufacturing",
  stat_partners: "55 companies",
  stat_items: "116 items",
  stat_daily: "1,500 heads",
  stat_revenue: "KRW 23.56 billion",
  partners:
    "Sunjin·Hyfork, NH Mokwoochon, Farmsco, E-mart, E-mart Traders, Homeplus, Coupang, Market Kurly, Oasis Market, bhc, Harim Industries, Gunsan school meals",
  contact_address: "154 Sanseong-ro, Oksan-myeon, Gunsan-si, Jeonbuk State, Republic of Korea",
  // 해외에서 바로 걸 수 있도록 국가번호를 붙인다
  contact_tel: "+82-63-464-8681",
  contact_fax: "+82-63-464-8683",
};

export const brands: Record<string, BrandOverlay> = {
  saerim: {
    name: "SAERIM",
    nameEn: "SAERIM",
    tagline: "Food infrastructure that prepares Korea's restaurant industry",
    description:
      "The master brand responsible for production, quality and OEM. Every sub-brand runs on the capacity of three plants in Gunsan, Gimje and Yongin.",
    target: "B2B buyers · partner companies",
  },
  "gukbap-exchange": {
    name: "Gukbap Exchange",
    nameEn: "GUKBAP EXCHANGE",
    tagline: "So owners never worry about dawn purchasing again",
    description:
      "SAERIM's B2B channel brand delivering core soup ingredients — pork head, offal and broth meat — directly to gukbap (Korean pork soup with rice) and sundae-gukbap (blood sausage soup) restaurants.",
    target: "Gukbap · sundae-gukbap restaurants",
  },
  "yuksik-note": {
    name: "Yuksik Note",
    nameEn: "YUKSIK NOTE",
    tagline: "The cuts only insiders knew become your signature",
    description:
      "SAERIM's channel brand for specialty pork cuts such as cheek jowl (ppol-hangjeong), temple meat (gwanja-sal) and tongue-root meat (seolha-sal). It serves both grill restaurants and consumers.",
    target: "Grill restaurants · consumers",
  },
  "yeomgane-bapsang": {
    name: "Yeomgane Bapsang",
    nameEn: "YEOMGANE BAPSANG",
    tagline: "SAERIM's own registered-trademark brand",
    description:
      "A registered-trademark house brand that brings products made directly by SAERIM — pressed pork head meat (pyeonyuk), soups and stews — to consumers.",
    target: "Consumers",
  },
  "chueok-dwitgogi": {
    name: "Chueok Dwitgogi",
    nameEn: "CHUEOK DWITGOGI",
    tagline: "A house brand that holds the memory of a bite of specialty pork",
    description:
      "A registered-trademark house brand for the grilling line of specialty pork cuts such as kkodeul-sal and cheek meat.",
    target: "Consumers · grill restaurants",
  },
};

export const factories: Record<string, FactoryOverlay> = {
  gunsan: {
    name: "Gunsan Plant",
    role: "Headquarters · one-stop pork by-product production",
    symbolSentence: "Where the standard for a bowl of gukbap begins",
    description:
      "SAERIM's headquarters and heart. On a 3,668 m² site with 1,203 m² of manufacturing facilities, we wash, heat-process and pack 1,500 heads (about 7 tons) of freshly slaughtered pork head and offal per day and ship nationwide. Eight dedicated rooms — cutting, raw material storage, head processing, heat processing, inner packaging, outer packaging, chilled and frozen — are operated separately to structurally block cross-contamination.",
    address: "154 Sanseong-ro, Oksan-myeon, Gunsan-si, Jeonbuk State, Korea",
    capabilities: [
      "Pork head & offal heat processing: 1,500 heads/day (approx. 7 t)",
      "Packaged meat 10 t/day · seasoned meat 5 t/day",
      "Skin, vacuum, MAP, thermoforming and retort packaging",
      "8 dedicated processing rooms · wastewater treatment plant (50 t/day)",
    ],
    certifications: [
      "HACCP — meat packaging",
      "HACCP — livestock product processing",
      "ISO 9001 · 14001 (in progress)",
    ],
  },
  gimje: {
    name: "Gimje Plant",
    role: "Dedicated washing & heat-processing line for pork by-products",
    symbolSentence: "Where the most demanding process is handled",
    description:
      "Dedicated to washing and heat processing of pork by-products such as head and offal. The most demanding pre-processing stage — which determines odor and hygiene — is handled to standardized criteria, forming one axis of soup-ingredient production together with Gunsan HQ.",
    address: "Gimje-si, Jeonbuk State, Korea",
    capabilities: [
      "Purified-water washing of by-products",
      "Heating · heat processing",
      "Rapid chilling",
      "Hygiene inspection · frozen packaging",
    ],
    certifications: ["HACCP"],
  },
  yongin: {
    name: "Yongin Plant",
    role: "Ham & processed meat OEM/B2B production",
    symbolSentence: "Where a brand's order becomes a product",
    description:
      "Responsible for OEM/B2B production of ham and processed meat. Partner brands' recipes and specifications are implemented through standardized processes.",
    address: "Yongin-si, Gyeonggi-do, Korea",
    capabilities: ["Ham & sausage processing", "OEM production", "B2B delivery specifications", "Process standardization"],
    certifications: ["HACCP"],
  },
};

export const products: Record<string, ProductOverlay> = {
  "boiled-pork-head-slice": {
    name: "Boiled Pork Head Meat Slices",
    summary: "Pork head meat that goes straight into the pot with no morning prep",
    story:
      "The first thing a gukbap restaurant owner checks every morning is the condition of the pork head meat. SAERIM does that check at the plant instead. Pork heads received the same day are boiled and sliced by a standard process, so all the restaurant has to do is put them in the pot.",
    features: ["Core ingredient for gukbap and boiled pork (suyuk)", "Uniform slices", "Standard odor-reduction process"],
    process:
      "Receiving inspection → Washing → Heat processing → Foreign matter inspection → Slicing → Rapid chilling → Frozen packaging",
    packaging: "Frozen, 1 kg pack · orders before 10:00 KST ship same day",
    useCases: ["Gukbap · sundae-gukbap", "Boiled pork · pork head meat platter", "Pressed pork (pyeonyuk) side-dish supply"],
  },
  "boiled-small-intestine-slice": {
    name: "Boiled Pork Small Intestine Slices",
    summary: "Small intestine ready for topping, odor prep already done",
    story:
      "With small intestine, 80% of the work is in the cleaning. SAERIM standardized purified-water washing and heat processing to reduce odor, and slices it to a thickness ready to use as a gukbap topping.",
    features: ["Uniform cutting", "Odor-reduction process", "Ready to cook immediately"],
    process:
      "Raw material inspection → Purified-water washing → Heat processing → Slicing → Metal detection → Frozen packaging",
    packaging: "Frozen, 1 kg pack · bulk orders by separate logistics arrangement",
    useCases: ["Sundae-gukbap · offal soup", "Gopchang topping", "Portioned menu items for restaurants"],
  },
  "boiled-heart-slice": {
    name: "Boiled Pork Heart Slices",
    summary: "The side ingredient that makes regulars ask, \"You have heart here, right?\"",
    story:
      "Heart is a cut remembered for its texture. SAERIM set a pre-processing standard that keeps its characteristic chewiness while minimizing odor, so it can be used right away as a gukbap garnish or a bar-snack topping.",
    features: ["Clean, mild flavor", "Chewy texture", "High repurchase rate"],
    process: "Pre-processing wash → Heat processing → Hygiene inspection → Slicing to specification → Frozen packaging",
    packaging: "Frozen, 1 kg pack · recurring delivery schedule available",
    useCases: ["Sundae-gukbap · offal soup", "Bar-snack topping", "Gopchang hot pot (jeongol)"],
  },
  "boiled-osori-gamtu": {
    name: "Boiled Pork Stomach (Osori-gamtu)",
    summary: "The final layer that gives your gukbap its own texture",
    story:
      "A bowl of gukbap is judged by its layers of texture, and pork stomach is the cut that fills the last layer. We tightened the washing and heat-processing standards to supply it at specialty-restaurant quality.",
    features: ["Specialty-cut texture", "Richer gukbap flavor", "Stable delivery"],
    process: "Washing → Heat processing → Chilling → Hygiene inspection → Packaging to specification",
    packaging: "Frozen, 1 kg pack · nationwide frozen direct shipping",
    useCases: ["Gukbap · offal soup", "Gopchang dishes", "Signature restaurant topping"],
  },
  "ppolhangjeong-500g": {
    name: "Pork Cheek Jowl (Ppol-hangjeong) 500 g",
    summary: "A cut once sold only near farms, now on your menu",
    story:
      "Cuts that yield only a small amount per pig are hard to distribute and used to be consumed only near the source. Because SAERIM runs its own slaughter-and-deboning system, it can collect pork cheek jowl steadily and supply it nationwide.",
    features: ["Rare specialty cut", "Rich, nutty flavor", "Popular restaurant item"],
    process: "Same-day slaughter → Same-day deboning → Sorting & trimming → Vacuum packaging → Frozen shipping",
    packaging: "Frozen, 500 g vacuum pack · 300 kg+ bulk by arrangement",
    useCases: ["Charcoal grilling", "Main item for specialty-cut grill restaurants", "Camping barbecue"],
  },
  "gwanjasal-300g": {
    name: "Pork Temple Meat (Gwanja-sal) 300 g",
    summary: "Grill straight from the 300 g bag, no weighing — the marbled cut regulars ask for first",
    story:
      "Also known as snowflake meat, pork temple meat is the cut that customers in the know ask for first. We trim and weigh it to a specification that fits restaurant cooking, ready to use from side dish to main.",
    features: ["Springy texture", "Rare cut", "Restaurant-specification packaging"],
    process: "Precision deboning → Trimming → Weighing → Vacuum packaging",
    packaging: "Frozen, 300 g vacuum pack · morning orders ship same day",
    useCases: ["Specialty-cut grilling", "Direct-flame dishes", "Specialty-cut platter"],
  },
  "seolhasal-300g": {
    name: "Pork Tongue-Root Meat (Seolha-sal) 300 g",
    summary: "The same texture from every lot you receive",
    story:
      "Tongue-root meat varies widely from piece to piece, so the trimming standard determines quality. We sort and trim to SAERIM's standard to keep your cooking results consistent.",
    features: ["Distinctive texture", "Sorted and trimmed", "Stable volume supply"],
    process: "Deboning right after slaughter → Sorting & trimming → Hygiene inspection → Frozen packaging",
    packaging: "Frozen, 300 g vacuum pack · case-unit wholesale pricing",
    useCases: ["Main item for specialty-cut grill restaurants", "Charcoal grilling", "Set menus"],
  },
  "boiled-daechang": {
    name: "Boiled Pork Large Intestine (Daechang)",
    summary: "Large intestine that only needs reheating — the odor work is done",
    story:
      "The flavor of large intestine is decided in the cleaning and boiling. SAERIM standardized washing and heating right after slaughter, so restaurants can put it straight into cooking without worrying about odor.",
    features: ["Odor-reducing heat processing", "Uniform washing standard", "Food-service bulk volumes available"],
    process: "Receiving inspection → Purified-water washing → Heat processing → Metal detection → Frozen packaging",
    packaging: "Frozen bulk/vacuum · food-service volume · orders before 10:00 KST ship same day",
    useCases: ["Gopchang hot pot · daechang hot pot", "Gukbap topping", "Side ingredient for grilled dishes"],
  },
  "modeum-naejang": {
    name: "Assorted Pork Offal (small intestine · heart · stomach)",
    summary: "One case completes your gukbap toppings — no need to buy each cut separately",
    story:
      "A bowl of sundae-gukbap takes three or four kinds of offal. Sourcing each cut from a different supplier means uneven quality and delivery. SAERIM boils small intestine, heart and stomach to the same process standard and packs them as one assortment.",
    features: ["Three cuts in one assortment", "Uniform quality from one process standard", "Simpler inventory management"],
    process: "Washing by cut → Heat processing → Chilling → Combining & weighing → Frozen packaging",
    packaging: "Frozen, 1 kg pack · recurring delivery schedule available",
    useCases: ["Sundae-gukbap · offal soup", "Assorted bar-snack platter", "Gopchang hot pot"],
  },
  "meori-banbeol": {
    name: "Pork Half Head",
    summary: "Half-head raw material for restaurants that boil their own — SAERIM has finished the trimming",
    story:
      "For restaurants that make their own broth and pressed pork, the condition of the raw material is the taste of the day. SAERIM supplies cleanly trimmed half heads under the same inspection standard as its 1,500-heads-per-day heat-processing line.",
    features: ["Inspection standard of the 1,500 heads/day line", "Raw material for restaurants that boil in-house", "Stable volume supply"],
    process: "Receiving inspection → Washing → Trimming → Hygiene inspection → Chilled/frozen packaging",
    packaging: "Chilled -2 to 10℃ / frozen ≤ -18℃ · food-service specification",
    useCases: ["Gukbap broth · in-house pressed pork", "Pork head meat platter", "Sundae-gukbap restaurants"],
  },
  "gan-heopa-yeomtong": {
    name: "Pork Liver · Lung · Heart",
    summary: "Sundae-plate sides, portioned by cut",
    story:
      "A plate of sundae (Korean blood sausage) is completed by the offal served with it. SAERIM produces liver, lung and heart to a specification for each cut, so restaurants can combine exactly the assortment they need.",
    features: ["Produced to specification by cut", "Combine only the cuts you need", "Same-day shipping system"],
    process: "Inspection by cut → Washing → Heat processing → Slicing → Frozen packaging",
    packaging: "Frozen, portioned by cut · food-service volume available",
    useCases: ["Sundae side dishes", "Offal soup", "Bar-snack assortments"],
  },
  "boiled-makchang": {
    name: "Boiled Pork Makchang (Rectum)",
    summary: "Makchang that goes straight to the grill, no boiling time",
    story:
      "The bottleneck in grilled makchang is the pre-boil. SAERIM finishes the washing and boiling before shipping, so all that is left for the restaurant is to put it over the fire. Tables turn faster and the taste stays consistent.",
    features: ["Supplied pre-boiled", "Odor-reduction process", "Faster grill table turnover"],
    process: "Washing → Heat processing (boiling) → Chilling → Hygiene inspection → Frozen packaging",
    packaging: "Frozen vacuum pack · case-unit wholesale pricing",
    useCases: ["Grilled makchang restaurants", "Charcoal pre-grilled dishes", "Street-stall bar snacks"],
  },
  "raw-makchang": {
    name: "Raw Pork Makchang (Rectum)",
    summary: "Raw makchang for restaurants that want to pre-grill their own way",
    story:
      "For some restaurants, the pre-cooking method is the signature. For them we prepared raw makchang with only the washing and trimming finished to SAERIM's standard. How you boil it is yours to decide.",
    features: ["Supplied raw, washed and trimmed", "Each restaurant chooses its own pre-cooking method", "Shipped fresh right after slaughter"],
    process: "Receiving right after slaughter → Purified-water washing → Trimming → Hygiene inspection → Chilled/frozen packaging",
    packaging: "Chilled or frozen · vacuum pack",
    useCases: ["Grilled makchang restaurants", "Direct-flame pre-grilled dishes", "Hot pot"],
  },
  doraechang: {
    name: "Pork Doraechang",
    summary: "One of the few suppliers that lets you put \"doraechang\" on your menu",
    story:
      "Doraechang comes in such small volumes that few suppliers handle it at all. Because SAERIM runs its own slaughter-and-deboning line, it can collect and supply it steadily. Set your menu apart from competing restaurants.",
    features: ["Stable sourcing of a rare cut", "Shipped direct from our own line", "Ingredient for a differentiated menu"],
    process: "Deboning right after slaughter → Sorting → Washing → Hygiene inspection → Frozen packaging",
    packaging: "Frozen vacuum pack · volume by prior arrangement",
    useCases: ["Specialty-cut grill restaurants", "Doraechang hot pot", "Limited-edition menus"],
  },
};

export const qualitySteps: Record<number, QualityOverlay> = {
  1: {
    name: "Receiving",
    nameEn: "RECEIVING",
    summary: "Records begin the moment raw material arrives at the plant.",
    detail:
      "We check the traceability information and transport temperature of raw meat and secondary ingredients, and record them by lot together with the receiving time.",
    metric: "Receiving vehicle temperature ≤ -18℃ (frozen) · traceability check 100%",
  },
  2: {
    name: "Inspection",
    nameEn: "INSPECTION",
    summary: "Raw material below standard never reaches the line.",
    detail:
      "Nonconforming raw material is isolated through sensory and specification inspection. Inspection records are kept by lot.",
    metric: "Every lot inspected · nonconforming raw material returned immediately",
  },
  3: {
    name: "Processing",
    nameEn: "PROCESSING",
    summary: "Washing, heat processing, trimming — standardized processes separated by product group.",
    detail:
      "Process lines for soup & stew ingredients and for specialty pork cuts are operated separately to block cross-contamination and reduce quality variation.",
    metric: "Core temperature control in heat processing · work standards for every process",
  },
  4: {
    name: "Metal detection",
    nameEn: "METAL DETECTION",
    summary: "Every product must pass a metal detector to move on.",
    detail:
      "All products pass a metal detector before packaging. On detection, the entire lot is isolated and the cause is traced.",
    metric: "100% metal detection (Fe 2 mm · SUS 5 mm) · foreign matter inspection in a 1,000 lux clean room",
  },
  5: {
    name: "Microbial control",
    nameEn: "MICROBIAL CONTROL",
    summary: "Invisible risks are controlled through regular testing.",
    detail:
      "Products, equipment and the working environment are tested regularly for microorganisms. If a limit is exceeded, production stops and the cause is removed.",
    metric: "Ongoing bacteria and antibiotic-residue testing · weekly hygiene training",
  },
  6: {
    name: "Packaging",
    nameEn: "PACKAGING",
    summary: "Vacuum, thermoforming, bulk — packaging specifications matched to use.",
    detail:
      "From portion packs sized to restaurant use to large bulk packs, labeling and weight are verified before sealing.",
    metric: "100% weight inspection · labeling double-checked",
  },
  7: {
    name: "Cold chain",
    nameEn: "COLD CHAIN",
    summary: "Temperature is never broken from shipping to arrival.",
    detail:
      "After rapid chilling, products are stored frozen, and temperature is maintained across the entire delivery route by refrigerated trucks and frozen parcel service.",
    metric: "Chilled -2 to 10℃ · frozen ≤ -18℃ · real-time temperature check before delivery · 8 refrigerated box trucks",
  },
  8: {
    name: "Shipping",
    nameEn: "SHIPPING",
    summary: "Orders before 10:00 KST ship the same day as a rule.",
    detail:
      "Picking, inspection and shipping start as soon as orders close. The lot number tells us which product went where.",
    metric: "Morning orders ship same day · lot traceability 100%",
  },
};

export const news: Record<string, NewsOverlay> = {
  "brand-platform-launch": {
    title: "SAERIM begins its transition to a brand platform",
    category: "Story",
    summary:
      "From a company that sells products to the infrastructure that prepares the restaurant industry. SAERIM reorganizes its brand system.",
    body: "SAERIM started in Gunsan in 2014 and has followed a single path in livestock product manufacturing.\n\nNow SAERIM brings its two channel brands, Gukbap Exchange and Yuksik Note, and its three plants in Gunsan, Gimje and Yongin into one system, becoming the food infrastructure that supports its partners' growth.\n\nHowever many brands there are, the quality standard is one. SAERIM's 8-step quality journey applies equally to every brand and every plant.",
  },
  "quality-journey": {
    title: "From receiving to shipping — SAERIM's 8-step quality journey",
    category: "Story",
    summary: "The trust in a bowl of gukbap is built in eight steps at the plant.",
    body: "SAERIM's quality control begins the moment raw material arrives at the plant.\n\nReceiving, inspection, processing, metal detection, microbial control, packaging, cold chain, shipping — each of the eight steps has its own control figures, and every lot leaves a record.\n\nYou can explore the details interactively on the QUALITY page.",
  },
  "oem-partnership-open": {
    title: "OEM partnership consultations now open",
    category: "Notice",
    summary:
      "Behind your brand, SAERIM will stand. We now accept OEM consultations for ham & processed meat, soup ingredients and HMR.",
    body: "Partner-brand products are made on the ham and processed meat line at the Yongin plant and the by-product washing and heating line at the Gimje plant.\n\nRecipe implementation, specification design and labeling review all proceed within SAERIM's quality system.\n\nCheck the items we can produce on the OEM page and leave us an inquiry.",
  },
};

export const storeLinks: Record<number, StoreLinkOverlay> = {
  1: {
    name: "Naver Smart Store",
    description: "Buy SAERIM products directly in small quantities.",
  },
  2: {
    name: "KakaoTalk Channel chat",
    description: "Mon–Fri 09:00–18:00 KST, answered in real time.",
  },
};

/** 제품 카테고리 표시명 (필터 값은 한국어 원문 키를 그대로 유지한다) */
export const categories: Record<string, string> = {
  국탕류: "Soup & stew ingredients",
  뒷고기류: "Specialty pork cuts",
};
