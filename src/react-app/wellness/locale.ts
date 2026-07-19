import type { DiscoveryStage, LocalizedChoice, WellnessLocale } from "./types";

export const copy = {
	en: {
		brandTagline: "Wellness, built gently",
		nav: {
			how: "How it works",
			journey: "Eight-week journey",
			pricing: "Pricing",
			safety: "Safety & privacy",
			signIn: "Sign in",
		},
		heroEyebrow: "A calmer way to build healthier routines",
		heroTitle: "Meet SARA. Build healthier routines through small daily actions.",
		heroBody:
			"SARA helps you improve your energy, movement, meals, sleep and consistency through a personalized eight-week wellness journey.",
		opening:
			"Hi, I’m SARA 👋\n\nI’ll help you create a realistic wellness routine that fits your life.\n\nWhat would you most like to improve right now?",
		composerLabel: "Tell SARA what you would like to improve",
		composerPlaceholder: "Tell SARA what you would like to improve…",
		send: "Send",
		reset: "Start again",
		privacyHint: "No signup needed to explore. This preview stays in your browser.",
		previewTitle: "Your eight-week starting point",
		previewIntro: "Based on your answers, I would begin with:",
		previewClosing:
			"No extreme plan. We’ll adjust gradually based on what works for you.",
		saveTitle: "Your wellness journey is ready to be saved.",
		saveBody: "Create your private WUJUD account to continue with SARA.",
		saveCta: "Create my wellness journey",
		prototype: "Prototype — account creation is not connected",
		loadingMore: "Preparing the rest of your wellness preview…",
		sections: {
			areasEyebrow: "Five connected areas",
			areasTitle: "Wellness is more than one number.",
			areasBody:
				"SARA helps you notice patterns and choose practical actions without calorie pressure, body comparison or all-or-nothing rules.",
			dailyEyebrow: "A daily companion",
			dailyTitle: "Support that meets you where the day actually is.",
			journeyEyebrow: "The eight-week journey",
			journeyTitle: "Build a routine you can continue on your own.",
			safetyEyebrow: "Safety & privacy",
			safetyTitle: "Clear boundaries. Your choices stay yours.",
			pricingEyebrow: "Pricing prototype",
			pricingTitle: "Simple support, with room to continue.",
			humanTitle: "When general wellness support is not enough",
			humanBody:
				"When a question needs professional expertise, SARA can guide you toward appropriate qualified support. WUJUD does not claim to operate a live professional network today.",
		},
	},
	ar: {
		brandTagline: "عافية بخطوات هادئة",
		nav: {
			how: "كيف تعمل",
			journey: "رحلة الثمانية أسابيع",
			pricing: "الأسعار",
			safety: "السلامة والخصوصية",
			signIn: "تسجيل الدخول",
		},
		heroEyebrow: "طريقة أهدأ لبناء عادات صحية",
		heroTitle: "تعرّف على سارة، رفيقتك اليومية لبناء عادات صحية بخطوات بسيطة",
		heroBody:
			"تساعدك سارة على تحسين طاقتك وحركتك ووجباتك ونومك واستمراريتك خلال رحلة عافية شخصية تمتد لثمانية أسابيع.",
		opening:
			"مرحباً، أنا سارة 👋\n\nسأساعدك على بناء روتين صحي واقعي يناسب حياتك.\n\nما أكثر شيء تود تحسينه الآن؟",
		composerLabel: "أخبر سارة بما تود تحسينه",
		composerPlaceholder: "أخبر سارة بما تود تحسينه…",
		send: "إرسال",
		reset: "ابدأ من جديد",
		privacyHint: "لا تحتاج إلى حساب للاستكشاف. تبقى هذه المعاينة في متصفحك.",
		previewTitle: "نقطة البداية لرحلتك من ثمانية أسابيع",
		previewIntro: "بناءً على إجاباتك، أقترح أن نبدأ بـ:",
		previewClosing:
			"لا توجد خطة قاسية. سنعدّل الخطوات تدريجياً بحسب ما يناسبك فعلاً.",
		saveTitle: "رحلتك الصحية جاهزة للحفظ.",
		saveBody: "أنشئ حسابك الخاص في وجود لمتابعة الرحلة مع سارة.",
		saveCta: "أنشئ رحلة العافية الخاصة بي",
		prototype: "نموذج تجريبي — إنشاء الحساب غير متصل",
		loadingMore: "جارٍ تجهيز بقية معاينة العافية…",
		sections: {
			areasEyebrow: "خمسة جوانب مترابطة",
			areasTitle: "العافية أكبر من رقم واحد.",
			areasBody:
				"تساعدك سارة على ملاحظة الأنماط واختيار خطوات عملية من دون ضغط السعرات أو مقارنة الأجسام أو قواعد الكل أو لا شيء.",
			dailyEyebrow: "رفيقة يومية",
			dailyTitle: "دعم يراعي واقع يومك كما هو.",
			journeyEyebrow: "رحلة الثمانية أسابيع",
			journeyTitle: "ابنِ روتيناً يمكنك الاستمرار فيه باستقلالية.",
			safetyEyebrow: "السلامة والخصوصية",
			safetyTitle: "حدود واضحة. خياراتك تبقى بيدك.",
			pricingEyebrow: "نموذج أولي للأسعار",
			pricingTitle: "دعم بسيط، مع مساحة للاستمرار.",
			humanTitle: "عندما تحتاج المسألة إلى خبرة متخصصة",
			humanBody:
				"عندما يحتاج السؤال إلى خبرة مهنية، يمكن لسارة إرشادك نحو دعم مؤهل ومناسب. ولا تدّعي المنصة توفر شبكة متخصصين مباشرة في الوقت الحالي.",
		},
	},
} as const;

const choices: Record<WellnessLocale, Record<DiscoveryStage, LocalizedChoice[]>> = {
	en: {
		goal: [
			{ id: "energy", label: "Better energy" },
			{ id: "sleep", label: "Better sleep" },
			{ id: "movement", label: "Move more" },
			{ id: "meals", label: "Healthier meals" },
			{ id: "consistency", label: "Become more consistent" },
			{ id: "unsure", label: "I’m not sure yet" },
		],
		routine: [
			{ id: "structured", label: "I have a routine most days" },
			{ id: "some", label: "I have a few helpful habits" },
			{ id: "variable", label: "My days change a lot" },
			{ id: "starting", label: "I’m starting from scratch" },
		],
		challenge: [
			{ id: "sleep", label: "Poor sleep" },
			{ id: "meals", label: "Irregular meals" },
			{ id: "sitting", label: "Sitting most of the day" },
			{ id: "stress", label: "Stressful schedule" },
			{ id: "unsure", label: "I’m not sure" },
		],
		supportTime: [
			{ id: "morning", label: "Morning" },
			{ id: "midday", label: "During the day" },
			{ id: "evening", label: "Evening" },
			{ id: "flexible", label: "Keep it flexible" },
		],
		coachingStyle: [
			{ id: "gentle", label: "Gentle encouragement" },
			{ id: "practical", label: "Short and practical" },
			{ id: "reflective", label: "Reflective questions" },
			{ id: "balanced", label: "A balanced mix" },
		],
		preview: [],
	},
	ar: {
		goal: [
			{ id: "energy", label: "طاقة أفضل" },
			{ id: "sleep", label: "نوم أفضل" },
			{ id: "movement", label: "حركة أكثر" },
			{ id: "meals", label: "وجبات أكثر توازناً" },
			{ id: "consistency", label: "استمرارية أفضل" },
			{ id: "unsure", label: "لست متأكداً بعد" },
		],
		routine: [
			{ id: "structured", label: "لدي روتين في معظم الأيام" },
			{ id: "some", label: "لدي بعض العادات المفيدة" },
			{ id: "variable", label: "أيامي متغيرة كثيراً" },
			{ id: "starting", label: "أبدأ من الصفر" },
		],
		challenge: [
			{ id: "sleep", label: "نوم غير كافٍ" },
			{ id: "meals", label: "وجبات غير منتظمة" },
			{ id: "sitting", label: "الجلوس معظم اليوم" },
			{ id: "stress", label: "جدول مليء بالضغوط" },
			{ id: "unsure", label: "لست متأكداً" },
		],
		supportTime: [
			{ id: "morning", label: "الصباح" },
			{ id: "midday", label: "خلال اليوم" },
			{ id: "evening", label: "المساء" },
			{ id: "flexible", label: "وقت مرن" },
		],
		coachingStyle: [
			{ id: "gentle", label: "تشجيع لطيف" },
			{ id: "practical", label: "مختصر وعملي" },
			{ id: "reflective", label: "أسئلة للتأمل" },
			{ id: "balanced", label: "مزيج متوازن" },
		],
		preview: [],
	},
};

export function getChoices(locale: WellnessLocale, stage: DiscoveryStage): LocalizedChoice[] {
	return choices[locale][stage];
}

export function nextQuestion(locale: WellnessLocale, stage: DiscoveryStage): string {
	const questions: Record<WellnessLocale, Record<DiscoveryStage, string>> = {
		en: {
			goal: copy.en.opening,
			routine: "What does your current routine feel like most days?",
			challenge: "What tends to make your routine harder?",
			supportTime: "When would support feel most useful?",
			coachingStyle: "How would you like SARA to support you?",
			preview: "",
		},
		ar: {
			goal: copy.ar.opening,
			routine: "كيف يبدو روتينك الحالي في معظم الأيام؟",
			challenge: "ما أكثر شيء يجعل الالتزام بروتينك أصعب؟",
			supportTime: "متى يكون دعم سارة أكثر فائدة لك؟",
			coachingStyle: "كيف تفضّل أن تدعمك سارة؟",
			preview: "",
		},
	};
	return questions[locale][stage];
}

export function wellnessAreaCopy(locale: WellnessLocale) {
	return locale === "en"
		? [
				["Energy", "Notice what restores or drains you, then choose one realistic response."],
				["Movement", "Build flexible movement into ordinary days without extreme targets."],
				["Meals", "Reflect on regularity, variety and practical choices—not restriction."],
				["Sleep", "Create cues that support rest without promising perfect nights."],
				["Consistency", "Recover after missed days without shame, pressure or punishment."],
			]
		: [
				["الطاقة", "لاحظ ما يمنحك الطاقة أو يستنزفها، ثم اختر استجابة واقعية واحدة."],
				["الحركة", "أدخل حركة مرنة في يومك العادي من دون أهداف قاسية."],
				["الوجبات", "فكّر في الانتظام والتنوع والاختيارات العملية، لا الحرمان."],
				["النوم", "ابنِ إشارات تساعد على الراحة من دون وعود بليالٍ مثالية."],
				["الاستمرارية", "عُد بعد الأيام الصعبة من دون لوم أو ضغط أو عقاب."],
			];
}
