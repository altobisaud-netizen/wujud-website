import { motion, useReducedMotion } from "framer-motion";
import { IconArrowRight } from "../components/IconArrowRight";
import { REF_IMG } from "../assetsRef";
import { dur, easeOutPremium } from "../motion/tokens";

function IconClock() {
	return (
		<svg className="hero__feat-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
			<circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.2" />
			<path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
		</svg>
	);
}
function IconGlobe() {
	return (
		<svg className="hero__feat-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
			<circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" />
			<path
				d="M4 12h16M12 4c2.5 3 2.5 13 0 16M12 4c-2.5 3-2.5 13 0 16"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
function IconShield() {
	return (
		<svg className="hero__feat-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
			<path
				d="M12 4.5l7 3v5c0 4-3 7.5-7 8.5-4-1-7-4.5-7-8.5v-5l7-3z"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

const FEATS = [
	{ icon: <IconClock />, label: "24/7 Autonomous" },
	{ icon: <IconGlobe />, label: "Works in 100+ Languages" },
	{ icon: <IconShield />, label: "Secure & Compliant" },
] as const;

const heroEase = easeOutPremium;

export function HeroSection() {
	const reduce = useReducedMotion();

	return (
		<section className="hero" id="top" aria-labelledby="hero-title">
			<motion.div
				className="hero__bg hero__bg--ellipse"
				aria-hidden
				animate={
					reduce
						? {}
						: {
								opacity: [0.85, 1, 0.9, 0.85],
								scale: [1, 1.03, 1],
							}
				}
				transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				className="hero__glow-orb hero__glow-orb--a"
				aria-hidden
				animate={
					reduce
						? {}
						: {
								x: [0, 22, -14, 0],
								y: [0, -12, 8, 0],
								scale: [1, 1.05, 1],
							}
				}
				transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				className="hero__glow-orb hero__glow-orb--b"
				aria-hidden
				animate={
					reduce
						? {}
						: {
								x: [0, -18, 12, 0],
								y: [0, 14, -6, 0],
								scale: [1.04, 1, 1.04],
							}
				}
				transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
			/>
			<div className="hero__container container">
				<div className="hero__grid">
					<div className="hero__copy">
						<motion.p
							className="hero__eyebrow"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: dur.slow, ease: heroEase, delay: 0.08 }}
						>
							AI Employees for Modern Businesses
						</motion.p>
						<motion.h1
							id="hero-title"
							className="hero__title"
							initial={{ opacity: 0, y: 26 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: dur.hero, ease: heroEase, delay: 0.18 }}
						>
							Your AI Employee <br />
							Has <span className="text-gold">Arrived.</span>
						</motion.h1>
						<motion.p
							className="hero__subtitle"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: dur.slow, ease: heroEase, delay: 0.38 }}
						>
							Sara is your AI employee for sales and customer service. She talks. She understands. She
							gets results.
						</motion.p>
						<motion.div
							className="hero__actions"
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: dur.slow, ease: heroEase, delay: 0.52 }}
						>
							<motion.a
								className="btn btn--primary btn--lg"
								href="#contact"
								whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
								whileTap={{ scale: 0.99 }}
								transition={{ duration: 0.35, ease: heroEase }}
							>
								Meet Sara
								<IconArrowRight className="hero__btn-icon" />
							</motion.a>
							<motion.a
								className="btn btn--hero-secondary btn--lg"
								href="#contact"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.99 }}
								transition={{ duration: 0.35, ease: heroEase }}
							>
								Book a Demo
								<IconArrowRight className="hero__btn-icon" />
							</motion.a>
						</motion.div>
						<motion.div
							className="hero__feats"
							role="list"
							initial="hidden"
							animate="visible"
							variants={{
								visible: {
									transition: { staggerChildren: 0.1, delayChildren: 0.62 },
								},
							}}
						>
							{FEATS.map((f) => (
								<motion.div
									key={f.label}
									className="hero__feat"
									role="listitem"
									variants={{
										hidden: { opacity: 0, y: 10 },
										visible: {
											opacity: 1,
											y: 0,
											transition: { duration: dur.md, ease: heroEase },
										},
									}}
								>
									{f.icon}
									<span>{f.label}</span>
								</motion.div>
							))}
						</motion.div>
					</div>
					<motion.div
						className="hero__visual"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: dur.slow, ease: heroEase, delay: 0.28 }}
					>
						<motion.div
							className="hero__portrait-wrap"
							animate={
								reduce
									? {}
									: {
											y: [0, -6, 0],
										}
							}
							transition={{
								duration: 14,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<div className="hero__portrait-glow" aria-hidden />
							<div className="hero__portrait-frame">
								<div className="hero__portrait-media">
									<img
										className="hero__portrait"
										src={REF_IMG.sara}
										alt="Sara - AI Sales &amp; Customer Service"
										width={400}
										height={533}
										loading="eager"
										decoding="async"
									/>
								</div>
								<motion.div
									className="hero__portrait-bar"
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: dur.slow, ease: heroEase, delay: 0.75 }}
								>
									<div className="hero__portrait-bar-inner">
										<p className="hero__portrait-pill-name">Sara</p>
										<p className="hero__portrait-pill-role">
											Sales <span className="hero__amp">&amp;</span> Customer Service Intelligence
										</p>
									</div>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
