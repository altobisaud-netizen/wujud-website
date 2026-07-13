import { describe, expect, it } from "vitest";
import { needsModeSwitchConfirm } from "./modeSwitch";

describe("needsModeSwitchConfirm", () => {
	it("requires confirmation when leaving Build or Try", () => {
		expect(needsModeSwitchConfirm("BUILD_AGENT", "PRICING")).toBe(true);
		expect(needsModeSwitchConfirm("TRY_DEMO", "BUILD_AGENT")).toBe(true);
		expect(needsModeSwitchConfirm("BUILD_AGENT", "TRY_DEMO")).toBe(true);
	});

	it("skips confirmation for idle, same mode, or force", () => {
		expect(needsModeSwitchConfirm("idle", "PRICING")).toBe(false);
		expect(needsModeSwitchConfirm("BUILD_AGENT", "BUILD_AGENT")).toBe(false);
		expect(needsModeSwitchConfirm("PRICING", "PRODUCT_QUESTION")).toBe(false);
		expect(needsModeSwitchConfirm("BUILD_AGENT", "PRICING", { force: true })).toBe(false);
	});
});
