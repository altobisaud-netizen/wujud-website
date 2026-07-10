import type { FormEvent, KeyboardEvent } from "react";

type BusinessNameStepProps = {
	value: string;
	error: string | null;
	onChange: (value: string) => void;
	onContinue: () => void;
};

export function BusinessNameStep({ value, error, onChange, onContinue }: BusinessNameStepProps) {
	const errorId = "sara-name-error";

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		onContinue();
	};

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			onContinue();
		}
	};

	return (
		<form className="sara-step" onSubmit={onSubmit} noValidate>
			<label className="sara-field__label" htmlFor="sara-business-name">
				What is your business name?
			</label>
			<p className="sara-field__hint" id="sara-name-hint">
				This helps SARA represent your business when speaking with customers.
			</p>
			<input
				id="sara-business-name"
				data-sara-autofocus
				className={`sara-input${error ? " sara-input--error" : ""}`}
				type="text"
				name="businessName"
				autoComplete="organization"
				placeholder="Enter your business name"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={onKeyDown}
				aria-describedby={error ? `sara-name-hint ${errorId}` : "sara-name-hint"}
				aria-invalid={error ? true : undefined}
				maxLength={100}
			/>
			<p className="sara-field__example">e.g. RubbelX Flooring</p>
			{error ? (
				<p className="sara-field__error" id={errorId} role="alert">
					{error}
				</p>
			) : null}
			<div className="sara-step__actions">
				<button type="submit" className="sara-btn sara-btn--primary">
					Continue
				</button>
			</div>
		</form>
	);
}
