import type { Locale } from "@/lib/i18n/config";

type FactoryVideo = {
  id: string;
  titles: Record<Locale, string>;
};

// Official SAERIM videos supplied by the company. Keep branch associations explicit.
const FACTORY_VIDEOS: Record<string, FactoryVideo> = {
  gimje: {
    id: "4pXO82VN6bQ",
    titles: { ko: "김제지사 현장소개", en: "Inside the Gimje branch", zh: "走进金堤分厂" },
  },
  yongin: {
    id: "Y2fNzjaCV54",
    titles: { ko: "용인공장 소개", en: "Inside the Yongin factory", zh: "走进龙仁工厂" },
  },
};

export const factoryVideoText = {
  ko: {
    kicker: "INSIDE SAERIM",
    title: "새림의 현장을 만나보세요.",
    lead: "김제지사와 용인공장을 영상으로 소개합니다.",
    play: "소개영상 재생",
    watch: "YouTube에서 보기",
    detail: "공장 자세히 보기",
    detailKicker: "FACTORY FILM",
  },
  en: {
    kicker: "INSIDE SAERIM",
    title: "See where we work.",
    lead: "Explore our Gimje branch and Yongin factory on film.",
    play: "Play introduction video",
    watch: "Watch on YouTube",
    detail: "Explore this factory",
    detailKicker: "FACTORY FILM",
  },
  zh: {
    kicker: "INSIDE SAERIM",
    title: "走进 SAERIM 的生产现场。",
    lead: "通过视频，了解金堤分厂与龙仁工厂。",
    play: "播放介绍视频",
    watch: "在 YouTube 上观看",
    detail: "了解工厂详情",
    detailKicker: "FACTORY FILM",
  },
} satisfies Record<Locale, Record<string, string>>;

export function getFactoryVideo(slug: string, locale: Locale) {
  const video = FACTORY_VIDEOS[slug];
  return video ? { id: video.id, title: video.titles[locale] } : null;
}
