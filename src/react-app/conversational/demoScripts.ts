import type { DemoSlug } from "./types";

export type DemoTurn = { role: "visitor" | "sara"; en: string; ar: string };

export type DemoProfile = {
	slug: DemoSlug;
	displayName: { en: string; ar: string };
	draft: {
		businessName: string;
		businessDescription: string;
		channels: string[];
	};
	turns: DemoTurn[];
};

/** Scripted only — no live demo API in this design cycle. */
export const DEMO_PROFILES: Record<DemoSlug, DemoProfile> = {
	coffee: {
		slug: "coffee",
		displayName: { en: "Harbor Roast", ar: "هاربر روست" },
		draft: {
			businessName: "Harbor Roast",
			businessDescription:
				"Neighbourhood coffee shop helping guests order drinks and learn about the menu.",
			channels: ["whatsapp"],
		},
		turns: [
			{
				role: "visitor",
				en: "What specialty drinks do you have this week?",
				ar: "ما المشروبات المميزة لديكم هذا الأسبوع؟",
			},
			{
				role: "sara",
				en: "This week we’re featuring a cardamom flat white and a pistachio cold brew. Both are available until Sunday. Would you like sizes or allergens?",
				ar: "هذا الأسبوع نقدّم فلات وايت بالهيل وكولد برو بالفستق حتى الأحد. هل تريد الأحجام أو مسببات الحساسية؟",
			},
			{
				role: "visitor",
				en: "Do you deliver nearby?",
				ar: "هل توصلون للمناطق القريبة؟",
			},
			{
				role: "sara",
				en: "We offer pickup in-store and partner delivery within 3 km. Share your area and I’ll confirm availability — this is a product demonstration, nothing is ordered.",
				ar: "نستقبل الاستلام من المتجر والتوصيل عبر شريك ضمن ٣ كم. شارك منطقتك لأتأكد — هذا عرض توضيحي ولا يُنفَّذ طلب فعلي.",
			},
		],
	},
	clinic: {
		slug: "clinic",
		displayName: { en: "BrightCare Clinic", ar: "عيادة برايت كير" },
		draft: {
			businessName: "BrightCare Clinic",
			businessDescription:
				"Family clinic helping patients book visits and ask general service questions.",
			channels: ["whatsapp"],
		},
		turns: [
			{
				role: "visitor",
				en: "What are your clinic hours?",
				ar: "ما هي ساعات عمل العيادة؟",
			},
			{
				role: "sara",
				en: "We’re open Sunday–Thursday, 9:00–18:00. Fridays are closed; Saturdays are by appointment. Would you like help requesting a general check-up?",
				ar: "نعمل من الأحد إلى الخميس ٩:٠٠–١٨:٠٠. الجمعة مغلقة والسبت بموعد. هل تريد المساعدة بطلب فحص عام؟",
			},
			{
				role: "visitor",
				en: "Which documents should I bring for a first visit?",
				ar: "ما المستندات المطلوبة للزيارة الأولى؟",
			},
			{
				role: "sara",
				en: "Please bring a valid ID and any previous reports you already have. I can’t give medical advice or diagnose — a nurse can confirm your visit details. This is a product demonstration.",
				ar: "يرجى إحضار هوية سارية وأي تقارير سابقة لديك. لا أقدّم نصيحة طبية أو تشخيصاً — يمكن للممرضة تأكيد تفاصيل الزيارة. هذا عرض توضيحي للمنتج.",
			},
		],
	},
	"real-estate": {
		slug: "real-estate",
		displayName: { en: "Oasis Homes", ar: "واحة المنازل" },
		draft: {
			businessName: "Oasis Homes",
			businessDescription:
				"Residential broker helping buyers explore listings and book viewings.",
			channels: ["instagram"],
		},
		turns: [
			{
				role: "visitor",
				en: "Do you have two-bedroom apartments near the marina?",
				ar: "هل لديكم شقق غرفتين قرب المارينا؟",
			},
			{
				role: "sara",
				en: "We have three 2-bedroom listings near the marina this week. I can share sizes and asking rents. I don’t give mortgage, legal, or investment advice.",
				ar: "لدينا ثلاثة عقارات بغرفتين قرب المارينا هذا الأسبوع. يمكنني مشاركة المساحات والإيجارات المطلوبة. لا أقدّم نصائح رهن أو قانونية أو استثمارية.",
			},
		],
	},
	retail: {
		slug: "retail",
		displayName: { en: "Noon & Night", ar: "نون آند نايت" },
		draft: {
			businessName: "Noon & Night",
			businessDescription:
				"Lifestyle retailer answering product and stock questions online.",
			channels: ["website-chat"],
		},
		turns: [
			{
				role: "visitor",
				en: "Is the linen set still in stock in beige?",
				ar: "هل طقم الكتان بالبيج لا يزال متوفراً؟",
			},
			{
				role: "sara",
				en: "Beige king and queen are in stock online. Express pickup is available tomorrow. Checkout isn’t completed in this demonstration.",
				ar: "البيج متوفر أونلاين بمقاسي كينج وكوين. الاستلام السريع متاح غداً. لا يُكمل الدفع في هذا العرض التوضيحي.",
			},
		],
	},
};
