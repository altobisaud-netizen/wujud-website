import { useState } from "react";
import { copy } from "./locale";
import { heroVisual, outcomeVisuals } from "./lifestyleImagery";
import { WaitlistDialog } from "./operational/WaitlistDialog";
import { useOperationalPricing } from "./operational/useOperationalPricing";
import type { WellnessLocale } from "./types";
import { WellnessPicture } from "./WellnessPicture";

const journeyEn = [
	["Week 1", "We understand your routine"],
	["Week 2", "We choose one realistic step"],
	["Week 3", "We build consistency"],
	["Week 4", "We simplify what feels hard"],
	["Week 5", "We develop what works"],
	["Week 6", "We recover after difficult days"],
	["Week 7", "We strengthen your independence"],
	["Week 8", "We build a plan that continues with you"],
];

const journeyAr = [
	["الأسبوع 1", "نفهم روتينك"],
	["الأسبوع 2", "نختار خطوة واقعية"],
	["الأسبوع 3", "نبني الاستمرارية"],
	["الأسبوع 4", "نبسّط ما يصعب عليك"],
	["الأسبوع 5", "نطوّر ما ينجح"],
	["الأسبوع 6", "نتعافى بعد الأيام الصعبة"],
	["الأسبوع 7", "نعزز استقلاليتك"],
	["الأسبوع 8", "نبني خطة تستمر معك"],
];

const howStepsEn = [
	"Tell SARA what you want to improve",
	"Get a simple plan that fits your day",
	"Take one or two daily steps",
	"Review what worked each week",
	"Adjust your plan without pressure or blame",
];

const howStepsAr = [
	"أخبر سارة بما ترغب في تحسينه",
	"احصل على خطة بسيطة تناسب يومك",
	"نفّذ خطوة أو خطوتين يومياً",
	"راجع ما نجح معك كل أسبوع",
	"عدّل خطتك دون ضغط أو لوم",
];

const dailyEn = [
	{
		label: "Morning",
		message:
			"How is your energy this morning?\nWhat realistic step can you take today?",
	},
	{
		label: "Busy day",
		message:
			"It looks like your day is busy.\nWould you prefer five minutes of movement today, or shall we move it to the evening?",
	},
	{
		label: "Missed day",
		message:
			"Yesterday did not go as planned, and that is okay.\nWould you like a smaller step today or a fresh start tomorrow?",
	},
];

const dailyAr = [
	{
		label: "الصباح",
		message: "كيف تشعر بطاقتك هذا الصباح؟\nما الخطوة الواقعية التي تستطيع تنفيذها اليوم؟",
	},
	{
		label: "يوم مزدحم",
		message:
			"يبدو أن يومك مزدحم.\nهل تفضّل خمس دقائق من الحركة اليوم، أم نؤجلها إلى المساء؟",
	},
	{
		label: "يوم فائت",
		message:
			"الأمس لم يسر كما خططت، وهذا طبيعي.\nهل ترغب في خطوة أصغر اليوم أم بداية جديدة غداً؟",
	},
];

const learnEn = [
	["Trusted guidance", "General wellness content reviewed and organized for everyday support."],
	["Your confirmed preferences", "Your goal, schedule, and the support style that fits you."],
	["Progress through the journey", "Daily steps and weekly reviews help adapt the plan."],
	["Safety first", "Safety rules come before any suggestion or motivational message."],
];

const learnAr = [
	["إرشادات موثوقة", "محتوى عافية عام تمت مراجعته وتنظيمه."],
	["تفضيلاتك المؤكدة", "هدفك وجدولك وطريقة الدعم التي تناسبك."],
	["تقدمك خلال الرحلة", "خطواتك اليومية ومراجعاتك الأسبوعية تساعد على تعديل الخطة."],
	["السلامة أولاً", "قواعد السلامة تتقدم على أي اقتراح تحفيزي."],
];

const trustEn = [
	"Privacy first",
	"Full reminder control",
	"Pause or delete when you choose",
	"General wellness support",
	"SARA does not diagnose medical conditions or prescribe medication",
	"No diagnosis or medication advice",
];

const trustAr = [
	"خصوصيتك أولاً",
	"تحكم كامل في التذكيرات",
	"يمكنك الإيقاف أو الحذف",
	"دعم للعافية العامة",
	"لا تشخّص سارة الحالات الطبية ولا تصف الأدوية",
	"لا تشخيص أو وصف أدوية",
];

export function OutcomeImagery({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	return (
		<section className="wellness-section outcomes-section" id="results">
			<div className="section-heading section-heading--center">
				<p className="eyebrow">{t.outcomesEyebrow}</p>
				<h2>{t.outcomesTitle}</h2>
				<p>{t.outcomesBody}</p>
			</div>
			<div className="outcome-grid">
				{outcomeVisuals.map((visual) => (
					<article className="outcome-card" key={visual.id} data-gender={visual.genderFocus}>
						<figure className="outcome-visual">
							<WellnessPicture visual={visual} locale={locale} className="outcome-visual__picture" />
							<figcaption className="sr-only">{visual.label[locale]}</figcaption>
						</figure>
						<h3>{visual.title[locale]}</h3>
						<p>{visual.body[locale]}</p>
					</article>
				))}
			</div>
		</section>
	);
}

export function HowSaraWorks({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	const steps = locale === "ar" ? howStepsAr : howStepsEn;
	return (
		<section className="wellness-section how-section" id="how-it-works">
			<div className="section-heading section-heading--center">
				<p className="eyebrow">{t.howEyebrow}</p>
				<h2>{t.howTitle}</h2>
			</div>
			<ol className="how-strip">
				{steps.map((step, index) => (
					<li key={step}>
						<span className="how-strip__index" aria-hidden="true">
							{index + 1}
						</span>
						<p>{step}</p>
					</li>
				))}
			</ol>
		</section>
	);
}

export function DailyCompanion({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	const examples = locale === "ar" ? dailyAr : dailyEn;
	return (
		<section className="wellness-section daily-section" id="daily-companion">
			<div className="section-heading section-heading--center">
				<p className="eyebrow">{t.dailyEyebrow}</p>
				<h2>{t.dailyTitle}</h2>
			</div>
			<div className="daily-grid">
				{examples.map((example, index) => (
					<article className={`daily-card daily-card--${index + 1}`} key={example.label}>
						<div className="daily-card__top">
							<span className="sara-orb sara-orb--small" aria-hidden="true">
								S
							</span>
							<strong>{example.label}</strong>
						</div>
						<div className="sara-bubble">
							{example.message.split("\n").map((line) => (
								<p key={line}>{line}</p>
							))}
						</div>
					</article>
				))}
			</div>
		</section>
	);
}

export function EightWeekJourney({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	const weeks = locale === "ar" ? journeyAr : journeyEn;
	return (
		<section className="wellness-section journey-section" id="eight-week-journey">
			<div className="section-heading">
				<p className="eyebrow">{t.journeyEyebrow}</p>
				<h2>{t.journeyTitle}</h2>
				<p>{t.journeyDisclaimer}</p>
			</div>
			<ol className="journey-rail">
				{weeks.map(([week, title], index) => (
					<li key={week}>
						<span className="journey-rail__week">{week}</span>
						<strong>{title}</strong>
						<span className="journey-rail__dot" aria-hidden="true">
							{index + 1}
						</span>
					</li>
				))}
			</ol>
		</section>
	);
}

export function HowSaraLearns({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	const cards = locale === "ar" ? learnAr : learnEn;
	return (
		<section className="wellness-section learn-section" id="how-sara-learns">
			<div className="section-heading section-heading--center">
				<p className="eyebrow">{t.learnEyebrow}</p>
				<h2>{t.learnTitle}</h2>
				<p>{t.learnNote}</p>
			</div>
			<div className="learn-grid">
				{cards.map(([title, body]) => (
					<article className="learn-card" key={title}>
						<h3>{title}</h3>
						<p>{body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

export function TrustStrip({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	const items = locale === "ar" ? trustAr : trustEn;
	return (
		<section className="wellness-section trust-section" id="safety">
			<div className="section-heading section-heading--center">
				<p className="eyebrow">{t.trustEyebrow}</p>
				<h2>{t.trustTitle}</h2>
				<p>{t.trustBody}</p>
			</div>
			<ul className="trust-strip">
				{items.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
			<p className="trust-link">
				<a href="/safety">{locale === "ar" ? "اقرأ صفحة السلامة الكاملة" : "Read the full Safety page"}</a>
			</p>
			<aside className="human-support-card">
				<span className="human-support-card__icon" aria-hidden="true">
					+
				</span>
				<h3>{t.humanTitle}</h3>
				<p>{t.humanBody}</p>
			</aside>
			<div className="representation-note sr-only">
				{[heroVisual, ...outcomeVisuals]
					.map((visual) => `${visual.genderFocus}:${visual.alt.en}`)
					.join(" | ")}
			</div>
		</section>
	);
}

export function PricingPrototype({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	const page = copy[locale];
	const ops = useOperationalPricing(locale);
	const [waitlistOpen, setWaitlistOpen] = useState(false);
	const priceLabel = ops.priceLabel ?? t.pricingNote;
	const includes =
		locale === "ar"
			? [
					"دعم يومي",
					"مراجعات أسبوعية",
					"خطة تتكيف معك",
					"تحكم كامل بالتذكيرات",
					"إيقاف مؤقت في أي وقت",
				]
			: [
					"Daily support",
					"Weekly reviews",
					"A plan that adapts with you",
					"Full reminder control",
					"Pause anytime",
				];
	return (
		<section className="wellness-section pricing-section" id="pricing">
			<div className="section-heading section-heading--center">
				<p className="eyebrow">{t.pricingEyebrow}</p>
				<h2>{t.conversionTitle}</h2>
			</div>
			<article className="price-card price-card--featured conversion-price">
				<span className="price-card__tag">
					{locale === "ar" ? "رحلة 8 أسابيع" : "8-week journey"}
				</span>
				<h3>{t.pricingTitle}</h3>
				<p className="price-placeholder">{priceLabel}</p>
				<ul>
					{includes.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
				{ops.paymentCtaEnabled ? (
					<button type="button" disabled aria-describedby="pricing-payment-note">
						{page.paymentCta}
					</button>
				) : ops.waitlistBackendEnabled ? (
					<button type="button" onClick={() => setWaitlistOpen(true)} aria-describedby="pricing-waitlist-note">
						{page.waitlistCta}
					</button>
				) : (
					<button type="button" disabled aria-disabled="true" aria-describedby="pricing-waitlist-note">
						{t.pricingCta}
					</button>
				)}
				<small id="pricing-waitlist-note">
					{locale === "ar"
						? "الاشتراك غير متاح بعد — هذه معاينة للمنتج. لا يتم تحصيل أي دفعة حتى تأكيد الدفع من الخادم."
						: "Subscriptions are not available yet — this is a product preview. No payment is taken until server-side confirmation."}
				</small>
				{ops.paymentCtaEnabled ? <small id="pricing-payment-note">{page.paymentPending}</small> : null}
			</article>
			<WaitlistDialog locale={locale} open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
		</section>
	);
}

/** @deprecated Name retained for info-page imports. */
export function WellnessAreas({ locale }: { locale: WellnessLocale }) {
	return <HowSaraWorks locale={locale} />;
}

/** @deprecated Name retained for info-page imports. */
export function SafetyPrivacy({ locale }: { locale: WellnessLocale }) {
	return <TrustStrip locale={locale} />;
}

export default function BelowFoldWellness({ locale }: { locale: WellnessLocale }) {
	return (
		<>
			<OutcomeImagery locale={locale} />
			<HowSaraWorks locale={locale} />
			<DailyCompanion locale={locale} />
			<EightWeekJourney locale={locale} />
			<HowSaraLearns locale={locale} />
			<TrustStrip locale={locale} />
			<PricingPrototype locale={locale} />
		</>
	);
}
