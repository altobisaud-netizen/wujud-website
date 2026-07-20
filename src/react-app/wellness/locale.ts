import type {
	DiscoveryStage,
	LocalizedChoice,
	PersonalizedPreview,
	WellnessLocale,
} from "./types";

export const copy = {
	en: {
		brandTagline: "SARA",
		nav: {
			home: "Home",
			how: "How SARA works",
			journey: "8-week journey",
			learn: "How SARA learns",
			pricing: "Pricing",
			safety: "Safety",
			articles: "Articles",
			signIn: "Sign in coming soon",
			cta: "Start with SARA",
		},
		heroEyebrow: "SARA with you every day",
		heroTitle: "Healthier habits made easier.\nProgress you can feel.",
		heroBody:
			"SARA is your daily wellness companion, helping you build realistic routines that fit your life.",
		heroOutcomes: [
			"Better energy",
			"Calmer sleep",
			"More movement",
			"More balanced daily choices",
			"Consistency without pressure",
		],
		heroPrimaryCta: "Start your journey with SARA",
		heroSecondaryCta: "See how SARA works",
		heroTrust: "No account needed to explore the experience",
		chatStatus: "Interactive preview",
		chatSubtitle: "Your daily wellness companion",
		chatDemoLabel: "Interactive preview — your answers are not saved",
		opening:
			"Hi 👋\nI’m SARA. I’ll help you build a simple healthy routine that fits your day.\n\nWhat would you most like to improve right now?",
		composerLabel: "Tell SARA what you would like to improve",
		composerPlaceholder: "Write what you’d like to improve…",
		send: "Send",
		reset: "Restart",
		undo: "Edit last choice",
		typing: "SARA is typing…",
		privacyHint: "Interactive preview — your answers are not saved.",
		previewTitle: "Your suggested journey with SARA",
		previewIntro: "Based on what you shared, here is a flexible starting point:",
		previewClosing:
			"The journey adapts with you and does not promise guaranteed results.",
		saveTitle: "Subscriptions are not available yet — this is a product preview.",
		saveBody: "Your journey starts with one step. An 8-week plan with daily support, weekly reviews, and full reminder control.",
		saveCta: "Notify me at launch",
		waitlistNote: "No payment is taken. No account is created in this preview.",
		prototype: "Prototype — account creation is not connected",
		loadingMore: "Preparing the rest of your wellness preview…",
		sections: {
			outcomesEyebrow: "Daily goals you can work on",
			outcomesTitle: "Progress you can feel every day",
			outcomesBody: "Small daily actions designed to support ordinary routines—not guaranteed outcomes.",
			howEyebrow: "A clear path",
			howTitle: "How does SARA help you?",
			dailyEyebrow: "Daily conversation examples",
			dailyTitle: "Support that meets the day you actually have",
			journeyEyebrow: "Eight weeks",
			journeyTitle: "An 8-week journey that adapts with you",
			journeyDisclaimer: "The journey adapts with you and does not promise guaranteed results.",
			learnEyebrow: "How SARA learns",
			learnTitle: "How does SARA learn?",
			learnNote: "This preview does not save your information.",
			trustEyebrow: "Trust",
			trustTitle: "Clear boundaries you can rely on",
			trustBody:
				"SARA helps you build a general healthy routine and does not replace healthcare professionals.",
			pricingEyebrow: "Subscription preview",
			pricingTitle: "SARA’s 8-week journey",
			pricingNote: "Price under review",
			pricingCta: "Notify me at launch",
			conversionTitle: "Your journey starts with one step",
			humanTitle: "When general wellness support is not enough",
			humanBody:
				"When a question needs professional expertise, SARA can guide you toward appropriate qualified support. WUJUD does not claim to operate a live professional network today.",
		},
	},
	ar: {
		brandTagline: "سارة",
		nav: {
			home: "الرئيسية",
			how: "كيف تعمل سارة",
			journey: "رحلة 8 أسابيع",
			learn: "كيف تتعلم سارة",
			pricing: "الأسعار",
			safety: "السلامة",
			articles: "المقالات",
			signIn: "تسجيل الدخول قريباً",
			cta: "ابدأ مع سارة",
		},
		heroEyebrow: "سارة معك كل يوم",
		heroTitle: "عادات صحية أسهل\nنتائج حقيقية تدوم",
		heroBody: "سارة رفيقتك اليومية لبناء عادات أفضل بخطوات بسيطة تناسب حياتك.",
		heroOutcomes: [
			"طاقة أفضل",
			"نوم أهدأ",
			"حركة أكثر",
			"خيارات يومية أكثر توازناً",
			"استمرارية دون ضغط",
		],
		heroPrimaryCta: "ابدأ رحلتك مع سارة",
		heroSecondaryCta: "شاهد كيف تعمل سارة",
		heroTrust: "لا تحتاج إلى إنشاء حساب لاستكشاف التجربة",
		chatStatus: "تجربة تفاعلية",
		chatSubtitle: "رفيقتك اليومية للعافية",
		chatDemoLabel: "تجربة توضيحية — لا يتم حفظ بياناتك",
		opening:
			"مرحباً 👋\nأنا سارة. سأساعدك في بناء روتين صحي بسيط يناسب يومك.\n\nما أكثر شيء ترغب في تحسينه الآن؟",
		composerLabel: "أخبر سارة بما ترغب في تحسينه",
		composerPlaceholder: "اكتب ما ترغب في تحسينه...",
		send: "إرسال",
		reset: "إعادة البدء",
		undo: "تعديل الاختيار الأخير",
		typing: "سارة تكتب…",
		privacyHint: "تجربة توضيحية — لا يتم حفظ بياناتك.",
		previewTitle: "رحلتك المقترحة مع سارة",
		previewIntro: "بناءً على ما شاركته، هذه نقطة بداية مرنة:",
		previewClosing: "الرحلة تتكيف معك ولا تَعِد بنتائج مضمونة.",
		saveTitle: "الاشتراك غير متاح بعد — هذه معاينة للمنتج",
		saveBody: "رحلتك تبدأ بخطوة واحدة. رحلة 8 أسابيع بدعم يومي ومراجعات أسبوعية وتحكم كامل بالتذكيرات.",
		saveCta: "أبلغني عند الإطلاق",
		waitlistNote: "لا يتم تحصيل أي دفعة. ولا يُنشأ حساب في هذه المعاينة.",
		prototype: "نموذج تجريبي — إنشاء الحساب غير متصل",
		loadingMore: "جارٍ تجهيز بقية معاينة العافية…",
		sections: {
			outcomesEyebrow: "أهداف يومية يمكنك العمل على تحسينها",
			outcomesTitle: "تقدّم تشعر به في حياتك اليومية",
			outcomesBody: "خطوات يومية صغيرة مصممة لدعم الروتين العادي — وليست نتائج مضمونة.",
			howEyebrow: "مسار واضح",
			howTitle: "كيف تساعدك سارة؟",
			dailyEyebrow: "أمثلة محادثة يومية",
			dailyTitle: "دعم يراعي واقع يومك كما هو",
			journeyEyebrow: "ثمانية أسابيع",
			journeyTitle: "رحلة 8 أسابيع تتكيف معك",
			journeyDisclaimer: "الرحلة تتكيف معك ولا تعد بنتائج مضمونة.",
			learnEyebrow: "كيف تتعلم سارة",
			learnTitle: "كيف تتعلم سارة؟",
			learnNote: "هذه المعاينة لا تحفظ معلوماتك.",
			trustEyebrow: "الثقة",
			trustTitle: "حدود واضحة يمكنك الاعتماد عليها",
			trustBody: "سارة تساعدك في بناء روتين صحي عام، ولا تستبدل المختصين الصحيين.",
			pricingEyebrow: "معاينة الاشتراك",
			pricingTitle: "رحلة سارة لمدة 8 أسابيع",
			pricingNote: "السعر قيد المراجعة",
			pricingCta: "أبلغني عند الإطلاق",
			conversionTitle: "رحلتك تبدأ بخطوة واحدة",
			humanTitle: "عندما تحتاج المسألة إلى خبرة متخصصة",
			humanBody:
				"عندما يحتاج السؤال إلى خبرة مهنية، يمكن لسارة إرشادك نحو دعم مؤهل ومناسب. ولا تدّعي المنصة توفر شبكة متخصصين مباشرة في الوقت الحالي.",
		},
	},
} as const;

const choices: Record<WellnessLocale, Record<DiscoveryStage, LocalizedChoice[]>> = {
	en: {
		goal: [
			{ id: "energy", label: "My energy" },
			{ id: "sleep", label: "My sleep" },
			{ id: "movement", label: "My movement" },
			{ id: "meals", label: "My meals" },
			{ id: "consistency", label: "My consistency" },
			{ id: "unsure", label: "I’m not sure" },
		],
		challenge: [
			{ id: "sleep", label: "Irregular sleep" },
			{ id: "meals", label: "Irregular meals" },
			{ id: "sitting", label: "Sitting for long periods" },
			{ id: "stress", label: "Work pressure" },
			{ id: "unsure", label: "I don’t know" },
		],
		planFit: [
			{ id: "fit", label: "This plan fits me" },
			{ id: "edit", label: "I want to adjust it" },
		],
		journeyAsk: [
			{ id: "showJourney", label: "Yes, show my journey" },
			{ id: "howWorks", label: "How does SARA work?" },
			{ id: "pricing", label: "What does the subscription cost?" },
		],
		preview: [],
	},
	ar: {
		goal: [
			{ id: "energy", label: "طاقتي" },
			{ id: "sleep", label: "نومي" },
			{ id: "movement", label: "حركتي" },
			{ id: "meals", label: "وجباتي" },
			{ id: "consistency", label: "استمراريتي" },
			{ id: "unsure", label: "لست متأكداً" },
		],
		challenge: [
			{ id: "sleep", label: "نوم غير منتظم" },
			{ id: "meals", label: "وجبات غير منتظمة" },
			{ id: "sitting", label: "الجلوس لفترات طويلة" },
			{ id: "stress", label: "ضغط العمل" },
			{ id: "unsure", label: "لا أعرف" },
		],
		planFit: [
			{ id: "fit", label: "هذه الخطة تناسبني" },
			{ id: "edit", label: "أريد تعديلها" },
		],
		journeyAsk: [
			{ id: "showJourney", label: "نعم، اعرض رحلتي" },
			{ id: "howWorks", label: "كيف تعمل سارة؟" },
			{ id: "pricing", label: "ما تكلفة الاشتراك؟" },
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
			challenge: "Great. What affects that most right now?",
			planFit: "",
			journeyAsk:
				"Based on what you shared, I can support you with:\n\n• One realistic daily step\n• Check-ins at a time that suits you\n• A weekly review of your progress\n• Plan adjustments when your day is busy\n• A fresh start without blame after a missed day\n\nWould you like to see what your eight-week journey could look like?",
			preview: "",
		},
		ar: {
			goal: copy.ar.opening,
			challenge: "ممتاز. ما أكثر شيء يؤثر على ذلك الآن؟",
			planFit: "",
			journeyAsk:
				"بناءً على ما شاركته، أستطيع مساعدتك من خلال:\n\n• خطوة يومية واقعية\n• متابعة في الوقت المناسب لك\n• مراجعة أسبوعية لتقدمك\n• تعديل الخطة عندما يكون يومك مزدحماً\n• بداية جديدة دون لوم عند تفويت يوم\n\nهل ترغب في رؤية شكل رحلتك خلال ثمانية أسابيع؟",
			preview: "",
		},
	};
	return questions[locale][stage];
}

export function challengePromptForGoal(goal: string | undefined, locale: WellnessLocale): string {
	if (locale === "ar") {
		const prompts: Record<string, string> = {
			energy: "ممتاز. ما أكثر شيء يؤثر على طاقتك؟",
			sleep: "حسناً. ما أكثر شيء يؤثر على نومك؟",
			movement: "رائع. ما أكثر شيء يؤثر على حركتك؟",
			meals: "حسناً. ما أكثر شيء يؤثر على انتظام وجباتك؟",
			consistency: "جيد. ما أكثر شيء يؤثر على استمراريتك؟",
			unsure: "لا بأس. ما أكثر شيء يجعل بناء روتينك أصعب الآن؟",
		};
		return prompts[goal ?? "unsure"] ?? prompts.unsure;
	}
	const prompts: Record<string, string> = {
		energy: "Great. What affects your energy most?",
		sleep: "Okay. What affects your sleep most?",
		movement: "Nice. What makes movement hardest right now?",
		meals: "Okay. What makes meal routines hardest?",
		consistency: "Good. What makes consistency hardest?",
		unsure: "That’s okay. What makes building a routine hardest right now?",
	};
	return prompts[goal ?? "unsure"] ?? prompts.unsure;
}

export function planSuggestion(goal: string | undefined, challenge: string | undefined, locale: WellnessLocale): string {
	const focus =
		locale === "ar"
			? {
					energy: "طاقتك",
					sleep: "نومك",
					movement: "حركتك",
					meals: "وجباتك",
					consistency: "استمراريته",
					unsure: "روتينك",
				}[goal ?? "unsure"]
			: {
					energy: "your energy",
					sleep: "your sleep",
					movement: "your movement",
					meals: "your meals",
					consistency: "your consistency",
					unsure: "your routine",
				}[goal ?? "unsure"];

	const challengeHint =
		locale === "ar"
			? {
					sleep: "مع مراعاة تحسين انتظام النوم",
					meals: "مع مراعاة انتظام الوجبات",
					sitting: "مع إضافة حركة خفيفة خلال اليوم",
					stress: "مع خطوات أصغر تناسب ضغط العمل",
					unsure: "بخطوات بسيطة يمكن تعديلها",
				}[challenge ?? "unsure"]
			: {
					sleep: "while gently improving sleep rhythm",
					meals: "while improving meal regularity",
					sitting: "while adding light movement during the day",
					stress: "with smaller steps for work pressure",
					unsure: "with simple steps you can adjust",
				}[challenge ?? "unsure"];

	if (locale === "ar") {
		return `سنبدأ بخطوات بسيطة، وليس بتغيير حياتك كلها دفعة واحدة.\n\nأقترح عليك للعمل على ${focus} ${challengeHint}:\n\n• وقت ثابت تقريباً للاستيقاظ\n• متابعة قصيرة للطاقة صباحاً\n• حركة خفيفة خلال اليوم\n• مراجعة بسيطة في المساء\n\nيمكنك قبول هذه البداية أو تعديلها.`;
	}
	return `We’ll start with small steps—not changing your whole life at once.\n\nFor ${focus}, ${challengeHint}, I suggest:\n\n• A roughly consistent wake time\n• A short morning energy check-in\n• Light movement during the day\n• A simple evening review\n\nYou can accept this starting point or adjust it.`;
}

export function wellnessAreaCopy(locale: WellnessLocale) {
	return locale === "en"
		? [
				["Better energy", "Small steps that help you build a more active routine."],
				["Calmer sleep routine", "Evening and morning habits that fit your schedule."],
				["More consistent movement", "Realistic activity without pressure or extremes."],
				["More balanced daily choices", "Focus on regularity and variety—not restriction."],
				["A calmer, more focused day", "Simple reviews that help you notice what fits."],
			]
		: [
				["طاقة أفضل خلال اليوم", "خطوات صغيرة تساعدك على بناء روتين أكثر نشاطاً."],
				["روتين نوم أهدأ", "عادات مسائية وصباحية تناسب جدولك."],
				["حركة أكثر باستمرارية", "نشاط واقعي دون ضغط أو مبالغة."],
				["خيارات يومية أكثر توازناً", "تركيز على الانتظام والتنوع، دون حرمان."],
				["يوم أكثر هدوءاً وتركيزاً", "مراجعات بسيطة تساعدك على فهم ما يناسبك."],
			];
}

export function goalLabel(goal: string | undefined, locale: WellnessLocale): string {
	const map =
		locale === "ar"
			? {
					energy: "طاقة أفضل",
					sleep: "نوم أهدأ",
					movement: "حركة أكثر",
					meals: "خيارات يومية أكثر توازناً",
					consistency: "روتين أكثر استمرارية",
					unsure: "روتين عافية عام",
				}
			: {
					energy: "Better energy",
					sleep: "Calmer sleep",
					movement: "More movement",
					meals: "More balanced daily choices",
					consistency: "More consistent routines",
					unsure: "General wellness routines",
				};
	return map[(goal ?? "unsure") as keyof typeof map] ?? map.unsure;
}

export function buildPersonalizedPreview(
	answers: { goal?: string; challenge?: string },
	locale: WellnessLocale,
): PersonalizedPreview {
	const goal = answers.goal;
	const challenge = answers.challenge;
	const startingFocus =
		locale === "ar"
			? challenge === "sleep"
				? "تحسين روتين النوم والحركة اليومية"
				: challenge === "meals"
					? "تحسين انتظام الوجبات والطاقة اليومية"
					: challenge === "sitting"
						? "إضافة حركة خفيفة خلال اليوم"
						: challenge === "stress"
							? "خطوات أصغر تناسب الأيام المزدحمة"
							: "بناء روتين بسيط يناسب يومك"
			: challenge === "sleep"
				? "Improving sleep rhythm and daily movement"
				: challenge === "meals"
					? "Improving meal regularity and daily energy"
					: challenge === "sitting"
						? "Adding light movement through the day"
						: challenge === "stress"
							? "Smaller steps for busy days"
							: "Building a simple routine that fits your day";

	return {
		goalLabel: goalLabel(goal, locale),
		startingFocus,
		dailySupport:
			locale === "ar"
				? "متابعة صباحية + خطوة بسيطة واحدة"
				: "Morning check-in + one simple action",
		weeklySupport:
			locale === "ar"
				? "مراجعة ما نجح وتعديل الأسبوع التالي"
				: "Review what worked and adjust the next week",
		coachingStyle:
			locale === "ar" ? "أسلوب لطيف ومشجّع" : "Gentle and encouraging",
		actions:
			locale === "ar"
				? [
						"وقت استيقاظ شبه ثابت",
						"متابعة قصيرة للطاقة",
						"حركة خفيفة خلال اليوم",
						"مراجعة مسائية بسيطة",
					]
				: [
						"A roughly consistent wake time",
						"A short energy check-in",
						"Light movement during the day",
						"A simple evening review",
					],
	};
}
