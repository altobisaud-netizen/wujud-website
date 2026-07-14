type Props = {
	title: string;
	body: string;
	note?: string;
	ctaLabel: string;
	onContinue: () => void;
};

export function ContinueCta({ title, body, note, ctaLabel, onContinue }: Props) {
	return (
		<article className="conv__card conv__card--featured">
			<h3>{title}</h3>
			<p>{body}</p>
			{note ? <p className="conv__note">{note}</p> : null}
			<div className="conv__actions">
				<button type="button" className="conv__btn" onClick={onContinue}>
					{ctaLabel}
				</button>
			</div>
		</article>
	);
}
