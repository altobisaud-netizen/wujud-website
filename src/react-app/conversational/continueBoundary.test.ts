import { describe, expect, it } from "vitest";
import { continueAfterBuildSummary } from "./continueBoundary";

describe("continueAfterBuildSummary boundary", () => {
	it("routes locally to /build-sara without claiming handoff", () => {
		expect(continueAfterBuildSummary()).toEqual({
			kind: "local_route",
			path: "/build-sara",
		});
		expect(continueAfterBuildSummary({ preferSecureHandoff: true })).toEqual({
			kind: "local_route",
			path: "/build-sara",
		});
	});
});
