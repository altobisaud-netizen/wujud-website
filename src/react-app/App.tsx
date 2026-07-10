import "./landing.css";
import { MotionAmbient } from "./components/MotionAmbient";
import { Header } from "./components/Header";
import { HeroSection } from "./sections/HeroSection";
import { TrustedBySection } from "./sections/TrustedBySection";
import { OutcomesSection } from "./sections/OutcomesSection";
import { SaraInActionSection } from "./sections/SaraInActionSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { IntelligenceSection } from "./sections/IntelligenceSection";
import { IntegrationsSection } from "./sections/IntegrationsSection";
import { SecuritySection } from "./sections/SecuritySection";
import { PricingSection } from "./sections/PricingSection";
import { FAQSection } from "./sections/FAQSection";
import { FinalCTASection } from "./sections/FinalCTASection";
import { AIEmployeesSection } from "./sections/AIEmployeesSection";
import { SiteFooter } from "./sections/SiteFooter";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { DataDeletionPage } from "./pages/DataDeletionPage";
import { SaraOnboardingPage } from "./onboarding/SaraOnboardingPage";

function LandingPage() {
	return (
		<div className="landing">
			<MotionAmbient />
			<Header />
			<div className="main-canvas">
				<main>
					<HeroSection />
					<TrustedBySection />
					<OutcomesSection />
					<SaraInActionSection />
					<CapabilitiesSection />
					<IntelligenceSection />
					<IntegrationsSection />
					<SecuritySection />
					<PricingSection />
					<FAQSection />
					<FinalCTASection />
					<AIEmployeesSection />
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
