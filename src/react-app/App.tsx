import { lazy, Suspense } from "react";
import "./landing.css";
import "./interactive/interactive-homepage.css";
import { MotionAmbient } from "./components/MotionAmbient";
import { Header } from "./components/Header";
import { PricingSection } from "./sections/PricingSection";
import { FAQSection } from "./sections/FAQSection";
import { FinalCTASection } from "./sections/FinalCTASection";
import { SiteFooter } from "./sections/SiteFooter";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { DataDeletionPage } from "./pages/DataDeletionPage";
import { SaraOnboardingPage } from "./onboarding/SaraOnboardingPage";
import { InteractiveHeroSection } from "./interactive/InteractiveHeroSection";
import { FinalConversationalCtaSection } from "./interactive/FinalConversationalCtaSection";

const WatchSaraWorkSection = lazy(() =>
	import("./interactive/WatchSaraWorkSection").then((m) => ({ default: m.WatchSaraWorkSection })),
);
const BuildJourneySection = lazy(() =>
	import("./interactive/BuildJourneySection").then((m) => ({ default: m.BuildJourneySection })),
);
const ChannelExperienceSection = lazy(() =>
	import("./interactive/ChannelExperienceSection").then((m) => ({ default: m.ChannelExperienceSection })),
);
const IndustryPersonalizationSection = lazy(() =>
	import("./interactive/IndustryPersonalizationSection").then((m) => ({
		default: m.IndustryPersonalizationSection,
	})),
);
const BeforeAfterSection = lazy(() =>
	import("./interactive/BeforeAfterSection").then((m) => ({ default: m.BeforeAfterSection })),
);
const ProductPreviewSection = lazy(() =>
	import("./interactive/ProductPreviewSection").then((m) => ({ default: m.ProductPreviewSection })),
);
const IntegrationsMapSection = lazy(() =>
	import("./interactive/IntegrationsMapSection").then((m) => ({ default: m.IntegrationsMapSection })),
);

function SectionFallback() {
	return <div className="ihp-section-fallback" aria-hidden="true" />;
}

function LandingPage() {
	return (
		<div className="landing landing--product">
			<MotionAmbient />
			<Header />
			<div className="main-canvas">
				<main>
					<InteractiveHeroSection />
					<Suspense fallback={<SectionFallback />}>
						<WatchSaraWorkSection />
						<BuildJourneySection />
						<ChannelExperienceSection />
						<IndustryPersonalizationSection />
						<BeforeAfterSection />
						<ProductPreviewSection />
						<IntegrationsMapSection />
					</Suspense>
					<PricingSection />
					<FAQSection />
					<FinalCTASection />
					<FinalConversationalCtaSection />
				</main>
				<SiteFooter />
			</div>
		</div>
	);
}

export default function App() {
	const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();

	if (path === "/privacy") {
		return <PrivacyPage />;
	}

	if (path === "/terms") {
		return <TermsPage />;
	}

	if (path === "/data-deletion") {
		return <DataDeletionPage />;
	}

	if (path === "/build-sara") {
		return <SaraOnboardingPage />;
	}

	return <LandingPage />;
}
