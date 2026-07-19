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

	it.each([
		["Can you tell me what medication to take?", "qualified healthcare professional"],
		["Can you diagnose what is wrong?", "qualified healthcare professional"],
		["Give me an extreme diet.", "small, balanced wellness action"],
		["I want to exercise for several hours every day.", "excessive exercise"],
		["I feel unwell and need urgent help.", "local emergency services"],
	])("keeps unsafe English request outside discovery: %s", (message, expected) => {
		const next = submitFreeText(createDiscoveryState("en"), message, "en");
		expect(next.stage).toBe("goal");
		expect(next.answers).toEqual({});
		expect(next.messages[next.messages.length - 1]?.text).toContain(expected);
		expect(next.messages[next.messages.length - 1]?.text).not.toMatch(/take \d|dose|treatment plan/i);
	});

	it.each([
		["ما الدواء الذي يجب أن أتناوله؟", "مختص صحي مؤهل"],
		["هل يمكنك تشخيص ما بي؟", "مختص صحي مؤهل"],
		["أعطني حمية قاسية", "خطوة عافية صغيرة ومتوازنة"],
		["أريد أن أتمرن لساعات كل يوم", "التمارين المفرطة"],
		["أشعر بتوعك وأحتاج مساعدة عاجلة", "خدمات الطوارئ المحلية"],
	])("keeps unsafe Arabic request outside discovery: %s", (message, expected) => {
		const next = submitFreeText(createDiscoveryState("ar"), message, "ar");
		expect(next.stage).toBe("goal");
		expect(next.answers).toEqual({});
		expect(next.messages[next.messages.length - 1]?.text).toContain(expected);
	});

	it.each([
		"I feel tired most days.",
		"I cannot sleep well.",
		"I missed three days.",
		"أشعر بالتعب معظم الأيام.",
		"لا أنام جيداً.",
		"فاتتني ثلاثة أيام.",
	])("continues ordinary discovery safely for normal wellness text: %s", (message) => {
		const locale = /[\u0600-\u06ff]/.test(message) ? "ar" : "en";
		const next = submitFreeText(createDiscoveryState(locale), message, locale);
		expect(next.stage).toBe("routine");
		expect(next.answers.goal).toMatch(/^free-/);
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
