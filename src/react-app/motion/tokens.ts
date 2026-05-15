import type { Variants } from "framer-motion";

/** Premium SaaS motion — calm, slow, no bounce. */
export const easeOutPremium = [0.22, 1, 0.36, 1] as const;

export const dur = {
	fast: 0.5,
	md: 0.65,
	slow: 0.85,
	hero: 0.72,
} as const;

export const staggerContainer: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.09,
			delayChildren: 0.06,
		},
	},
};

export const staggerItem: Variants = {
	hidden: { opacity: 0, y: 22 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: dur.slow, ease: easeOutPremium },
	},
};

export const cardHover = {
	y: -5,
	scale: 1.01,
	transition: { duration: 0.45, ease: easeOutPremium },
};
