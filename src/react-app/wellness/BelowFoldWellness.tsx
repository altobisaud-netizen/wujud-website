import { copy, wellnessAreaCopy } from "./locale";
import type { WellnessLocale } from "./types";

const journeyEn = [
	["Week 1", "Understand your routine", "Notice your current rhythm without judgment."],
	["Week 2", "Create one realistic daily action", "Choose a step small enough for ordinary days."],
	["Week 3", "Improve consistency", "Make the helpful action easier to repeat."],
	["Week 4", "Review barriers and simplify", "Reduce friction instead of adding pressure."],
	["Week 5", "Build on what is working", "Add only what your routine can support."],
	["Week 6", "Improve recovery after missed days", "Return gently after plans change."],
	["Week 7", "Strengthen independence", "Practice choosing your own next action."],
	["Week 8", "Create a sustainable continuation plan", "Keep the tools that fit your real life."],
];

const journeyAr = [
	["الأسبوع 1", "افهم روتينك", "لاحظ إيقاع يومك الحالي من دون أحكام."],
	["الأسبوع 2", "اختر خطوة يومية واقعية", "ابدأ بخطوة صغيرة تناسب الأيام العادية."],
	["الأسبوع 3", "حسّن الاستمرارية", "اجعل الخطوة المفيدة أسهل في التكرار."],
	["الأسبوع 4", "راجع العوائق وبسّط", "خفّف الصعوبة بدلاً من زيادة الضغط."],
	["الأسبوع 5", "ابنِ على ما ينجح", "أضف فقط ما يستطيع روتينك استيعابه."],
	["الأسبوع 6", "تعلّم العودة بعد الأيام الفائتة", "ارجع بلطف عندما تتغير الخطط."],
	["الأسبوع 7", "عزّز استقلاليتك", "تدرّب على اختيار خطوتك التالية بنفسك."],
	["الأسبوع 8", "ضع خطة استمرار مستدامة", "احتفظ بالأدوات التي تناسب حياتك."],
];

const dailyEn = [
	{
		label: "Morning",
		message: "How is your energy this morning? What is one realistic action you can complete today?",
	},
	{
		label: "During the day",
		message: "Would a short walk or stretch fit into your afternoon?",
	},
	{
		label: "Evening",
		message: "What went well today? What made your routine harder?",
	},
	{
		label: "After a missed day",
		message:
			"Yesterday did not go as planned, and that is okay. Would you prefer a smaller action today or a fresh start tomorrow?",
	},
];

const dailyAr = [
	{
		label: "الصباح",
		message: "كيف تبدو طاقتك هذا الصباح؟ ما الخطوة الواقعية التي تستطيع إكمالها اليوم؟",
	},
	{ label: "خلال اليوم", message: "هل يناسبك مشي قصير أو بعض التمدد بعد الظهر؟" },
	{ label: "المساء", message: "ما الذي سار جيداً اليوم؟ وما الذي جعل روتينك أصعب؟" },
	{
		label: "بعد يوم فائت",
		message:
			"لم يسر يوم أمس كما خططت، ولا بأس بذلك. هل تفضّل خطوة أصغر اليوم أم بداية جديدة غداً؟",
	},
];

export function WellnessAreas({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	return (
		<section className="wellness-section areas-section" id="how-it-works">
			<div className="section-heading">
				<p className="eyebrow">{t.areasEyebrow}</p>
				<h2>{t.areasTitle}</h2>
				<p>{t.areasBody}</p>
			</div>
			<div className="area-grid">
				{wellnessAreaCopy(locale).map(([title, body], index) => (
					<article className="area-card" key={title}>
						<span aria-hidden="true">{["☀", "↗", "◌", "☾", "✓"][index]}</span>
						<h3>{title}</h3>
						<p>{body}</p>
					</article>
				))}
			</div>
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
							<p>{example.message}</p>
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
				<p>
					{locale === "ar"
						? "كل أسبوع يبني على ما تعلّمته، من دون وعود بنتائج صحية مضمونة."
						: "Each week builds on what you learn, without promising guaranteed health outcomes."}
				</p>
			</div>
			<ol className="journey-list">
				{weeks.map(([week, title, body], index) => (
					<li key={week}>
						<div className="journey-index" aria-hidden="true">
							{String(index + 1).padStart(2, "0")}
						</div>
						<div>
							<p>{week}</p>
							<h3>{title}</h3>
							<span>{body}</span>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}

export function SafetyPrivacy({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	const items =
		locale === "ar"
			? [
					"تدعم سارة روتين العافية العامة فقط.",
					"لا تشخّص سارة الحالات الطبية ولا تصف الأدوية.",
					"لا تحل سارة محل المختصين الصحيين المؤهلين.",
					"في تجربة الحساب المستقبلية، ستتحكم في التذكيرات وإيقاف الرحلة وطلبات الحذف.",
					"لا ينشئ هذا النموذج حساباً ولا يخزّن بيانات العافية.",
					"يجب أن تبقى أي معلومات عافية مستقبلية منفصلة تماماً عن سارة للأعمال المؤرشفة.",
				]
			: [
					"SARA supports general wellness routines.",
					"SARA does not diagnose medical conditions or prescribe medication.",
					"SARA does not replace qualified healthcare professionals.",
					"In a future account experience, you would control reminders, pausing and deletion requests.",
					"This prototype creates no account and stores no wellness data.",
					"Any future wellness information must remain separate from archived SARA Business.",
				];
	return (
		<section className="wellness-section safety-section" id="safety">
			<div className="safety-layout">
				<div className="section-heading">
					<p className="eyebrow">{t.safetyEyebrow}</p>
					<h2>{t.safetyTitle}</h2>
					<ul className="check-list">
						{items.map((item) => (
							<li key={item}>
								<span aria-hidden="true">✓</span>
								{item}
							</li>
						))}
					</ul>
				</div>
				<aside className="human-support-card">
					<span className="human-support-card__icon" aria-hidden="true">
						+
					</span>
					<h3>{t.humanTitle}</h3>
					<p>{t.humanBody}</p>
				</aside>
			</div>
		</section>
	);
}

export function PricingPrototype({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale].sections;
	const plans =
		locale === "ar"
			? [
					{
						title: "رحلة الثمانية أسابيع",
						tag: "للمراجعة التجارية",
						items: ["خطة عافية شخصية", "متابعة يومية", "مراجعات أسبوعية", "تذكيرات مرنة", "خيارات الإيقاف والخصوصية"],
					},
					{
						title: "الاستمرار",
						tag: "سعر مبدئي غير معتمد",
						items: ["دعم مستمر للروتين بعد البرنامج", "مراجعات أخف", "تحكم كامل بالتذكيرات"],
					},
					{
						title: "خطة بدعم بشري",
						tag: "لاحقاً أو بعد الاستشارة",
						items: ["لم تُطلق بعد", "لا ندّعي وجود شبكة متخصصين حالياً", "تُحدد فقط بعد مراجعة تجارية وتشغيلية"],
					},
				]
			: [
					{
						title: "Eight-Week Journey",
						tag: "Placeholder — commercial review",
						items: ["Personalized wellness plan", "Daily check-ins", "Weekly reviews", "Adaptive reminders", "Pause and privacy controls"],
					},
					{
						title: "Continuation",
						tag: "Price not finalized",
						items: ["Ongoing routine support after the program", "Lighter reviews", "Full reminder control"],
					},
					{
						title: "Human-supported plan",
						tag: "Coming later or by consultation",
						items: ["Not yet launched", "No current professional network claimed", "Subject to commercial and operational review"],
					},
				];
	return (
		<section className="wellness-section pricing-section" id="pricing">
			<div className="section-heading section-heading--center">
				<p className="eyebrow">{t.pricingEyebrow}</p>
				<h2>{t.pricingTitle}</h2>
			</div>
			<div className="pricing-grid">
				{plans.map((plan, index) => (
					<article className={`price-card ${index === 0 ? "price-card--featured" : ""}`} key={plan.title}>
						<span className="price-card__tag">{plan.tag}</span>
						<h3>{plan.title}</h3>
						<p className="price-placeholder">{locale === "ar" ? "يُحدد لاحقاً" : "To be confirmed"}</p>
						<ul>
							{plan.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
						<button type="button" disabled>
							{locale === "ar" ? "نموذج تجريبي فقط" : "Prototype only"}
						</button>
					</article>
				))}
			</div>
		</section>
	);
}

export default function BelowFoldWellness({ locale }: { locale: WellnessLocale }) {
	return (
		<>
			<WellnessAreas locale={locale} />
			<DailyCompanion locale={locale} />
			<EightWeekJourney locale={locale} />
			<SafetyPrivacy locale={locale} />
			<PricingPrototype locale={locale} />
		</>
	);
}
