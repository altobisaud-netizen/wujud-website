import type { ConvMode, QuickActionId } from "./types";

/** Deterministic v1 intent routing — no LLM. */
export function routeQuickAction(id: QuickActionId): ConvMode {
	switch (id) {
		case "build":
			return "BUILD_AGENT";
		case "try":
			return "TRY_DEMO";
		case "pricing":
			return "PRICING";
		case "how":
			return "PRODUCT_QUESTION";
		case "book":
			return "BOOK_DEMO";
	}
}

/**
 * Keyword routing for free text. Order matters: pricing before product-help,
 * account before generic how, etc. Empty / unmatched → CLARIFY.
 */
export function routeFreeText(raw: string): ConvMode {
	const text = raw.trim().toLowerCase();
	if (!text) return "CLARIFY";

	// Pricing (EN + AR)
	if (
		/\b(price|pricing|cost|plan|plans|subscription|\$299|\$799)\b/.test(text) ||
		/سعر|أسعار|اسعار|تسعير|باقة|خطة|اشتراك/.test(text)
	) {
		return "PRICING";
	}

	// Try / demo
	if (
		/\b(demo|try|example|sample|preview)\b/.test(text) ||
		/تجرب|جرب|ديمو|عرض\s*تجريب/.test(text)
	) {
		return "TRY_DEMO";
	}

	// Build / create agent
	if (
		/\b(build|create|business|agent|onboard|set\s*up|setup)\b/.test(text) ||
		/ابني|أنشئ|انشئ|إنشاء|اعمال|أعمال|نشاطي|بناء/.test(text)
	) {
		return "BUILD_AGENT";
	}

	// Book demo / contact
	if (
		/\b(meeting|call|contact|book)\b/.test(text) ||
		/حجز|موعد|اتصال|تواصل/.test(text)
	) {
		return "BOOK_DEMO";
	}

	// Account / sign-in
	if (
		/\b(login|log\s*in|account|sign\s*in|signin|sign\s*up|signup)\b/.test(text) ||
		/حساب|تسجيل|دخول/.test(text)
	) {
		return "ACCOUNT_HELP";
	}

	// Product / FAQ / how it works
	if (
		/\b(how|faq|security|privacy|whatsapp|instagram|channel|capa[bc]|what\s+is|sara|wujud)\b/.test(
			text,
		) ||
		/كيف|أمان|خصوصية|واتساب|ماذا|سؤال/.test(text)
	) {
		return "PRODUCT_QUESTION";
	}

	return "CLARIFY";
}
