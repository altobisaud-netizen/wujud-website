import { useEffect } from "react";
import { metadataFor } from "./wellnessRouteMetadata";
import type { WellnessLocale } from "./types";

const PRODUCTION_CANONICAL_ORIGIN = "https://wujud-website.altobi-saud.workers.dev";
const PREVIEW_HOST = "wujud-sara-wellness-preview.altobi-saud.workers.dev";

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
	let element = document.head.querySelector<HTMLMetaElement>(selector);
	if (!element) {
		element = document.createElement("meta");
		element.setAttribute(attribute, key);
		document.head.append(element);
	}
	element.content = content;
}

export function isWellnessPreviewRuntime(
	location: Location = window.location,
	development = import.meta.env.DEV,
): boolean {
	return (
		development ||
		location.hostname === PREVIEW_HOST ||
		location.hostname === "localhost" ||
		location.hostname === "127.0.0.1"
	);
}

export function useWellnessMetadata(locale: WellnessLocale) {
	useEffect(() => {
		const metadata = metadataFor(window.location.pathname, locale);
		const preview = isWellnessPreviewRuntime();
		const canonicalOrigin = preview ? window.location.origin : PRODUCTION_CANONICAL_ORIGIN;
		const canonicalUrl = new URL(metadata.canonicalPath, canonicalOrigin).toString();

		document.title = metadata.title;
		setMeta('meta[name="description"]', "name", "description", metadata.description);
		setMeta('meta[name="robots"]', "name", "robots", preview ? "noindex, nofollow" : metadata.indexability);
		setMeta('meta[property="og:title"]', "property", "og:title", metadata.ogTitle);
		setMeta('meta[property="og:description"]', "property", "og:description", metadata.ogDescription);
		setMeta('meta[property="og:type"]', "property", "og:type", "website");
		setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
		setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary");
		setMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.ogTitle);
		setMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.ogDescription);

		let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		if (!canonical) {
			canonical = document.createElement("link");
			canonical.rel = "canonical";
			document.head.append(canonical);
		}
		canonical.href = canonicalUrl;
	}, [locale]);
}
