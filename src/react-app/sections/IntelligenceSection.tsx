import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { ButtonLink } from "../components/Button";
import { staggerContainer, staggerItem } from "../motion/tokens";

const PILLARS = [
	{ title: "Understand", body: "Advanced language understanding" },
	{ title: "Reason", body: "Contextual reasoning & decision making" },
	{ title: "Remember", body: "Long-term memory & business context" },
	{ title: "Act", body: "Execute actions across your tools" },
	{ title: "Learn", body: "Continuously improve from interactions" },
] as const;

export function IntelligenceSection() {
	return (
		<section className="section band" id="intelligence" aria-labelledby="intel-title">
			<div className="container">
				<div className="intel__grid">
					<Reveal>
						<div className="intel__copy-block">
							<SectionHeader
								headingId="intel-title"
								index="04"
								title={
									<>
										The WUJUD <span className="text-gold">intelligence layer.</span>
									</>
								}
								lead="WUJUD is the sovereign intelligence layer that powers AI employees with memory, reasoning and action. It's not just AI. It's autonomous intelligence you can trust."
							/>
							<ButtonLink variant="ghost" href="#contact">
								Learn more
							</ButtonLink>
						</div>
					</Reveal>
					<motion.div
						className="intel__pillars"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.15 }}
					>
						{PILLARS.map((p, i) => (
							<motion.div key={p.title} className="pillar" variants={staggerItem}>
								<span className="pillar__idx" aria-hidden>
									{i + 1}
								</span>
								<div>
									<h4>{p.title}</h4>
									<p>{p.body}</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
