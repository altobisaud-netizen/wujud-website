import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { easeOutPremium } from "../motion/tokens";

type CountUpNumberProps = {
	/** Final numeric value shown (rounded). */
	end: number;
	/** Text before the animated digits (e.g. "+"). */
	prefix?: string;
	/** Text after the animated digits (e.g. "%" or "x Faster"). */
	suffix: string;
	/** First run duration when entering view (s). */
	duration?: number;
	/** When true, counting runs; typically tied to `useInView` on the card. */
	active: boolean;
	/** Increment on hover to replay the count from zero. */
	replayKey: number;
};

const DEFAULT_DURATION = 1.05;
const REPLAY_DURATION = 0.85;

export function CountUpNumber({
	end,
	prefix = "",
	suffix,
	duration = DEFAULT_DURATION,
	active,
	replayKey,
}: CountUpNumberProps) {
	const reduce = useReducedMotion();
	const [animatedVal, setAnimatedVal] = useState(0);
	const displayVal = reduce && active ? end : animatedVal;

	useEffect(() => {
		if (!active || reduce) return;
		const dur = replayKey === 0 ? duration : REPLAY_DURATION;
		const ctrl = animate(0, end, {
			duration: dur,
			ease: easeOutPremium,
			onUpdate: (v) => setAnimatedVal(Math.round(v)),
		});
		return () => ctrl.stop();
	}, [active, end, replayKey, duration, reduce]);

	return (
		<span className="outcome-card__value-inner" aria-hidden>
			{prefix ? <span className="outcome-card__value-prefix">{prefix}</span> : null}
			<span className="outcome-card__value-num">{displayVal}</span>
			<span className="outcome-card__value-suffix">{suffix}</span>
		</span>
	);
}
