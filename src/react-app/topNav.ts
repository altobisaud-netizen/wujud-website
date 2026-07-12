/** Top navigation for the interactive product homepage. */
export type TopNavItem = { label: string; href: string };

export const TOP_NAV: readonly TopNavItem[] = [
	{ label: "Product", href: "#product" },
	{ label: "How SARA works", href: "#watch-sara" },
	{ label: "Build", href: "#build-journey" },
	{ label: "Channels", href: "#channels" },
	{ label: "Pricing", href: "#pricing" },
] as const;
