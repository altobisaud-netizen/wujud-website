import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { dur, easeOutPremium } from "../motion/tokens";

type RevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	y?: number;
	amount?: number | "some" | "all";
};

export function Reveal({ children, className, delay = 0, y = 20, amount = 0.2 }: RevealProps) {
	const reduce = useReducedMotion();
	const variants: Variants = {
		hidden: { opacity: 0, y },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: reduce ? 0 : dur.slow,
				ease: easeOutPremium,
				delay: reduce ? 0 : delay,
			},
		},
	};

	return (
		<motion.div
			className={className}
			variants={variants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
		>
			{children}
		</motion.div>
	);
}
