import { motion, useReducedMotion } from "framer-motion";
import { DemoRequestForm } from "../components/DemoRequestForm";
import { dur, easeOutPremium } from "../motion/tokens";

export function FinalCTASection() {
	const reduce = useReducedMotion();

	return (
		<section className="cta container" id="contact" aria-labelledby="cta-title">
			<motion.div
				className="cta__box"
				initial={{ opacity: 0, y: 28 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: dur.slow, ease: easeOutPremium }}
			>
				{!reduce ? (
					<motion.div
						className="cta__glow"
						aria-hidden
						animate={{
							opacity: [0.35, 0.55, 0.38, 0.35],
							scale: [1, 1.03, 1],
						}}
						transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
					/>
				) : null}
				<h2 id="cta-title" className="cta__title">
					Ready to meet your AI employee?
				</h2>
				<p className="cta__lead">
					Book a demo — tell us about your channels and goals. The WUJUD team will follow up shortly.
				</p>
				<DemoRequestForm />
			</motion.div>
		</section>
	);
}
