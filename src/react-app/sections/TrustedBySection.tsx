import type { IconType } from "react-icons";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import {
	SiGmail,
	SiGooglesheets,
	SiHubspot,
	SiInstagram,
	SiMeta,
	SiMessenger,
	SiSalesforce,
	SiShopify,
	SiSlack,
	SiWhatsapp,
	SiZapier,
} from "react-icons/si";
import { Reveal } from "../components/Reveal";

const PLATFORMS: { label: string; Icon: IconType }[] = [
	{ label: "WhatsApp", Icon: SiWhatsapp },
	{ label: "Instagram", Icon: SiInstagram },
	{ label: "Facebook Messenger", Icon: SiMessenger },
	{ label: "HubSpot", Icon: SiHubspot },
	{ label: "Salesforce", Icon: SiSalesforce },
	{ label: "Slack", Icon: SiSlack },
	{ label: "Shopify", Icon: SiShopify },
	{ label: "Google Sheets", Icon: SiGooglesheets },
	{ label: "Meta Ads", Icon: SiMeta },
	{ label: "Gmail", Icon: SiGmail },
	{ label: "Website Chat", Icon: HiOutlineChatBubbleLeftRight },
	{ label: "Zapier", Icon: SiZapier },
];

const LOOP = [...PLATFORMS, ...PLATFORMS];

export function TrustedBySection() {
	return (
		<section
			className="conn-marquee section--tight"
			aria-label="Platforms and channels WUJUD connects with"
		>
			<div className="container conn-marquee__inner">
				<Reveal>
					<h2 className="conn-marquee__title">
						Connects with the tools your business already uses
					</h2>
				</Reveal>
				<div className="conn-marquee__mask">
					<div className="conn-marquee__track">
						{LOOP.map((p, i) => {
							const Icon = p.Icon;
							return (
								<div key={`${p.label}-${i}`} className="conn-marquee__item">
									<span className="conn-marquee__icon" aria-hidden>
										<Icon />
									</span>
									<span className="conn-marquee__label">{p.label}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
