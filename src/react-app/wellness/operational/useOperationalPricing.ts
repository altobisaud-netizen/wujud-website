import { useEffect, useState } from "react";
import { fetchActivePlans, fetchBackendFlags, type PublicPlan } from "./api";
import { formatOmrFromBaisa, readOperationalFlags } from "./flags";
import type { WellnessLocale } from "../types";

export type PricingView = {
	priceLabel: string | null;
	paymentCtaEnabled: boolean;
	plan: PublicPlan | null;
	backendAvailable: boolean;
	waitlistBackendEnabled: boolean;
	authBackendEnabled: boolean;
};

export function useOperationalPricing(locale: WellnessLocale): PricingView {
	const presentation = readOperationalFlags();
	const [view, setView] = useState<PricingView>({
		priceLabel: null,
		paymentCtaEnabled: false,
		plan: null,
		backendAvailable: false,
		waitlistBackendEnabled: false,
		authBackendEnabled: false,
	});

	useEffect(() => {
		let cancelled = false;
		void (async () => {
			if (!presentation.apiBaseUrl) {
				if (!cancelled) {
					setView((v) => ({ ...v, backendAvailable: false, paymentCtaEnabled: false, priceLabel: null }));
				}
				return;
			}
			const [flags, plans] = await Promise.all([fetchBackendFlags(), fetchActivePlans()]);
			if (cancelled) return;
			if (!flags.ok || !plans.ok) {
				setView({
					priceLabel: null,
					paymentCtaEnabled: false,
					plan: null,
					backendAvailable: false,
					waitlistBackendEnabled: false,
					authBackendEnabled: false,
				});
				return;
			}
			const active = plans.data.plans.find((p) => p.status === "ACTIVE" && p.code === "EIGHT_WEEK_JOURNEY") ?? null;
			const priceLabel =
				active?.priceBaisa != null && active.currency === "OMR"
					? formatOmrFromBaisa(active.priceBaisa, locale)
					: null;
			setView({
				priceLabel,
				paymentCtaEnabled: Boolean(
					presentation.paymentsEnabled &&
						flags.data.paymentsEnabled &&
						active?.paymentCtaEnabled &&
						active.priceBaisa != null,
				),
				plan: active,
				backendAvailable: true,
				waitlistBackendEnabled: flags.data.waitlistEnabled && presentation.waitlistEnabled,
				authBackendEnabled: flags.data.authEnabled && presentation.authEnabled,
			});
		})();
		return () => {
			cancelled = true;
		};
	}, [locale, presentation.apiBaseUrl, presentation.authEnabled, presentation.paymentsEnabled, presentation.waitlistEnabled]);

	return view;
}
