import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { dur, easeOutPremium } from "../motion/tokens";
import { createHandoffIdempotency } from "./handoffIdempotency";
import { mapDraftToSaraPayload } from "./handoffMapping";
import { OnboardingProgress } from "./OnboardingProgress";
import { OnboardingShell } from "./OnboardingShell";
import { SaraMessage } from "./SaraMessage";
import { buildCustomerAppHandoffUrl, SaraApiError, saraApiClient } from "./saraApiClient";
import { saveDraft } from "./storage";
import { BusinessDescriptionStep } from "./steps/BusinessDescriptionStep";
import { BusinessNameStep } from "./steps/BusinessNameStep";
import { ChannelsStep } from "./steps/ChannelsStep";
import { CompletionStep } from "./steps/CompletionStep";
import { GoalsStep } from "./steps/GoalsStep";
import { KnowledgePlaceholderStep } from "./steps/KnowledgePlaceholderStep";
import { ReviewStep } from "./steps/ReviewStep";
import { TargetCustomersStep } from "./steps/TargetCustomersStep";
import { QUESTION_STEPS } from "./types";
import { useOnboardingState } from "./useOnboardingState";
import { useStepFocus } from "./useStepFocus";
import "./sara-onboarding.css";

const PAGE_TITLE = "Build My SARA | WUJUD.ai";
const PAGE_DESCRIPTION =
	"Create your SARA AI sales employee profile — business name, customers, channels, and goals — in a few simple steps.";

function setMeta(name: string, content: string) {
	let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
	if (!tag) {
		tag = document.createElement("meta");
		tag.setAttribute("name", name);
		document.head.appendChild(tag);
	}
	tag.setAttribute("content", content);
}

export function SaraOnboardingPage() {
	const reduce = useReducedMotion();
	const handoffEnabled = import.meta.env.VITE_SARA_HANDOFF_ENABLED === "true";
	const [isCreating, setIsCreating] = useState(false);
	const [handoffError, setHandoffError] = useState<string | null>(null);
	const idempotency = useRef(createHandoffIdempotency());
	const {
		draft,
		error,
		questionIndex,
		confirmReset,
		setConfirmReset,
		patch,
		goTo,
		goBack,
		continueFrom,
		startOver,
		toggleMulti,
	} = useOnboardingState();

	const createErrorMessage = useCallback((error: unknown): string => {
		if (!(error instanceof SaraApiError)) {
			return "We couldn’t create your secure profile. Please try again.";
		}
		switch (error.kind) {
			case "validation":
				return "Please review your profile details and try again.";
			case "conflict":
				return "This profile is already being created. Please try again shortly.";
			case "rate_limit":
				return "Please wait a moment, then try again.";
			case "unavailable":
				return "Our secure profile service is temporarily unavailable. Please try again.";
			case "network":
				return "Check your connection, then try again.";
		}
	}, []);

	const createSara = useCallback(async () => {
		if (isCreating) return;
		if (!handoffEnabled) {
			goTo("complete");
			return;
		}

		const customerAppUrl = import.meta.env.VITE_CUSTOMER_APP_URL;
		if (!customerAppUrl) {
			setHandoffError("Secure profile setup is unavailable right now. Please try again later.");
			return;
		}

		setIsCreating(true);
		setHandoffError(null);
		try {
			saveDraft(draft);
			const response = await saraApiClient.createOnboardingDraft({
				payload: mapDraftToSaraPayload(draft),
				idempotencyKey: idempotency.current.getKey(draft),
			});
			window.location.assign(buildCustomerAppHandoffUrl(customerAppUrl, response.handoffCode));
		} catch (error) {
			idempotency.current.markFailed(draft);
			setHandoffError(createErrorMessage(error));
		} finally {
			setIsCreating(false);
		}
	}, [createErrorMessage, draft, goTo, handoffEnabled, isCreating]);

	const handleStartOver = useCallback(() => {
		idempotency.current.reset();
		setHandoffError(null);
		startOver();
	}, [startOver]);

	useEffect(() => {
		const previousTitle = document.title;
		document.title = PAGE_TITLE;
		setMeta("description", PAGE_DESCRIPTION);
		setMeta("robots", "index, follow");
		return () => {
			document.title = previousTitle;
		};
	}, []);

	const isQuestion = QUESTION_STEPS.includes(draft.step);
	const showPortrait = draft.step === "name";
	const stepNumber = Math.min(questionIndex + 1, QUESTION_STEPS.length);

	const sideMessage =
		draft.step === "name" ? (
			<SaraMessage
				variant="panel"
				title={"Hi, I’m SARA 👋\nI’ll help you build your AI sales employee.\n\nLet’s start with the basics."}
			/>
		) : draft.step === "complete" || draft.step === "knowledge" ? (
			<SaraMessage
				variant="panel"
				title="You’re building SARA the right way."
				body="A clear business profile helps SARA represent your brand with confidence."
			/>
		) : (
			<SaraMessage variant="inline" title="I’m here with you — one question at a time." />
		);

	const transition = reduce
		? { duration: 0 }
		: { duration: dur.fast, ease: easeOutPremium };

	const stepFocusRef = useStepFocus(draft.step);

	const liveAnnouncement = isQuestion
		? `Step ${stepNumber} of ${QUESTION_STEPS.length}`
		: draft.step === "complete"
			? "Profile saved on this device. Next steps available."
			: draft.step === "knowledge"
				? "Knowledge Setup placeholder."
				: null;

	return (
		<OnboardingShell
			showPortrait={showPortrait}
			sideMessage={sideMessage}
			onStartOver={() => setConfirmReset(true)}
			confirmReset={confirmReset}
			onConfirmResetChange={setConfirmReset}
			onConfirmStartOver={handleStartOver}
		>
			{isQuestion ? <OnboardingProgress current={stepNumber} total={QUESTION_STEPS.length} /> : null}

			<div className="sara-step-live" aria-live="polite">
				{liveAnnouncement}
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					ref={stepFocusRef}
					key={draft.step}
					initial={reduce ? false : { opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={reduce ? undefined : { opacity: 0 }}
					transition={transition}
				>
					{draft.step === "name" ? (
						<BusinessNameStep
							value={draft.businessName}
							error={error}
							onChange={(businessName) => patch({ businessName })}
							onContinue={continueFrom}
						/>
					) : null}

					{draft.step === "description" ? (
						<BusinessDescriptionStep
							value={draft.businessDescription}
							error={error}
							onChange={(businessDescription) => patch({ businessDescription })}
							onContinue={continueFrom}
							onBack={goBack}
						/>
					) : null}

					{draft.step === "customers" ? (
						<TargetCustomersStep
							selected={draft.targetCustomers}
							otherText={draft.otherCustomerText}
							error={error}
							onToggle={(id) => toggleMulti("targetCustomers", id)}
							onOtherChange={(otherCustomerText) => patch({ otherCustomerText })}
							onContinue={continueFrom}
							onBack={goBack}
						/>
					) : null}

					{draft.step === "channels" ? (
						<ChannelsStep
							selected={draft.channels}
							error={error}
							onToggle={(id) => toggleMulti("channels", id)}
							onContinue={continueFrom}
							onBack={goBack}
						/>
					) : null}

					{draft.step === "goals" ? (
						<GoalsStep
							selected={draft.goals}
							error={error}
							onToggle={(id) => toggleMulti("goals", id)}
							onContinue={continueFrom}
							onBack={goBack}
						/>
					) : null}

					{draft.step === "review" ? (
						<ReviewStep
							draft={draft}
							onEdit={goTo}
							onCreate={createSara}
							onBack={goBack}
							loading={isCreating}
							disabled={isCreating}
							error={handoffError}
						/>
					) : null}

					{draft.step === "complete" ? (
						<CompletionStep handoffEnabled={handoffEnabled} onContinueKnowledge={() => goTo("knowledge")} />
					) : null}

					{draft.step === "knowledge" ? <KnowledgePlaceholderStep onBack={goBack} /> : null}
				</motion.div>
			</AnimatePresence>
		</OnboardingShell>
	);
}
