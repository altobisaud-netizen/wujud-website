import { useEffect, useId, useRef } from "react";

type Props = {
	open: boolean;
	title: string;
	body: string;
	stayLabel: string;
	leaveLabel: string;
	onStay: () => void;
	onLeave: () => void;
};

export function ModeSwitchDialog({
	open,
	title,
	body,
	stayLabel,
	leaveLabel,
	onStay,
	onLeave,
}: Props) {
	const titleId = useId();
	const descId = useId();
	const stayRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;
		stayRef.current?.focus();
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onStay();
				return;
			}
			if (e.key !== "Tab") return;
			const root = document.getElementById("conv-mode-dialog");
			if (!root) return;
			const focusable = [
				...root.querySelectorAll<HTMLElement>(
					'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				),
			];
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement as HTMLElement | null;
			if (e.shiftKey && active === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && active === last) {
				e.preventDefault();
				first.focus();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onStay]);

	if (!open) return null;

	return (
		<div className="conv__dialog-backdrop" role="presentation">
			<div
				id="conv-mode-dialog"
				className="conv__dialog"
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={descId}
			>
				<h2 id={titleId}>{title}</h2>
				<p id={descId}>{body}</p>
				<div className="conv__actions">
					<button
						ref={stayRef}
						type="button"
						className="conv__btn conv__btn--ghost"
						onClick={onStay}
					>
						{stayLabel}
					</button>
					<button type="button" className="conv__btn" onClick={onLeave}>
						{leaveLabel}
					</button>
				</div>
			</div>
		</div>
	);
}
