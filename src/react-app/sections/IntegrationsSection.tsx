import type { IconType } from "react-icons";
import { BsMicrosoftTeams } from "react-icons/bs";
import { motion } from "framer-motion";
import {
	SiHubspot,
	SiIntercom,
	SiSalesforce,
	SiShopify,
	SiSlack,
	SiWhatsapp,
	SiWoocommerce,
	SiZendesk,
} from "react-icons/si";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { cardHover, staggerContainer, staggerItem } from "../motion/tokens";

const BRANDS: { name: string; Icon: IconType; color: string }[] = [
	{ name: "Salesforce", Icon: SiSalesforce, color: "#00A1E0" },
	{ name: "HubSpot", Icon: SiHubspot, color: "#FF7A59" },
	{ name: "WhatsApp", Icon: SiWhatsapp, color: "#25D366" },
	{ name: "Slack", Icon: SiSlack, color: "#4A154B" },
	{ name: "Zendesk", Icon: SiZendesk, color: "#03363D" },
	{ name: "Intercom", Icon: SiIntercom, color: "#1F8DED" },
	{ name: "Microsoft Teams", Icon: BsMicrosoftTeams, color: "#6264A7" },
	{ name: "Shopify", Icon: SiShopify, color: "#96BF48" },
	{ name: "WooCommerce", Icon: SiWoocommerce, color: "#7F54B3" },
];

export function IntegrationsSection() {
	return (
		<section className="section container" id="integrations" aria-labelledby="int-title">
			<div className="int-layout">
				<Reveal>
					<div className="int-layout__copy">
						<SectionHeader
							headingId="int-title"
							index="05"
							title={
								<>
									Seamless integrations <span className="text-gold">with your stack.</span>
								</>
							}
							lead="Connect WUJUD and Sara with the tools you already use."
						/>
					</div>
				</Reveal>
				<div className="int-layout__grid-wrap">
					<motion.div
						className="int-brand-grid"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						{BRANDS.map((b) => {
							const Icon = b.Icon;
							return (
								<motion.div
									key={b.name}
									className="int-brand"
									variants={staggerItem}
									whileHover={{
										...cardHover,
										boxShadow: "0 10px 28px rgba(0, 0, 0, 0.28)",
									}}
								>
									<span
										className="int-brand__logo"
										style={{ color: b.color }}
										aria-hidden
									>
										<Icon />
									</span>
									<span className="int-brand__name">{b.name}</span>
								</motion.div>
							);
						})}
						<motion.div className="int-brand int-brand--more" variants={staggerItem}>
							<span className="int-brand__more">More</span>
						</motion.div>
					</motion.div>
					<p className="int-footnote">And any API, any system, anywhere.</p>
				</div>
			</div>
		</section>
	);
}
