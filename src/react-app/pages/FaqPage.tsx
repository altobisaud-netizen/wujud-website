import { WUJUD_PRODUCT_CATALOG, t, type Locale } from "../../content/wujudProductCatalog";
import { SiteFooter } from "../sections/SiteFooter";
import { useLegalPageMeta } from "./useLegalPageMeta";
import "../conversational/conversational.css";
import "../landing.css";

export function FaqPage() {
	const locale: Locale = document.documentElement.lang === "ar" ? "ar" : "en";
	const catalog = WUJUD_PRODUCT_CATALOG;
	useLegalPageMeta(
		locale === "ar" ? "WUJUD — الأسئلة الشائعة" : "WUJUD — FAQ",
		locale === "ar"
			? "أسئلة شائعة حول WUJUD و SARA من الكتالوج المعتمد."
			: "Frequently asked questions about WUJUD and SARA from the approved catalog.",
	);

	return (
		<div className="landing landing--product">
			<header className="conv__header">
				<a className="conv__brand" href="/">
					WUJUD<span>.ai</span>
				</a>
				<nav className="conv__nav">
					<a href={catalog.canonicalPaths.pricing}>{locale === "ar" ? "الأسعار" : "Pricing"}</a>
					<a href={catalog.canonicalPaths.faq} aria-current="page">
						{locale === "ar" ? "الأسئلة" : "FAQ"}
					</a>
					<a href="/">{locale === "ar" ? "المحادثة" : "Home"}</a>
				</nav>
			</header>
			<main className="container section" style={{ paddingTop: "2rem" }}>
				<h1>
					{locale === "ar"
						? "الأسئلة الشائعة حول WUJUD و SARA"
						: "Frequently asked questions about WUJUD and SARA"}
				</h1>
				<div style={{ marginTop: "1.25rem", display: "grid", gap: "0.75rem" }}>
					{catalog.faqs.map((faq) => (
						<details key={faq.id} className="conv__card">
							<summary style={{ fontWeight: 600, cursor: "pointer" }}>
								{t(faq.question, locale)}
							</summary>
							<p style={{ marginTop: "0.65rem" }}>{t(faq.answer, locale)}</p>
						</details>
					))}
				</div>
				<p style={{ marginTop: "1.5rem" }}>
					<a href={catalog.canonicalPaths.howItWorks}>
						{locale === "ar" ? "كيف يعمل" : "How it works"}
					</a>
					{" · "}
					<a href="/">{locale === "ar" ? "المحادثة" : "Conversation home"}</a>
				</p>
			</main>
			<SiteFooter />
		</div>
	);
}
