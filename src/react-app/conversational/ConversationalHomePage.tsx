import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { REF_IMG } from "../assetsRef";
import { loadDraft, saveDraft } from "../onboarding/storage";
import type { OnboardingDraft } from "../onboarding/types";
import { DEMO_PROFILES } from "./demoScripts";
import { inferBuildStep, mergeDraftFields } from "./buildValidation";
import { BookDemoBlock } from "./blocks/BookDemoBlock";
import { ClarificationChoices } from "./blocks/ClarificationChoices";
import { ModeSwitchDialog } from "./blocks/ModeSwitchDialog";
import { SaraMessage } from "./blocks/SaraMessage";
import { loadPreferredLocale, savePreferredLocale } from "./languagePreference";
import { copy } from "./locale";
import { AccountHelpPanel } from "./panels/AccountHelpPanel";
import { BuildPanel } from "./panels/BuildPanel";
import { shouldHideBuildDockComposer } from "./buildComposer";
import { needsModeSwitchConfirm } from "./modeSwitch";
import { hasArabicScript, routeFreeText, routeQuickAction } from "./routeIntent";
import { openSignIn, resolveSignInTarget } from "./signIn";
import type { BuildStep, ConvLocale, ConvMode, DemoSlug, QuickActionId } from "./types";
import "./conversational.css";

const BelowFoldExamples = lazy(() =>
	import("./BelowFoldExamples").then((m) => ({ default: m.BelowFoldExamples })),
);
const TryPanel = lazy(() =>
	import("./panels/TryPanel").then((m) => ({ default: m.TryPanel })),
);
const PricingPanel = lazy(() =>
	import("./panels/CatalogPanels").then((m) => ({ default: m.PricingPanel })),
);
const ProductHelpPanel = lazy(() =>
	import("./panels/CatalogPanels").then((m) => ({ default: m.ProductHelpPanel })),
);

function modeLabel(mode: ConvMode, locale: ConvLocale, demoSlug?: DemoSlug | null) {
	const c = copy(locale);
	if (mode === "TRY_DEMO" && demoSlug) {
		const name = DEMO_PROFILES[demoSlug].displayName[locale];
		return locale === "ar" ? `عرض · ${name}` : `Demo · ${name}`;
	}
	return c.mode[mode];
}

function chipClass(id: QuickActionId): string {
	if (id === "build") return "conv__chip conv__chip--primary";
	if (id === "try") return "conv__chip conv__chip--secondary";
	return "conv__chip conv__chip--tertiary";
}

export function ConversationalHomePage() {
	const [locale, setLocale] = useState<ConvLocale>(() => loadPreferredLocale("en"));
	const [contentLocale, setContentLocale] = useState<ConvLocale>(() => loadPreferredLocale("en"));
	const [mode, setMode] = useState<ConvMode>("idle");
	const [pendingMode, setPendingMode] = useState<ConvMode | null>(null);
	const [pendingDemo, setPendingDemo] = useState<DemoSlug | null>(null);
	const [input, setInput] = useState("");
	const [draft, setDraft] = useState<OnboardingDraft>(() => loadDraft());
	const [buildStep, setBuildStep] = useState<BuildStep>(() => inferBuildStep(loadDraft()));
	const [demoSlug, setDemoSlug] = useState<DemoSlug | null>(null);
	const [liveRegion, setLiveRegion] = useState("");
	const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
	const c = copy(locale);
	const rtl = locale === "ar";
	const workspace = mode !== "idle";
	const hideDock =
		mode === "BUILD_AGENT" && shouldHideBuildDockComposer(buildStep);

	useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = rtl ? "rtl" : "ltr";
		document.title =
			locale === "ar"
				? "WUJUD — ابنِ أفضل موظف مبيعات بالذكاء الاصطناعي"
				: "WUJUD — Build your best AI sales employee";
		const meta = document.querySelector('meta[name="description"]');
		if (meta) {
			meta.setAttribute(
				"content",
				locale === "ar"
					? "WUJUD و SARA — موظفة مبيعات بالذكاء الاصطناعي للأعمال الحديثة."
					: "WUJUD powers SARA — an AI sales employee for modern businesses.",
			);
		}
		return () => {
			document.documentElement.lang = "en";
			document.documentElement.dir = "ltr";
		};
	}, [locale, rtl]);

	useEffect(() => {
		saveDraft(draft);
	}, [draft]);

	useEffect(() => {
		savePreferredLocale(locale);
		setContentLocale(locale);
	}, [locale]);

	const applyMode = (next: ConvMode, opts?: { demo?: DemoSlug }) => {
		if (opts?.demo) setDemoSlug(opts.demo);
		setMode(next);
		if (next === "BUILD_AGENT") {
			const d = loadDraft();
			setDraft(d);
			setBuildStep(inferBuildStep(d));
		}
		if (next === "TRY_DEMO" && opts?.demo) {
			setLiveRegion(
				locale === "ar"
					? `بدأ عرض ${DEMO_PROFILES[opts.demo].displayName.ar}`
					: `Started ${DEMO_PROFILES[opts.demo].displayName.en} demo`,
			);
		}
	};

	const requestMode = (next: ConvMode, opts?: { demo?: DemoSlug; force?: boolean }) => {
		if (needsModeSwitchConfirm(mode, next, opts)) {
			setPendingMode(next);
			setPendingDemo(opts?.demo ?? null);
			return;
		}
		applyMode(next, opts);
	};

	const onQuick = (id: QuickActionId) => {
		setContentLocale(locale);
		requestMode(routeQuickAction(id), { force: mode === "idle" });
	};

	const onSubmitComposer = () => {
		const text = input.trim();
		if (!text) return;
		setInput("");
		if (hasArabicScript(text) && locale === "en") {
			setContentLocale("ar");
		} else {
			setContentLocale(locale);
		}
		const next = routeFreeText(text);
		if (next === "CLARIFY") {
			requestMode("CLARIFY", { force: true });
			return;
		}
		if (next === "BUILD_AGENT" && text.length > 2 && !draft.businessName && !hasArabicScript(text)) {
			setDraft((d) => mergeDraftFields(d, { businessName: text.slice(0, 80), step: "description" }));
			setBuildStep("description");
		}
		requestMode(next, { force: mode === "idle" });
	};

	const startDemo = (slug: DemoSlug) => {
		setContentLocale(locale);
		requestMode("TRY_DEMO", {
			demo: slug,
			force: mode === "idle" || mode === "TRY_DEMO",
		});
	};

	const seedDraftFromDemo = () => {
		if (!demoSlug) return;
		const seed = DEMO_PROFILES[demoSlug].draft;
		setDraft((d) =>
			mergeDraftFields(d, {
				businessName: d.businessName || seed.businessName,
				businessDescription: d.businessDescription || seed.businessDescription,
				channels: d.channels.length ? d.channels : seed.channels,
				step: "description",
			}),
		);
		requestMode("BUILD_AGENT", { force: true });
	};

	const onSignIn = () => {
		const target = resolveSignInTarget();
		if (target.kind === "ready") {
			openSignIn();
			return;
		}
		requestMode("ACCOUNT_HELP", { force: mode === "idle" });
	};

	const panelLocale = contentLocale;

	return (
		<div className={`conv${workspace ? " conv--work" : " conv--hero"}`} dir={rtl ? "rtl" : "ltr"}>
			<header className="conv__header">
				<a className="conv__brand" href="/">
					WUJUD<span>.ai</span>
				</a>
				<nav className="conv__nav" aria-label={locale === "ar" ? "التنقل" : "Primary"}>
					<a href="/pricing">{c.navPricing}</a>
					<a href="/faq">{c.navFaq}</a>
					<button type="button" onClick={onSignIn}>
						{c.navSignIn}
					</button>
					<button
						type="button"
						className="conv__lang"
						onClick={() => setLocale((l) => (l === "en" ? "ar" : "en"))}
					>
						{c.language}
					</button>
				</nav>
			</header>

			<div className="visually-hidden" aria-live="polite">
				{liveRegion}
			</div>

			{!workspace ? (
				<>
					<main className="conv__hero">
						<img
							className="conv__portrait"
							src={REF_IMG.sara}
							alt=""
							width={88}
							height={88}
							decoding="async"
						/>
						<h1 className="conv__headline">{c.headline}</h1>
						<p className="conv__intro">{c.intro}</p>

						<div className="conv__composer-shell" role="region" aria-label={c.composerLabel}>
							<form
								className="conv__composer"
								onSubmit={(e) => {
									e.preventDefault();
									onSubmitComposer();
								}}
							>
								<label className="visually-hidden" htmlFor="conv-prompt">
									{c.placeholder}
								</label>
								<textarea
									id="conv-prompt"
									rows={2}
									value={input}
									placeholder={c.placeholder}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											onSubmitComposer();
										}
									}}
								/>
								<button
									type="submit"
									className={`conv__send${!input.trim() ? " conv__send--soft" : ""}`}
									disabled={!input.trim()}
								>
									{c.send}
								</button>
							</form>
						</div>

						<div className="conv__chips" role="group" aria-label={c.clarify}>
							{(Object.keys(c.quick) as QuickActionId[]).map((id) => (
								<button
									key={id}
									type="button"
									className={chipClass(id)}
									onClick={() => onQuick(id)}
								>
									{c.quick[id]}
								</button>
							))}
						</div>

						<p className="conv__starters-label">
							{locale === "ar" ? "ابدأ بنشاط تجاري" : "Business starters"}
						</p>
						<div className="conv__chips" role="group">
							{(Object.keys(c.starters) as DemoSlug[]).map((slug) => (
								<button
									key={slug}
									type="button"
									className="conv__chip conv__chip--quiet"
									onClick={() => startDemo(slug)}
								>
									{c.starters[slug]}
								</button>
							))}
						</div>
					</main>

					<Suspense fallback={null}>
						<BelowFoldExamples
							heading={c.examplesHeading}
							summary={c.examplesSummary}
							hint={c.examplesHint}
						/>
					</Suspense>
				</>
			) : (
				<main className="conv__work-shell">
					<h1 className="visually-hidden">{c.workspaceHeading}</h1>
					<aside className="conv__rail" aria-label={c.modeMenu}>
						<p className="conv__rail-title">{c.modeMenu}</p>
						{(
							[
								["BUILD_AGENT", c.quick.build],
								["TRY_DEMO", c.quick.try],
								["PRICING", c.quick.pricing],
								["PRODUCT_QUESTION", c.quick.how],
								["BOOK_DEMO", c.quick.book],
								["ACCOUNT_HELP", c.navSignIn],
							] as const
						).map(([m, label]) => (
							<button
								key={m}
								type="button"
								aria-current={mode === m}
								onClick={() => requestMode(m)}
							>
								{label}
							</button>
						))}
						<button type="button" onClick={() => requestMode("idle", { force: true })}>
							{c.backHome}
						</button>
					</aside>

					<div className="conv__main">
						<div className="conv__modebar">
							<span className="conv__mode-label">
								<span className="conv__mode-dot" aria-hidden />
								{modeLabel(mode, locale, demoSlug)}
							</span>
							<details className="conv__mobile-mode">
								<summary>{c.modeMenu}</summary>
								<div className="conv__chips" style={{ marginTop: "0.5rem" }}>
									{(
										[
											"BUILD_AGENT",
											"TRY_DEMO",
											"PRICING",
											"PRODUCT_QUESTION",
											"BOOK_DEMO",
										] as ConvMode[]
									).map((m) => (
										<button
											key={m}
											type="button"
											className="conv__chip"
											onClick={() => requestMode(m)}
										>
											{modeLabel(m, locale, demoSlug)}
										</button>
									))}
								</div>
							</details>
						</div>

						<section className="conv__thread" aria-label={c.threadLabel}>
							{mode === "CLARIFY" && (
								<SaraMessage announce>
									<ClarificationChoices
										prompt={c.clarify}
										choices={(Object.keys(c.quick) as QuickActionId[]).map((id) => ({
											id,
											label: c.quick[id],
										}))}
										onSelect={(id) => onQuick(id as QuickActionId)}
									/>
								</SaraMessage>
							)}
							{mode === "BUILD_AGENT" && (
								<BuildPanel
									key={buildStep}
									locale={locale}
									draft={draft}
									step={buildStep}
									setDraft={setDraft}
									setStep={setBuildStep}
									fieldRef={fieldRef}
									onAnnounce={setLiveRegion}
								/>
							)}
							{mode === "TRY_DEMO" && (
								<Suspense fallback={<p className="conv__note">{c.loading}</p>}>
									<TryPanel
										locale={panelLocale}
										slug={demoSlug}
										onPick={startDemo}
										onBuild={seedDraftFromDemo}
										onPricing={() => requestMode("PRICING", { force: true })}
										onBook={() => requestMode("BOOK_DEMO", { force: true })}
									/>
								</Suspense>
							)}
							{mode === "PRICING" && (
								<Suspense fallback={<p className="conv__note">{c.loading}</p>}>
									<PricingPanel locale={panelLocale} />
								</Suspense>
							)}
							{mode === "PRODUCT_QUESTION" && (
								<Suspense fallback={<p className="conv__note">{c.loading}</p>}>
									<ProductHelpPanel locale={panelLocale} />
								</Suspense>
							)}
							{mode === "BOOK_DEMO" && (
								<BookDemoBlock
									intro={copy(panelLocale).bookIntro}
									pageLinkLabel={panelLocale === "ar" ? "صفحة الحجز" : "Book demo page"}
								/>
							)}
							{mode === "ACCOUNT_HELP" && (
								<AccountHelpPanel
									locale={locale}
									onBuild={() => requestMode("BUILD_AGENT", { force: true })}
								/>
							)}
						</section>

						{!hideDock ? (
							<div className="conv__dock" role="region" aria-label={c.composerLabel}>
								<div className="conv__composer-shell">
									<form
										className="conv__composer"
										onSubmit={(e) => {
											e.preventDefault();
											onSubmitComposer();
										}}
									>
										<label className="visually-hidden" htmlFor="conv-work-prompt">
											{c.placeholder}
										</label>
										<textarea
											id="conv-work-prompt"
											rows={2}
											value={input}
											placeholder={c.placeholder}
											onChange={(e) => setInput(e.target.value)}
										/>
										<button
											type="submit"
											className={`conv__send${!input.trim() ? " conv__send--soft" : ""}`}
											disabled={!input.trim()}
										>
											{c.send}
										</button>
									</form>
								</div>
							</div>
						) : null}
					</div>
				</main>
			)}

			<ModeSwitchDialog
				open={pendingMode !== null}
				title={c.confirmSwitchTitle}
				body={c.confirmSwitchBody}
				stayLabel={c.confirmSwitchStay}
				leaveLabel={c.confirmSwitchLeave}
				onStay={() => {
					setPendingMode(null);
					setPendingDemo(null);
				}}
				onLeave={() => {
					const next = pendingMode;
					const demo = pendingDemo;
					setPendingMode(null);
					setPendingDemo(null);
					if (next) applyMode(next, demo ? { demo } : undefined);
				}}
			/>
		</div>
	);
}
