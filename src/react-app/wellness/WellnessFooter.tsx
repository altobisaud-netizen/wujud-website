import { copy } from "./locale";
import type { WellnessLocale } from "./types";

export function WellnessFooter({
	locale,
	onLocaleChange,
}: {
	locale: WellnessLocale;
	onLocaleChange: (locale: WellnessLocale) => void;
}) {
	const t = copy[locale];
	return (
		<footer className="wellness-footer">
			<div className="wellness-footer__brand">
				<strong>{t.footer.brand}</strong>
				<p>{t.footer.tagline}</p>
				<p className="wellness-footer__disclaimer">{t.footer.disclaimer}</p>
			</div>
			<nav aria-label={locale === "ar" ? "روابط التذييل" : "Footer links"}>
				<a href="/how-it-works">{t.nav.how}</a>
				<a href="/pricing">{t.nav.pricing}</a>
				<a href="/safety">{t.nav.safety}</a>
				<a href="/about">{t.nav.about}</a>
				<a href="/privacy">{t.nav.privacy}</a>
				<a href="/terms">{t.nav.terms}</a>
				<a href="/data-deletion">{t.nav.dataDeletion}</a>
				<a href="/contact">{t.nav.contact}</a>
			</nav>
			<div className="wellness-footer__meta">
				<div className="language-switch" aria-label={locale === "ar" ? "اختيار اللغة" : "Language"}>
					<button
						type="button"
						className={locale === "en" ? "is-active" : ""}
						aria-pressed={locale === "en"}
						onClick={() => onLocaleChange("en")}
					>
						EN
					</button>
					<span aria-hidden="true">/</span>
					<button
						type="button"
						className={locale === "ar" ? "is-active" : ""}
						aria-pressed={locale === "ar"}
						onClick={() => onLocaleChange("ar")}
					>
						العربية
					</button>
				</div>
				<small>{t.footer.copyright}</small>
			</div>
		</footer>
	);
}
