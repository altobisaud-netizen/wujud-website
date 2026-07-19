import { isWellnessPreviewRuntime } from "./useWellnessMetadata";

export function shouldEnableReviewMode(
	location: Location = window.location,
	development = import.meta.env.DEV,
): boolean {
	const requested = new URLSearchParams(location.search).get("review") === "1";
	return isWellnessPreviewRuntime(location, development) && requested;
}
