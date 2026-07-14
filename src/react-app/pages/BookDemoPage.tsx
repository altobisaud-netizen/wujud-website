import { DemoRequestForm } from "../components/DemoRequestForm";
import { WUJUD_PRODUCT_CATALOG } from "../../content/wujudProductCatalog";
import { SiteFooter } from "../sections/SiteFooter";
import { useLegalPageMeta } from "./useLegalPageMeta";
import "../conversational/conversational.css";
import "../landing.css";

export function BookDemoPage() {
	const catalog = WUJUD_PRODUCT_CATALOG;
	useLegalPageMeta(
		"WUJUD — Book a demo",
		"Tell us about your business and the WUJUD team will contact you.",
	);

	return (
		<div className="landing landing--product">
			<header className="conv__header">
				<a className="conv__brand" href="/">
					WUJUD<span>.ai</span>
				</a>
				<nav className="conv__nav">
					<a href={catalog.canonicalPaths.pricing}>Pricing</a>
					<a href={catalog.canonicalPaths.faq}>FAQ</a>
					<a href={catalog.canonicalPaths.bookDemo} aria-current="page">
						Book a demo
					</a>
				</nav>
			</header>
			<main className="container section" id="book-demo" style={{ paddingTop: "2rem", maxWidth: 560 }}>
				<h1>Book a demo</h1>
				<p>Tell us about your business and the WUJUD team will contact you.</p>
				<div style={{ marginTop: "1.25rem" }}>
					<DemoRequestForm />
				</div>
				<p style={{ marginTop: "1.5rem" }}>
					<a href="/">← Back to conversation</a>
				</p>
			</main>
			<SiteFooter />
		</div>
	);
}
