import { WUJUD_PRODUCT_CATALOG, t, type Locale } from "../../content/wujudProductCatalog";
import { SiteFooter } from "../sections/SiteFooter";
import { useLegalPageMeta } from "./useLegalPageMeta";
import "../conversational/conversational.css";
import "../landing.css";

export function PricingPage() {
	const locale: Locale = document.documentElement.lang === "ar" ? "ar" : "en";
	const catalog = WUJUD_PRODUCT_CATALOG;
	useLegalPageMeta(
		locale === "ar" ? "WUJUD — الأسعار" : "WUJUD — Pricing",
		locale === "ar"
			? "أسعار خطط WUJUD و SARA: Starter و Growth و Scale."
			: "WUJUD and SARA pricing plans: Starter, Growth, and Scale.",
	);

	return (
		<div className="landing landing--product">
			<header className="conv__header">
				<a className="conv__brand" href="/">
					WUJUD<span>.ai</span>
				</a>
				<nav className="conv__nav">
					<a href={catalog.canonicalPaths.pricing} aria-current="page">
						{locale === "ar" ? "الأسعار" : "Pricing"}
					</a>
					<a href={catalog.canonicalPaths.faq}>{locale === "ar" ? "الأسئلة" : "FAQ"}</a>
					<a href="/">{locale === "ar" ? "المحادثة" : "Home"}</a>
				</nav>
			</header>
			<main className="container section" style={{ paddingTop: "2rem" }}>
				<h1>{locale === "ar" ? "أسعار بسيطة. نتائج قوية." : "Simple pricing. Powerful results."}</h1>
				<p>{locale === "ar" ? "اختر خطة تناسب عملك." : "Choose a plan that fits your business."}</p>
				<div className="conv__cards" style={{ marginTop: "1.5rem" }}>
					{catalog.plans.map((plan) => (
						<article
							key={plan.id}
							className={`conv__card${plan.featured ? " conv__card--featured" : ""}`}
						>
							{plan.badge ? <span className="conv__badge">{t(plan.badge, locale)}</span> : null}
							<h2>{t(plan.name, locale)}</h2>
							<p>{t(plan.tagline, locale)}</p>
							<p className="conv__price">{t(plan.priceMonthlyDisplay, locale)}</p>
							<ul>
								{plan.features.map((f) => (
									<li key={t(f, "en")}>{t(f, locale)}</li>
								))}
							</ul>
							<p>
								<a href={plan.ctaHref}>{t(plan.cta, locale)}</a>
							</p>
						</article>
					))}
				</div>
				<p style={{ marginTop: "1.5rem" }}>
					<a href="/">{locale === "ar" ? "← العودة للمحادثة" : "← Back to conversation"}</a>
				</p>
			</main>
			<SiteFooter />
		</div>
	);
}
