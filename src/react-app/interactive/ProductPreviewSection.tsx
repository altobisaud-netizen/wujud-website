import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { dur, easeOutPremium } from "../motion/tokens";
import { DASHBOARD_TABS } from "./demoData";

type TabId = keyof typeof DASHBOARD_TABS;

export function ProductPreviewSection() {
	const reduce = useReducedMotion();
	const [tab, setTab] = useState<TabId>("conversations");
	const active = DASHBOARD_TABS[tab];

	return (
		<section className="ihp-section ihp-section--soft" id="product" aria-labelledby="product-preview-title">
			<div className="container">
				<p className="ihp-kicker">Interactive product preview</p>
				<h2 id="product-preview-title" className="ihp-section__title">
					A calm view of conversations and progress
				</h2>
				<p className="ihp-section__lead">
					Explore a demonstration dashboard with fake sample data only. No production systems are called.
				</p>

				<div className="ihp-tabs" role="tablist" aria-label="Product preview tabs">
					{(Object.keys(DASHBOARD_TABS) as TabId[]).map((id) => (
						<button
							key={id}
							type="button"
							role="tab"
							id={`dash-tab-${id}`}
							aria-selected={tab === id}
							aria-controls={`dash-panel-${id}`}
							className={`ihp-tab${tab === id ? " ihp-tab--on" : ""}`}
							onClick={() => setTab(id)}
						>
							{DASHBOARD_TABS[id].label}
						</button>
					))}
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={tab}
						className="ihp-panel ihp-dash"
						role="tabpanel"
						id={`dash-panel-${tab}`}
						aria-labelledby={`dash-tab-${tab}`}
						initial={reduce ? false : { opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: dur.md, ease: easeOutPremium }}
					>
						<ul className="ihp-dash__list">
							{active.rows.map((row) => (
								<li key={row.title}>
									<strong>{row.title}</strong>
									<span>{row.meta}</span>
								</li>
							))}
						</ul>
						<p className="ihp-note">Interactive product demonstration — sample data only.</p>
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
}
