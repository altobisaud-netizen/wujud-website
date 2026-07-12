import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconArrowRight } from "../components/IconArrowRight";
import { REF_IMG } from "../assetsRef";
import { dur, easeOutPremium } from "../motion/tokens";
import { HERO_CHIPS } from "./demoData";
import {
	continueToBuildSara,
	hydrateHeroFromDraft,
	mergeHeroAnswersIntoDraft,
	type HeroPreviewStep,
} from "./heroDraft";

const CHANNEL_CHOICES = [
	{ id: "whatsapp", label: "WhatsApp" },
	{ id: "instagram", label: "Instagram" },
	{ id: "website-chat", label: "Website chat" },
	{ id: "email", label: "Email" },
] as const;

export function InteractiveHeroSection() {
	const reduce = useReducedMotion();
	const liveId = useId();
	const focusTargetRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | null>(null);
	const skipInitialFocus = useRef(true);
	const initial = hydrateHeroFromDraft();
	const [step, setStep] = useState<HeroPreviewStep>(initial.step);
	const [businessName, setBusinessName] = useState(initial.businessName);
	const [sells, setSells] = useState(initial.businessDescription);
	const [channel, setChannel] = useState(initial.channel);
	const [message, setMessage] = useState(initial.message);

	useEffect(() => {
		if (skipInitialFocus.current) {
			skipInitialFocus.current = false;
			return;
		}
		focusTargetRef.current?.focus();
	}, [step]);

	function applyChip(chip: (typeof HERO_CHIPS)[number]) {
		setBusinessName(chip.businessName);
		setSells(chip.businessDescription);
		setChannel(chip.channel);
		setStep("summary");
		setMessage(`Nice — here’s a quick preview for ${chip.businessName}.`);
		mergeHeroAnswersIntoDraft({
			businessName: chip.businessName,
			businessDescription: chip.businessDescription,
			channel: chip.channel,
		});
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (step === "name") {
			if (!businessName.trim()) return;
			setStep("sells");
			setMessage(`Thanks, ${businessName.trim()}. What does your business sell or offer?`);
			mergeHeroAnswersIntoDraft({
				businessName,
				businessDescription: sells,
				channel,
			});
			return;
		}
		if (step === "sells") {
			if (!sells.trim()) return;
			setStep("channel");
			setMessage("Where do your customers usually reach you first?");
			mergeHeroAnswersIntoDraft({
				businessName,
				businessDescription: sells,
				channel,
			});
			return;
		}
		if (step === "channel") {
			setStep("summary");
			setMessage("Here’s a personalized mini-summary. Ready to continue building SARA?");
			mergeHeroAnswersIntoDraft({
				businessName,
				businessDescription: sells,
				channel,
			});
		}
	}

	function onContinue() {
		continueToBuildSara({
			businessName,
			businessDescription: sells,
			channel,
		});
	}

	const channelLabel = CHANNEL_CHOICES.find((c) => c.id === channel)?.label ?? channel;

	return (
		<section className="ihp-hero" id="top" aria-labelledby="ihp-hero-title">
			<div className="ihp-hero__container container">
				<div className="ihp-hero__grid">
					<div className="ihp-hero__copy">
						<motion.p
							className="ihp-kicker"
							initial={reduce ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: dur.slow, ease: easeOutPremium }}
						>
							Interactive product demonstration
						</motion.p>
						<motion.h1
							id="ihp-hero-title"
							className="ihp-hero__title"
							initial={reduce ? false : { opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: dur.hero, ease: easeOutPremium, delay: 0.08 }}
						>
							{businessName.trim() && step !== "name" ? (
								<>
									Let’s build your AI sales employee for{" "}
									<span className="ihp-accent">{businessName.trim()}.</span>
								</>
							) : (
								<>
									Your AI sales employee is ready to <span className="ihp-accent">meet you.</span>
								</>
							)}
						</motion.h1>
						<motion.p
							className="ihp-hero__lead"
							initial={reduce ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: dur.slow, ease: easeOutPremium, delay: 0.18 }}
						>
							SARA speaks with customers, qualifies leads, follows up, and helps your business
							sell—across the channels your customers already use.
						</motion.p>
						<motion.div
							className="ihp-hero__actions"
							initial={reduce ? false : { opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: dur.slow, ease: easeOutPremium, delay: 0.28 }}
						>
							<a className="ihp-btn ihp-btn--primary" href="/build-sara">
								Build My SARA
								<IconArrowRight className="ihp-btn__icon" />
							</a>
							<a className="ihp-btn ihp-btn--secondary" href="#book-demo">
								Book a Demo
							</a>
						</motion.div>
						<ul className="ihp-trust" aria-label="Getting started notes">
							<li>No account required to start</li>
							<li>Guided setup at your pace</li>
							<li>Human escalation available</li>
						</ul>
					</div>

					<motion.div
						className="ihp-panel ihp-hero__panel"
						initial={reduce ? false : { opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: dur.slow, ease: easeOutPremium, delay: 0.16 }}
					>
						<div className="ihp-hero__panel-head">
							<img
								src={REF_IMG.sara}
								alt=""
								width={48}
								height={64}
								className="ihp-hero__avatar"
								decoding="async"
							/>
							<div>
								<p className="ihp-hero__panel-name">SARA</p>
								<p className="ihp-hero__panel-sub">Interactive onboarding preview</p>
							</div>
							<span className="ihp-status-pill" title="Demonstration status">
								Demo
							</span>
						</div>

						<div className="ihp-hero__chips" role="group" aria-label="Example businesses">
							{HERO_CHIPS.map((chip) => (
								<button
									key={chip.id}
									type="button"
									className="ihp-chip"
									onClick={() => applyChip(chip)}
								>
									{chip.label}
								</button>
							))}
						</div>

						<div className="ihp-hero__dialogue" id={liveId}>
							<p className="ihp-bubble ihp-bubble--sara" aria-live="polite">
								{message}
							</p>
							<AnimatePresence mode="wait">
								{step === "summary" ? (
									<motion.div
										key="summary"
										className="ihp-summary"
										initial={reduce ? false : { opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0 }}
										transition={{ duration: dur.md, ease: easeOutPremium }}
									>
										<p>
											<strong>{businessName.trim() || "Your business"}</strong>
										</p>
										<p>{sells.trim() || "Your offer will appear here."}</p>
										<p>Preferred channel: {channelLabel}</p>
										<p className="ihp-note">Demo only — nothing is connected yet.</p>
										<button
											type="button"
											className="ihp-btn ihp-btn--primary ihp-btn--block"
											onClick={onContinue}
											ref={(el) => {
												focusTargetRef.current = el;
											}}
										>
											Continue to Build SARA
											<IconArrowRight className="ihp-btn__icon" />
										</button>
									</motion.div>
								) : (
									<motion.form
										key={step}
										className="ihp-hero__form"
										onSubmit={onSubmit}
										initial={reduce ? false : { opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0 }}
										transition={{ duration: dur.md, ease: easeOutPremium }}
									>
										{step === "name" ? (
											<label className="ihp-field">
												<span>Business name</span>
												<input
													ref={(el) => {
														focusTargetRef.current = el;
													}}
													value={businessName}
													onChange={(e) => setBusinessName(e.target.value)}
													placeholder="e.g. Harbor Roast"
													autoComplete="organization"
													required
												/>
											</label>
										) : null}
										{step === "sells" ? (
											<label className="ihp-field">
												<span>What you sell or offer</span>
												<textarea
													ref={(el) => {
														focusTargetRef.current = el;
													}}
													value={sells}
													onChange={(e) => setSells(e.target.value)}
													placeholder="Briefly describe your products or services"
													rows={3}
													required
												/>
											</label>
										) : null}
										{step === "channel" ? (
											<fieldset className="ihp-field">
												<legend>Primary customer channel</legend>
												<div className="ihp-choice-grid">
													{CHANNEL_CHOICES.map((c) => (
														<label key={c.id} className={`ihp-choice${channel === c.id ? " ihp-choice--on" : ""}`}>
															<input
																type="radio"
																name="hero-channel"
																value={c.id}
																checked={channel === c.id}
																onChange={() => setChannel(c.id)}
															/>
															{c.label}
														</label>
													))}
												</div>
											</fieldset>
										) : null}
										<button type="submit" className="ihp-btn ihp-btn--primary ihp-btn--block">
											Continue
										</button>
									</motion.form>
								)}
							</AnimatePresence>
						</div>
						<p className="ihp-note ihp-hero__secure">
							Your answers stay in this browser session until you continue setup. You can change them anytime.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
