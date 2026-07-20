import { describe, expect, it } from "vitest";
import {
	buildPersonalizedPlan,
	buildPersonalizedPreview,
	createDiscoveryState,
	selectDiscoveryAnswer,
	submitFreeText,
	undoLastChoice,
} from "./conversation";
import { heroVisual, outcomeVisuals } from "./lifestyleImagery";

describe("frontend-only wellness conversion discovery", () => {
	it("opens with SARA's wellness question", () => {
		const state = createDiscoveryState("en");
		expect(state.stage).toBe("goal");
		expect(state.messages).toHaveLength(1);
		expect(state.messages[0]?.text).toContain("What would you most like to improve");
	});

	it("moves deterministically through the conversion stages", () => {
		let state = createDiscoveryState("en");
		state = selectDiscoveryAnswer(state, "energy", "My energy", "en");
		expect(state.stage).toBe("challenge");
		expect(state.messages[state.messages.length - 1]?.text).toContain("energy");
		state = selectDiscoveryAnswer(state, "sleep", "Irregular sleep", "en");
		expect(state.stage).toBe("planFit");
		expect(state.messages[state.messages.length - 1]?.text).toContain("small steps");
		state = selectDiscoveryAnswer(state, "fit", "This plan fits me", "en");
		expect(state.stage).toBe("journeyAsk");
		state = selectDiscoveryAnswer(state, "showJourney", "Yes, show my journey", "en");
		expect(state.stage).toBe("preview");
		expect(state.answers).toEqual({
			goal: "energy",
			challenge: "sleep",
			planFit: "fit",
			journeyAsk: "showJourney",
		});
	});

	it("allows editing the plan and undoing the last choice", () => {
		let state = createDiscoveryState("en");
		state = selectDiscoveryAnswer(state, "energy", "My energy", "en");
		state = selectDiscoveryAnswer(state, "sleep", "Irregular sleep", "en");
		state = selectDiscoveryAnswer(state, "edit", "I want to adjust it", "en");
		expect(state.stage).toBe("challenge");
		expect(state.answers.challenge).toBeUndefined();
		const undone = undoLastChoice(state);
		expect(undone.stage).toBe("planFit");
	});

	it("normalizes typed answers and never advances from an empty answer", () => {
		const initial = createDiscoveryState("en");
		expect(submitFreeText(initial, "   ", "en")).toBe(initial);
		const next = submitFreeText(initial, "  Better   energy cafe\u0301  ", "en");
		expect(next.stage).toBe("challenge");
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
		expect(next.stage).toBe("challenge");
		expect(next.answers.goal).toMatch(/^free-/);
	});

	it("builds a personalized preview without guaranteed claims", () => {
		const preview = buildPersonalizedPreview({ goal: "energy", challenge: "sleep" }, "en");
		expect(preview.goalLabel).toBe("Better energy");
		expect(preview.startingFocus).toMatch(/sleep|movement/i);
		expect(preview.actions.length).toBeGreaterThan(2);
		expect(buildPersonalizedPlan({ goal: "energy", challenge: "sleep" }, "en").join(" ")).not.toMatch(
			/extreme|guarantee|punish/i,
		);
	});

	it("supports a complete Arabic RTL conversion sequence", () => {
		let state = createDiscoveryState("ar");
		expect(state.messages[0]?.text).toMatch(/ما أكثر شيء ترغب في تحسينه/);
		state = selectDiscoveryAnswer(state, "energy", "طاقتي", "ar");
		state = selectDiscoveryAnswer(state, "sleep", "نوم غير منتظم", "ar");
		state = selectDiscoveryAnswer(state, "fit", "هذه الخطة تناسبني", "ar");
		state = selectDiscoveryAnswer(state, "showJourney", "نعم، اعرض رحلتي", "ar");
		expect(state.stage).toBe("preview");
		expect(buildPersonalizedPreview(state.answers, "ar").goalLabel).toMatch(/طاقة/);
	});

	it("represents men and women in lifestyle imagery alt text", () => {
		const alts = [heroVisual, ...outcomeVisuals].map((item) => item.alt.en).join(" ");
		expect(alts).toMatch(/Arab woman|woman/i);
		expect(alts).toMatch(/Arab man/i);
		expect(alts).toMatch(/hijab/i);
		expect(outcomeVisuals.some((item) => item.genderFocus === "men")).toBe(true);
		expect(outcomeVisuals.some((item) => item.genderFocus === "women")).toBe(true);
	});
});
