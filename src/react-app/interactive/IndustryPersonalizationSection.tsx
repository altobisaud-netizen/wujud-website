import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { dur, easeOutPremium } from "../motion/tokens";
import { INDUSTRIES, type IndustryId } from "./demoData";

export function IndustryPersonalizationSection() {
	const reduce = useReducedMotion();
	const [industry, setIndustry] = useState<IndustryId>("retail");
	const active = INDUSTRIES.find((item) => item.id === industry)!;

	return (
		<section className="ihp-section ihp-section--soft" id="solutions" aria-labelledby="industry-title">
			<div className="container">
				<p className="ihp-kicker">Industry personalization</p>
				<h2 id="industry-title" className="ihp-section__title">
					SARA adapts to your world of work
				</h2>
				<p className="ihp-section__lead">
					Choose an industry to see sample questions, responses, and qualification details. Healthcare
					examples stay limited to scheduling and service intake — never diagnosis.
				</p>

				<div className="ihp-chip-row" role="group" aria-label="Industry selector">
					{INDUSTRIES.map((item) => (
						<button
							key={item.id}
							type="button"
							className={`ihp-chip${industry === item.id ? " ihp-chip--on" : ""}`}
							aria-pressed={industry === item.id}
							onClick={() => setIndustry(item.id)}
						>
							{item.label}
						</button>
					))}
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={active.id}
						className="ihp-industry"
						initial={reduce ? false : { opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: dur.md, ease: easeOutPremium }}
					>
						<div className="ihp-panel">
							<p className="ihp-msg__who">Customer</p>
							<p className="ihp-bubble ihp-bubble--customer">{active.question}</p>
							<p className="ihp-msg__who">SARA</p>
							<p className="ihp-bubble ihp-bubble--sara">{active.answer}</p>
						</div>
						<div className="ihp-panel">
							<h3>Qualification details</h3>
							<ul>
								{active.qualification.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
							<h3>Dashboard example</h3>
							<ul>
								{active.dashboard.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
}
