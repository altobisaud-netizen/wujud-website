import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { dur, easeOutPremium } from "../motion/tokens";
import { BUILD_STEPS } from "./demoData";

export function BuildJourneySection() {
	const reduce = useReducedMotion();
	const [index, setIndex] = useState(0);
	const step = BUILD_STEPS[index];

	return (
		<section className="ihp-section ihp-section--soft" id="build-journey" aria-labelledby="build-journey-title">
			<div className="container">
				<p className="ihp-kicker">Build journey</p>
				<h2 id="build-journey-title" className="ihp-section__title">
					From profile to improvement
				</h2>
				<p className="ihp-section__lead">
					A clear path to prepare SARA for your business — without claiming channels are already connected.
				</p>

				<div className="ihp-journey">
					<div className="ihp-journey__steps" role="tablist" aria-label="Build journey steps">
						{BUILD_STEPS.map((item, i) => (
							<button
								key={item.id}
								type="button"
								role="tab"
								aria-selected={index === i}
								className={`ihp-journey__step${index === i ? " ihp-journey__step--on" : ""}`}
								onClick={() => setIndex(i)}
							>
								<span className="ihp-journey__num">{i + 1}</span>
								<span>
									<strong>{item.title}</strong>
									<small>{item.body}</small>
								</span>
							</button>
						))}
					</div>

					<AnimatePresence mode="wait">
						<motion.div
							key={step.id}
							className="ihp-panel ihp-journey__preview"
							role="tabpanel"
							initial={reduce ? false : { opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -6 }}
							transition={{ duration: dur.md, ease: easeOutPremium }}
						>
							<p className="ihp-journey__preview-label">Product preview</p>
							<h3>{step.previewTitle}</h3>
							<ul>
								{step.previewLines.map((line) => (
									<li key={line}>{line}</li>
								))}
							</ul>
							<p className="ihp-note">Demonstration UI — no live customer data.</p>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
