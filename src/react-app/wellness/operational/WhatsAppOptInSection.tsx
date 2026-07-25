import { useEffect, useState } from "react";
import type { WellnessLocale } from "../types";
import {
	confirmWhatsAppFirstMessage,
	fetchWhatsAppStatus,
	optOutWhatsApp,
	registerWhatsAppOptIn,
	registerWhatsAppReOptIn,
	type WhatsAppStatus,
} from "./api";
import { readOperationalFlags } from "./flags";
import { useWellnessSessionToken } from "./useWellnessSessionToken";

type Props = {
	locale: WellnessLocale;
	consentPolicyId?: string;
};

export const WELLNESS_WHATSAPP_COMING_SOON_COPY = {
	en: "WhatsApp reminders are coming soon. You can use the complete Wellness SARA experience securely through your account.",
	ar: "تذكيرات واتساب ستكون متاحة قريباً. يمكنك استخدام تجربة Wellness SARA الكاملة بأمان من خلال حسابك.",
} as const;

function whatsAppOperationalUiEnabled(flags: ReturnType<typeof readOperationalFlags>): boolean {
	return flags.whatsappEnabled && flags.whatsappOperationalMessagesEnabled;
}

export function WhatsAppOptInSection({ locale, consentPolicyId }: Props) {
	const flags = readOperationalFlags();
	const operationalUiEnabled = whatsAppOperationalUiEnabled(flags);
	const getSessionToken = useWellnessSessionToken();
	const [phone, setPhone] = useState("");
	const [consentChecked, setConsentChecked] = useState(false);
	const [status, setStatus] = useState<WhatsAppStatus | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const copy =
		locale === "ar"
			? {
					inactiveTitle: "رسائل واتساب التشغيلية",
					comingSoon: WELLNESS_WHATSAPP_COMING_SOON_COPY.ar,
					title: "رسائل Wellness SARA التشغيلية على واتساب",
					consent:
						"أوافق على استلام تحديثات حساب Wellness SARA وتذكيرات رحلة العافية عبر واتساب، ويمكنني إيقاف هذه الرسائل في أي وقت.",
					privacyLink: "سياسة الخصوصية",
					phoneLabel: "رقم واتساب (E.164)",
					phonePlaceholder: "+96891234567",
					save: "حفظ الموافقة ورقم واتساب",
					reEnable: "إعادة تفعيل الرسائل باستخدام الرقم المحفوظ",
					confirm: "تأكيد وإرسال رسالة الترحيب",
					optOut: "إيقاف رسائل واتساب",
					masked: "الرقم المحفوظ",
					pending: "بانتظار تأكيد أول رسالة واتساب.",
					done: "تم حفظ إعدادات واتساب.",
					unavailable: "رسائل واتساب التشغيلية غير متاحة في هذه البيئة.",
				}
			: {
					inactiveTitle: "WhatsApp operational messages",
					comingSoon: WELLNESS_WHATSAPP_COMING_SOON_COPY.en,
					title: "Wellness SARA WhatsApp operational messages",
					consent:
						"I agree to receive Wellness SARA account updates and wellness journey reminders through WhatsApp. I can stop these messages at any time.",
					privacyLink: "Privacy policy",
					phoneLabel: "WhatsApp number (E.164)",
					phonePlaceholder: "+96891234567",
					save: "Save consent and WhatsApp number",
					reEnable: "Re-enable messages using saved number",
					confirm: "Confirm and send welcome message",
					optOut: "Stop WhatsApp messages",
					masked: "Saved number",
					pending: "Waiting for first WhatsApp message confirmation.",
					done: "WhatsApp settings saved.",
					unavailable: "Operational WhatsApp messaging is not available in this environment.",
				};

	useEffect(() => {
		let cancelled = false;
		void (async () => {
			if (!operationalUiEnabled || !flags.apiBaseUrl) {
				setLoading(false);
				return;
			}
			const token = await getSessionToken();
			if (!token || cancelled) {
				setLoading(false);
				return;
			}
			const res = await fetchWhatsAppStatus(token);
			if (!cancelled && res.ok) setStatus(res.data);
			if (!cancelled) setLoading(false);
		})();
		return () => {
			cancelled = true;
		};
	}, [flags.apiBaseUrl, getSessionToken, operationalUiEnabled]);

	if (!operationalUiEnabled) {
		return (
			<section aria-label={copy.inactiveTitle} className="ops-whatsapp-inactive">
				<h2>{copy.inactiveTitle}</h2>
				<p role="status">{copy.comingSoon}</p>
			</section>
		);
	}
	if (loading) return <p role="status">{locale === "ar" ? "جاري التحميل…" : "Loading…"}</p>;

	const canReEnableStoredPhone = Boolean(status?.maskedPhone && !status?.optedIn);
	const canRegisterNewPhone = !status?.maskedPhone;

	async function runWithToken(action: (token: string) => Promise<{ ok: boolean; message?: string }>) {
		setMessage(null);
		setError(null);
		const token = await getSessionToken();
		if (!token) {
			setError(copy.unavailable);
			return;
		}
		const result = await action(token);
		if (!result.ok) {
			setError(result.message ?? copy.unavailable);
			return;
		}
		setMessage(copy.done);
		const refreshed = await fetchWhatsAppStatus(token);
		if (refreshed.ok) setStatus(refreshed.data);
	}

	return (
		<section aria-label={copy.title} className="ops-whatsapp-opt-in">
			<h2>{copy.title}</h2>
			{message ? <p role="status">{message}</p> : null}
			{error ? <p role="alert">{error}</p> : null}
			{status?.maskedPhone ? (
				<p>
					{copy.masked}: {status.maskedPhone}
				</p>
			) : null}
			{status?.pendingConfirmation ? <p>{copy.pending}</p> : null}
			<label className="ops-checkbox">
				<input
					type="checkbox"
					checked={consentChecked}
					onChange={(event) => setConsentChecked(event.target.checked)}
				/>
				<span>{copy.consent}</span>
			</label>
			<p>
				<a href="/privacy">{copy.privacyLink}</a>
			</p>
			{canRegisterNewPhone ? (
				<>
					<label htmlFor="wellness-whatsapp-phone">{copy.phoneLabel}</label>
					<input
						id="wellness-whatsapp-phone"
						name="whatsappPhone"
						type="tel"
						autoComplete="tel"
						inputMode="tel"
						dir="ltr"
						value={phone}
						onChange={(event) => setPhone(event.target.value)}
						placeholder={copy.phonePlaceholder}
					/>
				</>
			) : null}
			<ul className="ops-privacy-actions">
				{canReEnableStoredPhone ? (
					<li>
						<button
							type="button"
							disabled={!consentChecked || !consentPolicyId}
							onClick={() =>
								void runWithToken(async (token) => {
									if (!consentPolicyId) return { ok: false, message: copy.unavailable };
									const res = await registerWhatsAppReOptIn(token, {
										consentPolicyId,
										consentPolicyVersion: "v1",
									});
									return { ok: res.ok, message: res.ok ? undefined : res.message };
								})
							}
						>
							{copy.reEnable}
						</button>
					</li>
				) : null}
				{canRegisterNewPhone ? (
					<li>
						<button
							type="button"
							disabled={!consentChecked || !phone.trim() || !consentPolicyId}
							onClick={() =>
								void runWithToken(async (token) => {
									if (!consentPolicyId) return { ok: false, message: copy.unavailable };
									const res = await registerWhatsAppOptIn(token, {
										phone,
										consentPolicyId,
										consentPolicyVersion: "v1",
									});
									return { ok: res.ok, message: res.ok ? undefined : res.message };
								})
							}
						>
							{copy.save}
						</button>
					</li>
				) : null}
				{status?.pendingConfirmation ? (
					<li>
						<button
							type="button"
							onClick={() =>
								void runWithToken(async (token) => {
									const res = await confirmWhatsAppFirstMessage(token);
									return { ok: res.ok, message: res.ok ? undefined : res.message };
								})
							}
						>
							{copy.confirm}
						</button>
					</li>
				) : null}
				{status?.optedIn ? (
					<li>
						<button
							type="button"
							onClick={() =>
								void runWithToken(async (token) => {
									const res = await optOutWhatsApp(token);
									return { ok: res.ok, message: res.ok ? undefined : res.message };
								})
							}
						>
							{copy.optOut}
						</button>
					</li>
				) : null}
			</ul>
		</section>
	);
}
