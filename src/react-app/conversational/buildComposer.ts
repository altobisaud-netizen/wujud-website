import type { BuildStep } from "./types";

/** True while structured Build questions hide the global dock composer. */
export function shouldHideBuildDockComposer(step: BuildStep): boolean {
	return step !== "summary";
}
