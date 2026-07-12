import type { FormEvent } from "react";
import { GOAL_OPTIONS } from "../options";

type GoalsStepProps = {
	selected: string[];
	error: string | null;
	onToggle: (id: string) => void;
	onContinue: () => void;
	onBack: () => void;
};

export function GoalsStep({ selected, error, onToggle, onContinue, onBack }: GoalsStepProps) {
	const errorId = "sara-goals-error";

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		onContinue();
	};

	return (
		<form className="sara-step" onSubmit={onSubmit} noValidate>
			<fieldset className="sara-fieldset" aria-describedby={error ? errorId : undefined}>
				<legend className="sara-field__label">What should SARA help your business achieve?</legend>
				<p className="sara-field__hint">Select all that apply.</p>
				<div className="sara-chip-grid" role="group" aria-label="Business goals">
					{GOAL_OPTIONS.map((opt, index) => {
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
