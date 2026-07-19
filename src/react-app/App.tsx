import "./wellness/wellness.css";
import { lazy, Suspense } from "react";
import { WellnessHomePage } from "./wellness/WellnessHomePage";
import type { WellnessRoute } from "./wellness/WellnessInfoPage";

const WellnessInfoPage = lazy(() =>
	import("./wellness/WellnessInfoPage").then((module) => ({
		default: module.WellnessInfoPage,
	})),
);

export default function App() {
	const path = window.location.pathname.replace(/\/+$/, "").toLowerCase() || "/";
	const directRoutes: Record<string, WellnessRoute> = {
		"/how-it-works": "how-it-works",
		"/eight-week-journey": "eight-week-journey",
		"/pricing": "pricing",
		"/safety": "safety",
		"/privacy": "privacy",
		"/terms": "terms",
		"/contact": "contact",
	};

	const directRoute = directRoutes[path];
	if (directRoute) {
		return (
			<Suspense fallback={<div className="route-loading">WUJUD</div>}>
				<WellnessInfoPage route={directRoute} />
			</Suspense>
		);
	}

	return <WellnessHomePage />;
}
