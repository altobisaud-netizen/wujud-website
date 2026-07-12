import type { FormEvent } from "react";

type BusinessDescriptionStepProps = {
	value: string;
	error: string | null;
	onChange: (value: string) => void;
	onContinue: () => void;
	onBack: () => void;
};

export function BusinessDescriptionStep({
	value,
	error,
	onChange,
	onContinue,
	onBack,
}: BusinessDescriptionStepProps) {
	const errorId = "sara-desc-error";
	const count = value.trim().length;

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		onContinue();
	};

	return (
		<form className="sara-step" onSubmit={onSubmit} noValidate>
			<label className="sara-field__label" htmlFor="sara-business-description">
				What does your business do?
			</label>
			<p className="sara-field__hint" id="sara-desc-hint">
				Briefly describe your products or services. You can edit this later.
			</p>
			<textarea
				id="sara-business-description"
				data-sara-autofocus
				className={`sara-textarea${error ? " sara-input--error" : ""}`}
				name="businessDescription"
				rows={5}
				placeholder="We manufacture and install rubber flooring for gyms, playgrounds, sports courts, and outdoor areas."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				aria-describedby={error ? `sara-desc-hint sara-desc-count ${errorId}` : "sara-desc-hint sara-desc-count"}
				aria-invalid={error ? true : undefined}
				maxLength={600}
			/>
			<p className="sara-field__count" id="sara-desc-count">
				{count}/600
			</p>
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
