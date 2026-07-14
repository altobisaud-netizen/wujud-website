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

/** Arabic script present in the raw query (content language cue). */
export function hasArabicScript(raw: string): boolean {
	return /[\u0600-\u06FF]/.test(raw);
}

/**
 * Clear intent to build/create the visitor's own SARA.
 * Generic "setup", "create", or "business" product questions must NOT match.
 */
export function isClearBuildIntent(raw: string): boolean {
	const text = raw.trim().toLowerCase();
	if (!text) return false;

	if (
		/\b(build(\s+my)?\s+sara|create\s+(a\s+)?(sales\s+)?agent|set\s*up\s+my\s+own(\s+agent)?|i\s+want\s+to\s+(build|create|set\s*up)\s+(my\s+)?(own\s+)?(sara|agent)|create\s+a\s+sales\s+agent\s+for\s+my\s+company)\b/.test(
			text,
		)
	) {
		return true;
	}

	if (/ابني\s*سارة|أريد\s+إنشاء\s+موظف\s+مبيعات|ابني\s+سارة\s+لنشاطي|إنشاء\s+موظف\s+مبيعات/.test(raw)) {
		return true;
	}

	// Direct build verbs with sara/agent ownership cues
	if (
		/\b(build|create)\b/.test(text) &&
		/\b(my|own|sara|agent)\b/.test(text) &&
		!/\b(how|what|long|take|need|difficult|information|secure|security)\b/.test(text)
	) {
		return true;
	}

	if (/ابني|أنشئ|انشئ/.test(raw) && /سارة|موظف|نشاط/.test(raw)) {
		return true;
	}

	return false;
}

/**
 * Keyword routing for free text.
 * Precedence: pricing → security/privacy → product/how → book → account → try → build → clarify.
 */
export function routeFreeText(raw: string): ConvMode {
	const text = raw.trim().toLowerCase();
	if (!text) return "CLARIFY";

	// 1. Pricing
	if (
		/\b(price|pricing|cost|plan|plans|subscription|\$299|\$799)\b/.test(text) ||
		/سعر|أسعار|اسعار|تسعير|باقة|خطة|اشتراك/.test(text)
	) {
		return "PRICING";
	}

	// 2. Security / privacy (maps to PRODUCT_QUESTION content)
	if (
		/\b(secur(e|ity)|privacy|private|encrypt|gdpr|data\s+protection|safe(\s+with\s+(my|our)\s+data)?|information\s+secure|data\s+secure)\b/.test(
			text,
		) ||
		/أمان|آمن|امان|خصوصية|بياناتي|معلوماتي\s*آمن|هل\s+معلوماتي/.test(text)
	) {
		return "PRODUCT_QUESTION";
	}

	// 3. Product / how it works / setup duration / escalation (before Build)
	if (
		!isClearBuildIntent(raw) &&
		(/\b(how\s+(long|does|do|to)|faq|whatsapp|instagram|channel|capa[bc]|what\s+(is|information)|wujud|implementation|setup\s+(take|time|duration|difficult|hard)|how\s+long\b.*\b(setup|set\s*up)|is\s+setup|does\s+setup|need\s+to\s+create|information\s+do\s+i\s+need|escalat|human\s+assist|cannot\s+answer|can't\s+answer|when\s+sara\s+cannot)\b/.test(
			text,
		) ||
			/\b(set\s*up|setup)\b/.test(text) ||
			/كيف|ماذا|سؤال|واتساب|إعداد|الاعداد|الإعداد|تستغرق|صعب|تصعيد|مساعدة\s+بشري/.test(text))
	) {
		return "PRODUCT_QUESTION";
	}

	// 4. Book demo / contact
	if (
		/\b(meeting|call|contact|book\s+a\s+demo|book\s+demo|schedule)\b/.test(text) ||
		/حجز|موعد|اتصال|تواصل/.test(text)
	) {
		return "BOOK_DEMO";
	}

	// 5. Account / sign-in
	if (
		/\b(login|log\s*in|account|sign\s*in|signin|sign\s*up|signup)\b/.test(text) ||
		/حساب|تسجيل\s*دخول|دخول/.test(text)
	) {
		return "ACCOUNT_HELP";
	}

	// 6. Try / demo
	if (
		/\b(demo|try\s+sara|try\s+me|example|sample|preview)\b/.test(text) ||
		/تجرب|جرب|ديمو|عرض\s*تجريب/.test(text)
	) {
		return "TRY_DEMO";
	}

	// 7. Build — clear intent only
	if (isClearBuildIntent(raw)) {
		return "BUILD_AGENT";
	}

	// 8. Clarify
	return "CLARIFY";
}
