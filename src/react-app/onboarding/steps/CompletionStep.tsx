type CompletionStepProps = {
	onContinueKnowledge: () => void;
};

export function CompletionStep({ onContinueKnowledge }: CompletionStepProps) {
	return (
		<div className="sara-step sara-complete">
			<div className="sara-complete__badge" aria-hidden>
				✓
			</div>
			<h2 className="sara-review__heading" data-sara-autofocus tabIndex={-1}>
				Great start — SARA is ready for the next step
			</h2>
			<p className="sara-field__hint">
				Your business profile has been saved on this device. Next, you’ll teach SARA about your products,
				prices, policies, and sales process.
			</p>
			<p className="sara-complete__note">
				No live agent, WhatsApp connection, or production account has been created yet.
			</p>
			<div className="sara-step__actions sara-step__actions--stack">
				<button type="button" className="sara-btn sara-btn--primary" onClick={onContinueKnowledge}>
					Continue to Knowledge Setup
				</button>
				<a className="sara-btn sara-btn--ghost" href="/">
					Return to WUJUD.ai
				</a>
			</div>
		</div>
	);
}
