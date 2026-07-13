import type { ConvMode } from "./types";

/**
 * Whether leaving `current` for `next` needs confirmation.
 * Active Build / Try progress prompts before switching away.
 */
export function needsModeSwitchConfirm(
	current: ConvMode,
	next: ConvMode,
	opts?: { force?: boolean },
): boolean {
	if (opts?.force) return false;
	if (current === "idle" || current === next) return false;
	return current === "BUILD_AGENT" || current === "TRY_DEMO";
}
