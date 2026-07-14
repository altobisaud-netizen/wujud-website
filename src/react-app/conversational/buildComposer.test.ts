import { describe, expect, it } from "vitest";
import { shouldHideBuildDockComposer } from "./buildComposer";

describe("Build dock composer visibility", () => {
	it("hides the global dock during structured Build steps", () => {
		expect(shouldHideBuildDockComposer("name")).toBe(true);
		expect(shouldHideBuildDockComposer("description")).toBe(true);
		expect(shouldHideBuildDockComposer("customers")).toBe(true);
		expect(shouldHideBuildDockComposer("channels")).toBe(true);
		expect(shouldHideBuildDockComposer("goals")).toBe(true);
	});

	it("shows the dock on Build summary", () => {
		expect(shouldHideBuildDockComposer("summary")).toBe(false);
	});
});
