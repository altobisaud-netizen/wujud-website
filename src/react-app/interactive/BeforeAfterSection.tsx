import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { dur, easeOutPremium } from "../motion/tokens";
import { AFTER_ITEMS, BEFORE_ITEMS } from "./demoData";

export function BeforeAfterSection() {
	const reduce = useReducedMotion();
	const [mode, setMode] = useState<"before" | "after">("before");
	const items = mode === "before" ? BEFORE_ITEMS : AFTER_ITEMS;

	return (
		<section className="ihp-section" id="before-after" aria-labelledby="before-after-title">
			<div className="container">
				<p className="ihp-kicker">Before and after</p>
				<h2 id="before-after-title" className="ihp-section__title">
					The difference a calm sales employee makes
				</h2>

				<div className="ihp-toggle" role="group" aria-label="Before or with SARA">
					<button
						type="button"
						className={`ihp-toggle__btn${mode === "before" ? " ihp-toggle__btn--on" : ""}`}
						aria-pressed={mode === "before"}
						onClick={() => setMode("before")}
					>
						Before SARA
					</button>
					<button
						type="button"
						className={`ihp-toggle__btn${mode === "after" ? " ihp-toggle__btn--on" : ""}`}
						aria-pressed={mode === "after"}
						onClick={() => setMode("after")}
					>
						With SARA
					</button>
				</div>

				<AnimatePresence mode="wait">
					<motion.ul
						key={mode}
						className="ihp-compare"
						initial={reduce ? false : { opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: dur.md, ease: easeOutPremium }}
					>
						{items.map((item) => (
							<li key={item} className={`ihp-compare__item ihp-compare__item--${mode}`}>
								{item}
							</li>
						))}
					</motion.ul>
				</AnimatePresence>
			</div>
		</section>
	);
}
