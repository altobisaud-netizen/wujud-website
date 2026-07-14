import "./landing.css";
import "./interactive/interactive-homepage.css";
import "./conversational/conversational.css";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { DataDeletionPage } from "./pages/DataDeletionPage";
import { SaraOnboardingPage } from "./onboarding/SaraOnboardingPage";
import { ConversationalHomePage } from "./conversational/ConversationalHomePage";
import { PricingPage } from "./pages/PricingPage";
import { FaqPage } from "./pages/FaqPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { BookDemoPage } from "./pages/BookDemoPage";

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

	if (path === "/pricing") {
		return <PricingPage />;
	}

	if (path === "/faq") {
		return <FaqPage />;
	}

	if (path === "/how-it-works") {
		return <HowItWorksPage />;
	}

	if (path === "/book-demo") {
		return <BookDemoPage />;
	}

	return <ConversationalHomePage />;
}
