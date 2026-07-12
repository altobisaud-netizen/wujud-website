import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { dur, easeOutPremium } from "../motion/tokens";
import { SCENARIOS, type ScenarioId } from "./demoData";
import { useStagedMessages } from "./useStagedMessages";

const ORDER: ScenarioId[] = ["qualify", "answer", "follow-up", "escalate"];

export function WatchSaraWorkSection() {
	const reduce = useReducedMotion();
	const [active, setActive] = useState<ScenarioId>("qualify");
	const scenario = SCENARIOS[active];
	const visible = useStagedMessages(scenario.messages.length, active, reduce);
	const shown = useMemo(() => scenario.messages.slice(0, visible), [scenario.messages, visible]);

	return (
		<section className="ihp-section" id="watch-sara" aria-labelledby="watch-sara-title">
			<div className="container">
				<p className="ihp-kicker">Watch SARA work</p>
				<h2 id="watch-sara-title" className="ihp-section__title">
					See how conversations become progress
				</h2>
				<p className="ihp-section__lead">
					Explore product demonstrations of qualification, answers, follow-up, and human escalation.
					These are scripted demos — not live production replies.
				</p>

				<div className="ihp-tabs" role="tablist" aria-label="SARA scenario demos">
					{ORDER.map((id) => (
						<button
							key={id}
							type="button"
							role="tab"
							id={`scenario-tab-${id}`}
							aria-selected={active === id}
							aria-controls={`scenario-panel-${id}`}
							className={`ihp-tab${active === id ? " ihp-tab--on" : ""}`}
							onClick={() => setActive(id)}
						>
							{SCENARIOS[id].label}
						</button>
					))}
				</div>

					<div className="ihp-panel ihp-scenario" role="tabpanel" id={`scenario-panel-${active}`} aria-labelledby={`scenario-tab-${active}`}>
					<div className="ihp-scenario__thread">
						<AnimatePresence initial={false}>
							{shown.map((msg, index) => (
								<motion.div
									key={`${active}-${index}`}
									className={`ihp-msg ihp-msg--${msg.role}`}
									initial={reduce ? false : { opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: dur.md, ease: easeOutPremium }}
								>
									<span className="ihp-msg__who">{msg.role === "sara" ? "SARA" : "Customer"}</span>
									<p className={`ihp-bubble ihp-bubble--${msg.role}`}>{msg.text}</p>
								</motion.div>
							))}
						</AnimatePresence>
						{!reduce && visible < scenario.messages.length && visible > 0 && visible % 2 === 1 ? (
							<div className="ihp-msg ihp-msg--sara" aria-hidden>
								<span className="ihp-msg__who">SARA</span>
								<p className="ihp-bubble ihp-bubble--sara ihp-bubble--typing">
									<span />
									<span />
									<span />
								</p>
							</div>
						) : null}
					</div>
					<p className="ihp-sr-only" aria-live="polite">
						{shown.length ? `${shown[shown.length - 1].role === "sara" ? "SARA" : "Customer"}: ${shown[shown.length - 1].text}` : ""}
					</p>
					<ul className="ihp-outcomes">
						{scenario.outcomes.map((outcome) => (
							<li key={outcome}>{outcome}</li>
						))}
					</ul>
					<p className="ihp-note">Interactive product demonstration — scripted sample conversation.</p>
				</div>
			</div>
		</section>
	);
}
