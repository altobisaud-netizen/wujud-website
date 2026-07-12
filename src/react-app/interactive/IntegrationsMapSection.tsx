import { motion, useReducedMotion } from "framer-motion";
import { dur, easeOutPremium } from "../motion/tokens";
import { INTEGRATION_NODES } from "./demoData";

export function IntegrationsMapSection() {
	const reduce = useReducedMotion();

	return (
		<section className="ihp-section" id="integrations" aria-labelledby="integrations-title">
			<div className="container">
				<p className="ihp-kicker">Integrations visual</p>
				<h2 id="integrations-title" className="ihp-section__title">
					SARA at the center of your customer stack
				</h2>
				<p className="ihp-section__lead">
					A lightweight product map. Some connections are planned; labels stay honest about what is
					available now.
				</p>

				<div className="ihp-map">
					<motion.div
						className="ihp-map__core"
						initial={reduce ? false : { opacity: 0, scale: 0.96 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: dur.slow, ease: easeOutPremium }}
					>
						SARA
					</motion.div>
					<ul className="ihp-map__nodes">
						{INTEGRATION_NODES.map((node, index) => (
							<motion.li
								key={node}
								initial={reduce ? false : { opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: dur.md, ease: easeOutPremium, delay: reduce ? 0 : index * 0.04 }}
							>
								<span className="ihp-map__line" aria-hidden />
								{node}
							</motion.li>
						))}
					</ul>
					<p className="ihp-note">Planned and current connections shown for product storytelling only.</p>
				</div>
			</div>
		</section>
	);
}
