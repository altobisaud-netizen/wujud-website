type Props = {
	title: string;
	businessName: string;
	businessDescription: string;
	customersLabel: string;
	customers: string;
	channelsLabel: string;
	channels: string;
	goalsLabel: string;
	goals: string;
};

export function BusinessSummary(props: Props) {
	return (
		<article className="conv__card">
			<h3>{props.title}</h3>
			<p>
				<strong>{props.businessName || "—"}</strong>
			</p>
			<p>{props.businessDescription}</p>
			<dl className="conv__dl">
				<div>
					<dt>{props.customersLabel}</dt>
					<dd>{props.customers}</dd>
				</div>
				<div>
					<dt>{props.channelsLabel}</dt>
					<dd>{props.channels}</dd>
				</div>
				<div>
					<dt>{props.goalsLabel}</dt>
					<dd>{props.goals}</dd>
				</div>
			</dl>
		</article>
	);
}
