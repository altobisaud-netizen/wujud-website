import { lazy, Suspense, useEffect, useMemo, useState, type FormEvent } from "react";
import {
	buildPersonalizedPlan,
	choicesForState,
	createDiscoveryState,
	selectDiscoveryAnswer,
	submitFreeText,
} from "./conversation";
import { copy } from "./locale";
import { SiteHeader } from "./SiteHeader";
import type { WellnessLocale } from "./types";

const BelowFoldWellness = lazy(() => import("./BelowFoldWellness"));

function readInitialLocale(): WellnessLocale {
	try {
		return window.localStorage.getItem("wujud-wellness-locale") === "ar" ? "ar" : "en";
	} catch {
		return "en";
	}
}

export function WellnessHomePage() {
	const [locale, setLocale] = useState<WellnessLocale>(readInitialLocale);
	const [discovery, setDiscovery] = useState(() => createDiscoveryState(locale));
	const [composer, setComposer] = useState("");
	const t = copy[locale];
	const choices = choicesForState(discovery, locale);
	const plan = useMemo(
		() => buildPersonalizedPlan(discovery.answers, locale),
		[discovery.answers, locale],
	);
	const latestSaraMessage = [...discovery.messages].reverse().find((message) => message.role === "sara");

	useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
		try {
			window.localStorage.setItem("wujud-wellness-locale", locale);
		} catch {
			// The preview still works when storage is unavailable.
		}
	}, [locale]);

	function changeLocale(next: WellnessLocale) {
		if (next === locale) return;
		setLocale(next);
		setDiscovery(createDiscoveryState(next));
		setComposer("");
	}

	function choose(id: string, label: string) {
		setDiscovery((current) => selectDiscoveryAnswer(current, id, label, locale));
		setComposer("");
	}

	function submit(e: FormEvent) {
		e.preventDefault();
		const next = submitFreeText(discovery, composer, locale);
		if (next !== discovery) {
			setDiscovery(next);
			setComposer("");
		}
	}

	function reset() {
		setDiscovery(createDiscoveryState(locale));
		setComposer("");
	}

	return (
		<div className="wellness-app" dir={locale === "ar" ? "rtl" : "ltr"}>
			<a className="skip-link" href="#wellness-conversation">
				{locale === "ar" ? "انتقل إلى المحادثة" : "Skip to conversation"}
			</a>
			<SiteHeader locale={locale} onLocaleChange={changeLocale} />

			<main>
				<section className="wellness-hero">
					<div className="hero-ambient hero-ambient--one" aria-hidden="true" />
					<div className="hero-ambient hero-ambient--two" aria-hidden="true" />
					<div className="hero-copy">
						<p className="eyebrow">{t.heroEyebrow}</p>
						<h1>{t.heroTitle}</h1>
						<p className="hero-copy__body">{t.heroBody}</p>
						<div className="hero-trust-row" aria-label={locale === "ar" ? "مبادئ وجود" : "WUJUD principles"}>
							<span>
								<i aria-hidden="true">◌</i>
								{locale === "ar" ? "خاص" : "Private"}
							</span>
							<span>
								<i aria-hidden="true">↗</i>
								{locale === "ar" ? "واقعي" : "Realistic"}
							</span>
							<span>
								<i aria-hidden="true">♡</i>
								{locale === "ar" ? "من دون أحكام" : "Non-judgmental"}
							</span>
						</div>
					</div>

					<div className="conversation-shell" id="wellness-conversation">
						<div className="conversation-topbar">
							<div className="sara-identity">
								<span className="sara-orb" aria-hidden="true">
									S
								</span>
								<div>
									<strong>SARA</strong>
									<small>
										<span className="status-dot" aria-hidden="true" />
										{locale === "ar" ? "رفيقتك للعافية" : "Your wellness companion"}
									</small>
								</div>
							</div>
							<button className="reset-button" type="button" onClick={reset}>
								{t.reset}
							</button>
						</div>

						<div className="conversation-thread" aria-label={locale === "ar" ? "محادثة استكشاف العافية" : "Wellness discovery conversation"}>
							{discovery.messages.map((message) => (
								<div
									className={`message-row message-row--${message.role}`}
									key={message.id}
								>
									{message.role === "sara" ? (
										<span className="sara-orb sara-orb--tiny" aria-hidden="true">
											S
										</span>
									) : null}
									<div className={`message-bubble message-bubble--${message.role}`}>
										{message.text.split("\n").map((line, index) =>
											line ? <p key={`${message.id}-${index}`}>{line}</p> : <br key={`${message.id}-${index}`} />,
										)}
									</div>
								</div>
							))}

							{discovery.stage !== "preview" ? (
								<fieldset className="choice-grid">
									<legend className="sr-only">
										{locale === "ar" ? "اختر إجابتك" : "Choose your answer"}
									</legend>
									{choices.map((choice) => (
										<button
											type="button"
											key={choice.id}
											onClick={() => choose(choice.id, choice.label)}
										>
											{choice.label}
											<span aria-hidden="true">→</span>
										</button>
									))}
								</fieldset>
							) : (
								<section className="plan-preview" aria-labelledby="plan-preview-title">
									<p className="eyebrow">{locale === "ar" ? "معاينة شخصية" : "Personalized preview"}</p>
									<h2 id="plan-preview-title">{t.previewTitle}</h2>
									<p>{t.previewIntro}</p>
									<ul>
										{plan.map((action) => (
											<li key={action}>
												<span aria-hidden="true">✓</span>
												{action}
											</li>
										))}
									</ul>
									<p className="plan-preview__closing">{t.previewClosing}</p>
									<div className="save-journey-card">
										<div>
											<strong>{t.saveTitle}</strong>
											<p>{t.saveBody}</p>
										</div>
										<button type="button" disabled aria-describedby="prototype-account-note">
											{t.saveCta}
										</button>
										<small id="prototype-account-note">{t.prototype}</small>
									</div>
								</section>
							)}
						</div>

						{discovery.stage !== "preview" ? (
							<form className="wellness-composer" onSubmit={submit}>
								<label className="sr-only" htmlFor="wellness-message">
									{t.composerLabel}
								</label>
								<input
									id="wellness-message"
									value={composer}
									onChange={(event) => setComposer(event.target.value)}
									placeholder={t.composerPlaceholder}
									maxLength={400}
									autoComplete="off"
								/>
								<button type="submit" disabled={!composer.trim()}>
									<span className="sr-only">{t.send}</span>
									<span aria-hidden="true">↑</span>
								</button>
							</form>
						) : null}
						<p className="privacy-hint">
							<span aria-hidden="true">⌁</span>
							{t.privacyHint}
						</p>
						<div className="sr-only" aria-live="polite" aria-atomic="true">
							{latestSaraMessage?.text}
						</div>
					</div>
				</section>

				<Suspense
					fallback={
						<div className="lazy-fallback" role="status">
							{t.loadingMore}
						</div>
					}
				>
					<BelowFoldWellness locale={locale} />
				</Suspense>
			</main>

			<footer className="wellness-footer">
				<div>
					<strong>WUJUD</strong>
					<p>{locale === "ar" ? "عافية يومية، بخطوات إنسانية." : "Daily wellness, through human-sized steps."}</p>
				</div>
				<nav aria-label={locale === "ar" ? "روابط التذييل" : "Footer links"}>
					<a href="/privacy">{locale === "ar" ? "الخصوصية" : "Privacy"}</a>
					<a href="/terms">{locale === "ar" ? "الشروط" : "Terms"}</a>
					<a href="/contact">{locale === "ar" ? "تواصل معنا" : "Contact"}</a>
				</nav>
				<small>© 2026 WUJUD</small>
			</footer>
		</div>
	);
}
