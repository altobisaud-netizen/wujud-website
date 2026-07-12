import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeader } from "../components/SectionHeader";
import { dur, easeOutPremium } from "../motion/tokens";

const TAGS = [
	"Lead engaged",
	"Needs understood",
	"Solution explained",
	"Trust built",
	"Demo booked",
	"Follow-up sent",
] as const;

const U1 =
	"Hi Sara — we’re missing many customer messages on WhatsApp and Instagram. Can WUJUD help us reply faster?";

const S1 =
	"Absolutely. Sara can handle your customer inquiries instantly, qualify leads, answer common questions, and follow up so your team never loses an opportunity.";

const U2 =
	"That’s exactly our issue. Our team replies late, especially after working hours.";

const S2 =
	"No problem. Sara works 24/7 and can keep conversations moving even when your team is busy or offline. She can also notify your team when a customer is ready to buy.";

const U3 = "Sounds good. Can she understand our products and prices?";

const S3 =
	"Yes. We train Sara using your approved catalogues, pricing rules, FAQs, and sales process, so her replies stay accurate and aligned with your business.";

const U4 = "Great. I think this is what we need. Can we book a demo?";

const S4 =
	"Done — I’ve booked your demo and sent the details. I’ll also prepare a short summary of how Sara can fit your workflow.";

/** Cumulative ms from start when each phase becomes visible (after in-view). */
const PHASE_AT_MS = [
	0, 380, 1000, 1850, 2680, 3480, 4380, 5180, 6050, 6880, 7680, 8480, 9380, 10200, 10950, 11700,
] as const;

const MAX_PHASE = PHASE_AT_MS.length - 1;

function TypingRow() {
	return (
		<div className="sia__msg sia__msg--sara" aria-hidden>
			<div className="sia__sara-label">Sara</div>
			<div className="sia__bubble sia__bubble--sara sia__bubble--typing">
				<span className="sia__dot" />
				<span className="sia__dot" />
				<span className="sia__dot" />
			</div>
		</div>
	);
}

export function SaraInActionSection() {
	const rootRef = useRef<HTMLDivElement>(null);
	const inView = useInView(rootRef, { once: true, amount: 0.28 });
	const [phase, setPhase] = useState(0);
	const reduce = useReducedMotion();

	useEffect(() => {
		if (!inView) return;
		if (reduce) {
			setPhase(MAX_PHASE);
			return;
		}
		const timers: number[] = [];
		for (let i = 1; i < PHASE_AT_MS.length; i++) {
			const t = window.setTimeout(() => setPhase(i), PHASE_AT_MS[i]);
			timers.push(t);
		}
		return () => timers.forEach((id) => clearTimeout(id));
	}, [inView, reduce]);

	const activeTagByPhase = [0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5] as const;
	const activeTagIdx = activeTagByPhase[Math.min(phase, activeTagByPhase.length - 1)] ?? 0;

	return (
		<section className="section container" id="sara-action" aria-labelledby="action-title">
			<div ref={rootRef} className="sia__layout">
				<motion.div
					className="sia__copy"
					initial={{ opacity: 0, y: 22 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: dur.slow, ease: easeOutPremium }}
				>
					<SectionHeader
						headingId="action-title"
						index="02"
						title={
							<>
								Sara in action.{" "}
								<span className="text-gold">Real conversations. Real results.</span>
							</>
						}
						lead="From first hello to a confident yes, Sara guides every step with warmth, clarity, and momentum."
					/>
					<motion.a
						className="btn btn--outline-light sia__watch"
						href="#book-demo"
						whileHover={{ scale: 1.02, borderColor: "rgba(240,237,230,0.45)" }}
						whileTap={{ scale: 0.99 }}
						transition={{ duration: 0.35, ease: easeOutPremium }}
					>
						<span className="sia__play" aria-hidden>
							▶
						</span>
						Watch Demo
					</motion.a>
				</motion.div>
				<div className="sia__chat" aria-label="Conversation preview">
					<AnimatePresence initial={false}>
						{phase >= 1 ? (
							<motion.div
								key="u1"
								className="sia__msg sia__msg--user"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: dur.md, ease: easeOutPremium }}
							>
								<div className="sia__bubble sia__bubble--user">{U1}</div>
								<span className="sia__time">2:14 PM</span>
							</motion.div>
						) : null}
						{phase === 2 ? (
							<motion.div
								key="typing1"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: dur.fast, ease: easeOutPremium }}
							>
								<TypingRow />
							</motion.div>
						) : null}
						{phase >= 3 ? (
							<motion.div
								key="s1"
								className="sia__msg sia__msg--sara"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: dur.md, ease: easeOutPremium }}
							>
								<div className="sia__sara-label">Sara</div>
								<div className="sia__bubble sia__bubble--sara">{S1}</div>
								<span className="sia__time">2:14 PM</span>
							</motion.div>
						) : null}
						{phase >= 4 ? (
							<motion.div
								key="u2"
								className="sia__msg sia__msg--user"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: dur.md, ease: easeOutPremium }}
							>
								<div className="sia__bubble sia__bubble--user">{U2}</div>
								<span className="sia__time">2:15 PM</span>
							</motion.div>
						) : null}
						{phase === 5 ? (
							<motion.div
								key="typing2"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: dur.fast, ease: easeOutPremium }}
							>
								<TypingRow />
							</motion.div>
						) : null}
						{phase >= 6 ? (
							<motion.div
								key="s2"
								className="sia__msg sia__msg--sara"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: dur.md, ease: easeOutPremium }}
							>
								<div className="sia__sara-label">Sara</div>
								<div className="sia__bubble sia__bubble--sara">{S2}</div>
								<span className="sia__time">2:15 PM</span>
							</motion.div>
						) : null}
						{phase >= 7 ? (
							<motion.div
								key="u3"
								className="sia__msg sia__msg--user"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: dur.md, ease: easeOutPremium }}
							>
								<div className="sia__bubble sia__bubble--user">{U3}</div>
								<span className="sia__time">2:16 PM</span>
							</motion.div>
						) : null}
						{phase === 8 ? (
							<motion.div
								key="typing3"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: dur.fast, ease: easeOutPremium }}
							>
								<TypingRow />
							</motion.div>
						) : null}
						{phase >= 9 ? (
							<motion.div
								key="s3"
								className="sia__msg sia__msg--sara"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: dur.md, ease: easeOutPremium }}
							>
								<div className="sia__sara-label">Sara</div>
								<div className="sia__bubble sia__bubble--sara">{S3}</div>
								<span className="sia__time">2:16 PM</span>
							</motion.div>
						) : null}
						{phase >= 10 ? (
							<motion.div
								key="u4"
								className="sia__msg sia__msg--user"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: dur.md, ease: easeOutPremium }}
							>
								<div className="sia__bubble sia__bubble--user">{U4}</div>
								<span className="sia__time">2:17 PM</span>
							</motion.div>
						) : null}
						{phase === 11 ? (
							<motion.div
								key="typing4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: dur.fast, ease: easeOutPremium }}
							>
								<TypingRow />
							</motion.div>
						) : null}
						{phase >= 12 ? (
							<motion.div
								key="s4"
								className="sia__msg sia__msg--sara"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: dur.md, ease: easeOutPremium }}
							>
								<div className="sia__sara-label">Sara</div>
								<div className="sia__bubble sia__bubble--sara">{S4}</div>
								<span className="sia__time">2:17 PM</span>
							</motion.div>
						) : null}
					</AnimatePresence>
					<div className="sia__badges" aria-live="polite">
						<AnimatePresence>
							{phase >= 13 ? (
								<motion.span
									key="b1"
									className="sia__badge"
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: dur.md, ease: easeOutPremium }}
								>
									Qualified lead
								</motion.span>
							) : null}
							{phase >= 14 ? (
								<motion.span
									key="b2"
									className="sia__badge"
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: dur.md, ease: easeOutPremium }}
								>
									Demo booked
								</motion.span>
							) : null}
							{phase >= 15 ? (
								<motion.span
									key="b3"
									className="sia__badge"
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: dur.md, ease: easeOutPremium }}
								>
									Follow-up sent
								</motion.span>
							) : null}
						</AnimatePresence>
					</div>
				</div>
				<aside className="sia__tags" aria-label="Workflow stages">
					{TAGS.map((t, i) => (
						<motion.span
							key={t}
							className={`sia__tag${i === activeTagIdx ? " sia__tag--active" : ""}`}
							initial={{ opacity: 0, x: 6 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: dur.md, ease: easeOutPremium, delay: i * 0.05 }}
						>
							{t}
						</motion.span>
					))}
				</aside>
			</div>
		</section>
	);
}
