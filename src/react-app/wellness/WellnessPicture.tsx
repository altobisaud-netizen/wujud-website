import type { WellnessLocale } from "./types";
import { altFor, type LifestyleVisual } from "./lifestyleImagery";

export function WellnessPicture({
	visual,
	locale,
	eager = false,
	className = "",
}: {
	visual: LifestyleVisual;
	locale: WellnessLocale;
	eager?: boolean;
	className?: string;
}) {
	return (
		<picture className={className}>
			<source srcSet={visual.src} type="image/webp" />
			<img
				src={visual.srcPng}
				alt={altFor(visual, locale)}
				width={visual.width}
				height={visual.height}
				loading={eager ? "eager" : "lazy"}
				decoding="async"
				fetchPriority={eager ? "high" : "auto"}
			/>
		</picture>
	);
}
