import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { ButtonLink } from "../components/Button";
import { cardHover, staggerContainer, staggerItem } from "../motion/tokens";

type Plan = {
	name: string;
	sub: string;
	priceMonthly: string;
	priceYearly: string;
	features: readonly string[];
	featured?: boolean;
	badge?: string;
	cta: string;
	ctaHref: string;
};

const PLANS: readonly Plan[] = [
	{
		name: "Starter",
		sub: "For small teams getting started.",
		priceMonthly: "$299/mo",
		priceYearly: "$239/mo",
		features: [
			"AI Employee (Sara)",
			"Up to 1,000 conversations/mo",
			"WhatsApp & Web",
			"CRM Integrations",
			"Email Support",
		],
		cta: "Build My SARA",
		ctaHref: "/build-sara",
	},
	{
		name: "Growth",
		sub: "For growing teams & enterprises.",
		priceMonthly: "$799/mo",
		priceYearly: "$639/mo",
		featured: true,
		badge: "Most Popular",
		features: [
			"AI Employee (Sara)",
			"Up to 5,000 conversations/mo",
			"Multi-channel",
			"Advanced Integrations",
			"Priority Support",
			"Reports & Analytics",
		],
		cta: "Build My SARA",
		ctaHref: "/build-sara",
	},
	{
		name: "Scale",
		sub: "For large teams & enterprises.",
		priceMonthly: "Custom",
		priceYearly: "Custom",
		features: [
			"Unlimited conversations",
			"Custom Integrations",
			"SLA & Onboarding",
			"Dedicated Support",
			"Advanced Security",
		],
		cta: "Book a Demo",
		ctaHref: "#book-demo",
	},
] as const;

export function PricingSection() {
	const [yearly, setYearly] = useState(false);

	return (
		<section className="section section--pricing container" id="pricing" aria-labelledby="price-title">
			<Reveal>
				<SectionHeader
					align="center"
					headingId="price-title"
					index="07"
					title={
						<>
							Simple pricing.
							<br />
							<span className="text-accent">Powerful results.</span>
						</>
					}
					lead="Choose a plan that fits your business."
				/>
			</Reveal>
			<div className="price-toggle" role="group" aria-label="Billing period">
				<button type="button" className={yearly ? "" : "is-on"} onClick={() => setYearly(false)}>
					Monthly
				</button>
				<button type="button" className={yearly ? "is-on" : ""} onClick={() => setYearly(true)}>
					Yearly <span className="price-toggle__hint">(20% off)</span>
				</button>
			</div>
			<motion.div
				className="price-grid"
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.18 }}
			>
				{PLANS.map((plan) => (
					<motion.article
						key={plan.name}
						className={`price-card${plan.featured ? " price-card--featured" : ""}`}
						variants={staggerItem}
						whileHover={
							plan.featured
								? {
										y: -6,
										scale: 1.01,
										boxShadow: "0 16px 48px rgba(201, 169, 106, 0.14)",
										transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
									}
								: {
										...cardHover,
										boxShadow: "0 12px 36px rgba(0, 0, 0, 0.3)",
									}
						}
					>
						{plan.featured ? <span className="price-card__glow" aria-hidden /> : null}
						{plan.badge ? <span className="price-card__badge">{plan.badge}</span> : null}
						<h3>{plan.name}</h3>
						<p className="price-card__sub">{plan.sub}</p>
						<p className="price-card__amount">{yearly ? plan.priceYearly : plan.priceMonthly}</p>
						<ul>
							{plan.features.map((f) => (
								<li key={f}>{f}</li>
							))}
						</ul>
						<ButtonLink
							href={plan.ctaHref}
							variant={plan.featured ? "primary" : "ghost"}
							className="btn--block"
						>
							{plan.cta}
						</ButtonLink>
					</motion.article>
				))}
			</motion.div>
			<p className="price-foot">No hidden fees. Cancel anytime.</p>
		</section>
	);
}
