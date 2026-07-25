import { useEffect, useState } from "react";
import {
	AboutTrustSection,
	DailyCompanion,
	EightWeekJourney,
	PricingWaitlistSection,
	SafetyPrivacy,
	WellnessAreas,
} from "./BelowFoldWellness";
import { copy } from "./locale";
import { SiteHeader } from "./SiteHeader";
import { WellnessFooter } from "./WellnessFooter";
import type { WellnessLocale } from "./types";
import { useWellnessMetadata } from "./useWellnessMetadata";

export type WellnessRoute =
	| "how-it-works"
	| "eight-week-journey"
	| "pricing"
	| "safety"
	| "about"
	| "privacy"
	| "terms"
	| "data-deletion"
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
			title: "Privacy Policy",
			intro:
				"Wellness SARA by WUJUD.ai helps you build healthier habits through your account, optional reminders and consent-based operational notifications. This policy describes how we handle Wellness account data.",
			sections: [
				[
					"What Wellness SARA collects",
					"When you create a Wellness SARA account, we may store your account identity, structured wellness profile answers you choose to save, consent records, and optional contact details such as an email address or phone number for operational messages.",
				],
				[
					"Separate from archived business systems",
					"Wellness SARA information is handled separately from archived SARA Business customer, contact and conversation records. Wellness data is not shared with SARA Business systems.",
				],
				[
					"Optional WhatsApp operational messaging",
					"WhatsApp is optional. You must explicitly opt in before we send operational WhatsApp messages. If you opt in, we store your phone number in normalized form to deliver account confirmations, daily check-in reminders, journey reminders, privacy confirmations and secure links back to your Wellness SARA account.",
				],
				[
					"WhatsApp activation status",
					"WhatsApp features are currently inactive until separately enabled after governance approval and Meta resolution. The disclosures in this policy describe planned optional communication when activation occurs. Current Wellness SARA web account, consent and privacy controls remain fully available.",
				],
				[
					"What WhatsApp messages do not include",
					"Operational templates do not include your profile answers, medical information, mental-health details, weight or body information, diagnosis, treatment, medication information, internal database identifiers or authentication tokens.",
				],
				[
					"How you control messaging",
					"You may reply STOP or UNSUBSCRIBE to stop optional WhatsApp messages at any time. You may also withdraw WhatsApp consent in your account privacy settings. Stopping WhatsApp messages does not automatically delete your Wellness SARA account.",
				],
				[
					"No external AI on WhatsApp",
					"General free-text WhatsApp messages are handled with deterministic operational responses only. They are not sent to an external AI model for automated conversation.",
				],
				[
					"Deletion and retention",
					"You may request account deletion from your account privacy page or through our data-deletion instructions. Deletion requests cover associated optional WhatsApp contact information where applicable. Some records may be retained only where required for lawful security, fraud prevention, consent evidence or billing dispute handling.",
				],
			],
		},
		terms: {
			title: "Terms of Use",
			intro:
				"These terms apply to Wellness SARA early access on WUJUD.ai. By using Wellness SARA, you agree to these terms and our Privacy Policy.",
			sections: [
				[
					"Wellness scope only",
					"Wellness SARA supports general wellness routines and habit support. It does not provide medical diagnosis, treatment, medication advice, emergency services or guaranteed health outcomes.",
				],
				[
					"Accounts and consent",
					"You are responsible for the accuracy of information you provide and for managing your consent choices, including optional marketing, email notifications and WhatsApp operational messaging.",
				],
				[
					"Early access limitations",
					"Payments, paid entitlements and automated AI conversation over WhatsApp are disabled unless explicitly enabled in a future authorized release.",
				],
				[
					"Appropriate use",
					"You must not misuse the service, attempt to access another person's account, or use Wellness SARA for unlawful, abusive or misleading purposes.",
				],
				[
					"Professional help",
					"Questions outside general wellness should be directed to appropriately qualified professionals. Contact local emergency services when urgent help is needed.",
				],
			],
		},
		"data-deletion": {
			title: "Data Deletion Instructions",
			intro:
				"Wellness SARA by WUJUD.ai is operated by Tadweer Future Projects LLC, Sultanate of Oman. You may request deletion of Wellness account data and associated optional contact information.",
			sections: [
				[
					"Signed-in account deletion",
					"If you have a Wellness SARA account, sign in and use Account privacy to request account deletion or pause. This is the preferred path for Wellness account data.",
				],
				[
					"Email request",
					"You may also email wujud.sales@gmail.com with the subject line “Data Deletion Request — Wellness SARA”. Include the email address associated with your Wellness account and, if applicable, the phone number used for optional WhatsApp messaging.",
				],
				[
					"What we delete",
					"We delete or anonymize applicable Wellness account data, consent records, structured profile answers and optional WhatsApp contact information unless retention is required for lawful security, fraud prevention, consent evidence or dispute handling.",
				],
				[
					"WhatsApp opt-out is not full deletion",
					"Replying STOP or withdrawing WhatsApp consent stops optional WhatsApp messages but does not by itself delete your Wellness account.",
				],
				[
					"More information",
					"See our Privacy Policy at /privacy for additional detail about data handling and user controls.",
				],
			],
		},
		contact: {
			title: "Contact WUJUD",
			intro: "Questions about Wellness SARA, privacy controls or account support.",
			sections: [
				[
					"Wellness support",
					"For Wellness SARA account, privacy or data-deletion questions, email wujud.sales@gmail.com with “Wellness SARA support” in the subject line.",
				],
				[
					"Medical emergencies",
					"Wellness SARA is not an emergency service. Contact local emergency services immediately when urgent help is needed.",
				],
				[
					"Professional support",
					"Wellness SARA supports general wellness only and does not replace qualified healthcare professionals.",
				],
			],
		},
	},
	ar: {
		privacy: {
			title: "سياسة الخصوصية",
			intro:
				"Wellness SARA من WUJUD.ai يساعدك على بناء عادات صحية من خلال حسابك والتذكيرات الاختيارية والإشعارات التشغيلية القائمة على الموافقة. توضّح هذه السياسة كيفية تعاملنا مع بيانات حساب العافية.",
			sections: [
				[
					"ما الذي تجمعه Wellness SARA",
					"عند إنشاء حساب Wellness SARA، قد نخزّن هوية حسابك وإجابات ملف العافية المنظم التي تختار حفظها وسجلات الموافقة ومعلومات الاتصال الاختيارية مثل البريد الإلكتروني أو رقم الهاتف للرسائل التشغيلية.",
				],
				[
					"منفصلة عن أنظمة الأعمال المؤرشفة",
					"تُعالَج معلومات Wellness SARA بشكل منفصل عن سجلات عملاء واتصالات ومحادثات SARA Business المؤرشفة. لا تُشارَك بيانات العافية مع أنظمة SARA Business.",
				],
				[
					"رسائل واتساب التشغيلية الاختيارية",
					"واتساب اختياري. يجب أن توافق صراحةً قبل إرسال رسائل واتساب تشغيلية. عند الموافقة، نخزّن رقم هاتفك بصيغة موحّدة لإرسال تأكيدات الحساب وتذكيرات المتابعة اليومية وتذكيرات الرحلة وتأكيدات الخصوصية وروابط آمنة إلى حساب Wellness SARA.",
				],
				[
					"حالة تفعيل واتساب",
					"ميزات واتساب غير نشطة حالياً إلى حين تفعيلها بشكل منفصل بعد موافقة الحوكمة وحل قيود Meta. توضّح الإفصاحات في هذه السياسة التواصل الاختياري المخطط عند التفعيل. تظل خدمات حساب Wellness SARA على الويب والموافقة وضوابط الخصوصية متاحة بالكامل.",
				],
				[
					"ما لا تتضمنه رسائل واتساب",
					"لا تتضمن القوالب التشغيلية إجابات ملفك الشخصي أو معلومات طبية أو معلومات الصحة النفسية أو الوزن أو الجسم أو التشخيص أو العلاج أو الأدوية أو معرفات قاعدة البيانات الداخلية أو رموز المصادقة.",
				],
				[
					"كيف تتحكم في الرسائل",
					"يمكنك الرد بكلمة إيقاف أو STOP لإيقاف رسائل واتساب الاختيارية في أي وقت. يمكنك أيضاً سحب موافقة واتساب من إعدادات خصوصية حسابك. إيقاف رسائل واتساب لا يحذف حساب Wellness SARA تلقائياً.",
				],
				[
					"لا ذكاء اصطناعي خارجي على واتساب",
					"تُعالَج الرسائل النصية العامة على واتساب بردود تشغيلية محددة فقط. لا تُرسَل إلى نموذج ذكاء اصطناعي خارجي للمحادثة الآلية.",
				],
				[
					"الحذف والاحتفاظ",
					"يمكنك طلب حذف الحساب من صفحة خصوصية الحساب أو عبر تعليمات حذف البيانات. تشمل طلبات الحذف معلومات الاتصال الاختيارية على واتساب حيث ينطبق ذلك. قد تُحتفظ بعض السجلات فقط عند الحاجة للأمان القانوني أو منع الاحتيال أو إثبات الموافقة أو معالجة النزاعات.",
				],
			],
		},
		terms: {
			title: "شروط الاستخدام",
			intro:
				"تنطبق هذه الشروط على Wellness SARA في مرحلة الوصول المبكر على WUJUD.ai. باستخدام Wellness SARA، فإنك توافق على هذه الشروط وسياسة الخصوصية.",
			sections: [
				[
					"نطاق العافية فقط",
					"Wellness SARA يدعم روتين العافية العامة وبناء العادات. لا يقدم تشخيصاً طبياً أو علاجاً أو نصائح دوائية أو خدمات طوارئ أو نتائج صحية مضمونة.",
				],
				[
					"الحسابات والموافقة",
					"أنت مسؤول عن دقة المعلومات التي تقدمها وعن إدارة خيارات الموافقة، بما في ذلك التسويق الاختياري وإشعارات البريد ورسائل واتساب التشغيلية.",
				],
				[
					"قيود الوصول المبكر",
					"المدفوعات والمزايا المدفوعة والمحادثة الآلية بالذكاء الاصطناعي عبر واتساب معطّلة ما لم يُفعَّل ذلك صراحةً في إطلاق مستقبلي معتمد.",
				],
				[
					"الاستخدام المناسب",
					"يجب ألا تسيء استخدام الخدمة أو تحاول الوصول إلى حساب شخص آخر أو تستخدم Wellness SARA لأغراض غير قانونية أو مسيئة أو مضللة.",
				],
				[
					"المساعدة المتخصصة",
					"يجب توجيه الأسئلة خارج نطاق العافية العامة إلى مختصين مؤهلين. تواصل مع خدمات الطوارئ المحلية عند الحاجة العاجلة.",
				],
			],
		},
		"data-deletion": {
			title: "تعليمات حذف البيانات",
			intro:
				"Wellness SARA من WUJUD.ai تُدار من Tadweer Future Projects LLC، سلطنة عُمان. يمكنك طلب حذف بيانات حساب العافية ومعلومات الاتصال الاختيارية المرتبطة.",
			sections: [
				[
					"حذف الحساب بعد تسجيل الدخول",
					"إذا كان لديك حساب Wellness SARA، سجّل الدخول واستخدم خصوصية الحساب لطلب حذف الحساب أو إيقافه مؤقتاً. هذه هي الطريقة المفضلة لبيانات حساب العافية.",
				],
				[
					"طلب عبر البريد",
					"يمكنك أيضاً مراسلة wujud.sales@gmail.com بعنوان “Data Deletion Request — Wellness SARA”. اذكر البريد المرتبط بحسابك ورقم الهاتف المستخدم لرسائل واتساب الاختيارية إن وُجد.",
				],
				[
					"ما الذي نحذفه",
					"نحذف أو نُخفي هوية بيانات حساب العافية وسجلات الموافقة وإجابات الملف المنظم ومعلومات الاتصال الاختيارية على واتساب ما لم يكن الاحتفاظ مطلوباً للأمان القانوني أو منع الاحتيال أو إثبات الموافقة أو معالجة النزاعات.",
				],
				[
					"إيقاف واتساب ليس حذفاً كاملاً",
					"الرد بإيقاف أو سحب موافقة واتساب يوقف الرسائل الاختيارية لكنه لا يحذف حساب Wellness SARA بذاته.",
				],
				[
					"مزيد من المعلومات",
					"راجع سياسة الخصوصية على /privacy لمزيد من التفاصيل حول التعامل مع البيانات وخيارات التحكم.",
				],
			],
		},
		contact: {
			title: "تواصل مع وجود",
			intro: "أسئلة حول Wellness SARA أو ضوابط الخصوصية أو دعم الحساب.",
			sections: [
				[
					"دعم العافية",
					"لأسئلة حساب Wellness SARA أو الخصوصية أو حذف البيانات، راسل wujud.sales@gmail.com مع “Wellness SARA support” في عنوان الرسالة.",
				],
				[
					"الطوارئ الطبية",
					"Wellness SARA ليست خدمة طوارئ. تواصل فوراً مع خدمات الطوارئ المحلية عند الحاجة العاجلة.",
				],
				[
					"الدعم المهني",
					"Wellness SARA يدعم العافية العامة فقط ولا يحل محل المختصين الصحيين المؤهلين.",
				],
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
	useWellnessMetadata(locale);

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
					"how-it-works": [copy.ar.howItWorksIntro.title, copy.ar.howItWorksIntro.body],
					"eight-week-journey": [
						"رحلتك في ثمانية أسابيع",
						"تعلّم روتينك، جرّب خطوة صغيرة، ثم ابنِ الاستقلالية من دون وعود صحية مضمونة.",
					],
					pricing: [copy.ar.pricingWaitlist.title, copy.ar.pricingWaitlist.body],
					safety: ["السلامة والخصوصية", "دعم عام للعافية مع حدود واضحة وتحكم حقيقي للمستخدم."],
					about: [copy.ar.about.title, copy.ar.about.body],
				}
			: {
					"how-it-works": [copy.en.howItWorksIntro.title, copy.en.howItWorksIntro.body],
					"eight-week-journey": [
						"Your eight-week journey",
						"Learn your routine, test a small action and build independence—without guaranteed health outcomes.",
					],
					pricing: [copy.en.pricingWaitlist.title, copy.en.pricingWaitlist.body],
					safety: ["Safety and privacy", "General wellness support with clear boundaries and meaningful user control."],
					about: [copy.en.about.title, copy.en.about.body],
				};

	const legalRoute =
		route === "privacy" || route === "terms" || route === "data-deletion" || route === "contact";
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
								<p className="contact-actions">
									<a className="hero-cta hero-cta--primary" href="mailto:wujud.sales@gmail.com?subject=Wellness%20SARA%20support">
										{locale === "ar" ? "راسل دعم Wellness SARA" : "Email Wellness SARA support"}
									</a>
								</p>
							) : null}
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
						{route === "pricing" ? <PricingWaitlistSection locale={locale} /> : null}
						{route === "safety" ? <SafetyPrivacy locale={locale} /> : null}
						{route === "about" ? <AboutTrustSection locale={locale} /> : null}
					</>
				)}
			</main>
			<WellnessFooter locale={locale} onLocaleChange={setLocale} />
		</div>
	);
}
