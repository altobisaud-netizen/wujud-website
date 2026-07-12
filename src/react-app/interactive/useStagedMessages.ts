import { useEffect, useState } from "react";

/** Simple staged message reveal for demo conversations. Honors reduced motion. */
export function useStagedMessages(count: number, activeKey: string, reduceMotion: boolean | null) {
	const [visible, setVisible] = useState(reduceMotion ? count : 0);

	useEffect(() => {
		if (reduceMotion) {
			setVisible(count);
			return;
		}
		setVisible(0);
		const timers: number[] = [];
		for (let i = 1; i <= count; i++) {
			timers.push(window.setTimeout(() => setVisible(i), i * 420));
		}
		return () => timers.forEach((id) => window.clearTimeout(id));
	}, [activeKey, count, reduceMotion]);

	return visible;
}
