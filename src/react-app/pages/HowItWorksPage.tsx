import { WUJUD_PRODUCT_CATALOG, t, type Locale } from "../../content/wujudProductCatalog";
import { SiteFooter } from "../sections/SiteFooter";
import { useLegalPageMeta } from "./useLegalPageMeta";
import "../conversational/conversational.css";
import "../landing.css";

export function HowItWorksPage() {
	const locale: Locale = document.documentElement.lang === "ar" ? "ar" : "en";
	const catalog = WUJUD_PRODUCT_CATALOG;
	useLegalPageMeta(
		locale === "ar" ? "WUJUD — كيف يعمل" : "WUJUD — How it works",
		locale === "ar"
			? "قدرات SARA وخطوات الإعداد وتوفر القنوات."
			: "SARA capabilities, setup guidance, and channel availability.",
	);

	return (
		<div className="landing landing--product">
			<header className="conv__header">
				<a className="conv__brand" href="/">
					WUJUD<span>.ai</span>
				</a>
				<nav className="conv__nav">
					<a href={catalog.canonicalPaths.pricing}>{locale === "ar" ? "الأسعار" : "Pricing"}</a>
					<a href={catalog.canonicalPaths.faq}>{locale === "ar" ? "الأسئلة" : "FAQ"}</a>
					<a href={catalog.canonicalPaths.howItWorks} aria-current="page">
						{locale === "ar" ? "كيف يعمل" : "How it works"}
					</a>
				</nav>
			</header>
			<main className="container section" style={{ paddingTop: "2rem" }}>
				<h1>{locale === "ar" ? "كيف تعمل SARA" : "How SARA works"}</h1>
				<section style={{ marginTop: "1.25rem" }}>
					<h2>{locale === "ar" ? "القدرات" : "Capabilities"}</h2>
					<div className="conv__cards">
						{catalog.capabilities.map((cap) => (
							<article key={cap.id} className="conv__card">
								<h3>{t(cap.title, locale)}</h3>
								<p>{t(cap.body, locale)}</p>
							</article>
						))}
					</div>
				</section>
				<section style={{ marginTop: "1.5rem" }}>
					<h2>{locale === "ar" ? "خطوات الإعداد" : "Setup guidance"}</h2>
					<ol>
						{catalog.setupGuidance.map((step) => (
							<li key={step.id} style={{ marginBottom: "0.75rem" }}>
								<strong>{t(step.title, locale)}</strong>
								<p>{t(step.body, locale)}</p>
							</li>
						))}
					</ol>
				</section>
				<section style={{ marginTop: "1.5rem" }}>
					<h2>{locale === "ar" ? "توفر القنوات" : "Channel availability"}</h2>
					<ul>
						{catalog.channels.map((ch) => (
							<li key={ch.id} style={{ marginBottom: "0.65rem" }}>
								<strong>{t(ch.label, locale)}</strong> — {ch.status}: {t(ch.note, locale)}
							</li>
						))}
					</ul>
				</section>
				<p style={{ marginTop: "1.5rem" }}>
					<a href="/">{locale === "ar" ? "ابدأ المحادثة" : "Start the conversation"}</a>
				</p>
			</main>
			<SiteFooter />
		</div>
	);
}
