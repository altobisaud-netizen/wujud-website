import type { ConvLocale } from "./types";

const KEY = "wujud:preferred-locale:v1";

export function loadPreferredLocale(fallback: ConvLocale = "en"): ConvLocale {
	try {
		const raw = localStorage.getItem(KEY);
		if (raw === "en" || raw === "ar") return raw;
	} catch {
		/* ignore */
	}
	return fallback;
}

export function savePreferredLocale(locale: ConvLocale): void {
	try {
		localStorage.setItem(KEY, locale);
	} catch {
		/* ignore */
	}
}
