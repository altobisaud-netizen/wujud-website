/** Top navigation — matches https://wujud.onhercules.app/ (navbar.tsx). */
export type TopNavItem = { label: string; href: string };

export const TOP_NAV: readonly TopNavItem[] = [
	{ label: "Product", href: "#product" },
	{ label: "Solutions", href: "#solutions" },
	{ label: "Integrations", href: "#integrations" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Resources", href: "#resources" },
	{ label: "Company", href: "#company" },
] as const;
