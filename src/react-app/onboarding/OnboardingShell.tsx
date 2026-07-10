import { useEffect, useId, useRef, type ReactNode } from "react";
import { REF_IMG } from "../assetsRef";

type OnboardingShellProps = {
	children: ReactNode;
	sideMessage?: ReactNode;
	showPortrait?: boolean;
	onStartOver?: () => void;
	confirmReset?: boolean;
	onConfirmResetChange?: (open: boolean) => void;
	onConfirmStartOver?: () => void;
};

export function OnboardingShell({
	children,
	sideMessage,
	showPortrait = false,
	onStartOver,
	confirmReset = false,
	onConfirmResetChange,
	onConfirmStartOver,
}: OnboardingShellProps) {
	const startOverRef = useRef<HTMLButtonElement>(null);
	const cancelRef = useRef<HTMLButtonElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const descriptionId = useId();

	useEffect(() => {
		if (!confirmReset) return;

		const cancel = cancelRef.current;
		const startOverButton = startOverRef.current;
		cancel?.focus();

		const getFocusable = () => {
			const root = dialogRef.current;
			if (!root) return [] as HTMLElement[];
			return Array.from(
				root.querySelectorAll<HTMLElement>(
					'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
				),
			).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
		};

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onConfirmResetChange?.(false);
				return;
			}
			if (e.key !== "Tab") return;
			const focusable = getFocusable();
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			startOverButton?.focus();
		};
	}, [confirmReset, onConfirmResetChange]);

	return (
		<div className="sara-onboarding">
			<header className="sara-onboarding__top">
				<div className="sara-onboarding__top-inner">
					<a href="/" className="sara-onboarding__brand" aria-label="WUJUD.ai home">
						<img
							src="/assets/wujud-icon.png"
							alt=""
							className="sara-onboarding__brand-icon"
							width={28}
							height={28}
						/>
						<img
							src="/assets/wujud-wordmark.png"
							alt="WUJUD"
							className="sara-onboarding__brand-word"
							width={140}
							height={18}
						/>
					</a>
					<div className="sara-onboarding__top-actions">
						{onStartOver ? (
							<button
								ref={startOverRef}
								type="button"
								className="sara-btn sara-btn--ghost sara-btn--sm"
								onClick={onStartOver}
							>
								Start over
							</button>
						) : null}
						<a className="sara-btn sara-btn--ghost sara-btn--sm" href="/#contact">
							Book a Demo
						</a>
					</div>
				</div>
			</header>

			{confirmReset ? (
				<div
					className="sara-confirm"
					role="presentation"
					onMouseDown={(e) => {
						if (e.target === e.currentTarget) onConfirmResetChange?.(false);
					}}
				>
					<div
						ref={dialogRef}
						className="sara-confirm__card"
						role="dialog"
						aria-modal="true"
						aria-labelledby="sara-reset-title"
						aria-describedby={descriptionId}
					>
						<h2 id="sara-reset-title" className="sara-confirm__title">
							Start over?
						</h2>
						<p id={descriptionId} className="sara-confirm__body">
							This clears your saved SARA profile draft from this browser session.
						</p>
						<div className="sara-confirm__actions">
							<button
								ref={cancelRef}
								type="button"
								className="sara-btn sara-btn--ghost"
								onClick={() => onConfirmResetChange?.(false)}
							>
								Cancel
							</button>
							<button type="button" className="sara-btn sara-btn--primary" onClick={onConfirmStartOver}>
								Yes, start over
							</button>
						</div>
					</div>
				</div>
			) : null}

			<main className="sara-onboarding__main">
				<div className={`sara-onboarding__layout${showPortrait ? " sara-onboarding__layout--welcome" : ""}`}>
					<aside className="sara-onboarding__side" aria-label="SARA introduction">
						{showPortrait ? (
							<div className="sara-onboarding__portrait-wrap">
								<img
									src={REF_IMG.sara}
									alt="SARA, AI Sales Employee by WUJUD.ai"
									className="sara-onboarding__portrait"
									width={320}
									height={400}
								/>
							</div>
						) : null}
						{sideMessage}
					</aside>
					<section className="sara-onboarding__panel">{children}</section>
				</div>
			</main>
		</div>
	);
}
