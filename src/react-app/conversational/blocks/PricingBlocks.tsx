import { t, type Locale, type ProductPlan, type ComparisonRow } from "../../../content/wujudProductCatalog";

type PricingProps = {
	locale: Locale;
	plans: readonly ProductPlan[];
	yearly?: boolean;
	intro: string;
};

export function PricingCards({ locale, plans, yearly = false, intro }: PricingProps) {
	return (
		<>
			<p>{intro}</p>
			<div className="conv__cards">
				{plans.map((plan) => (
					<article
						key={plan.id}
						className={`conv__card${plan.featured ? " conv__card--featured" : ""}`}
					>
						{plan.badge ? <span className="conv__badge">{t(plan.badge, locale)}</span> : null}
						<h3>{t(plan.name, locale)}</h3>
						<p>{t(plan.tagline, locale)}</p>
						<p className="conv__price">
							{t(yearly ? plan.priceYearlyDisplay : plan.priceMonthlyDisplay, locale)}
						</p>
						<ul>
							{plan.features.map((f) => (
								<li key={t(f, "en")}>{t(f, locale)}</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</>
	);
}

type CompareProps = {
	locale: Locale;
	rows: readonly ComparisonRow[];
	caption: string;
};

export function PlanComparison({ locale, rows, caption }: CompareProps) {
	return (
		<table className="conv__table">
			<caption className="visually-hidden">{caption}</caption>
			<thead>
				<tr>
					<th scope="col">{locale === "ar" ? "الميزة" : "Feature"}</th>
					<th scope="col">Starter</th>
					<th scope="col">Growth</th>
					<th scope="col">Scale</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr key={row.id}>
						<th scope="row">{t(row.feature, locale)}</th>
						<td>{t(row.starter, locale)}</td>
						<td>{t(row.growth, locale)}</td>
						<td>{t(row.scale, locale)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
