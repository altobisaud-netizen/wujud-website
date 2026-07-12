import { useEffect, useRef } from "react";
import type { OnboardingStepId } from "./types";

/**
 * Moves focus to the new step's primary field or heading after a step change.
 * Keeps re-asserting briefly so AnimatePresence exit/enter cannot leave focus on body.
 */
export function useStepFocus(step: OnboardingStepId) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let cancelled = false;

		const findTarget = () =>
			document.querySelector<HTMLElement>(".sara-onboarding__panel [data-sara-autofocus]") ??
			containerRef.current?.querySelector<HTMLElement>("[data-sara-autofocus]") ??
			null;

		const applyFocus = () => {
			if (cancelled) return false;
			const preferred = findTarget();
			if (!preferred) return false;
			if (preferred.matches("h2, h3, legend, .sara-field__label") && !preferred.hasAttribute("tabindex")) {
				preferred.tabIndex = -1;
			}
			preferred.focus({ preventScroll: false });
			return document.activeElement === preferred;
		};

		const interval = window.setInterval(() => {
			if (applyFocus()) {
				window.clearInterval(interval);
			}
		}, 40);

		const stop = window.setTimeout(() => {
			window.clearInterval(interval);
			applyFocus();
		}, 900);

		return () => {
			cancelled = true;
			window.clearInterval(interval);
			window.clearTimeout(stop);
		};
	}, [step]);

	return containerRef;
}
