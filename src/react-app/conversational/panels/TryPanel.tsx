import { DEMO_PROFILES } from "../demoScripts";
import { copy } from "../locale";
import type { ConvLocale, DemoSlug } from "../types";
import { ClarificationChoices } from "../blocks/ClarificationChoices";
import { DemoConversation } from "../blocks/DemoConversation";
import { SaraMessage } from "../blocks/SaraMessage";

type Props = {
	locale: ConvLocale;
	slug: DemoSlug | null;
	onPick: (s: DemoSlug) => void;
	onBuild: () => void;
	onPricing: () => void;
	onBook: () => void;
};

export function TryPanel({ locale, slug, onPick, onBuild, onPricing, onBook }: Props) {
	const c = copy(locale);
	if (!slug) {
		return (
			<SaraMessage>
				<ClarificationChoices
					prompt={c.pickDemo}
					choices={(Object.keys(DEMO_PROFILES) as DemoSlug[]).map((s) => ({
						id: s,
						label: c.starters[s],
					}))}
					onSelect={(id) => onPick(id as DemoSlug)}
				/>
				<p className="conv__note">{c.scriptedNote}</p>
			</SaraMessage>
		);
	}

	return (
		<DemoConversation
			locale={locale}
			slug={slug}
			badge={c.demoBadge}
			onBuild={onBuild}
			onPricing={onPricing}
			onBook={onBook}
			buildLabel={c.buildLikeThis}
			pricingLabel={c.viewPricing}
			bookLabel={c.bookDemo}
			futureStatesLabel={c.futureStates}
			loadingLabel={c.loading}
			expiredLabel={c.sessionExpired}
			unavailableLabel={c.unavailable}
			rateLimitedLabel={c.rateLimited}
		/>
	);
}
