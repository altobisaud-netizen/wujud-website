import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { copy } from "./locale";
import { readOperationalFlags } from "./operational/flags";
import { isWellnessClerkConfigured } from "./operational/wellnessClerkConfig";
import type { WellnessLocale } from "./types";

function SiteHeaderClerkActions({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale];
	const { signOut } = useClerk();
	return (
		<>
			<SignedOut>
				<a className="sign-in-link" href="/account/privacy">
					{t.nav.signIn}
				</a>
			</SignedOut>
			<SignedIn>
				<a className="sign-in-link" href="/account/privacy">
					{t.nav.account}
				</a>
				<button type="button" className="sign-out-button" onClick={() => void signOut()}>
					{t.nav.signOut}
				</button>
			</SignedIn>
		</>
	);
}

function SiteHeaderAuthActions({ locale }: { locale: WellnessLocale }) {
	const t = copy[locale];
	const flags = readOperationalFlags();
	if (!flags.authEnabled || !isWellnessClerkConfigured()) {
		return (
			<a className="sign-in-link" href="/account/privacy">
				{t.nav.signIn}
			</a>
		);
	}
	return <SiteHeaderClerkActions locale={locale} />;
}

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
				<a href="/how-it-works">{t.nav.how}</a>
				<a href="/pricing">{t.nav.pricing}</a>
				<a href="/safety">{t.nav.safety}</a>
				<a href="/about">{t.nav.about}</a>
				<a href="/privacy">{t.nav.privacy}</a>
				<a href="/contact">{t.nav.contact}</a>
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
				<SiteHeaderAuthActions locale={locale} />
				<a className="header-cta" href="/#wellness-conversation">
					<span className="chat-glyph" aria-hidden="true" />
					{t.nav.cta}
				</a>
			</div>
		</header>
	);
}
