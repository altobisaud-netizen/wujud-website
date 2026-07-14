/**
 * WUJUD product catalog — single source of truth for pricing, capabilities,
 * FAQs, setup, security, and comparisons (EN + AR).
 *
 * Powers conversational replies and crawlable /pricing, /faq, /how-it-works.
 * Do not invent prices or capabilities beyond approved marketing copy.
 */

export type Locale = "en" | "ar";

export type LocalizedString = { en: string; ar: string };

export type ChannelAvailabilityStatus =
	| "available"
	| "setup_required"
	| "planned"
	| "demo_only";

export type PlanId = "starter" | "growth" | "scale";

export type ProductPlan = {
	id: PlanId;
	name: LocalizedString;
	tagline: LocalizedString;
	priceMonthlyDisplay: LocalizedString;
	priceYearlyDisplay: LocalizedString;
	/** Numeric monthly USD when applicable; null for custom. */
	priceMonthlyUsd: number | null;
	priceYearlyMonthlyUsd: number | null;
	featured?: boolean;
	badge?: LocalizedString;
	features: LocalizedString[];
	cta: LocalizedString;
	ctaHref: string;
};

export type Capability = {
	id: string;
	title: LocalizedString;
	body: LocalizedString;
};

export type ChannelAvailability = {
	id: string;
	label: LocalizedString;
	status: ChannelAvailabilityStatus;
	note: LocalizedString;
};

export type FaqItem = {
	id: string;
	question: LocalizedString;
	answer: LocalizedString;
	tags: string[];
};

export type SetupStep = {
	id: string;
	title: LocalizedString;
	body: LocalizedString;
};

export type SecurityStatement = {
	id: string;
	title: LocalizedString;
	body: LocalizedString;
};

export type ComparisonRow = {
	id: string;
	feature: LocalizedString;
	starter: LocalizedString;
	growth: LocalizedString;
	scale: LocalizedString;
};

export type LegalLink = {
	id: string;
	label: LocalizedString;
	href: string;
};

export type WujudProductCatalog = {
	version: 1;
	updatedAt: string;
	brand: {
		productName: string;
		agentName: string;
		tagline: LocalizedString;
	};
	plans: ProductPlan[];
	capabilities: Capability[];
	channels: ChannelAvailability[];
	faqs: FaqItem[];
	setupGuidance: SetupStep[];
	security: SecurityStatement[];
	comparisons: ComparisonRow[];
	privacyLinks: LegalLink[];
	canonicalPaths: {
		pricing: string;
		faq: string;
		howItWorks: string;
		bookDemo: string;
		privacy: string;
		terms: string;
		dataDeletion: string;
		buildSara: string;
	};
};

export function t(s: LocalizedString, locale: Locale): string {
	return s[locale];
}

export const WUJUD_PRODUCT_CATALOG: WujudProductCatalog = {
	version: 1,
	updatedAt: "2026-07-13",
	brand: {
		productName: "WUJUD",
		agentName: "SARA",
		tagline: {
			en: "Build your best AI sales employee.",
			ar: "ابنِ أفضل موظف مبيعات بالذكاء الاصطناعي.",
		},
	},
	canonicalPaths: {
		pricing: "/pricing",
		faq: "/faq",
		howItWorks: "/how-it-works",
		bookDemo: "/book-demo",
		privacy: "/privacy",
		terms: "/terms",
		dataDeletion: "/data-deletion",
		buildSara: "/build-sara",
	},
	plans: [
		{
			id: "starter",
			name: { en: "Starter", ar: "Starter" },
			tagline: {
				en: "For small teams getting started.",
				ar: "للفرق الصغيرة التي تبدأ رحلتها.",
			},
			priceMonthlyDisplay: { en: "$299/mo", ar: "$299/شهر" },
			priceYearlyDisplay: { en: "$239/mo", ar: "$239/شهر" },
			priceMonthlyUsd: 299,
			priceYearlyMonthlyUsd: 239,
			features: [
				{ en: "AI Employee (Sara)", ar: "موظفة ذكاء اصطناعي (Sara)" },
				{
					en: "Up to 1,000 conversations/mo",
					ar: "حتى ١٬٠٠٠ محادثة شهرياً",
				},
				{ en: "WhatsApp & Web", ar: "واتساب والويب" },
				{ en: "CRM Integrations", ar: "تكاملات CRM" },
				{ en: "Email Support", ar: "دعم عبر البريد" },
			],
			cta: { en: "Build My SARA", ar: "ابنِ SARA" },
			ctaHref: "/build-sara",
		},
		{
			id: "growth",
			name: { en: "Growth", ar: "Growth" },
			tagline: {
				en: "For growing teams & enterprises.",
				ar: "للفرق النامية والمؤسسات.",
			},
			priceMonthlyDisplay: { en: "$799/mo", ar: "$799/شهر" },
			priceYearlyDisplay: { en: "$639/mo", ar: "$639/شهر" },
			priceMonthlyUsd: 799,
			priceYearlyMonthlyUsd: 639,
			featured: true,
			badge: { en: "Most Popular", ar: "الأكثر طلباً" },
			features: [
				{ en: "AI Employee (Sara)", ar: "موظفة ذكاء اصطناعي (Sara)" },
				{
					en: "Up to 5,000 conversations/mo",
					ar: "حتى ٥٬٠٠٠ محادثة شهرياً",
				},
				{ en: "Multi-channel", ar: "قنوات متعددة" },
				{ en: "Advanced Integrations", ar: "تكاملات متقدمة" },
				{ en: "Priority Support", ar: "دعم ذو أولوية" },
				{ en: "Reports & Analytics", ar: "تقارير وتحليلات" },
			],
			cta: { en: "Build My SARA", ar: "ابنِ SARA" },
			ctaHref: "/build-sara",
		},
		{
			id: "scale",
			name: { en: "Scale", ar: "Scale" },
			tagline: {
				en: "For large teams & enterprises.",
				ar: "للفرق الكبيرة والمؤسسات.",
			},
			priceMonthlyDisplay: { en: "Custom", ar: "مخصص" },
			priceYearlyDisplay: { en: "Custom", ar: "مخصص" },
			priceMonthlyUsd: null,
			priceYearlyMonthlyUsd: null,
			features: [
				{ en: "Unlimited conversations", ar: "محادثات غير محدودة" },
				{ en: "Custom Integrations", ar: "تكاملات مخصصة" },
				{ en: "SLA & Onboarding", ar: "اتفاقية مستوى خدمة وتأهيل" },
				{ en: "Dedicated Support", ar: "دعم مخصص" },
				{ en: "Advanced Security", ar: "أمان متقدم" },
			],
			cta: { en: "Book a Demo", ar: "احجز عرضاً" },
			ctaHref: "/book-demo",
		},
	],
	capabilities: [
		{
			id: "reply",
			title: {
				en: "Reply to customers",
				ar: "الرد على العملاء",
			},
			body: {
				en: "Sara responds to inquiries, qualifies leads, answers FAQs, and helps move conversations toward business outcomes.",
				ar: "ترد SARA على الاستفسارات وتؤهل العملاء المحتملين وتجيب عن الأسئلة الشائعة وتساعد في دفع المحادثات نحو نتائج أعمال.",
			},
		},
		{
			id: "qualify",
			title: {
				en: "Qualify and follow up",
				ar: "التأهيل والمتابعة",
			},
			body: {
				en: "Sara can collect details, follow up with prospects, and keep your team informed with conversation summaries.",
				ar: "تجمع SARA التفاصيل وتتابع العملاء المحتملين وتبقي فريقك على اطلاع بملخصات المحادثات.",
			},
		},
		{
			id: "knowledge",
			title: {
				en: "Trained on your business",
				ar: "مدرَّبة على عملك",
			},
			body: {
				en: "Sara uses your approved catalogues, FAQs, pricing guidelines, service details, and sales process.",
				ar: "تستخدم SARA الكتالوجات والأسئلة الشائعة وإرشادات التسعير وتفاصيل الخدمة وعملية المبيعات المعتمدة لديك.",
			},
		},
		{
			id: "bilingual",
			title: {
				en: "Arabic and English",
				ar: "العربية والإنجليزية",
			},
			body: {
				en: "Sara supports Arabic and English conversations for GCC businesses.",
				ar: "تدعم SARA المحادثات بالعربية والإنجليزية للأعمال في دول الخليج.",
			},
		},
	],
	channels: [
		{
			id: "whatsapp",
			label: { en: "WhatsApp", ar: "واتساب" },
			status: "setup_required",
			note: {
				en: "WhatsApp connection requires setup and is pending availability — not live customer activation yet.",
				ar: "يتطلب ربط واتساب إعداداً، وهو قيد التوفر — وليس تفعيل العملاء المباشر بعد.",
			},
		},
		{
			id: "website-chat",
			label: { en: "Website chat", ar: "محادثة الموقع" },
			status: "available",
			note: {
				en: "Website experiences and demos are available in the product journey.",
				ar: "تجارب الموقع والعروض متاحة ضمن رحلة المنتج.",
			},
		},
		{
			id: "instagram",
			label: { en: "Instagram", ar: "إنستغرام" },
			status: "planned",
			note: {
				en: "Instagram and additional channels are planned for later releases.",
				ar: "إنستغرام وقنوات إضافية مخططة لإصدارات لاحقة.",
			},
		},
		{
			id: "crm",
			label: { en: "CRM systems", ar: "أنظمة CRM" },
			status: "setup_required",
			note: {
				en: "CRM connections depend on your approved setup and availability.",
				ar: "تكاملات CRM تعتمد على إعدادك المعتمد والتوفر.",
			},
		},
	],
	faqs: [
		{
			id: "what-is-ai-employee",
			question: {
				en: "What exactly is an AI employee?",
				ar: "ما هو موظف الذكاء الاصطناعي بالضبط؟",
			},
			answer: {
				en: "An AI employee is an autonomous digital team member designed for a specific business role. Sara, for example, handles sales and customer service by replying to customers, qualifying leads, answering questions, following up, and helping your team move conversations toward real business outcomes.",
				ar: "موظف الذكاء الاصطناعي عضو رقمي في الفريق مصمم لدور أعمال محدد. SARA مثلاً تتولى المبيعات وخدمة العملاء بالرد على العملاء وتأهيل العملاء المحتملين والإجابة عن الأسئلة والمتابعة ومساعدة فريقك على تحويل المحادثات إلى نتائج حقيقية.",
			},
			tags: ["product", "sara"],
		},
		{
			id: "what-can-sara-do",
			question: {
				en: "What can Sara do for my business?",
				ar: "ماذا تستطيع SARA أن تفعل لعملي؟",
			},
			answer: {
				en: "Sara can respond to customer inquiries, qualify leads, recommend products or services, answer FAQs, follow up with prospects, collect customer details, support quotations, and update your team with important conversation summaries.",
				ar: "ترد SARA على استفسارات العملاء وتؤهل العملاء المحتملين وتوصي بالمنتجات أو الخدمات وتجيب عن الأسئلة الشائعة وتتابع العملاء وتجمع التفاصيل وتدعم طلبات عروض الأسعار وتحدّث فريقك بملخصات المحادثات المهمة.",
			},
			tags: ["capabilities", "sara"],
		},
		{
			id: "whatsapp-instagram",
			question: {
				en: "Can Sara work on WhatsApp and Instagram?",
				ar: "هل تعمل SARA على واتساب وإنستغرام؟",
			},
			answer: {
				en: "Sara is designed for the channels businesses already use, including WhatsApp, Instagram, website chat, and CRM systems. WhatsApp connection currently requires setup and is pending availability — it is not live customer activation yet. Instagram and additional channels are planned for later releases.",
				ar: "صُممت SARA للقنوات التي تستخدمها الأعمال فعلاً، بما فيها واتساب وإنستغرام ومحادثة الموقع وأنظمة CRM. ربط واتساب يتطلب إعداداً حالياً وهو قيد التوفر — وليس تفعيل العملاء المباشر بعد. إنستغرام وقنوات إضافية مخططة لاحقاً.",
			},
			tags: ["channels", "whatsapp", "instagram"],
		},
		{
			id: "replace-team",
			question: {
				en: "Does Sara replace my sales or customer service team?",
				ar: "هل تستبدل SARA فريق المبيعات أو خدمة العملاء؟",
			},
			answer: {
				en: "No. Sara supports your team by handling repetitive conversations, first responses, follow-ups, and lead qualification. Your human team can focus on closing important deals, handling complex cases, and building stronger customer relationships.",
				ar: "لا. تدعم SARA فريقك بمعالجة المحادثات المتكررة والردود الأولى والمتابعات وتأهيل العملاء المحتملين، ليتفرغ فريقك البشري للصفقات المهمة والحالات المعقدة وبناء علاقات أقوى.",
			},
			tags: ["team"],
		},
		{
			id: "train-knowledge",
			question: {
				en: "Can Sara understand our products, prices, and company information?",
				ar: "هل تفهم SARA منتجاتنا وأسعارنا ومعلومات الشركة؟",
			},
			answer: {
				en: "Yes. Sara can be trained using your company information, catalogues, FAQs, pricing guidelines, service details, and sales process. She then responds based on your approved business knowledge.",
				ar: "نعم. يمكن تدريب SARA على معلومات شركتك والكتالوجات والأسئلة الشائعة وإرشادات التسعير وتفاصيل الخدمة وعملية المبيعات، ثم ترد بناءً على المعرفة المعتمدة.",
			},
			tags: ["knowledge"],
		},
		{
			id: "languages",
			question: {
				en: "Can Sara speak Arabic and English?",
				ar: "هل تتحدث SARA العربية والإنجليزية؟",
			},
			answer: {
				en: "Yes. Sara can support Arabic and English conversations, making her suitable for GCC businesses that deal with customers in both languages.",
				ar: "نعم. تدعم SARA المحادثات بالعربية والإنجليزية، وهي مناسبة لأعمال الخليج التي تتعامل مع عملاء باللغتين.",
			},
			tags: ["languages"],
		},
		{
			id: "escalation",
			question: {
				en: "What happens if Sara cannot answer a question?",
				ar: "ماذا يحدث إذا لم تستطع SARA الإجابة؟",
			},
			answer: {
				en: "Sara can escalate the conversation to your team, mark it for human review, or collect the customer's details so your staff can follow up. The goal is to make sure no customer is ignored or lost.",
				ar: "يمكن لـ SARA تصعيد المحادثة لفريقك أو وضع علامة للمراجعة البشرية أو جمع بيانات العميل ليتابع فريقك. الهدف ألا يُتجاهل أي عميل أو يُفقد.",
			},
			tags: ["escalation"],
		},
		{
			id: "crm",
			question: {
				en: "Can Sara integrate with our CRM and tools?",
				ar: "هل تتكامل SARA مع أنظمة CRM وأدواتنا؟",
			},
			answer: {
				en: "Sara is built to work with your business tools over time. CRM and channel connections depend on your approved setup and availability — homepage previews are product demonstrations, not live connected integrations.",
				ar: "بُنيت SARA لتعمل مع أدوات عملك بمرور الوقت. تكاملات CRM والقنوات تعتمد على إعدادك المعتمد والتوفر — ومعاينات الموقع عروض منتج وليست تكاملات متصلة حية.",
			},
			tags: ["crm", "integrations"],
		},
		{
			id: "security",
			question: {
				en: "Is our company data secure?",
				ar: "هل بيانات شركتنا آمنة؟",
			},
			answer: {
				en: "WUJUD is built with security, access control, and business privacy in mind. Your data is handled according to your approved setup, and Sara only uses the information you allow her to access.",
				ar: "بُني WUJUD مع مراعاة الأمن والتحكم بالوصول وخصوصية الأعمال. تُعالَج بياناتك وفق إعدادك المعتمد، ولا تستخدم SARA إلا المعلومات التي تسمح لها بالوصول إليها.",
			},
			tags: ["security", "privacy"],
		},
		{
			id: "try-before",
			question: {
				en: "Can we test Sara before committing?",
				ar: "هل يمكننا تجربة SARA قبل الالتزام؟",
			},
			answer: {
				en: "Yes. Businesses can book a demo to see how Sara would work for their sales and customer service process before moving into a full setup.",
				ar: "نعم. يمكن للشركات حجز عرض لرؤية كيف تعمل SARA في مبيعاتها وخدمة عملائها قبل الإعداد الكامل.",
			},
			tags: ["demo"],
		},
	],
	setupGuidance: [
		{
			id: "describe",
			title: {
				en: "Describe your business",
				ar: "صف عملك",
			},
			body: {
				en: "Tell SARA who you serve, what you sell, and which channels matter.",
				ar: "أخبر SARA من تخدم وماذا تبيع وأي القنوات تهمك.",
			},
		},
		{
			id: "account",
			title: {
				en: "Create an account to save progress",
				ar: "أنشئ حساباً لحفظ التقدم",
			},
			body: {
				en: "After your first profile answers, create an account to save your SARA and continue.",
				ar: "بعد إجابات ملفك الأولى، أنشئ حساباً لحفظ SARA والمتابعة.",
			},
		},
		{
			id: "knowledge",
			title: {
				en: "Add approved knowledge",
				ar: "أضف المعرفة المعتمدة",
			},
			body: {
				en: "Upload catalogues, FAQs, and policies after signup inside the customer app.",
				ar: "ارفع الكتالوجات والأسئلة الشائعة والسياسات بعد التسجيل داخل تطبيق العملاء.",
			},
		},
		{
			id: "channel",
			title: {
				en: "Connect a channel when available",
				ar: "اربط قناة عند التوفر",
			},
			body: {
				en: "Channel activation follows your approved setup and availability.",
				ar: "تفعيل القنوات يتبع إعدادك المعتمد والتوفر.",
			},
		},
	],
	security: [
		{
			id: "access",
			title: {
				en: "Access control",
				ar: "التحكم بالوصول",
			},
			body: {
				en: "WUJUD is built with security and access control so Sara only uses information you approve.",
				ar: "بُني WUJUD بأمن وتحكم بالوصول بحيث لا تستخدم SARA إلا المعلومات التي تعتمدها.",
			},
		},
		{
			id: "privacy",
			title: {
				en: "Business privacy",
				ar: "خصوصية الأعمال",
			},
			body: {
				en: "Your data is handled according to your approved setup. See Privacy and Data deletion for visitor rights.",
				ar: "تُعالَج بياناتك وفق إعدادك المعتمد. راجع الخصوصية وحذف البيانات لحقوق الزوار.",
			},
		},
	],
	comparisons: [
		{
			id: "conversations",
			feature: {
				en: "Conversations / month",
				ar: "محادثات / شهر",
			},
			starter: { en: "Up to 1,000", ar: "حتى ١٬٠٠٠" },
			growth: { en: "Up to 5,000", ar: "حتى ٥٬٠٠٠" },
			scale: { en: "Unlimited", ar: "غير محدود" },
		},
		{
			id: "channels",
			feature: { en: "Channels", ar: "القنوات" },
			starter: { en: "WhatsApp & Web", ar: "واتساب والويب" },
			growth: { en: "Multi-channel", ar: "قنوات متعددة" },
			scale: { en: "Custom", ar: "مخصص" },
		},
		{
			id: "support",
			feature: { en: "Support", ar: "الدعم" },
			starter: { en: "Email", ar: "بريد" },
			growth: { en: "Priority", ar: "ذو أولوية" },
			scale: { en: "Dedicated + SLA", ar: "مخصص + اتفاقية مستوى خدمة" },
		},
	],
	privacyLinks: [
		{
			id: "privacy",
			label: { en: "Privacy", ar: "الخصوصية" },
			href: "/privacy",
		},
		{
			id: "terms",
			label: { en: "Terms", ar: "الشروط" },
			href: "/terms",
		},
		{
			id: "data-deletion",
			label: { en: "Data deletion", ar: "حذف البيانات" },
			href: "/data-deletion",
		},
	],
};
