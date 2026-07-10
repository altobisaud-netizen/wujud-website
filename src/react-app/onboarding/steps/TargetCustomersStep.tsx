import type { FormEvent } from "react";
import { TARGET_CUSTOMER_OPTIONS } from "../options";

type TargetCustomersStepProps = {
	selected: string[];
	otherText: string;
	error: string | null;
	onToggle: (id: string) => void;
	onOtherChange: (value: string) => void;
	onContinue: () => void;
	onBack: () => void;
};

export function TargetCustomersStep({
	selected,
	otherText,
	error,
	onToggle,
	onOtherChange,
	onContinue,
	onBack,
}: TargetCustomersStepProps) {
	const errorId = "sara-customers-error";
	const showOther = selected.includes("other");

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		onContinue();
	};

	return (
		<form className="sara-step" onSubmit={onSubmit} noValidate>
			<fieldset className="sara-fieldset" aria-describedby={error ? errorId : undefined}>
				<legend className="sara-field__label">Who are your main customers?</legend>
				<p className="sara-field__hint">Select all that apply.</p>
				<div className="sara-chip-grid" role="group" aria-label="Customer types">
					{TARGET_CUSTOMER_OPTIONS.map((opt, index) => {
						const checked = selected.includes(opt.id);
						return (
							<label key={opt.id} className={`sara-chip${checked ? " sara-chip--on" : ""}`}>
								<input
									type="checkbox"
									checked={checked}
									onChange={() => onToggle(opt.id)}
									className="sara-chip__input"
									{...(index === 0 ? { "data-sara-autofocus": true } : {})}
								/>
								<span>{opt.label}</span>
							</label>
						);
					})}
				</div>
			</fieldset>
			{showOther ? (
				<div className="sara-field sara-field--nested">
					<label className="sara-field__label sara-field__label--sm" htmlFor="sara-other-customer">
						Describe other customers
					</label>
					<input
						id="sara-other-customer"
						className={`sara-input${error && otherText.trim().length < 2 ? " sara-input--error" : ""}`}
						type="text"
						value={otherText}
						onChange={(e) => onOtherChange(e.target.value)}
						placeholder="e.g. Property developers"
						maxLength={120}
					/>
				</div>
			) : null}
			{error ? (
				<p className="sara-field__error" id={errorId} role="alert">
					{error}
				</p>
			) : null}
			<div className="sara-step__actions">
				<button type="button" className="sara-btn sara-btn--ghost" onClick={onBack}>
					Back
				</button>
				<button type="submit" className="sara-btn sara-btn--primary">
					Continue
				</button>
			</div>
		</form>
	);
}
