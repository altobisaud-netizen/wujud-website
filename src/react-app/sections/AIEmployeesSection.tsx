import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { REF_IMG } from "../assetsRef";
import { cardHover, staggerContainer, staggerItem } from "../motion/tokens";

const TEAM = [
	{
		name: "Sara",
		img: REF_IMG.sara,
		role: "Sales & Customer Service",
		description:
			"Autonomous front-office coverage—qualification, follow-ups, and service within policy, with a full audit trail.",
		status: "Available now",
		statusTone: "live" as const,
	},
	{
		name: "Qais",
		img: REF_IMG.qais,
		role: "Cybersecurity Intelligence",
		description:
			"Continuous signal synthesis across your security posture—prioritized context for analysts and leadership.",
		status: "Coming soon",
		statusTone: "roadmap" as const,
	},
	{
		name: "Hawraa",
		img: REF_IMG.hawraa,
		role: "Healthcare Operations Intelligence",
		description:
			"Operational clarity for clinical and admin teams—scheduling, intake, and coordination without replacing human judgment.",
		status: "Coming soon",
		statusTone: "roadmap" as const,
	},
] as const;

export function AIEmployeesSection() {
	return (
		<section className="section container" id="company" aria-labelledby="ai-title">
			<Reveal>
				<SectionHeader
					headingId="ai-title"
					index="10"
					title="AI employees for every function."
					lead="Sara is live today. More specialized AI employees are on the roadmap—each powered by the same WUJUD intelligence layer."
				/>
			</Reveal>
			<motion.div
				className="ai-roster"
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.12 }}
			>
				{TEAM.map((m) => (
					<motion.article
						key={m.name}
						className="ai-card ai-card--portrait"
						variants={staggerItem}
						whileHover={{
							...cardHover,
							boxShadow: "0 18px 48px rgba(0, 0, 0, 0.42)",
							borderColor: "rgba(197, 160, 89, 0.22)",
						}}
					>
						<div className="ai-card__media">
							<img className="ai-card__img" src={m.img} alt="" width={400} height={500} />
						</div>
						<div className="ai-card__body">
							<div className="ai-card__head">
								<h3 className="ai-card__name text-gold">{m.name}</h3>
								<span className={`ai-card__status ai-card__status--${m.statusTone}`}>
									{m.status}
								</span>
							</div>
							<p className="ai-card__role">{m.role}</p>
							<p className="ai-card__desc">{m.description}</p>
						</div>
					</motion.article>
				))}
			</motion.div>
			<motion.article
				className="ai-card ai-card--portrait ai-card--roadmap-wide"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
				whileHover={{
					...cardHover,
					boxShadow: "0 20px 52px rgba(0, 0, 0, 0.4)",
					borderColor: "rgba(197, 160, 89, 0.18)",
				}}
			>
				<div className="ai-card--roadmap-wide__visual" aria-hidden>
					<span className="ai-card--roadmap-wide__orb" />
					<span className="ai-card--roadmap-wide__orb ai-card--roadmap-wide__orb--b" />
					<div className="ai-card--roadmap-wide__silhouettes">
						<span />
						<span />
						<span />
					</div>
				</div>
				<div className="ai-card__body ai-card--roadmap-wide__copy">
					<div className="ai-card__head">
						<h3 className="ai-card__name">More AI employees</h3>
						<span className="ai-card__status ai-card__status--dev">In development</span>
					</div>
					<p className="ai-card__role">Expanding the roster</p>
					<p className="ai-card__desc">
						Specialized agents for finance, HR, and operations—same governance model, same quality bar as Sara.
					</p>
				</div>
			</motion.article>
		</section>
	);
}
