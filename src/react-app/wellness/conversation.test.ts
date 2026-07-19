import { describe, expect, it } from "vitest";
import {
	buildPersonalizedPlan,
	createDiscoveryState,
	selectDiscoveryAnswer,
	submitFreeText,
} from "./conversation";

describe("frontend-only wellness discovery", () => {
	it("opens with SARA's wellness question", () => {
		const state = createDiscoveryState("en");
		expect(state.stage).toBe("goal");
		expect(state.messages).toHaveLength(1);
		expect(state.messages[0]?.text).toContain("What would you most like to improve");
	});

	it("moves deterministically through every discovery stage", () => {
		let state = createDiscoveryState("en");
		state = selectDiscoveryAnswer(state, "energy", "Better energy", "en");
		expect(state.stage).toBe("routine");
		state = selectDiscoveryAnswer(state, "variable", "My days change a lot", "en");
		expect(state.stage).toBe("challenge");
		state = selectDiscoveryAnswer(state, "sleep", "Poor sleep", "en");
		expect(state.stage).toBe("supportTime");
		state = selectDiscoveryAnswer(state, "morning", "Morning", "en");
		expect(state.stage).toBe("coachingStyle");
		state = selectDiscoveryAnswer(state, "gentle", "Gentle encouragement", "en");
		expect(state.stage).toBe("preview");
		expect(state.answers).toEqual({
			goal: "energy",
			routine: "variable",
			challenge: "sleep",
			supportTime: "morning",
			coachingStyle: "gentle",
		});
		expect(state.messages[state.messages.length - 1]?.role).toBe("sara");
	});

	it("normalizes typed answers and never advances from an empty answer", () => {
		const initial = createDiscoveryState("en");
		expect(submitFreeText(initial, "   ", "en")).toBe(initial);
		const next = submitFreeText(initial, "  Better   energy cafe\u0301  ", "en");
		expect(next.stage).toBe("routine");
		expect(next.messages[1]?.text).toBe("Better energy café");
	});

	it("keeps urgent and medical requests outside ordinary discovery", () => {
		const initial = createDiscoveryState("en");
		const urgent = submitFreeText(initial, "I might hurt myself", "en");
		expect(urgent.stage).toBe("goal");
		expect(urgent.messages[urgent.messages.length - 1]?.text).toContain("local emergency services");

		const medical = submitFreeText(initial, "Can you diagnose me and recommend medication?", "en");
		expect(medical.stage).toBe("goal");
		expect(medical.messages[medical.messages.length - 1]?.text).toContain("qualified healthcare professional");

		const arabic = submitFreeText(initial, "أريد تشخيص ودواء", "ar");
		expect(arabic.stage).toBe("goal");
		expect(arabic.messages[arabic.messages.length - 1]?.text).toContain("مختص صحي مؤهل");
	});

	it("builds a personalized, gradual plan from selected answers", () => {
		const plan = buildPersonalizedPlan(
			{
				goal: "energy",
				challenge: "sitting",
				supportTime: "morning",
				coachingStyle: "practical",
			},
			"en",
		);
		expect(plan).toEqual([
			"A consistent morning energy check-in",
			"A flexible prompt for a short walk or stretch",
			"Morning support with short, practical coaching",
		]);
		expect(plan.join(" ")).not.toMatch(/extreme|guarantee|punish/i);
	});

	it("supports a complete Arabic RTL discovery sequence", () => {
		let state = createDiscoveryState("ar");
		expect(state.messages[0]?.text).toMatch(/ما أكثر شيء تود تحسينه/);
		state = selectDiscoveryAnswer(state, "sleep", "نوم أفضل", "ar");
		state = selectDiscoveryAnswer(state, "some", "لدي بعض العادات المفيدة", "ar");
		state = selectDiscoveryAnswer(state, "stress", "جدول مليء بالضغوط", "ar");
		state = selectDiscoveryAnswer(state, "evening", "المساء", "ar");
		state = selectDiscoveryAnswer(state, "balanced", "مزيج متوازن", "ar");
		expect(state.stage).toBe("preview");
		expect(buildPersonalizedPlan(state.answers, "ar").join(" ")).toMatch(/النوم|المساء/);
	});
});
