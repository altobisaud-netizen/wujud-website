export const WELLNESS_PUBLIC_ROUTES = [
	"/",
	"/how-it-works",
	"/eight-week-journey",
	"/pricing",
	"/safety",
	"/about",
	"/privacy",
	"/terms",
	"/data-deletion",
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
			title: "Wellness SARA | Your Private AI Wellness Coach",
			description:
				"Build healthier routines through simple daily check-ins, realistic habits, and a private wellness journey with SARA by WUJUD.ai.",
			ogTitle: "Wellness SARA | Your Private AI Wellness Coach",
			ogDescription:
				"Build healthier routines through simple daily check-ins, realistic habits, and a private wellness journey with SARA by WUJUD.ai.",
		},
		ar: {
			title: "Wellness SARA | مدربك الخاص للعافية بالذكاء الاصطناعي",
			description:
				"ابنِ عادات صحية أفضل عبر متابعات يومية بسيطة وعادات واقعية ورحلة عافية خاصة مع سارة من WUJUD.ai.",
			ogTitle: "Wellness SARA | مدربك الخاص للعافية",
			ogDescription:
				"ابنِ عادات صحية أفضل عبر متابعات يومية بسيطة وعادات واقعية ورحلة عافية خاصة مع سارة من WUJUD.ai.",
		},
	},
	"/how-it-works": {
		canonicalPath: "/how-it-works",
		indexability: "index, follow",
		en: {
			title: "How SARA Works | Wellness SARA",
			description:
				"See how SARA uses daily check-ins, realistic habits, and an adaptable eight-week wellness journey.",
			ogTitle: "How SARA Works",
			ogDescription:
				"Understand how SARA helps you choose priorities, check in regularly, and adapt your wellness journey.",
		},
		ar: {
			title: "كيف تعمل سارا | Wellness SARA",
			description:
				"تعرّف على كيفية استخدام سارة للمتابعة اليومية والعادات الواقعية ورحلة العافية المرنة لمدة ثمانية أسابيع.",
			ogTitle: "كيف تعمل سارا",
			ogDescription:
				"افهم كيف تساعدك سارة على اختيار الأولويات والمتابعة بانتظام وتكييف رحلة العافية.",
		},
	},
	"/eight-week-journey": {
		canonicalPath: "/eight-week-journey",
		indexability: "index, follow",
		en: {
			title: "The Eight-Week Wellness Journey | Wellness SARA",
			description:
				"Explore Wellness SARA's structured eight-week journey, from understanding your routine to building an independent continuation plan.",
			ogTitle: "Your Flexible Eight-Week Wellness Journey",
			ogDescription:
				"Eight realistic stages for learning, adapting and continuing without guaranteed health outcomes.",
		},
		ar: {
			title: "رحلة العافية في ثمانية أسابيع | Wellness SARA",
			description:
				"استكشف رحلة Wellness SARA المنظمة لثمانية أسابيع، من فهم روتينك إلى بناء خطة استمرار مستقلة.",
			ogTitle: "رحلتك المرنة للعافية في ثمانية أسابيع",
			ogDescription: "ثماني مراحل واقعية للتعلّم والتكيف والاستمرار من دون نتائج صحية مضمونة.",
		},
	},
	"/pricing": {
		canonicalPath: "/pricing",
		indexability: "index, follow",
		en: {
			title: "Launch Access | Wellness SARA",
			description:
				"Join the Wellness SARA launch list for early access. Pricing will be announced after the early-access phase.",
			ogTitle: "Plans designed for your wellness journey",
			ogDescription:
				"Join the launch list and be the first to know when full plans and pricing become available. No payment required.",
		},
		ar: {
			title: "الوصول المبكر | Wellness SARA",
			description:
				"انضم إلى قائمة إطلاق Wellness SARA للوصول المبكر. ستُعلَن الأسعار بعد مرحلة الوصول المبكر.",
			ogTitle: "خطط مصممة لرحلة العافية",
			ogDescription:
				"انضم إلى قائمة الإطلاق لتكون أول من يعرف متى تتوفر الخطط الكاملة والأسعار. لا يلزم أي دفع.",
		},
	},
	"/safety": {
		canonicalPath: "/safety",
		indexability: "index, follow",
		en: {
			title: "Safety and Privacy Boundaries | Wellness SARA",
			description:
				"Understand SARA's general-wellness scope, medical boundaries, user controls and urgent-support guidance.",
			ogTitle: "SARA Safety and Privacy Boundaries",
			ogDescription:
				"General wellness support with clear medical limits, user controls and urgent-support guidance.",
		},
		ar: {
			title: "حدود السلامة والخصوصية | Wellness SARA",
			description:
				"افهم نطاق سارة للعافية العامة وحدودها الطبية وخيارات تحكم المستخدم وإرشادات الدعم العاجل.",
			ogTitle: "حدود السلامة والخصوصية لدى سارة",
			ogDescription: "دعم عام للعافية مع حدود طبية واضحة وتحكم للمستخدم وإرشادات للحالات العاجلة.",
		},
	},
	"/about": {
		canonicalPath: "/about",
		indexability: "index, follow",
		en: {
			title: "About Wellness SARA | WUJUD.ai",
			description:
				"Wellness SARA is built by WUJUD.ai, an Oman-based technology initiative focused on practical, human-centered wellness support.",
			ogTitle: "Built with purpose in Oman",
			ogDescription:
				"Learn about Wellness SARA, built by WUJUD.ai to make everyday wellness support more personal, private, and achievable.",
		},
		ar: {
			title: "عن Wellness SARA | WUJUD.ai",
			description:
				"Wellness SARA من WUJUD.ai، مبادرة تقنية عُمانية تركز على دعم عملي وإنساني للعافية اليومية.",
			ogTitle: "صُنعت بقصد في عُمان",
			ogDescription:
				"تعرّف على Wellness SARA من WUJUD.ai، لجعل دعم العافية اليومي أكثر شخصية وخصوصية وقابلية للتحقيق.",
		},
	},
	"/privacy": {
		canonicalPath: "/privacy",
		indexability: "index, follow",
		en: {
			title: "Privacy Policy | Wellness SARA by WUJUD.ai",
			description:
				"How Wellness SARA by WUJUD.ai handles account data, consent choices, optional operational notifications and user controls.",
			ogTitle: "Wellness SARA Privacy Policy",
			ogDescription:
				"Learn how Wellness SARA handles account data, consent, optional notifications and deletion requests.",
		},
		ar: {
			title: "سياسة الخصوصية | Wellness SARA من WUJUD.ai",
			description:
				"كيف تتعامل Wellness SARA من WUJUD.ai مع بيانات الحساب وموافقاتك والإشعارات التشغيلية الاختيارية وخيارات التحكم.",
			ogTitle: "سياسة خصوصية Wellness SARA",
			ogDescription:
				"تعرّف على كيفية تعامل Wellness SARA مع بيانات الحساب والموافقة والإشعارات الاختيارية وطلبات الحذف.",
		},
	},
	"/terms": {
		canonicalPath: "/terms",
		indexability: "index, follow",
		en: {
			title: "Terms of Use | Wellness SARA by WUJUD.ai",
			description:
				"Terms for Wellness SARA early access on WUJUD.ai, including general-wellness scope, user controls and service boundaries.",
			ogTitle: "Wellness SARA Terms of Use",
			ogDescription:
				"Read the Wellness SARA terms, including general-wellness scope and clear service boundaries.",
		},
		ar: {
			title: "شروط الاستخدام | Wellness SARA من WUJUD.ai",
			description:
				"شروط استخدام Wellness SARA في مرحلة الوصول المبكر على WUJUD.ai، بما في ذلك نطاق العافية العامة وحدود الخدمة.",
			ogTitle: "شروط استخدام Wellness SARA",
			ogDescription: "اقرأ شروط Wellness SARA، بما في ذلك نطاق العافية العامة وحدود الخدمة.",
		},
	},
	"/data-deletion": {
		canonicalPath: "/data-deletion",
		indexability: "index, follow",
		en: {
			title: "Data Deletion | Wellness SARA by WUJUD.ai",
			description:
				"How to request deletion of Wellness SARA account data and associated optional contact information.",
			ogTitle: "Wellness SARA Data Deletion",
			ogDescription:
				"Request deletion of Wellness SARA account data and associated optional contact information.",
		},
		ar: {
			title: "حذف البيانات | Wellness SARA من WUJUD.ai",
			description:
				"كيفية طلب حذف بيانات حساب Wellness SARA ومعلومات الاتصال الاختيارية المرتبطة به.",
			ogTitle: "حذف بيانات Wellness SARA",
			ogDescription:
				"اطلب حذف بيانات حساب Wellness SARA ومعلومات الاتصال الاختيارية المرتبطة.",
		},
	},
	"/contact": {
		canonicalPath: "/contact",
		indexability: "index, follow",
		en: {
			title: "Contact Wellness SARA",
			description:
				"Contact Wellness SARA support for account, privacy, safety or data-deletion questions.",
			ogTitle: "Contact Wellness SARA",
			ogDescription:
				"Reach Wellness SARA support for account, privacy, safety or data-deletion questions.",
		},
		ar: {
			title: "تواصل مع Wellness SARA",
			description: "تواصل مع دعم Wellness SARA لأسئلة الحساب أو الخصوصية أو السلامة أو حذف البيانات.",
			ogTitle: "تواصل مع Wellness SARA",
			ogDescription: "تواصل مع دعم Wellness SARA لأسئلة الحساب أو الخصوصية أو السلامة أو حذف البيانات.",
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
