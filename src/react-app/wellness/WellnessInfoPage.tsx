import { useEffect, useState } from "react";
import {
	DailyCompanion,
	EightWeekJourney,
	PricingPrototype,
	SafetyPrivacy,
	WellnessAreas,
} from "./BelowFoldWellness";
import { SiteHeader } from "./SiteHeader";
import type { WellnessLocale } from "./types";

export type WellnessRoute =
	| "how-it-works"
	| "eight-week-journey"
	| "pricing"
	| "safety"
	| "privacy"
	| "terms"
	| "contact";

function initialLocale(): WellnessLocale {
	try {
		return window.localStorage.getItem("wujud-wellness-locale") === "ar" ? "ar" : "en";
	} catch {
		return "en";
	}
}

const legalCopy = {
	en: {
		privacy: {
			title: "Privacy",
			intro:
				"This page describes the intended privacy direction for the WUJUD wellness preview. It is not a final legal policy.",
			sections: [
				["Separate wellness information", "Personal wellness information must be stored and handled separately from archived SARA Business systems, users and customer records."],
				["Your control", "You will be able to control reminders, pause your journey and request account deletion when accounts are implemented."],
				["No account in this preview", "This frontend preview does not create users, send answers to a server or connect to a live AI service."],
				["Commercial and legal review", "Retention periods, processors and final legal terms require formal review before launch."],
			],
		},
		terms: {
			title: "Terms",
			intro:
				"Prototype terms for product review only. These are not final commercial terms.",
			sections: [
				["General wellness only", "SARA supports general wellness routines and does not provide diagnosis, treatment, medication advice or emergency services."],
				["No guaranteed outcomes", "WUJUD does not promise specific health outcomes, perfect adherence or uninterrupted availability."],
				["Professional help", "Questions outside general wellness should be directed to appropriately qualified professionals or emergency services when urgent."],
				["Review required", "Final terms, eligibility, billing and cancellation rules must be approved before launch."],
			],
		},
		contact: {
			title: "Contact WUJUD",
			intro: "Have a question about the wellness preview, safety boundaries or future access?",
			sections: [
				["Product questions", "Use the labelled prototype contact action below. A live contact workflow is not connected in this cycle."],
				["Medical emergencies", "WUJUD is not an emergency service. Contact your local emergency services immediately when urgent help is needed."],
				["Professional support", "WUJUD can guide people toward appropriate qualified support; it does not claim a live professional network today."],
			],
		},
	},
	ar: {
		privacy: {
			title: "الخصوصية",
			intro:
				"توضح هذه الصفحة اتجاه الخصوصية المقترح لمعاينة وجود للعافية، وليست سياسة قانونية نهائية.",
			sections: [
				["معلومات عافية منفصلة", "يجب تخزين معلومات العافية الشخصية والتعامل معها بشكل منفصل عن أنظمة سارة للأعمال المؤرشفة ومستخدميها وسجلات عملائها."],
				["التحكم بيدك", "ستتمكن من التحكم في التذكيرات وإيقاف رحلتك مؤقتاً وطلب حذف حسابك عند تنفيذ الحسابات."],
				["لا حساب في هذه المعاينة", "لا ينشئ هذا النموذج مستخدمين ولا يرسل إجاباتك إلى خادم ولا يتصل بخدمة ذكاء اصطناعي مباشرة."],
				["تحتاج إلى مراجعة", "تحتاج مدد الاحتفاظ ومعالجو البيانات والنصوص القانونية النهائية إلى مراجعة رسمية قبل الإطلاق."],
			],
		},
		terms: {
			title: "الشروط",
			intro: "شروط أولية لمراجعة المنتج فقط، وليست شروطاً تجارية نهائية.",
			sections: [
				["عافية عامة فقط", "تدعم سارة روتين العافية العامة ولا تقدم تشخيصاً أو علاجاً أو نصائح دوائية أو خدمات طوارئ."],
				["لا نتائج مضمونة", "لا تَعِد وجود بنتائج صحية محددة أو التزام مثالي أو توفر دون انقطاع."],
				["المساعدة المتخصصة", "يجب توجيه الأسئلة خارج نطاق العافية العامة إلى مختصين مؤهلين، أو إلى خدمات الطوارئ عند الحاجة العاجلة."],
				["المراجعة مطلوبة", "يجب اعتماد الشروط النهائية والأهلية والفوترة والإلغاء قبل الإطلاق."],
			],
		},
		contact: {
			title: "تواصل مع وجود",
			intro: "هل لديك سؤال عن معاينة العافية أو حدود السلامة أو الوصول مستقبلاً؟",
			sections: [
				["أسئلة المنتج", "استخدم زر التواصل التجريبي أدناه. لا توجد آلية تواصل مباشرة متصلة في هذه الدورة."],
				["الطوارئ الطبية", "وجود ليست خدمة طوارئ. تواصل فوراً مع خدمات الطوارئ المحلية عند الحاجة العاجلة."],
				["الدعم المهني", "يمكن لوجود إرشادك نحو دعم مؤهل ومناسب؛ ولا تدّعي وجود شبكة متخصصين مباشرة اليوم."],
			],
		},
	},
} as const;

function PageIntro({
	locale,
	title,
	body,
}: {
	locale: WellnessLocale;
	title: string;
	body: string;
}) {
	return (
		<section className="info-hero">
			<p className="eyebrow">{locale === "ar" ? "وجود × سارة" : "WUJUD × SARA"}</p>
			<h1>{title}</h1>
			<p>{body}</p>
		</section>
	);
}

export function WellnessInfoPage({ route }: { route: WellnessRoute }) {
	const [locale, setLocale] = useState<WellnessLocale>(initialLocale);

	useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
		try {
			window.localStorage.setItem("wujud-wellness-locale", locale);
		} catch {
			// Language still works without persistence.
		}
	}, [locale]);

	const titles =
		locale === "ar"
			? {
					"how-it-works": ["كيف تعمل سارة", "محادثة قصيرة تساعدك على فهم روتينك واختيار خطوات واقعية، ثم رحلة تتكيف مع ما يناسب حياتك."],
					"eight-week-journey": ["رحلتك في ثمانية أسابيع", "تعلّم روتينك، جرّب خطوة صغيرة، ثم ابنِ الاستقلالية من دون وعود صحية مضمونة."],
					pricing: ["نموذج الأسعار", "هيكل أولي واضح للمراجعة التجارية. لم تُعتمد أي أسعار بعد."],
					safety: ["السلامة والخصوصية", "دعم عام للعافية مع حدود واضحة وتحكم حقيقي للمستخدم."],
				}
			: {
					"how-it-works": ["How SARA works", "A short conversation helps you understand your routine and choose realistic actions, followed by a journey that adapts to real life."],
					"eight-week-journey": ["Your eight-week journey", "Learn your routine, test a small action and build independence—without guaranteed health outcomes."],
					pricing: ["Pricing prototype", "A clear placeholder structure for commercial review. No prices have been approved."],
					safety: ["Safety and privacy", "General wellness support with clear boundaries and meaningful user control."],
				};

	const legalRoute = route === "privacy" || route === "terms" || route === "contact";
	const legal = legalRoute ? legalCopy[locale][route] : null;

	return (
		<div className="wellness-app wellness-info-page" dir={locale === "ar" ? "rtl" : "ltr"}>
			<a className="skip-link" href="#page-content">
				{locale === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
			</a>
			<SiteHeader locale={locale} onLocaleChange={setLocale} />
			<main id="page-content">
				{legal ? (
					<>
						<PageIntro locale={locale} title={legal.title} body={legal.intro} />
						<section className="legal-content" aria-label={legal.title}>
							{legal.sections.map(([title, body]) => (
								<article key={title}>
									<h2>{title}</h2>
									<p>{body}</p>
								</article>
							))}
							{route === "contact" ? (
								<button type="button" disabled aria-describedby="contact-prototype-note">
									{locale === "ar" ? "تواصل معنا — نموذج تجريبي" : "Contact us — prototype"}
								</button>
							) : null}
							<p id="contact-prototype-note" className="fine-print">
								{route === "contact"
									? locale === "ar"
										? "لا يرسل هذا الزر أي بيانات."
										: "This button does not send any data."
									: locale === "ar"
										? "يتطلب النص النهائي مراجعة قانونية قبل الإطلاق."
										: "Final language requires legal review before launch."}
							</p>
						</section>
					</>
				) : (
					<>
						<PageIntro
							locale={locale}
							title={titles[route as keyof typeof titles][0]}
							body={titles[route as keyof typeof titles][1]}
						/>
						{route === "how-it-works" ? (
							<>
								<WellnessAreas locale={locale} />
								<DailyCompanion locale={locale} />
							</>
						) : null}
						{route === "eight-week-journey" ? <EightWeekJourney locale={locale} /> : null}
						{route === "pricing" ? <PricingPrototype locale={locale} /> : null}
						{route === "safety" ? <SafetyPrivacy locale={locale} /> : null}
					</>
				)}
			</main>
			<footer className="wellness-footer">
				<a href="/">WUJUD</a>
				<a href="/privacy">{locale === "ar" ? "الخصوصية" : "Privacy"}</a>
				<a href="/terms">{locale === "ar" ? "الشروط" : "Terms"}</a>
			</footer>
		</div>
	);
}
