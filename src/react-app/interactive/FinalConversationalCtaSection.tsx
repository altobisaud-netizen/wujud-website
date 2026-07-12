import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IconArrowRight } from "../components/IconArrowRight";
import { REF_IMG } from "../assetsRef";
import { dur, easeOutPremium } from "../motion/tokens";
import { continueToBuildSara, hydrateHeroFromDraft } from "./heroDraft";

export function FinalConversationalCtaSection() {
	const reduce = useReducedMotion();
	const [businessName, setBusinessName] = useState(() => hydrateHeroFromDraft().businessName);

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!businessName.trim()) return;
		continueToBuildSara({ businessName });
	}

	return (
		<section className="ihp-section ihp-section--soft" id="build-cta" aria-labelledby="final-cta-title">
			<div className="container">
				<motion.div
					className="ihp-panel ihp-final"
					initial={reduce ? false : { opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.35 }}
					transition={{ duration: dur.slow, ease: easeOutPremium }}
				>
					<img
						src={REF_IMG.sara}
						alt=""
						width={72}
						height={96}
						className="ihp-final__portrait"
						loading="lazy"
						decoding="async"
					/>
					<div className="ihp-final__copy">
						<p className="ihp-kicker">Build My SARA</p>
						<h2 id="final-cta-title">Ready to build your sales employee?</h2>
						<p>Tell SARA your business name and continue into the guided setup flow.</p>
						<form className="ihp-final__form" onSubmit={onSubmit}>
							<label className="ihp-field">
								<span>Business name</span>
								<input
									value={businessName}
									onChange={(e) => setBusinessName(e.target.value)}
									placeholder="Your business name"
									autoComplete="organization"
									required
								/>
							</label>
							<button type="submit" className="ihp-btn ihp-btn--primary">
								Build My SARA
								<IconArrowRight className="ihp-btn__icon" />
							</button>
						</form>
						<p className="ihp-note">No account required to start. No organization is created from this page.</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
