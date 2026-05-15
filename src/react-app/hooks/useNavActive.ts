import { useEffect, useState } from "react";
import { TOP_NAV } from "../topNav";

const IDS = TOP_NAV.map((i) => i.href.replace("#", ""));

export function useNavActive() {
	const [active, setActive] = useState<string>("");

	useEffect(() => {
		const els = IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
		if (!els.length) return;

		const obs = new IntersectionObserver(
			(entries) => {
				const hit = entries
					.filter((e) => e.isIntersecting && e.intersectionRatio >= 0.15)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (hit?.target?.id) setActive(`#${hit.target.id}`);
			},
			{ rootMargin: "-18% 0px -45% 0px", threshold: [0.12, 0.2, 0.35, 0.5] },
		);

		for (const el of els) obs.observe(el);
		return () => obs.disconnect();
	}, []);

	return active;
}
