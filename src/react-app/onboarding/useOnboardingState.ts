import { useCallback, useEffect, useMemo, useState } from "react";
import { clearDraft, loadDraft, saveDraft } from "./storage";
import { createEmptyDraft, QUESTION_STEPS, type OnboardingDraft, type OnboardingStepId } from "./types";
import { validateStep } from "./validation";

export function useOnboardingState() {
	const [draft, setDraft] = useState<OnboardingDraft>(() => loadDraft());
	const [error, setError] = useState<string | null>(null);
	const [confirmReset, setConfirmReset] = useState(false);

	useEffect(() => {
		saveDraft(draft);
	}, [draft]);

	const questionIndex = useMemo(() => {
		const idx = QUESTION_STEPS.indexOf(draft.step);
		return idx >= 0 ? idx : QUESTION_STEPS.length - 1;
	}, [draft.step]);

	const patch = useCallback((partial: Partial<OnboardingDraft>) => {
		setDraft((prev) => ({ ...prev, ...partial }));
		setError(null);
	}, []);

	const goTo = useCallback((step: OnboardingStepId) => {
		setError(null);
		setDraft((prev) => ({ ...prev, step }));
	}, []);

	const continueFrom = useCallback(() => {
		setDraft((prev) => {
			let next = prev;
			if (prev.step === "name") {
				next = { ...prev, businessName: prev.businessName.trim() };
			} else if (prev.step === "description") {
				next = { ...prev, businessDescription: prev.businessDescription.trim() };
			} else if (prev.step === "customers" && prev.targetCustomers.includes("other")) {
				next = { ...prev, otherCustomerText: prev.otherCustomerText.trim() };
			}

			const err = validateStep(next.step, next);
			if (err) {
				queueMicrotask(() => setError(err));
				return next;
			}

			queueMicrotask(() => setError(null));
			const idx = QUESTION_STEPS.indexOf(next.step);
			if (idx >= 0 && idx < QUESTION_STEPS.length - 1) {
				return { ...next, step: QUESTION_STEPS[idx + 1] };
			}
			if (next.step === "review") {
				return { ...next, step: "complete" };
			}
			return next;
		});
	}, []);

	const goBack = useCallback(() => {
		setError(null);
		if (draft.step === "complete") {
			goTo("review");
			return;
		}
		if (draft.step === "knowledge") {
			goTo("complete");
			return;
		}
		const idx = QUESTION_STEPS.indexOf(draft.step);
		if (idx > 0) goTo(QUESTION_STEPS[idx - 1]);
	}, [draft.step, goTo]);

	const startOver = useCallback(() => {
		clearDraft();
		setDraft(createEmptyDraft());
		setError(null);
		setConfirmReset(false);
	}, []);

	const toggleMulti = useCallback((field: "targetCustomers" | "channels" | "goals", id: string) => {
		setDraft((prev) => {
			const list = prev[field];
			const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
			const patchObj: Partial<OnboardingDraft> = { [field]: next };
			if (field === "targetCustomers" && id === "other" && list.includes("other")) {
				patchObj.otherCustomerText = "";
			}
			return { ...prev, ...patchObj };
		});
		setError(null);
	}, []);

	return {
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
		setError,
	};
}
