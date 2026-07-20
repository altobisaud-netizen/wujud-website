export const WELLNESS_PUBLIC_ROUTES = [
	"/",
	"/how-it-works",
	"/eight-week-journey",
	"/pricing",
	"/safety",
	"/privacy",
	"/terms",
	"/contact",
] as const;

export type WellnessPublicPath = (typeof WELLNESS_PUBLIC_ROUTES)[number];
export type WellnessMetadataLocale = "en" | "ar";

type LocalizedMetadata = {
	title: string;
	description: string;
	ogTitle: string;
	ogDescription: string;
};

export type WellnessRouteMetadata = {
	canonicalPath: WellnessPublicPath;
	indexability: "index, follow";
	en: LocalizedMetadata;
	ar: LocalizedMetadata;
};

export const wellnessRouteMetadata: Record<WellnessPublicPath, WellnessRouteMetadata> = {
	"/": {
		canonicalPath: "/",
		indexability: "index, follow",
		en: {
			title: "WUJUD — Healthier habits with SARA",
			description:
				"SARA is WUJUD’s daily wellness companion for healthier habits made easier and progress you can feel through small, realistic actions.",
			ogTitle: "Healthier habits made easier with SARA",
			ogDescription:
				"Try an interactive SARA conversation, preview a personalized eight-week journey, and explore provisional subscription options.",
		},
		ar: {
			title: "وجود — عادات صحية أسهل مع سارة",
			description:
				"سارة رفيقتك اليومية من وجود لبناء عادات صحية أسهل ونتائج تشعر بها عبر خطوات بسيطة وواقعية.",
			ogTitle: "عادات صحية أسهل مع سارة",
			ogDescription:
				"جرّب محادثة تفاعلية مع سارة، واطلع على رحلة ثمانية أسابيع شخصية، واستكشف خيارات الاشتراك الأولية.",
		},
	},
	"/how-it-works": {
		canonicalPath: "/how-it-works",
		indexability: "index, follow",
		en: {
			title: "How SARA Works | WUJUD Wellness",
			description:
				"See how SARA uses discovery, daily check-ins, weekly reviews and flexible reminders in the WUJUD wellness prototype.",
			ogTitle: "How SARA Works",
			ogDescription:
				"Understand SARA's discovery journey, daily check-ins, weekly reviews and flexible reminder approach.",
		},
		ar: {
			title: "كيف تعمل سارة | وجود للعافية",
			description:
				"تعرّف على الاستكشاف والمتابعة اليومية والمراجعات الأسبوعية والتذكيرات المرنة في نموذج وجود للعافية.",
			ogTitle: "كيف تعمل سارة",
			ogDescription: "افهم رحلة الاستكشاف والمتابعة اليومية والمراجعات الأسبوعية والتذكيرات المرنة.",
		},
	},
	"/eight-week-journey": {
		canonicalPath: "/eight-week-journey",
		indexability: "index, follow",
		en: {
			title: "The Eight-Week Wellness Journey | WUJUD",
			description:
				"Explore WUJUD's flexible eight-week wellness journey, from understanding your routine to building an independent continuation plan.",
			ogTitle: "Your Flexible Eight-Week Wellness Journey",
			ogDescription:
				"Eight realistic stages for learning, adapting and continuing without guaranteed health outcomes.",
		},
		ar: {
			title: "رحلة العافية في ثمانية أسابيع | وجود",
			description:
				"استكشف رحلة وجود المرنة لثمانية أسابيع، من فهم روتينك إلى بناء خطة استمرار مستقلة.",
			ogTitle: "رحلتك المرنة للعافية في ثمانية أسابيع",
			ogDescription: "ثماني مراحل واقعية للتعلّم والتكيف والاستمرار من دون نتائج صحية مضمونة.",
		},
	},
	"/pricing": {
		canonicalPath: "/pricing",
		indexability: "index, follow",
		en: {
			title: "Pricing Prototype | WUJUD Wellness",
			description:
				"Review WUJUD's provisional wellness plan structure. Pricing and commercial terms remain to be confirmed.",
			ogTitle: "WUJUD Wellness Pricing Prototype",
			ogDescription:
				"See the proposed plan features. No prices or commercial terms have been finalized.",
		},
		ar: {
			title: "نموذج الأسعار | وجود للعافية",
			description: "راجع الهيكل الأولي لخطط وجود للعافية. لم تُعتمد الأسعار أو الشروط التجارية بعد.",
			ogTitle: "نموذج أسعار وجود للعافية",
			ogDescription: "اطّلع على مزايا الخطط المقترحة. لم تُعتمد الأسعار أو الشروط التجارية بعد.",
		},
	},
	"/safety": {
		canonicalPath: "/safety",
		indexability: "index, follow",
		en: {
			title: "Safety and Privacy Boundaries | WUJUD Wellness",
			description:
				"Understand SARA's general-wellness scope, medical boundaries, user controls and urgent-support guidance.",
			ogTitle: "SARA Safety and Privacy Boundaries",
			ogDescription:
				"General wellness support with clear medical limits, user controls and urgent-support guidance.",
		},
		ar: {
			title: "حدود السلامة والخصوصية | وجود للعافية",
			description:
				"افهم نطاق سارة للعافية العامة وحدودها الطبية وخيارات تحكم المستخدم وإرشادات الدعم العاجل.",
			ogTitle: "حدود السلامة والخصوصية لدى سارة",
			ogDescription: "دعم عام للعافية مع حدود طبية واضحة وتحكم للمستخدم وإرشادات للحالات العاجلة.",
		},
	},
	"/privacy": {
		canonicalPath: "/privacy",
		indexability: "index, follow",
		en: {
			title: "Privacy Draft | WUJUD Wellness",
			description:
				"Read the product-review draft of WUJUD's intended wellness privacy approach. Formal legal approval is pending.",
			ogTitle: "WUJUD Wellness Privacy Draft",
			ogDescription:
				"Product-review privacy direction only. Formal legal approval and final retention terms are pending.",
		},
		ar: {
			title: "مسودة الخصوصية | وجود للعافية",
			description: "اقرأ مسودة توجه الخصوصية المقترح لوجود للعافية. ما زالت الموافقة القانونية معلّقة.",
			ogTitle: "مسودة خصوصية وجود للعافية",
			ogDescription: "توجه أولي لمراجعة المنتج فقط. الموافقة القانونية وشروط الاحتفاظ النهائية معلّقة.",
		},
	},
	"/terms": {
		canonicalPath: "/terms",
		indexability: "index, follow",
		en: {
			title: "Terms Draft | WUJUD Wellness",
			description:
				"Read the WUJUD wellness prototype terms for product review. Formal legal and commercial approval is pending.",
			ogTitle: "WUJUD Wellness Terms Draft",
			ogDescription:
				"Prototype terms for product review only; final legal and commercial approval is pending.",
		},
		ar: {
			title: "مسودة الشروط | وجود للعافية",
			description: "اقرأ شروط نموذج وجود للعافية لمراجعة المنتج. الموافقة القانونية والتجارية معلّقة.",
			ogTitle: "مسودة شروط وجود للعافية",
			ogDescription: "شروط نموذج أولي لمراجعة المنتج فقط؛ الموافقة القانونية والتجارية النهائية معلّقة.",
		},
	},
	"/contact": {
		canonicalPath: "/contact",
		indexability: "index, follow",
		en: {
			title: "Contact WUJUD Wellness",
			description:
				"Find the current product-review contact path for questions about WUJUD wellness, SARA and safety boundaries.",
			ogTitle: "Contact WUJUD Wellness",
			ogDescription:
				"Use the accessible product-review contact path for questions about the wellness prototype.",
		},
		ar: {
			title: "تواصل مع وجود للعافية",
			description: "اعثر على وسيلة التواصل الحالية لمراجعة منتج وجود للعافية وسارة وحدود السلامة.",
			ogTitle: "تواصل مع وجود للعافية",
			ogDescription: "استخدم وسيلة التواصل المتاحة لمراجعة نموذج العافية وطرح أسئلتك.",
		},
	},
};

export function normalizeWellnessPath(pathname: string): WellnessPublicPath {
	const normalized = pathname.replace(/\/+$/, "").toLowerCase() || "/";
	return WELLNESS_PUBLIC_ROUTES.includes(normalized as WellnessPublicPath)
		? (normalized as WellnessPublicPath)
		: "/";
}

export function metadataFor(pathname: string, locale: WellnessMetadataLocale) {
	const route = wellnessRouteMetadata[normalizeWellnessPath(pathname)];
	return { ...route[locale], canonicalPath: route.canonicalPath, indexability: route.indexability };
}
