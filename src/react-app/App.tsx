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

export default function App() {
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
