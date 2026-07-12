type CompletionStepProps = {
	onContinueKnowledge: () => void;
	handoffEnabled: boolean;
};

export function CompletionStep({ onContinueKnowledge, handoffEnabled }: CompletionStepProps) {
	return (
		<div className="sara-step sara-complete">
			<div className="sara-complete__badge" aria-hidden>
				✓
			</div>
			<h2 className="sara-review__heading" data-sara-autofocus tabIndex={-1}>
				{handoffEnabled ? "Your business profile is ready. Continue securely…" : "Great start — SARA is ready for the next step"}
			</h2>
			<p className="sara-field__hint">
				{handoffEnabled
					? "Your secure profile handoff is ready to continue in the customer app."
					: "Your business profile has been saved on this device. Next, you’ll teach SARA about your products, prices, policies, and sales process."}
			</p>
			<p className="sara-complete__note">
				{handoffEnabled
					? "No live agent, WhatsApp connection, or production account has been created yet."
					: "This local preview has not created a live agent, WhatsApp connection, or production account."}
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
