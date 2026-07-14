import { WUJUD_PRODUCT_CATALOG, type Locale } from "../../../content/wujudProductCatalog";
import { copy } from "../locale";
import type { ConvLocale } from "../types";
import {
	CapabilityCard,
	ChannelAvailabilityBlock,
	FaqAnswer,
	LinkRow,
	SecurityExplanation,
	SetupProgress,
} from "../blocks/ContentBlocks";
import { PlanComparison, PricingCards } from "../blocks/PricingBlocks";
import { SaraMessage } from "../blocks/SaraMessage";

export function PricingPanel({ locale }: { locale: ConvLocale }) {
	const c = copy(locale);
	const catalog = WUJUD_PRODUCT_CATALOG;
	const loc = locale as Locale;
	return (
		<SaraMessage announce className="conv__bubble--wide">
			<h2 className="conv__subhead">{c.pricingIntro}</h2>
			<PricingCards locale={loc} plans={catalog.plans} intro={undefined} />
			<PlanComparison
				locale={loc}
				rows={catalog.comparisons}
				caption={locale === "ar" ? "مقارنة الخطط" : "Plan comparison"}
			/>
			<LinkRow
				links={[
					{ href: catalog.canonicalPaths.pricing, label: c.canonicalPricing },
					{ href: catalog.canonicalPaths.faq, label: c.canonicalFaq },
					{ href: catalog.canonicalPaths.howItWorks, label: c.canonicalHow },
				]}
			/>
		</SaraMessage>
	);
}

export function ProductHelpPanel({ locale }: { locale: ConvLocale }) {
	const c = copy(locale);
	const catalog = WUJUD_PRODUCT_CATALOG;
	const loc = locale as Locale;
	return (
		<SaraMessage announce className="conv__bubble--wide">
			<h2 className="conv__subhead">{c.helpIntro}</h2>
			<div className="conv__cards">
				{catalog.capabilities.map((cap) => (
					<CapabilityCard key={cap.id} locale={loc} item={cap} />
				))}
			</div>
			<SetupProgress locale={loc} steps={catalog.setupGuidance} heading={c.setupHeading} />
			<ChannelAvailabilityBlock
				locale={loc}
				channels={catalog.channels}
				heading={c.channelsHeading}
			/>
			{catalog.faqs.slice(0, 3).map((faq) => (
				<FaqAnswer key={faq.id} locale={loc} item={faq} />
			))}
			<SecurityExplanation locale={loc} item={catalog.security[0]} />
			<LinkRow
				links={[
					{ href: catalog.canonicalPaths.howItWorks, label: c.canonicalHow },
					{ href: catalog.canonicalPaths.faq, label: c.canonicalFaq },
					{ href: catalog.canonicalPaths.pricing, label: c.canonicalPricing },
					{
						href: catalog.canonicalPaths.privacy,
						label: locale === "ar" ? "الخصوصية" : "Privacy",
					},
				]}
			/>
		</SaraMessage>
	);
}
