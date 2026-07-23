import "./wellness/wellness.css";
import { lazy, Suspense, type ReactElement } from "react";
import { PrivacyAccountPage } from "./wellness/operational/PrivacyAccountPage";
import {
	WaitlistConfirmPage,
	WaitlistDeletePage,
	WaitlistUnsubscribePage,
} from "./wellness/operational/WaitlistActionPage";
import { WellnessClerkProvider } from "./wellness/operational/WellnessClerkProvider";
import { WellnessHomePage } from "./wellness/WellnessHomePage";
import type { WellnessLocale } from "./wellness/types";
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
		"/data-deletion": "data-deletion",
		"/contact": "contact",
	};

	if (path === "/account/privacy") {
		return (
			<WellnessClerkProvider>
				<PrivacyAccountPage />
			</WellnessClerkProvider>
		);
	}

	const waitlistRoutes: Record<string, (locale: WellnessLocale) => ReactElement> = {
		"/waitlist/confirm": (locale) => <WaitlistConfirmPage locale={locale} />,
		"/waitlist/unsubscribe": (locale) => <WaitlistUnsubscribePage locale={locale} />,
		"/waitlist/delete": (locale) => <WaitlistDeletePage locale={locale} />,
	};
	const waitlistRoute = waitlistRoutes[path];
	if (waitlistRoute) {
		return <WellnessClerkProvider>{waitlistRoute(readPageLocale())}</WellnessClerkProvider>;
	}

	const directRoute = directRoutes[path];
	if (directRoute) {
		return (
			<Suspense fallback={<div className="route-loading">WUJUD</div>}>
				<WellnessInfoPage route={directRoute} />
			</Suspense>
		);
	}

	return (
		<WellnessClerkProvider>
			<WellnessHomePage />
		</WellnessClerkProvider>
	);
}

function readPageLocale(): WellnessLocale {
	try {
		const stored = window.localStorage.getItem("wujud-wellness-locale");
		if (stored === "en" || stored === "ar") return stored;
	} catch {
		/* ignore */
	}
	return document.documentElement.lang === "en" ? "en" : "ar";
}
