import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CountUpNumber } from "../components/CountUpNumber";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { easeOutPremium, staggerContainer, staggerItem } from "../motion/tokens";

function OutIconZap() {
	return (
		<svg className="outcome-card__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
			<path
				d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
function OutIconTrend() {
	return (
		<svg className="outcome-card__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
			<path
				d="M4 18V6M8 18v-5M12 18V9M16 18v-3M20 18V4"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
function OutIconClock() {
	return (
		<svg className="outcome-card__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
			<circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.2" />
			<path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
		</svg>
	);
}
function OutIconDollar() {
	return (
		<svg className="outcome-card__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
			<path
				d="M12 3v18M16 7a3 3 0 00-4-2.5h-1a3 3 0 100 6h2a3 3 0 110 4H9"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
function OutIconSmile() {
	return (
		<svg className="outcome-card__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
			<circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" />
			<path
				d="M9 14s1.2 1.5 3 1.5 3-1.5 3-1.5M9 10h.01M15 10h.01"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

type OutcomeDef = {
	icon: ReactNode;
	end: number;
	prefix?: string;
	suffix: string;
	ariaLabel: string;
	sub: string;
	desc: string;
};

const OUTCOMES: OutcomeDef[] = [
	{
		icon: <OutIconZap />,
		end: 10,
		suffix: "x Faster",
		ariaLabel: "10x Faster",
		sub: "Response Time",
		desc: "Reply instantly. Close faster.",
	},
	{
		icon: <OutIconTrend />,
		end: 47,
		prefix: "+",
		suffix: "%",
		ariaLabel: "+47%",
		sub: "More Conversions",
		desc: "Qualify better. Close more deals.",
	},
	{
		icon: <OutIconClock />,
		end: 24,
		suffix: "/7",
		ariaLabel: "24/7 Availability",
		sub: "Availability",
		desc: "Never miss a lead. Never sleep.",
	},
	{
		icon: <OutIconDollar />,
		end: 60,
		suffix: "%",
		ariaLabel: "60% Cost Reduction",
		sub: "Cost Reduction",
		desc: "Automate more. Operate lean.",
	},
	{
		icon: <OutIconSmile />,
		end: 98,
		suffix: "%",
		ariaLabel: "98% Satisfaction",
		sub: "Satisfaction",
		desc: "Instant answers. Better experience.",
	},
];

function OutcomeStatCard({ o }: { o: OutcomeDef }) {
	const ref = useRef<HTMLElement | null>(null);
	const inView = useInView(ref, { once: true, amount: 0.35 });
	const [replayKey, setReplayKey] = useState(0);

	return (
		<motion.article
			ref={ref}
			className="outcome-card outcome-card--ref"
			variants={staggerItem}
			onHoverStart={() => {
				if (inView) setReplayKey((k) => k + 1);
			}}
			whileHover={{
				y: -4,
				scale: 1.01,
				boxShadow:
					"0 16px 42px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(197, 160, 89, 0.18), 0 0 28px rgba(197, 160, 89, 0.08)",
				borderColor: "rgba(197, 160, 89, 0.32)",
				transition: { duration: 0.5, ease: easeOutPremium },
			}}
		>
			<div className="outcome-card__icon-wrap">{o.icon}</div>
			<p className="outcome-card__value" aria-label={o.ariaLabel}>
				<CountUpNumber
					active={inView}
					replayKey={replayKey}
					end={o.end}
					prefix={o.prefix}
					suffix={o.suffix}
					duration={1.1}
				/>
			</p>
			<p className="outcome-card__sub">{o.sub}</p>
			<p className="outcome-card__desc">{o.desc}</p>
		</motion.article>
	);
}

export function OutcomesSection() {
	return (
		<section className="section section--outcomes container" id="solutions" aria-labelledby="outcomes-title">
			<Reveal>
				<SectionHeader
					align="center"
					headingId="outcomes-title"
					index="01"
					title={
						<>
							Built to deliver real outcomes <span className="text-gold">for your business.</span>
						</>
					}
				/>
			</Reveal>
			<motion.div
				className="outcomes__grid"
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.15 }}
			>
				{OUTCOMES.map((o) => (
					<OutcomeStatCard key={o.sub} o={o} />
				))}
			</motion.div>
		</section>
	);
}
