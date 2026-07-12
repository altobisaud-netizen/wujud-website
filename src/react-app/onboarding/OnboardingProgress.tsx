type OnboardingProgressProps = {
	current: number;
	total: number;
};

export function OnboardingProgress({ current, total }: OnboardingProgressProps) {
	const pct = Math.round((current / total) * 100);
	return (
		<div className="sara-progress" aria-label={`Step ${current} of ${total}`}>
			<div className="sara-progress__meta">
				<span className="sara-progress__label">
					Step {current} of {total}
				</span>
				<span className="sara-progress__pct" aria-hidden>
					{pct}%
				</span>
			</div>
			<div
				className="sara-progress__track"
				role="progressbar"
				aria-valuemin={1}
				aria-valuemax={total}
				aria-valuenow={current}
				aria-valuetext={`Step ${current} of ${total}`}
			>
				<div className="sara-progress__fill" style={{ width: `${pct}%` }} />
			</div>
		</div>
	);
}
