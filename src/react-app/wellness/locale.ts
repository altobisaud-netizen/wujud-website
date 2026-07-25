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
			how: "How It Works",
			journey: "8-week journey",
			pricing: "Pricing",
			safety: "Safety",
			about: "About",
			privacy: "Privacy",
			contact: "Contact",
			terms: "Terms",
			dataDeletion: "Data Deletion",
			myJourney: "My journey",
			account: "Account",
			signOut: "Sign out",
			signIn: "Sign in",
			cta: "Start your journey",
		},
		heroEyebrow: "Your private AI wellness coach",
		heroTitle: "Build healthier routines,\none realistic step at a time.",
		heroBody:
			"SARA runs simple daily check-ins, helps you choose achievable habits, and adapts your wellness journey as your routine changes.",
		saraDefinition:
			"SARA is an AI wellness coach designed to run simple daily check-ins, help you build realistic habits, and guide you through a structured eight-week wellness journey.",
		heroOutcomes: [
			"Better energy",
			"Calmer sleep",
			"More movement",
			"More balanced daily choices",
			"Consistency without pressure",
		],
		heroPrimaryCta: "Start your wellness journey",
		heroSecondaryCta: "See how SARA works",
		heroTrust: "Private by design. Flexible around real life. Built to support—not judge.",
		demoCta: "Try SARA now",
		demoSectionTitle: "See how a short check-in with SARA feels.",
		chatStatus: "Sample check-in",
		chatSubtitle: "Your private AI wellness coach",
		chatDemoLabel: "No signup required. Nothing from this demo is saved.",
		opening:
			"Hi 👋\nI'm SARA. I'll help you build a simple healthy routine that fits your day.\n\nWhat would you most like to improve right now?",
		composerLabel: "Tell SARA what you would like to improve",
		composerPlaceholder: "Write what you'd like to improve…",
		send: "Send",
		reset: "Restart",
		undo: "Edit last choice",
		typing: "SARA is typing…",
		privacyHint: "No signup required. Nothing from this demo is saved.",
		planSummaryEyebrow: "Your suggested starting point",
		previewTitle: "Your suggested journey with SARA",
		previewIntro: "Based on what you shared, here is a flexible starting point:",
		previewClosing:
			"The journey adapts with you and does not promise guaranteed results.",
		saveTitle: "Create your account to save and continue your wellness journey.",
		saveBody:
			"Save your structured answers to your Wellness account and continue when you are ready. Payments and paid plans are not active yet.",
		saveCta: "Join the launch list",
		waitlistCta: "Join the launch list",
		saveJourneyCta: "Save my journey",
		paymentCta: "Start my eight-week journey",
		paymentPending: "Payments are not active yet. Access opens only after launch confirmation.",
		opsUnavailable: "This action is temporarily unavailable.",
		waitlistNote:
			"No payment is required. We will only contact you about Wellness SARA access and launch updates.",
		accountSaveNote: "Create your account to save and continue your wellness journey.",
		loadingMore: "Loading more about Wellness SARA…",
		footer: {
			brand: "Wellness SARA by WUJUD.ai",
			tagline: "Daily wellness through human-sized steps.",
			disclaimer:
				"Wellness SARA provides general wellness and habit support. It does not provide medical diagnosis or treatment.",
			copyright: "© 2026 WUJUD.ai",
		},
		about: {
			eyebrow: "Built with purpose in Oman",
			title: "Built with purpose in Oman",
			body:
				"Wellness SARA is built by WUJUD.ai, an Oman-based technology initiative focused on creating practical, human-centered digital experiences. We created SARA to make everyday wellness support feel more personal, private, and achievable—one small step at a time.",
			approachTitle: "Our approach",
			approachItems: [
				"General wellness and habit support",
				"Privacy and consent by design",
				"English and Arabic experience",
				"No diagnosis or treatment",
				"User-controlled account and data options",
			],
		},
		pricingWaitlist: {
			title: "Plans designed for your wellness journey",
			body:
				"Wellness SARA is currently available through controlled early access. Join the launch list and be the first to know when full plans and pricing become available.",
			primaryCta: "Join the launch list",
			secondaryCta: "Explore how SARA works",
			trustNote:
				"No payment is required. We will only contact you about Wellness SARA access and launch updates.",
			featuresTitle: "Planned plan features",
			features: [
				"Personal wellness profile",
				"Daily check-ins",
				"Adaptive routine planning",
				"Progress reflection",
				"English and Arabic support",
				"Privacy and account controls",
			],
			pricingNote: "Pricing will be announced after the early-access phase.",
		},
		howItWorksIntro: {
			title: "A practical wellness journey that adapts with you",
			body:
				"SARA helps you understand your current routine, choose realistic priorities, and check in regularly. Your journey adjusts as you make progress, face barriers, or decide to change direction.",
		},
		sections: {
			outcomesEyebrow: "How SARA helps",
			outcomesTitle: "Support for everyday wellness goals",
			outcomesBody: "Small daily actions designed to support ordinary routines—not guaranteed outcomes.",
			howEyebrow: "How it works",
			howTitle: "A practical wellness journey that adapts with you",
			dailyEyebrow: "Daily conversation examples",
			dailyTitle: "Support that meets the day you actually have",
			journeyEyebrow: "Eight weeks",
			journeyTitle: "A structured eight-week wellness journey",
			journeyDisclaimer:
				"The journey is designed to adapt with you. It does not promise guaranteed results.",
			learnEyebrow: "Privacy and control",
			learnTitle: "Your data, your choices",
			learnNote:
				"With a Wellness account, you control consent, reminders, pausing, and deletion requests.",
			trustEyebrow: "Safety",
			trustTitle: "Clear boundaries you can rely on",
			trustBody:
				"Wellness SARA offers general wellness support and does not replace professional healthcare.",
			launchEyebrow: "Early access",
			launchTitle: "Join the launch list",
			launchBody:
				"Be the first to know when full plans open. No payment is required to join.",
			launchCta: "Join the launch list",
			humanTitle: "When general wellness support is not enough",
			humanBody:
				"Wellness SARA offers general wellness support and does not replace professional healthcare. Seek qualified care when you need medical or urgent help.",
		},
	},
	ar: {
		brandTagline: "سارة",
		nav: {
			home: "الرئيسية",
			how: "كيف تعمل",
			journey: "رحلة 8 أسابيع",
			pricing: "الأسعار",
			safety: "السلامة",
			about: "من نحن",
			privacy: "الخصوصية",
			contact: "تواصل معنا",
			terms: "الشروط",
			dataDeletion: "حذف البيانات",
			myJourney: "رحلتي",
			account: "الحساب",
			signOut: "تسجيل الخروج",
			signIn: "تسجيل الدخول",
			cta: "ابدأ رحلتك",
		},
		heroEyebrow: "مدربك الخاص للعافية بالذكاء الاصطناعي",
		heroTitle: "ابنِ عادات صحية أفضل\nبخطوة واقعية في كل مرة",
		heroBody:
			"تجري سارة متابعات يومية بسيطة، وتساعدك على اختيار عادات قابلة للتحقيق، وتكيّف رحلة العافية مع تغيّر روتينك.",
		saraDefinition:
			"سارة مدربة عافية بالذكاء الاصطناعي مصممة لتجري متابعات يومية بسيطة، وتساعدك على بناء عادات واقعية، وترشدك خلال رحلة عافية منظمة لمدة ثمانية أسابيع.",
		heroOutcomes: [
			"طاقة أفضل",
			"نوم أهدأ",
			"حركة أكثر",
			"خيارات يومية أكثر توازناً",
			"استمرارية دون ضغط",
		],
		heroPrimaryCta: "ابدأ رحلة العافية",
		heroSecondaryCta: "كيف تعمل سارا",
		heroTrust: "خصوصية في التصميم. مرونة مع واقع الحياة. دعم بلا حكم.",
		demoCta: "جرّب سارا الآن",
		demoSectionTitle: "تعرّف على شكل المتابعة القصيرة مع سارة.",
		chatStatus: "متابعة نموذجية",
		chatSubtitle: "مدربك الخاص للعافية بالذكاء الاصطناعي",
		chatDemoLabel: "لا يتطلب التسجيل، ولن يتم حفظ ما تكتبه في هذه التجربة.",
		opening:
			"مرحباً 👋\nأنا سارة. سأساعدك في بناء روتين صحي بسيط يناسب يومك.\n\nما أكثر شيء ترغب في تحسينه الآن؟",
		composerLabel: "أخبر سارة بما ترغب في تحسينه",
		composerPlaceholder: "اكتب ما ترغب في تحسينه...",
		send: "إرسال",
		reset: "إعادة البدء",
		undo: "تعديل الاختيار الأخير",
		typing: "سارة تكتب…",
		privacyHint: "لا يتطلب التسجيل، ولن يتم حفظ ما تكتبه في هذه التجربة.",
		planSummaryEyebrow: "نقطة البداية المقترحة",
		previewTitle: "رحلتك المقترحة مع سارة",
		previewIntro: "بناءً على ما شاركته، هذه نقطة بداية مرنة:",
		previewClosing: "الرحلة تتكيف معك ولا تَعِد بنتائج مضمونة.",
		saveTitle: "أنشئ حسابك لحفظ رحلتك ومتابعتها.",
		saveBody:
			"احفظ إجاباتك المنظمة في حساب Wellness وتابع عندما تكون جاهزاً. المدفوعات والخطط المدفوعة غير نشطة بعد.",
		saveCta: "انضم إلى قائمة الإطلاق",
		waitlistCta: "انضم إلى قائمة الإطلاق",
		saveJourneyCta: "احفظ رحلتك",
		paymentCta: "ابدأ رحلتي لمدة 8 أسابيع",
		paymentPending: "المدفوعات غير نشطة بعد. يُفتح الوصول فقط بعد تأكيد الإطلاق.",
		opsUnavailable: "هذا الإجراء غير متاح مؤقتاً.",
		waitlistNote:
			"لا يلزم أي دفع. سنتواصل معك فقط بخصوص الوصول إلى Wellness SARA وتحديثات الإطلاق.",
		accountSaveNote: "أنشئ حسابك لحفظ رحلتك ومتابعتها.",
		loadingMore: "جارٍ تحميل المزيد عن Wellness SARA…",
		footer: {
			brand: "Wellness SARA من WUJUD.ai",
			tagline: "عافية يومية بخطوات إنسانية.",
			disclaimer:
				"يقدم Wellness SARA إرشادات عامة للعافية ودعماً للعادات اليومية، ولا يقدم تشخيصاً أو علاجاً طبياً.",
			copyright: "© 2026 WUJUD.ai",
		},
		about: {
			eyebrow: "صُنعت بقصد في عُمان",
			title: "صُنعت بقصد في عُمان",
			body:
				"Wellness SARA من WUJUD.ai، مبادرة تقنية عُمانية تركز على تجارب رقمية عملية وإنسانية. أنشأنا سارة لتجعل دعم العافية اليومي أكثر شخصية وخصوصية وقابلية للتحقيق — خطوة صغيرة في كل مرة.",
			approachTitle: "نهجنا",
			approachItems: [
				"دعم عام للعافية والعادات",
				"الخصوصية والموافقة في التصميم",
				"تجربة بالعربية والإنجليزية",
				"لا تشخيص ولا علاج",
				"تحكم المستخدم في الحساب والبيانات",
			],
		},
		pricingWaitlist: {
			title: "خطط مصممة لرحلة العافية",
			body:
				"Wellness SARA متاح حالياً عبر وصول مبكر مُدار. انضم إلى قائمة الإطلاق لتكون أول من يعرف متى تتوفر الخطط الكاملة والأسعار.",
			primaryCta: "انضم إلى قائمة الإطلاق",
			secondaryCta: "كيف تعمل سارا",
			trustNote:
				"لا يلزم أي دفع. سنتواصل معك فقط بخصوص الوصول إلى Wellness SARA وتحديثات الإطلاق.",
			featuresTitle: "مزايا الخطط المخططة",
			features: [
				"ملف عافية شخصي",
				"المتابعة اليومية",
				"تخطيط روتين متكيف",
				"مراجعة التقدم",
				"دعم بالعربية والإنجليزية",
				"الخصوصية وضوابط الحساب",
			],
			pricingNote: "ستُعلَن الأسعار بعد مرحلة الوصول المبكر.",
		},
		howItWorksIntro: {
			title: "رحلة عافية عملية تتكيف معك",
			body:
				"تساعدك سارة على فهم روتينك الحالي واختيار أولويات واقعية والمتابعة بانتظام. تتكيف رحلتك مع تقدمك أو العقبات أو تغيّر اتجاهك.",
		},
		sections: {
			outcomesEyebrow: "كيف تساعدك سارة",
			outcomesTitle: "دعم لأهداف العافية اليومية",
			outcomesBody: "خطوات يومية صغيرة مصممة لدعم الروتين العادي — وليست نتائج مضمونة.",
			howEyebrow: "كيف تعمل",
			howTitle: "رحلة عافية عملية تتكيف معك",
			dailyEyebrow: "أمثلة محادثة يومية",
			dailyTitle: "دعم يراعي واقع يومك كما هو",
			journeyEyebrow: "ثمانية أسابيع",
			journeyTitle: "رحلة عافية منظمة لمدة ثمانية أسابيع",
			journeyDisclaimer: "الرحلة مصممة للتكيف معك. ولا تعد بنتائج مضمونة.",
			learnEyebrow: "الخصوصية والتحكم",
			learnTitle: "بياناتك وخياراتك",
			learnNote: "مع حساب Wellness، تتحكم في الموافقة والتذكيرات والإيقاف المؤقت وطلبات الحذف.",
			trustEyebrow: "السلامة",
			trustTitle: "حدود واضحة يمكنك الاعتماد عليها",
			trustBody:
				"Wellness SARA يقدم دعماً عاماً للعافية ولا يحل محل الرعاية الصحية المتخصصة.",
			launchEyebrow: "الوصول المبكر",
			launchTitle: "انضم إلى قائمة الإطلاق",
			launchBody: "كن أول من يعرف عند فتح الخطط الكاملة. لا يلزم أي دفع للانضمام.",
			launchCta: "انضم إلى قائمة الإطلاق",
			humanTitle: "عندما لا يكفي الدعم العام للعافية",
			humanBody:
				"Wellness SARA يقدم دعماً عاماً للعافية ولا يحل محل الرعاية الصحية المتخصصة. اطلب رعاية مؤهلة عند الحاجة الطبية أو العاجلة.",
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
			{ id: "unsure", label: "I'm not sure" },
		],
		challenge: [
			{ id: "sleep", label: "Irregular sleep" },
			{ id: "meals", label: "Irregular meals" },
			{ id: "sitting", label: "Sitting for long periods" },
			{ id: "stress", label: "Work pressure" },
			{ id: "unsure", label: "I don't know" },
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
		unsure: "That's okay. What makes building a routine hardest right now?",
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
	return `We'll start with small steps—not changing your whole life at once.\n\nFor ${focus}, ${challengeHint}, I suggest:\n\n• A roughly consistent wake time\n• A short morning energy check-in\n• Light movement during the day\n• A simple evening review\n\nYou can accept this starting point or adjust it.`;
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
