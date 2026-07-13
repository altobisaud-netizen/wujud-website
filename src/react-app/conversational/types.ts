export type ConvMode =
	| "idle"
	| "BUILD_AGENT"
	| "TRY_DEMO"
	| "PRODUCT_QUESTION"
	| "PRICING"
	| "BOOK_DEMO"
	| "ACCOUNT_HELP"
	| "CLARIFY";

export type DemoSlug = "coffee" | "clinic" | "real-estate" | "retail";

export type ConvLocale = "en" | "ar";

export type QuickActionId =
	| "build"
	| "try"
	| "pricing"
	| "how"
	| "book";

export type BuildStep =
	| "name"
	| "description"
	| "customers"
	| "channels"
	| "goals"
	| "summary";

export type ChatRole = "sara" | "visitor" | "system";

export type BlockKind =
	| "text"
	| "choice"
	| "multi"
	| "field"
	| "summary"
	| "pricing"
	| "faq"
	| "capability"
	| "comparison"
	| "demo"
	| "account"
	| "book"
	| "links"
	| "clarify"
	| "error";

export type ChatBlock = {
	id: string;
	kind: BlockKind;
	role: ChatRole;
	text?: string;
	/** Completed reply eligible for aria-live. */
	announce?: boolean;
};
