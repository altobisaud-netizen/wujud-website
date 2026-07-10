type KnowledgePlaceholderStepProps = {
	onBack: () => void;
};

export function KnowledgePlaceholderStep({ onBack }: KnowledgePlaceholderStepProps) {
	return (
		<div className="sara-step sara-complete">
			<p className="sara-msg__eyebrow">Coming next</p>
			<h2 className="sara-review__heading" data-sara-autofocus tabIndex={-1}>
				Knowledge Setup
			</h2>
			<p className="sara-field__hint">
				This is a placeholder for the next onboarding cycle. Here you’ll teach SARA about your products,
				prices, policies, and sales process.
			</p>
			<div className="sara-step__actions">
				<button type="button" className="sara-btn sara-btn--ghost" onClick={onBack}>
					Back
				</button>
				<a className="sara-btn sara-btn--primary" href="/">
					Return to WUJUD.ai
				</a>
			</div>
		</div>
	);
}
