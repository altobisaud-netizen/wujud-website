import type { ConvLocale, DemoSlug } from "../types";
import { DEMO_PROFILES } from "../demoScripts";
import { SaraMessage, VisitorMessage, SystemMessage } from "./SaraMessage";

type Props = {
	locale: ConvLocale;
	slug: DemoSlug;
	badge: string;
	onBuild: () => void;
	onPricing: () => void;
	onBook: () => void;
	buildLabel: string;
	pricingLabel: string;
	bookLabel: string;
	futureStatesLabel: string;
	loadingLabel: string;
	expiredLabel: string;
	unavailableLabel: string;
	rateLimitedLabel: string;
};

export function DemoConversation({
	locale,
	slug,
	badge,
	onBuild,
	onPricing,
	onBook,
	buildLabel,
	pricingLabel,
	bookLabel,
	futureStatesLabel,
	loadingLabel,
	expiredLabel,
	unavailableLabel,
	rateLimitedLabel,
}: Props) {
	const profile = DEMO_PROFILES[slug];
	return (
		<>
			<SystemMessage>
				<span className="conv__demo-badge">{badge}</span>
				{" · "}
				{profile.displayName[locale]}
			</SystemMessage>
			{profile.turns.map((turn, i) =>
				turn.role === "sara" ? (
					<SaraMessage key={`${slug}-${i}`}>{turn[locale]}</SaraMessage>
				) : (
					<VisitorMessage key={`${slug}-${i}`}>{turn[locale]}</VisitorMessage>
				),
			)}
			<SaraMessage>
				<div className="conv__actions">
					<button type="button" className="conv__btn" onClick={onBuild}>
						{buildLabel}
					</button>
					<button type="button" className="conv__btn conv__btn--ghost" onClick={onPricing}>
						{pricingLabel}
					</button>
					<button type="button" className="conv__btn conv__btn--ghost" onClick={onBook}>
						{bookLabel}
					</button>
				</div>
				<details className="conv__future-states">
					<summary>{futureStatesLabel}</summary>
					<ul>
						<li>{loadingLabel}</li>
						<li>{expiredLabel}</li>
						<li>{unavailableLabel}</li>
						<li>{rateLimitedLabel}</li>
					</ul>
				</details>
			</SaraMessage>
		</>
	);
}
