import { lazy, Suspense, useState } from "react";

const WatchSaraWorkSection = lazy(() =>
	import("../interactive/WatchSaraWorkSection").then((m) => ({ default: m.WatchSaraWorkSection })),
);
const BuildJourneySection = lazy(() =>
	import("../interactive/BuildJourneySection").then((m) => ({ default: m.BuildJourneySection })),
);
const ProductPreviewSection = lazy(() =>
	import("../interactive/ProductPreviewSection").then((m) => ({ default: m.ProductPreviewSection })),
);
const IntegrationsMapSection = lazy(() =>
	import("../interactive/IntegrationsMapSection").then((m) => ({
		default: m.IntegrationsMapSection,
	})),
);

type Props = { heading: string; summary: string; hint: string };

/** Demoted interactive homepage examples — collapsed by default to reduce tab stops. */
export function BelowFoldExamples({ heading, summary, hint }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<section className="conv__examples" aria-labelledby="conv-examples-title">
			<h2 id="conv-examples-title" className="visually-hidden">
				{heading}
			</h2>
			<details
				className="conv__examples-details"
				open={open}
				onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
			>
				<summary className="conv__examples-summary">{summary}</summary>
				<p className="conv__examples-hint">{hint}</p>
				{open ? (
					<div className="landing landing--product">
						<div className="main-canvas">
							<div className="conv__examples-body">
								<Suspense fallback={<div className="ihp-section-fallback" aria-hidden="true" />}>
									<WatchSaraWorkSection />
									<BuildJourneySection />
									<ProductPreviewSection />
									<IntegrationsMapSection />
								</Suspense>
							</div>
						</div>
					</div>
				) : null}
			</details>
		</section>
	);
}
