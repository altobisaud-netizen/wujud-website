import { copy } from "./locale";
import type { WellnessLocale } from "./types";

export function SiteHeader({
	locale,
	onLocaleChange,
}: {
	locale: WellnessLocale;
	onLocaleChange: (locale: WellnessLocale) => void;
}) {
	const t = copy[locale];
	return (
		<header className="wellness-header">
			<a className="wellness-brand" href="/" aria-label="WUJUD home">
				<span className="wellness-brand__mark" aria-hidden="true">
					<span />
					<span />
					<span />
				</span>
				<span className="wellness-brand__text">
					<strong>WUJUD</strong>
					<small>{t.brandTagline}</small>
				</span>
			</a>

			<nav className="wellness-nav" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}>
				<a href="/">{t.nav.home}</a>
				<a href="/how-it-works">{t.nav.how}</a>
				<a href="/eight-week-journey">{t.nav.journey}</a>
				<a href="#how-sara-learns">{t.nav.learn}</a>
				<a href="/safety">{t.nav.safety}</a>
				<a href="/pricing">{t.nav.pricing}</a>
			</nav>

			<div className="wellness-header__actions">
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
				<span className="sign-in-soon" aria-disabled="true">
					{t.nav.signIn}
				</span>
				<a className="header-cta" href="#wellness-conversation">
					<span className="chat-glyph" aria-hidden="true" />
					{t.nav.cta}
				</a>
			</div>
		</header>
	);
}
