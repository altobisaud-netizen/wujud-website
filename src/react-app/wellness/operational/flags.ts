/** Frontend presentation flags only — backend remains authoritative. */

function flag(name: keyof ImportMetaEnv, fallback = false): boolean {
	const raw = import.meta.env[name];
	if (raw == null || raw === "") return fallback;
	return ["1", "true", "yes", "on"].includes(String(raw).toLowerCase());
}

export type OperationalPresentationFlags = {
	waitlistEnabled: boolean;
	authEnabled: boolean;
	paymentsEnabled: boolean;
	whatsappEnabled: boolean;
	whatsappOperationalMessagesEnabled: boolean;
	apiBaseUrl: string;
	canonicalOrigin: string;
};

export function readOperationalFlags(): OperationalPresentationFlags {
	return {
		waitlistEnabled: flag("VITE_WELLNESS_WAITLIST_ENABLED", false),
		authEnabled: flag("VITE_WELLNESS_AUTH_ENABLED", false),
		paymentsEnabled: flag("VITE_WELLNESS_PAYMENTS_ENABLED", false),
		whatsappEnabled: flag("VITE_WELLNESS_WHATSAPP_ENABLED", false),
		whatsappOperationalMessagesEnabled: flag("VITE_WELLNESS_WHATSAPP_OPERATIONAL_MESSAGES_ENABLED", false),
		apiBaseUrl: (import.meta.env.VITE_WELLNESS_API_BASE_URL ?? "").replace(/\/+$/, ""),
		canonicalOrigin: (import.meta.env.VITE_WELLNESS_CANONICAL_ORIGIN ?? "https://wujud.ai").replace(/\/+$/, ""),
	};
}

/** Formats server-provided baisa into OMR display. Never hardcode commercial price. */
export function formatOmrFromBaisa(priceBaisa: number, locale: "ar" | "en"): string {
	const omr = priceBaisa / 1000;
	const amount = omr.toFixed(3).replace(/\.?0+$/, "");
	return locale === "ar" ? `${amount} ر.ع.` : `OMR ${amount}`;
}
