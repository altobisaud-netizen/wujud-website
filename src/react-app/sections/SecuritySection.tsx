import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { staggerContainer, staggerItem } from "../motion/tokens";

const ITEMS = [
	"SOC 2 Type II Compliant",
	"GDPR & CCPA Ready",
	"End-to-end Encryption",
	"Role-Based Access Control",
	"Data Residency Options",
	"Audit Logs & Monitoring",
] as const;

export function SecuritySection() {
	return (
		<section className="section container" id="security" aria-labelledby="sec-title">
			<Reveal>
				<SectionHeader
					headingId="sec-title"
					index="06"
					title="Enterprise grade. Built to protect what matters."
					lead="WUJUD is built with enterprise-grade security, compliance and governance."
				/>
			</Reveal>
			<motion.div
				className="sec-grid"
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.12 }}
			>
				{ITEMS.map((text) => (
					<motion.div key={text} className="sec-item" variants={staggerItem}>
						<span className="sec-item__check" aria-hidden>
							✓
						</span>
						<span>{text}</span>
					</motion.div>
				))}
			</motion.div>
			<motion.p
				className="sec-banner"
				initial={{ opacity: 0, y: 12 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
			>
				Your data stays yours. Always secure. Always private.
			</motion.p>
		</section>
	);
}
