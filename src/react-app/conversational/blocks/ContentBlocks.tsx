import { t, type Locale, type FaqItem, type Capability, type ChannelAvailability, type SecurityStatement, type SetupStep } from "../../../content/wujudProductCatalog";

export function FaqAnswer({ locale, item }: { locale: Locale; item: FaqItem }) {
	return (
		<article className="conv__card">
			<h3>{t(item.question, locale)}</h3>
			<p>{t(item.answer, locale)}</p>
		</article>
	);
}

export function CapabilityCard({ locale, item }: { locale: Locale; item: Capability }) {
	return (
		<article className="conv__card">
			<h3>{t(item.title, locale)}</h3>
			<p>{t(item.body, locale)}</p>
		</article>
	);
}

export function ChannelAvailabilityBlock({
	locale,
	channels,
	heading,
}: {
	locale: Locale;
	channels: readonly ChannelAvailability[];
	heading: string;
}) {
	return (
		<section>
			<h3 className="conv__subhead">{heading}</h3>
			<ul className="conv__list">
				{channels.map((ch) => (
					<li key={ch.id}>
						<strong>{t(ch.label, locale)}</strong> — {ch.status}: {t(ch.note, locale)}
					</li>
				))}
			</ul>
		</section>
	);
}

export function SecurityExplanation({
	locale,
	item,
}: {
	locale: Locale;
	item: SecurityStatement;
}) {
	return (
		<article className="conv__card">
			<h3>{t(item.title, locale)}</h3>
			<p>{t(item.body, locale)}</p>
		</article>
	);
}

export function SetupProgress({
	locale,
	steps,
	heading,
}: {
	locale: Locale;
	steps: readonly SetupStep[];
	heading: string;
}) {
	return (
		<section>
			<h3 className="conv__subhead">{heading}</h3>
			<ol className="conv__list">
				{steps.map((step) => (
					<li key={step.id}>
						<strong>{t(step.title, locale)}</strong>
						<p>{t(step.body, locale)}</p>
					</li>
				))}
			</ol>
		</section>
	);
}

export function LinkRow({
	links,
}: {
	links: readonly { href: string; label: string; external?: boolean }[];
}) {
	return (
		<nav className="conv__links" aria-label="Related">
			{links.map((l) => (
				<a
					key={l.href + l.label}
					href={l.href}
					{...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
				>
					{l.label}
				</a>
			))}
		</nav>
	);
}

export function ErrorRetry({
	message,
	retryLabel,
	onRetry,
}: {
	message: string;
	retryLabel: string;
	onRetry: () => void;
}) {
	return (
		<div className="conv__card" role="alert">
			<p>{message}</p>
			<div className="conv__actions">
				<button type="button" className="conv__btn" onClick={onRetry}>
					{retryLabel}
				</button>
			</div>
		</div>
	);
}
