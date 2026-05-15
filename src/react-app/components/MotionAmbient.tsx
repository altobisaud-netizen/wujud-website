import { motion, useReducedMotion } from "framer-motion";
import { easeOutPremium } from "../motion/tokens";

/** Site-wide slow radial drift — very subtle, no neon. */
export function MotionAmbient() {
	const reduce = useReducedMotion();
	if (reduce) {
		return (
			<div className="motion-ambient motion-ambient--static" aria-hidden>
				<div className="motion-ambient__layer motion-ambient__layer--gold" />
				<div className="motion-ambient__layer motion-ambient__layer--graphite" />
			</div>
		);
	}

	return (
		<div className="motion-ambient" aria-hidden>
			<motion.div
				className="motion-ambient__layer motion-ambient__layer--gold"
				animate={{
					x: [0, 18, -12, 0],
					y: [0, -14, 10, 0],
					opacity: [0.22, 0.32, 0.2, 0.22],
				}}
				transition={{
					duration: 42,
					repeat: Infinity,
					ease: "linear",
				}}
			/>
			<motion.div
				className="motion-ambient__layer motion-ambient__layer--graphite"
				animate={{
					x: [0, -22, 14, 0],
					y: [0, 16, -8, 0],
					opacity: [0.12, 0.2, 0.14, 0.12],
				}}
				transition={{
					duration: 54,
					repeat: Infinity,
					ease: "linear",
				}}
			/>
			<motion.div
				className="motion-ambient__layer motion-ambient__layer--soft"
				animate={{ scale: [1, 1.06, 1], opacity: [0.06, 0.1, 0.06] }}
				transition={{ duration: 28, repeat: Infinity, ease: easeOutPremium }}
			/>
		</div>
	);
}
