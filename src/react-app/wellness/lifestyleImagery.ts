/**
 * Inclusive lifestyle imagery for the conversion homepage.
 * Uses approved WebP assets under /images/wellness/conversion/.
 * The layout-reference PNG must never be imported or shipped here.
 */
import type { WellnessLocale } from "./types";

export type LifestyleVisual = {
	id: string;
	src: string;
	srcPng: string;
	width: number;
	height: number;
	genderFocus: "women" | "men" | "mixed";
	hijab?: boolean;
	alt: { en: string; ar: string };
	label: { en: string; ar: string };
	title: { en: string; ar: string };
	body: { en: string; ar: string };
};

const BASE = "/images/wellness/conversion";

export const heroVisual: LifestyleVisual = {
	id: "hero-arab-man-woman-outdoor",
	src: `${BASE}/hero-arab-man-woman-outdoor.webp`,
	srcPng: `${BASE}/hero-arab-man-woman-outdoor.png`,
	width: 900,
	height: 1200,
	genderFocus: "mixed",
	hijab: true,
	alt: {
		en: "An Arab man and an Arab woman wearing a hijab outdoors in natural light, looking refreshed",
		ar: "رجل عربي وامرأة عربية محجبة في الهواء الطلق بضوء طبيعي، يبدوان منتعشين",
	},
	label: { en: "Everyday wellbeing", ar: "عافية يومية" },
	title: { en: "Everyday wellbeing", ar: "عافية يومية" },
	body: { en: "", ar: "" },
};

export const outcomeVisuals: LifestyleVisual[] = [
	{
		id: "wellness-daily-energy-man",
		src: `${BASE}/wellness-daily-energy-man.webp`,
		srcPng: `${BASE}/wellness-daily-energy-man.png`,
		width: 800,
		height: 1000,
		genderFocus: "men",
		alt: {
			en: "An Arab man practicing light outdoor activity",
			ar: "رجل عربي يمارس نشاطاً خفيفاً في الهواء الطلق",
		},
		label: { en: "Better energy", ar: "طاقة أفضل" },
		title: {
			en: "Better energy through the day",
			ar: "طاقة أفضل خلال اليوم",
		},
		body: {
			en: "Small steps that help you build a more active routine.",
			ar: "خطوات صغيرة تساعدك على بناء روتين أكثر نشاطاً.",
		},
	},
	{
		id: "wellness-sleep-routine",
		src: `${BASE}/wellness-sleep-routine.webp`,
		srcPng: `${BASE}/wellness-sleep-routine.png`,
		width: 800,
		height: 1000,
		genderFocus: "women",
		alt: {
			en: "A woman resting in bed as part of a calm sleep routine",
			ar: "امرأة تستريح في سريرها ضمن روتين نوم هادئ",
		},
		label: { en: "Calmer sleep", ar: "نوم أهدأ" },
		title: {
			en: "A calmer sleep routine",
			ar: "روتين نوم أهدأ",
		},
		body: {
			en: "Evening and morning habits that fit your schedule.",
			ar: "عادات مسائية وصباحية تناسب جدولك.",
		},
	},
	{
		id: "wellness-balanced-meal",
		src: `${BASE}/wellness-balanced-meal.webp`,
		srcPng: `${BASE}/wellness-balanced-meal.png`,
		width: 800,
		height: 1000,
		genderFocus: "mixed",
		alt: {
			en: "A varied plate with vegetables and balanced everyday foods",
			ar: "وجبة متنوعة تضم خضروات ومكونات غذائية متوازنة",
		},
		label: { en: "Balanced choices", ar: "خيارات متوازنة" },
		title: {
			en: "More balanced daily choices",
			ar: "خيارات يومية أكثر توازناً",
		},
		body: {
			en: "Focus on regularity and variety without restriction.",
			ar: "تركيز على الانتظام والتنوع دون حرمان.",
		},
	},
	{
		id: "wellness-consistent-movement-man",
		src: `${BASE}/wellness-consistent-movement-man.webp`,
		srcPng: `${BASE}/wellness-consistent-movement-man.png`,
		width: 800,
		height: 1000,
		genderFocus: "men",
		alt: {
			en: "An Arab man moving within a realistic daily routine",
			ar: "رجل عربي يتحرك ضمن روتين يومي واقعي",
		},
		label: { en: "Consistent movement", ar: "حركة مستمرة" },
		title: {
			en: "More consistent movement",
			ar: "حركة أكثر باستمرارية",
		},
		body: {
			en: "Realistic activity without pressure or extremes.",
			ar: "نشاط واقعي دون ضغط أو مبالغة.",
		},
	},
	{
		id: "wellness-calm-hijabi-woman",
		src: `${BASE}/wellness-calm-hijabi-woman.webp`,
		srcPng: `${BASE}/wellness-calm-hijabi-woman.png`,
		width: 800,
		height: 1000,
		genderFocus: "women",
		hijab: true,
		alt: {
			en: "An Arab woman wearing a hijab in a calm moment of reflection and rest",
			ar: "امرأة عربية محجبة تمارس لحظة هادئة للتأمل والاسترخاء",
		},
		label: { en: "Calmer focus", ar: "هدوء وتركيز" },
		title: {
			en: "A calmer, more focused day",
			ar: "يوم أكثر هدوءاً وتركيزاً",
		},
		body: {
			en: "Simple reviews that help you notice what fits.",
			ar: "مراجعات بسيطة تساعدك على فهم ما يناسبك.",
		},
	},
];

/** @deprecated Prefer heroVisual — kept for existing imports. */
export function heroLifestyleVisual() {
	return heroVisual;
}

/** @deprecated Prefer outcomeVisuals constant export. */
export function getOutcomeVisuals() {
	return outcomeVisuals;
}

export function altFor(visual: LifestyleVisual, locale: WellnessLocale) {
	return visual.alt[locale];
}

export const CONVERSION_ASSET_PATHS = [
	heroVisual.src,
	heroVisual.srcPng,
	...outcomeVisuals.flatMap((item) => [item.src, item.srcPng]),
];

export const LAYOUT_REFERENCE_FORBIDDEN = [
	"wujud_sara_conversion_layout_reference",
	"conversion_layout_reference",
];
