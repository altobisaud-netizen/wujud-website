import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import { SiteHeader } from "../SiteHeader";
import type { WellnessLocale } from "../types";
import {
	fetchMyConsents,
	fetchMyProfileDraft,
	fetchConsentPolicies,
	pauseAccount,
	requestAccountDeletion,
	withdrawConsent,
	type UserConsentView,
} from "./api";
import { readOperationalFlags } from "./flags";
import { useWellnessSessionToken } from "./useWellnessSessionToken";
import { WellnessAuthPanel } from "./WellnessAuthPanel";
import { WhatsAppOptInSection } from "./WhatsAppOptInSection";
import { isWellnessClerkConfigured } from "./wellnessClerkConfig";

function readLocale(): WellnessLocale {
	try {
		const stored = window.localStorage.getItem("wujud-wellness-locale");
		if (stored === "en" || stored === "ar") return stored;
	} catch {
		/* ignore */
	}
	return "ar";
}

function apiMessage<T>(result: { ok: true; data: T } | { ok: false; message: string }): string | undefined {
	return result.ok ? undefined : result.message;
}

function PrivacyAccountContent() {
	const [locale, setLocale] = useState<WellnessLocale>(readLocale);
	const getSessionToken = useWellnessSessionToken();
	const [consents, setConsents] = useState<UserConsentView[]>([]);
	const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
	const [whatsappPolicyId, setWhatsappPolicyId] = useState<string | undefined>(undefined);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
	}, [locale]);

	const loadAccountData = useCallback(async () => {
		setError(null);
		const token = await getSessionToken();
		if (!token) {
			setLoading(false);
			return;
		}
		const [consentRes, profileRes] = await Promise.all([
			fetchMyConsents(token),
			fetchMyProfileDraft(token),
		]);
		const userLocale: WellnessLocale =
			profileRes.ok && (profileRes.data.locale === "en" || profileRes.data.locale === "ar")
				? profileRes.data.locale
				: locale;
		const policiesRes = await fetchConsentPolicies(userLocale);
		if (consentRes.ok) setConsents(consentRes.data.consents);
		if (profileRes.ok) setProfile(profileRes.data.structured);
		if (policiesRes.ok) {
			const whatsappPolicy = policiesRes.data.policies.find((p) => p.type === "WHATSAPP_OPERATIONAL_MESSAGES");
			setWhatsappPolicyId(whatsappPolicy?.id);
		}
		if (!consentRes.ok && consentRes.status !== 404) setError(consentRes.message);
		setLoading(false);
	}, [getSessionToken, locale]);

	useEffect(() => {
		let cancelled = false;
		void (async () => {
			const token = await getSessionToken();
			if (cancelled || !token) {
				if (!cancelled) setLoading(false);
				return;
			}
			await loadAccountData();
		})();
		return () => {
			cancelled = true;
		};
	}, [getSessionToken, loadAccountData]);

	const t =
		locale === "ar"
			? {
					title: "الخصوصية والحساب",
					intro: "تحكم في موافقاتك وبيانات ملف العافية المنظمة وطلبات الإيقاف أو الحذف.",
					unavailable: "خدمات الحساب غير متاحة في هذه البيئة.",
					consents: "الموافقات المقبولة",
					withdrawMarketing: "سحب موافقة التسويق الاختياري",
					withdrawEmail: "سحب موافقة إشعارات البريد",
					pause: "إيقاف الحساب مؤقتاً",
					delete: "طلب حذف الحساب",
					profile: "ملف العافية المنظم",
					retentionNote:
						"قد تُحذف بعض البيانات فوراً، وقد تُحتفظ سجلات الدفع أو الموافقات لفترة يحدّدها المستشار القانوني في عُمان — لم تُعتمد مدة الاحتفاظ بعد.",
					back: "العودة للرئيسية",
					signInTitle: "سجّل الدخول لإدارة حساب العافية",
					signInBody: "استخدم تطبيق WUJUD Wellness Staging المستقل.",
					done: "تم تنفيذ الطلب.",
				}
			: {
					title: "Privacy and account",
					intro: "Manage consents, your structured wellness profile, pause, and deletion requests.",
					unavailable: "Account services are not available in this environment.",
					consents: "Accepted consents",
					withdrawMarketing: "Withdraw optional marketing consent",
					withdrawEmail: "Withdraw optional email notifications",
					pause: "Pause account",
					delete: "Request account deletion",
					profile: "Structured wellness profile",
					retentionNote:
						"Some data may be deleted immediately; payment or consent records may require lawful retention as determined by qualified Omani legal review — retention periods are not invented here.",
					back: "Back to home",
					signInTitle: "Sign in to manage your Wellness account",
					signInBody: "Use the independent WUJUD Wellness Staging application.",
					done: "Request submitted.",
				};

	async function runAuthenticated(action: (token: string) => Promise<{ ok: boolean; message?: string }>) {
		setMessage(null);
		setError(null);
		const token = await getSessionToken();
		if (!token) {
			setError(t.unavailable);
			return;
		}
		const result = await action(token);
		if (!result.ok) {
			setError(result.message ?? t.unavailable);
			return;
		}
		setMessage(t.done);
		await loadAccountData();
	}

	return (
		<div className="wellness-shell wellness-account-page">
			<SiteHeader locale={locale} onLocaleChange={setLocale} />
			<main className="legal-content">
				<h1>{t.title}</h1>
				<p>{t.intro}</p>
				<SignedOut>
					<WellnessAuthPanel
						locale={locale}
						title={t.signInTitle}
						body={t.signInBody}
						unavailableMessage={t.unavailable}
						onSignedIn={() => void loadAccountData()}
					/>
				</SignedOut>
				<SignedIn>
					{loading ? <p role="status">{locale === "ar" ? "جاري التحميل…" : "Loading…"}</p> : null}
					{message ? <p role="status">{message}</p> : null}
					{error ? <p role="alert">{error}</p> : null}
					<section aria-label={t.title}>
						<h2>{t.consents}</h2>
						<ul className="ops-consent-history">
							{consents.map((row, index) => (
								<li key={`${row.policyType}-${index}`}>
									<strong>{row.policyType}</strong> {row.version} — {row.decision}
									{row.acceptedAt ? ` (${new Date(row.acceptedAt).toLocaleDateString(locale)})` : null}
								</li>
							))}
						</ul>
						<ul className="ops-privacy-actions">
							<li>
								<button
									type="button"
									onClick={() =>
										void runAuthenticated(async (token) => {
											const res = await withdrawConsent(token, "OPTIONAL_MARKETING");
											return { ok: res.ok, message: apiMessage(res) };
										})
									}
								>
									{t.withdrawMarketing}
								</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() =>
										void runAuthenticated(async (token) => {
											const res = await withdrawConsent(token, "EMAIL_NOTIFICATIONS");
											return { ok: res.ok, message: apiMessage(res) };
										})
									}
								>
									{t.withdrawEmail}
								</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() =>
										void runAuthenticated(async (token) => {
											const res = await pauseAccount(token);
											return { ok: res.ok, message: apiMessage(res) };
										})
									}
								>
									{t.pause}
								</button>
							</li>
							<li>
								<button
									type="button"
									onClick={() =>
										void runAuthenticated(async (token) => {
											const res = await requestAccountDeletion(token);
											return { ok: res.ok, message: apiMessage(res) };
										})
									}
								>
									{t.delete}
								</button>
							</li>
						</ul>
						{profile ? (
							<section aria-label={t.profile}>
								<h2>{t.profile}</h2>
								<dl className="ops-profile-review">
									{Object.entries(profile).map(([key, value]) => (
										<div key={key}>
											<dt>{key}</dt>
											<dd>{String(value)}</dd>
										</div>
									))}
								</dl>
							</section>
						) : null}
						<p className="ops-retention-note">{t.retentionNote}</p>
						<WhatsAppOptInSection locale={locale} consentPolicyId={whatsappPolicyId} />
					</section>
				</SignedIn>
				<p>
					<a href="/">{t.back}</a>
				</p>
			</main>
		</div>
	);
}

export function PrivacyAccountPage() {
	const flags = readOperationalFlags();
	const authReady = flags.authEnabled && Boolean(flags.apiBaseUrl) && isWellnessClerkConfigured();
	const tUnavailable =
		readLocale() === "ar"
			? "خدمات الحساب غير متاحة في هذه البيئة."
			: "Account services are not available in this environment.";

	if (!authReady) {
		return (
			<div className="wellness-shell wellness-account-page">
				<main className="legal-content">
					<p role="status">{tUnavailable}</p>
					<p>
						<a href="/">{readLocale() === "ar" ? "العودة للرئيسية" : "Back to home"}</a>
					</p>
				</main>
			</div>
		);
	}

	return <PrivacyAccountContent />;
}
