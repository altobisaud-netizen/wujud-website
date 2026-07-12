import type { FormEvent } from "react";
import { CHANNEL_OPTIONS } from "../options";

type ChannelsStepProps = {
	selected: string[];
	error: string | null;
	onToggle: (id: string) => void;
	onContinue: () => void;
	onBack: () => void;
};

export function ChannelsStep({ selected, error, onToggle, onContinue, onBack }: ChannelsStepProps) {
	const errorId = "sara-channels-error";

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		onContinue();
	};

	return (
		<form className="sara-step" onSubmit={onSubmit} noValidate>
			<fieldset className="sara-fieldset" aria-describedby={error ? `sara-channels-note ${errorId}` : "sara-channels-note"}>
				<legend className="sara-field__label">Where should SARA speak with your customers?</legend>
				<p className="sara-field__hint" id="sara-channels-note">
					You will connect and authorize these channels later.
				</p>
				<div className="sara-chip-grid" role="group" aria-label="Customer channels">
					{CHANNEL_OPTIONS.map((opt, index) => {
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
