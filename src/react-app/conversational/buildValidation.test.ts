import { describe, expect, it } from "vitest";
import { createEmptyDraft } from "../onboarding/types";
import {
	hasUsefulBuildProfile,
	inferBuildStep,
	mergeDraftFields,
	validateBusinessDescription,
	validateBusinessName,
	validateChannels,
	validateCustomers,
	validateGoals,
} from "./buildValidation";

describe("build field validation", () => {
	it("validates business name bounds", () => {
		expect(validateBusinessName("A")).toBe(false);
		expect(validateBusinessName("AB")).toBe(true);
		expect(validateBusinessName("x".repeat(81))).toBe(false);
	});

	it("validates description bounds", () => {
		expect(validateBusinessDescription("too short")).toBe(false);
		expect(validateBusinessDescription("A proper clinic description")).toBe(true);
	});

	it("validates customers, channels, and goals enums", () => {
		expect(validateCustomers([], "")).toBe(false);
		expect(validateCustomers(["individuals"], "")).toBe(true);
		expect(validateCustomers(["other"], "")).toBe(false);
		expect(validateCustomers(["other"], "walk-ins")).toBe(true);
		expect(validateCustomers(["nope"], "")).toBe(false);
		expect(validateChannels(["whatsapp"])).toBe(true);
		expect(validateChannels([])).toBe(false);
		expect(validateGoals(["answer"])).toBe(true);
		expect(validateGoals(["nope"])).toBe(false);
	});
});

describe("draft merge and profile", () => {
	it("preserves unrelated draft fields when patching", () => {
		const current = {
			...createEmptyDraft(),
			businessName: "Oasis",
			businessDescription: "Family clinic helping patients book visits.",
			targetCustomers: ["individuals"],
			channels: ["whatsapp"],
			goals: ["answer"],
			otherCustomerText: "keep-me",
		};
		const merged = mergeDraftFields(current, { businessName: "Oasis Dental" });
		expect(merged.businessName).toBe("Oasis Dental");
		expect(merged.businessDescription).toBe(current.businessDescription);
		expect(merged.targetCustomers).toEqual(["individuals"]);
		expect(merged.channels).toEqual(["whatsapp"]);
		expect(merged.goals).toEqual(["answer"]);
		expect(merged.otherCustomerText).toBe("keep-me");
	});

	it("requires name, description, customers, and channels for useful profile", () => {
		const d = {
			...createEmptyDraft(),
			businessName: "Clinic",
			businessDescription: "Family clinic helping patients book visits.",
			targetCustomers: ["individuals"],
			channels: ["whatsapp"],
		};
		expect(hasUsefulBuildProfile(d)).toBe(true);
		expect(hasUsefulBuildProfile(createEmptyDraft())).toBe(false);
	});

	it("infers build step from draft contents", () => {
		expect(inferBuildStep(createEmptyDraft())).toBe("name");
		expect(
			inferBuildStep({
				...createEmptyDraft(),
				businessName: "Clinic",
			}),
		).toBe("description");
		expect(
			inferBuildStep({
				...createEmptyDraft(),
				businessName: "Clinic",
				businessDescription: "Family clinic helping patients book visits.",
				targetCustomers: ["individuals"],
				channels: ["whatsapp"],
				goals: ["answer"],
				step: "review",
			}),
		).toBe("summary");
	});
});
