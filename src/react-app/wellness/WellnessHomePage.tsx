import { lazy, Suspense, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
	buildPersonalizedPreview,
	choicesForState,
	clearSessionAnswers,
	createDiscoveryState,
	selectDiscoveryAnswer,
	submitFreeText,
	undoLastChoice,
} from "./conversation";
import { copy } from "./locale";
import { heroVisual } from "./lifestyleImagery";
import { WaitlistDialog } from "./operational/WaitlistDialog";
import { SaveJourneyDialog } from "./operational/SaveJourneyDialog";
import { useWellnessSessionToken } from "./operational/useWellnessSessionToken";
import { isWellnessClerkConfigured } from "./operational/wellnessClerkConfig";
import { readOperationalFlags } from "./operational/flags";
import { useOperationalPricing } from "./operational/useOperationalPricing";
import { SiteHeader } from "./SiteHeader";
import type { WellnessLocale } from "./types";
import { useWellnessMetadata } from "./useWellnessMetadata";
import { WellnessPicture } from "./WellnessPicture";
import { WellnessReviewMode } from "./WellnessReviewMode";

const BelowFoldWellness = lazy(() => import("./BelowFoldWellness"));

function readInitialLocale(): WellnessLocale {
	try {
		const stored = window.localStorage.getItem("wujud-wellness-locale");
		if (stored === "en" || stored === "ar") return stored;
	} catch {
		// Fall through to Arabic-first default.
	}
	return "ar";
}

function prefersReducedMotion(): boolean {
	try {
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	} catch {
		return false;
	}
}

export function WellnessHomePage() {
	const flags = readOperationalFlags();
	const clerkReady = flags.authEnabled && isWellnessClerkConfigured();
	if (clerkReady) {
		return <WellnessHomePageAuthed />;
	}
	return <WellnessHomePageContent />;
}

function WellnessHomePageAuthed() {
	const getSessionToken = useWellnessSessionToken();
	return <WellnessHomePageContent getSessionToken={getSessionToken} />;
}

function WellnessHomePageContent({ getSessionToken }: { getSessionToken?: () => Promise<string | null> }) {
	const [locale, setLocale] = useState<WellnessLocale>(readInitialLocale);
	const [discovery, setDiscovery] = useState(() => createDiscoveryState(locale));
	const [composer, setComposer] = useState("");
	const [typing, setTyping] = useState(false);
	const [waitlistOpen, setWaitlistOpen] = useState(false);
	const [saveOpen, setSaveOpen] = useState(false);
	const typingTimer = useRef<number | null>(null);
	const t = copy[locale];
	const choices = choicesForState(discovery, locale);
	const preview = useMemo(
		() => buildPersonalizedPreview(discovery.answers, locale),
		[discovery.answers, locale],
	);
	const ops = useOperationalPricing(locale);
	const latestSaraMessage = [...discovery.messages].reverse().find((message) => message.role === "sara");
	useWellnessMetadata(locale);

	useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
		try {
			window.localStorage.setItem("wujud-wellness-locale", locale);
		} catch {
			// The preview still works when storage is unavailable.
		}
	}, [locale]);

	useEffect(() => {
		return () => {
			if (typingTimer.current) window.clearTimeout(typingTimer.current);
		};
	}, []);

	function withTyping(apply: () => void) {
		if (typingTimer.current) window.clearTimeout(typingTimer.current);
		if (prefersReducedMotion()) {
			apply();
			setTyping(false);
			return;
		}
		setTyping(true);
		typingTimer.current = window.setTimeout(() => {
			apply();
			setTyping(false);
			typingTimer.current = null;
		}, 420);
	}

	function changeLocale(next: WellnessLocale) {
		if (next === locale) return;
		setLocale(next);
		clearSessionAnswers();
		setDiscovery(createDiscoveryState(next));
		setComposer("");
		setTyping(false);
	}

	function choose(id: string, label: string) {
		withTyping(() => {
			setDiscovery((current) => selectDiscoveryAnswer(current, id, label, locale));
			setComposer("");
		});
	}

	function submit(e: FormEvent) {
		e.preventDefault();
		const value = composer;
		withTyping(() => {
			setDiscovery((current) => {
				const next = submitFreeText(current, value, locale);
				if (next !== current) setComposer("");
				return next;
			});
		});
	}

	function reset() {
		if (typingTimer.current) window.clearTimeout(typingTimer.current);
		clearSessionAnswers();
		setDiscovery(createDiscoveryState(locale));
		setComposer("");
		setTyping(false);
	}

	const structuredAnswers = {
		primaryGoal: discovery.answers.goal ?? "unsure",
		routineChallenge: discovery.answers.challenge ?? "unsure",
		preferredSupportTiming: "flexible",
		preferredCoachingStyle: preview.coachingStyle,
		language: locale,
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	};

	const priceDisplay = ops.priceLabel ?? (locale === "ar" ? "السعر قيد المراجعة" : "Price under review");

	function undo() {
		if (typingTimer.current) window.clearTimeout(typingTimer.current);
		setTyping(false);
		setDiscovery((current) => undoLastChoice(current));
	}

	const titleLines = t.heroTitle.split("\n");

	return (
		<div className="wellness-app conversion-home" dir={locale === "ar" ? "rtl" : "ltr"}>
			<a className="skip-link" href="#wellness-conversation">
				{locale === "ar" ? "انتقل إلى المحادثة" : "Skip to conversation"}
			</a>
			<WellnessReviewMode onReset={reset} />
			<SiteHeader locale={locale} onLocaleChange={changeLocale} />

			<main>
				<section className="wellness-hero conversion-hero" aria-labelledby="conversion-hero-title">
					<div className="hero-ambient hero-ambient--one" aria-hidden="true" />
					<div className="hero-ambient hero-ambient--two" aria-hidden="true" />

					<div className="hero-copy">
						<p className="eyebrow hero-eyebrow">
							<span aria-hidden="true">♡</span>
							{t.heroEyebrow}
						</p>
						<h1 id="conversion-hero-title">
							{titleLines.map((line) => (
								<span key={line} className="hero-title-line">
									{line}
								</span>
							))}
						</h1>
						<p className="hero-copy__body">{t.heroBody}</p>
						<ul className="hero-outcome-row" aria-label={locale === "ar" ? "نتائج يومية" : "Everyday outcomes"}>
							{t.heroOutcomes.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
						<div className="hero-actions">
							<a className="hero-cta hero-cta--primary" href="#wellness-conversation">
								<span className="chat-glyph" aria-hidden="true" />
								{t.heroPrimaryCta}
							</a>
							<a className="hero-cta hero-cta--secondary" href="/how-it-works">
								{t.heroSecondaryCta}
							</a>
						</div>
						<p className="hero-trust-line">{t.heroTrust}</p>
					</div>

					<figure className="hero-lifestyle">
						<WellnessPicture visual={heroVisual} locale={locale} eager className="hero-lifestyle__picture" />
						<figcaption>{heroVisual.label[locale]}</figcaption>
					</figure>

					<div
						className="conversation-shell phone-shell conversion-chat"
						id="wellness-conversation"
						role="region"
						aria-label={locale === "ar" ? "محادثة سارة التفاعلية" : "Interactive SARA conversation"}
					>
						<div className="conversation-topbar conversion-chat__topbar">
							<div className="sara-identity">
								<span className="sara-orb sara-orb--green" aria-hidden="true">
									S
								</span>
								<div>
									<strong>{locale === "ar" ? "سارة" : "SARA"}</strong>
									<small className="chat-subtitle">{t.chatSubtitle}</small>
									<small className="chat-status-line">
										<span className="status-dot status-dot--active" aria-hidden="true" />
										<span className="status-text">{t.chatStatus}</span>
									</small>
								</div>
							</div>
							<div className="conversation-controls">
								{discovery.history.length > 0 ? (
									<button className="reset-button" type="button" onClick={undo}>
										{t.undo}
									</button>
								) : null}
								<button className="reset-button" type="button" onClick={reset}>
									{t.reset}
								</button>
							</div>
						</div>

						<p className="chat-demo-label">{t.chatDemoLabel}</p>

						<div
							className="conversation-thread"
							aria-label={locale === "ar" ? "محادثة استكشاف العافية" : "Wellness discovery conversation"}
						>
							{discovery.messages.map((message) => (
								<div className={`message-row message-row--${message.role}`} key={message.id}>
									{message.role === "sara" ? (
										<span className="sara-orb sara-orb--tiny" aria-hidden="true">
											S
										</span>
									) : null}
									<div className={`message-bubble message-bubble--${message.role}`}>
										{message.text.split("\n").map((line, index) =>
											line ? (
												<p key={`${message.id}-${index}`}>{line}</p>
											) : (
												<br key={`${message.id}-${index}`} />
											),
										)}
									</div>
								</div>
							))}

							{typing ? (
								<div className="message-row message-row--sara" aria-live="polite">
									<span className="sara-orb sara-orb--tiny" aria-hidden="true">
										S
									</span>
									<div className="message-bubble message-bubble--sara typing-indicator">
										<span className="sr-only">{t.typing}</span>
										<span aria-hidden="true" />
										<span aria-hidden="true" />
										<span aria-hidden="true" />
									</div>
								</div>
							) : null}

							{!typing && discovery.stage !== "preview" ? (
								<fieldset className="choice-grid">
									<legend className="sr-only">
										{locale === "ar" ? "اختر إجابتك" : "Choose your answer"}
									</legend>
									{choices.map((choice) => (
										<button type="button" key={choice.id} onClick={() => choose(choice.id, choice.label)}>
											{choice.label}
										</button>
									))}
								</fieldset>
							) : null}

							{!typing && discovery.stage === "preview" ? (
								<section className="plan-preview" aria-labelledby="plan-preview-title">
									<p className="eyebrow">{locale === "ar" ? "معاينة شخصية" : "Personalized preview"}</p>
									<h2 id="plan-preview-title">{t.previewTitle}</h2>
									<p>{t.previewIntro}</p>
									<dl className="preview-meta">
										<div>
											<dt>{locale === "ar" ? "الهدف" : "Goal"}</dt>
											<dd>{preview.goalLabel}</dd>
										</div>
										<div>
											<dt>{locale === "ar" ? "التركيز الابتدائي" : "Starting focus"}</dt>
											<dd>{preview.startingFocus}</dd>
										</div>
										<div>
											<dt>{locale === "ar" ? "الدعم اليومي" : "Daily support"}</dt>
											<dd>{preview.dailySupport}</dd>
										</div>
										<div>
											<dt>{locale === "ar" ? "الدعم الأسبوعي" : "Weekly support"}</dt>
											<dd>{preview.weeklySupport}</dd>
										</div>
										<div>
											<dt>{locale === "ar" ? "أسلوب المرافقة" : "Coaching style"}</dt>
											<dd>{preview.coachingStyle}</dd>
										</div>
									</dl>
									<ul>
										{preview.actions.map((action) => (
											<li key={action}>
												<span aria-hidden="true">✓</span>
												{action}
											</li>
										))}
									</ul>
									<p className="plan-preview__closing">{t.previewClosing}</p>
									<div className="save-journey-card">
										<div>
											<strong>{locale === "ar" ? copy.ar.sections.conversionTitle : copy.en.sections.conversionTitle}</strong>
											<p>{t.saveBody}</p>
											<p className="price-placeholder">{priceDisplay}</p>
										</div>
										{ops.authBackendEnabled ? (
											<button type="button" onClick={() => setSaveOpen(true)}>
												{t.saveJourneyCta}
											</button>
										) : null}
										{ops.waitlistBackendEnabled ? (
											<button type="button" onClick={() => setWaitlistOpen(true)}>
												{t.waitlistCta}
											</button>
										) : (
											<button
												type="button"
												disabled
												aria-disabled="true"
												aria-describedby="prototype-account-note waitlist-note"
											>
												{t.saveCta}
											</button>
										)}
										{ops.paymentCtaEnabled ? (
											<button type="button" disabled aria-describedby="payment-pending-note">
												{t.paymentCta}
											</button>
										) : null}
										<small id="prototype-account-note">
											{ops.authBackendEnabled ? t.saveJourneyCta : t.prototype}
										</small>
										<small id="waitlist-note">{t.saveTitle}</small>
										{ops.paymentCtaEnabled ? (
											<small id="payment-pending-note">{t.paymentPending}</small>
										) : null}
									</div>
								</section>
							) : null}
						</div>

						{discovery.stage !== "preview" && discovery.stage !== "planFit" && discovery.stage !== "journeyAsk" ? (
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
									disabled={typing}
								/>
								<button type="submit" disabled={!composer.trim() || typing}>
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
							{typing ? t.typing : latestSaraMessage?.text}
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
					<a href="/account/privacy">{locale === "ar" ? "خصوصية الحساب" : "Account privacy"}</a>
					<a href="/contact">{locale === "ar" ? "تواصل معنا" : "Contact"}</a>
				</nav>
				<small>© 2026 WUJUD</small>
			</footer>

			<WaitlistDialog locale={locale} open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
			<SaveJourneyDialog
				locale={locale}
				open={saveOpen}
				onClose={() => setSaveOpen(false)}
				answers={structuredAnswers}
				getSessionToken={getSessionToken}
			/>
		</div>
	);
}
