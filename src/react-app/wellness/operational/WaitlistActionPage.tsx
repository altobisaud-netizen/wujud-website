import { useEffect, useMemo, useState } from "react";
import { fetchBackendFlags } from "./api";
import { readOperationalFlags } from "./flags";
import type { WellnessLocale } from "../types";

export type WaitlistActionState =
	| "processing"
	| "success"
	| "already"
	| "expired"
	| "invalid"
	| "unavailable";

type ActionKind = "confirm" | "unsubscribe" | "remove";

type Props = {
	kind: ActionKind;
	locale: WellnessLocale;
};

const copy = {
	en: {
		confirm: {
			processing: "Confirming your place…",
			success: "Your launch notification is confirmed.",
			already: "If you already confirmed, no further action is needed.",
			expired: "This confirmation link is no longer valid.",
			invalid: "This link could not be processed.",
			unavailable: "Launch notifications are temporarily unavailable.",
			title: "Waitlist confirmation",
		},
		unsubscribe: {
			processing: "Processing your unsubscribe request…",
			success: "You are unsubscribed from launch notifications.",
			already: "If you already unsubscribed, no further action is needed.",
			expired: "This unsubscribe link is no longer valid.",
			invalid: "This link could not be processed.",
			unavailable: "Launch notifications are temporarily unavailable.",
			title: "Unsubscribe",
		},
		remove: {
			processing: "Processing your removal request…",
			success: "Your waitlist request has been removed.",
			already: "If your request was already removed, no further action is needed.",
			expired: "This removal link is no longer valid.",
			invalid: "This link could not be processed.",
			unavailable: "Launch notifications are temporarily unavailable.",
			title: "Waitlist removal",
		},
		home: "Return to homepage",
	},
	ar: {
		confirm: {
			processing: "جاري تأكيد مكانك…",
			success: "تم تأكيد اشتراكك في إشعار الإطلاق.",
			already: "إذا كنت قد أكدت مسبقاً، فلا يلزم أي إجراء إضافي.",
			expired: "رابط التأكيد لم يعد صالحاً.",
			invalid: "تعذر معالجة هذا الرابط.",
			unavailable: "إشعارات الإطلاق غير متاحة مؤقتاً.",
			title: "تأكيد قائمة الانتظار",
		},
		unsubscribe: {
			processing: "جاري معالجة طلب إلغاء الاشتراك…",
			success: "تم إلغاء اشتراكك في إشعارات الإطلاق.",
			already: "إذا كنت قد ألغيت الاشتراك مسبقاً، فلا يلزم أي إجراء إضافي.",
			expired: "رابط إلغاء الاشتراك لم يعد صالحاً.",
			invalid: "تعذر معالجة هذا الرابط.",
			unavailable: "إشعارات الإطلاق غير متاحة مؤقتاً.",
			title: "إلغاء الاشتراك",
		},
		remove: {
			processing: "جاري معالجة طلب الإزالة…",
			success: "تمت إزالة طلب قائمة الانتظار.",
			already: "إذا كان طلبك قد أُزيل مسبقاً، فلا يلزم أي إجراء إضافي.",
			expired: "رابط الإزالة لم يعد صالحاً.",
			invalid: "تعذر معالجة هذا الرابط.",
			unavailable: "إشعارات الإطلاق غير متاحة مؤقتاً.",
			title: "إزالة من قائمة الانتظار",
		},
		home: "العودة للرئيسية",
	},
} as const;

function readInitialLocale(): WellnessLocale {
	try {
		const stored = window.localStorage.getItem("wujud-wellness-locale");
		if (stored === "en" || stored === "ar") return stored;
	} catch {
		/* ignore */
	}
	return document.documentElement.lang === "en" ? "en" : "ar";
}

async function invokeAction(kind: ActionKind, token: string): Promise<{ ok: boolean; status: number }> {
	const { apiBaseUrl } = readOperationalFlags();
	if (!apiBaseUrl) return { ok: false, status: 0 };
	if (kind === "confirm") {
		const res = await fetch(`${apiBaseUrl}/api/v1/waitlist/confirm?token=${encodeURIComponent(token)}`, {
			headers: { Accept: "application/json" },
		});
		return { ok: res.ok, status: res.status };
	}
	const path = kind === "unsubscribe" ? "/api/v1/waitlist/unsubscribe" : "/api/v1/waitlist/remove";
	const res = await fetch(`${apiBaseUrl}${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Accept: "application/json" },
		body: JSON.stringify({ token }),
	});
	return { ok: res.ok, status: res.status };
}

export function WaitlistActionPage({ kind, locale: localeProp }: Props) {
	const [locale] = useState<WellnessLocale>(localeProp ?? readInitialLocale());
	const t = copy[locale][kind];
	const token = useMemo(() => new URLSearchParams(window.location.search).get("token") ?? "", []);
	const [state, setState] = useState<WaitlistActionState>(() => (token ? "processing" : "invalid"));

	useEffect(() => {
		document.title = `${t.title} | WUJUD`;
	}, [t.title]);

	useEffect(() => {
		if (!token) return;
		const cleanUrl = `${window.location.pathname}${window.location.hash}`;
		window.history.replaceState({}, "", cleanUrl);

		let cancelled = false;
		void (async () => {
			const flags = await fetchBackendFlags();
			if (cancelled) return;
			if (!flags.ok || !flags.data.waitlistEnabled) {
				setState("unavailable");
				return;
			}
			const result = await invokeAction(kind, token);
			if (cancelled) return;
			if (result.status === 503) {
				setState("unavailable");
				return;
			}
			if (!result.ok && result.status !== 202) {
				setState("invalid");
				return;
			}
			setState("success");
		})();
		return () => {
			cancelled = true;
		};
	}, [kind, token]);

	const message =
		state === "processing"
			? t.processing
			: state === "success"
				? t.success
				: state === "already"
					? t.already
					: state === "expired"
						? t.expired
						: state === "invalid"
							? t.invalid
							: t.unavailable;

	return (
		<main className="waitlist-action-page" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
			<div className="waitlist-action-page__card">
				<h1>{t.title}</h1>
				<p role="status" aria-live="polite">
					{message}
				</p>
				<a className="text-button" href="/">
					{copy[locale].home}
				</a>
			</div>
		</main>
	);
}

export function WaitlistConfirmPage({ locale }: { locale: WellnessLocale }) {
	return <WaitlistActionPage kind="confirm" locale={locale} />;
}

export function WaitlistUnsubscribePage({ locale }: { locale: WellnessLocale }) {
	return <WaitlistActionPage kind="unsubscribe" locale={locale} />;
}

export function WaitlistDeletePage({ locale }: { locale: WellnessLocale }) {
	return <WaitlistActionPage kind="remove" locale={locale} />;
}
