import type { Locale } from "@/lib/i18n/config";

type FactoryVideo = {
  id: string;
  titles: Record<Locale, string>;
  /** true면 영상 대신 '준비중' 화면을 보여 준다. 다시 공개할 때 이 줄만 지우면 된다. */
  paused?: boolean;
};

// Official SAERIM videos supplied by the company. Keep branch associations explicit.
const FACTORY_VIDEOS: Record<string, FactoryVideo> = {
  gimje: {
    id: "4pXO82VN6bQ",
    paused: true,
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
    lead: "본사·김제·용인·임피 공장을 영상으로 소개합니다.",
    play: "소개영상 재생",
    watch: "YouTube에서 보기",
    detail: "공장 자세히 보기",
    detailKicker: "FACTORY FILM",
    preparing: "영상 준비중입니다",
  },
  en: {
    kicker: "INSIDE SAERIM",
    title: "See where we work.",
    lead: "Explore our headquarters, Gimje, Yongin and Impi factories on film.",
    play: "Play introduction video",
    watch: "Watch on YouTube",
    detail: "Explore this factory",
    detailKicker: "FACTORY FILM",
    preparing: "Video coming soon",
  },
  zh: {
    kicker: "INSIDE SAERIM",
    title: "走进 SAERIM 的生产现场。",
    lead: "通过视频，了解总部、金堤、龙仁与临陂工厂。",
    play: "播放介绍视频",
    watch: "在 YouTube 上观看",
    detail: "了解工厂详情",
    detailKicker: "FACTORY FILM",
    preparing: "视频准备中",
  },
} satisfies Record<Locale, Record<string, string>>;

type GalleryFilm = {
  key: string;
  /** 갤러리 칸 제목 */
  heading: Record<Locale, string>;
  /** 공장 상세 페이지가 있으면 그 slug ('공장 자세히 보기' 링크용) */
  factorySlug?: string;
  /** 영상이 아직 없는 칸: 영상 아래 표시할 제목 */
  placeholderTitles?: Record<Locale, string>;
};

// 홈 "새림의 현장을 만나보세요" 섹션의 칸 순서. 영상이 없거나 paused인 칸은 '준비중'으로 보인다.
const GALLERY_FILMS: GalleryFilm[] = [
  {
    key: "gunsan",
    heading: { ko: "본사공장", en: "Headquarters", zh: "总部工厂" },
    factorySlug: "gunsan",
    placeholderTitles: { ko: "본사공장 소개", en: "Inside the headquarters", zh: "走进总部工厂" },
  },
  { key: "gimje", heading: { ko: "김제공장", en: "Gimje factory", zh: "金堤工厂" }, factorySlug: "gimje" },
  { key: "yongin", heading: { ko: "용인공장", en: "Yongin factory", zh: "龙仁工厂" }, factorySlug: "yongin" },
  {
    key: "impi",
    heading: { ko: "임피공장", en: "Impi factory", zh: "临陂工厂" },
    placeholderTitles: { ko: "임피공장 소개", en: "Inside the Impi factory", zh: "走进临陂工厂" },
  },
];

export function getGalleryFilms(locale: Locale) {
  return GALLERY_FILMS.map((film) => {
    const video = getFactoryVideo(film.key, locale);
    return {
      key: film.key,
      heading: film.heading[locale],
      factorySlug: film.factorySlug,
      video: video ?? { id: "", title: film.placeholderTitles?.[locale] ?? film.heading[locale], paused: true },
    };
  });
}

export function getFactoryVideo(slug: string, locale: Locale) {
  const video = FACTORY_VIDEOS[slug];
  return video ? { id: video.id, title: video.titles[locale], paused: video.paused ?? false } : null;
}
