import { lazy, Suspense } from "react";

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

type Props = { heading: string };

/** Demoted interactive homepage examples — lazy, below the prompt shell. */
export function BelowFoldExamples({ heading }: Props) {
	return (
		<section className="conv__examples" aria-labelledby="conv-examples-title">
			<h2 id="conv-examples-title" className="conv__examples-title">
				{heading}
			</h2>
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
		</section>
	);
}
