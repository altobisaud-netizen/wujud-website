import type { IconType } from "react-icons";
import { BsHeadset } from "react-icons/bs";
import { motion } from "framer-motion";
import {
	HiOutlineArrowTrendingUp,
	HiOutlineChartBar,
	HiOutlineCircleStack,
	HiOutlineMicrophone,
} from "react-icons/hi2";
import { SiWhatsapp } from "react-icons/si";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { cardHover, staggerContainer, staggerItem } from "../motion/tokens";

const CAPS: { Icon: IconType; title: string; body: string }[] = [
	{
		Icon: HiOutlineArrowTrendingUp,
		title: "Sales",
		body: "Qualify leads, book meetings, and close more deals.",
	},
	{
		Icon: BsHeadset,
		title: "Customer Service",
		body: "Resolve issues, answer questions, and delight customers.",
	},
	{
		Icon: SiWhatsapp,
		title: "WhatsApp & Social",
		body: "Engage customers where they are most active.",
	},
	{
		Icon: HiOutlineCircleStack,
		title: "CRM & Workflows",
		body: "Update CRM, create tasks, and automate follow-ups.",
	},
	{
		Icon: HiOutlineMicrophone,
		title: "Voice AI",
		body: "Natural voice conversations that feel human.",
	},
	{
		Icon: HiOutlineChartBar,
		title: "Reports & Insights",
		body: "Track performance and get actionable insights.",
	},
];

export function CapabilitiesSection() {
	return (
		<section className="section container" id="product" aria-labelledby="caps-title">
			<Reveal>
				<SectionHeader
					headingId="caps-title"
					index="03"
					title={
						<>
							One AI employee. <span className="text-gold">Infinite impact.</span>
						</>
					}
				/>
			</Reveal>
			<motion.div
				className="cap-grid"
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.12 }}
			>
				{CAPS.map((c) => {
					const Icon = c.Icon;
					return (
						<motion.article
							key={c.title}
							className="cap-card"
							variants={staggerItem}
							whileHover={{
								...cardHover,
								boxShadow: "0 12px 32px rgba(0, 0, 0, 0.32)",
								borderLeftColor: "rgba(197, 160, 89, 0.55)",
							}}
						>
							<div className="cap-card__icon" aria-hidden>
								<Icon />
							</div>
							<h3>{c.title}</h3>
							<p>{c.body}</p>
						</motion.article>
					);
				})}
			</motion.div>
		</section>
	);
}
