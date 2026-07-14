import {
	WUJUD_PRODUCT_CATALOG,
	type ChannelAvailabilityStatus,
	type WujudProductCatalog,
} from "./wujudProductCatalog";

const ALLOWED_STATUS = new Set<ChannelAvailabilityStatus>([
	"available",
	"setup_required",
	"planned",
	"demo_only",
]);

export type CatalogValidationResult = {
	ok: boolean;
	errors: string[];
};

function requireLocalized(
	label: string,
	value: { en?: string; ar?: string } | undefined,
	errors: string[],
) {
	if (!value?.en?.trim()) errors.push(`${label}.en missing`);
	if (!value?.ar?.trim()) errors.push(`${label}.ar missing`);
}

export function validateProductCatalog(
	catalog: WujudProductCatalog = WUJUD_PRODUCT_CATALOG,
): CatalogValidationResult {
	const errors: string[] = [];
	const planIds = new Set<string>();
	const faqIds = new Set<string>();
	const capabilityIds = new Set<string>();

	if (catalog.version !== 1) errors.push("version must be 1");

	for (const plan of catalog.plans) {
		if (planIds.has(plan.id)) errors.push(`duplicate plan id: ${plan.id}`);
		planIds.add(plan.id);
		requireLocalized(`plan.${plan.id}.name`, plan.name, errors);
		requireLocalized(`plan.${plan.id}.tagline`, plan.tagline, errors);
		requireLocalized(`plan.${plan.id}.priceMonthlyDisplay`, plan.priceMonthlyDisplay, errors);
		requireLocalized(`plan.${plan.id}.priceYearlyDisplay`, plan.priceYearlyDisplay, errors);
		requireLocalized(`plan.${plan.id}.cta`, plan.cta, errors);
		if (!plan.ctaHref?.startsWith("/")) errors.push(`plan.${plan.id}.ctaHref invalid`);
		for (const [i, f] of plan.features.entries()) {
			requireLocalized(`plan.${plan.id}.features[${i}]`, f, errors);
		}
	}

	if (!planIds.has("starter") || !planIds.has("growth") || !planIds.has("scale")) {
		errors.push("expected starter, growth, and scale plans");
	}

	const starter = catalog.plans.find((p) => p.id === "starter");
	const growth = catalog.plans.find((p) => p.id === "growth");
	if (starter?.priceMonthlyUsd !== 299) errors.push("starter monthly price must remain 299");
	if (growth?.priceMonthlyUsd !== 799) errors.push("growth monthly price must remain 799");

	for (const cap of catalog.capabilities) {
		if (capabilityIds.has(cap.id)) errors.push(`duplicate capability id: ${cap.id}`);
		capabilityIds.add(cap.id);
		requireLocalized(`capability.${cap.id}.title`, cap.title, errors);
		requireLocalized(`capability.${cap.id}.body`, cap.body, errors);
	}

	for (const ch of catalog.channels) {
		if (!ALLOWED_STATUS.has(ch.status)) {
			errors.push(`unsupported channel status: ${ch.id}=${ch.status}`);
		}
		requireLocalized(`channel.${ch.id}.label`, ch.label, errors);
		requireLocalized(`channel.${ch.id}.note`, ch.note, errors);
	}

	for (const faq of catalog.faqs) {
		if (faqIds.has(faq.id)) errors.push(`duplicate faq id: ${faq.id}`);
		faqIds.add(faq.id);
		requireLocalized(`faq.${faq.id}.question`, faq.question, errors);
		requireLocalized(`faq.${faq.id}.answer`, faq.answer, errors);
	}

	for (const step of catalog.setupGuidance) {
		requireLocalized(`setup.${step.id}.title`, step.title, errors);
		requireLocalized(`setup.${step.id}.body`, step.body, errors);
	}

	for (const s of catalog.security) {
		requireLocalized(`security.${s.id}.title`, s.title, errors);
		requireLocalized(`security.${s.id}.body`, s.body, errors);
	}

	for (const row of catalog.comparisons) {
		requireLocalized(`comparison.${row.id}.feature`, row.feature, errors);
		requireLocalized(`comparison.${row.id}.starter`, row.starter, errors);
		requireLocalized(`comparison.${row.id}.growth`, row.growth, errors);
		requireLocalized(`comparison.${row.id}.scale`, row.scale, errors);
	}

	for (const link of catalog.privacyLinks) {
		requireLocalized(`privacyLink.${link.id}.label`, link.label, errors);
		if (!link.href.startsWith("/")) errors.push(`privacyLink.${link.id}.href invalid`);
	}

	const paths = Object.values(catalog.canonicalPaths);
	for (const p of paths) {
		if (!p.startsWith("/")) errors.push(`canonical path invalid: ${p}`);
	}
	if (new Set(paths).size !== paths.length) errors.push("duplicate canonical paths");

	return { ok: errors.length === 0, errors };
}
