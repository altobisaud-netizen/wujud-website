import { useEffect, useId, useState, type FormEvent } from "react";
import { fetchConsentPolicies, joinWaitlist } from "./api";
import type { WellnessLocale } from "../types";

export type WaitlistUiState =
	| "form"
	| "submitting"
	| "confirmation-email-sent"
	| "confirmed"
	| "unsubscribed"
	| "unavailable"
	| "retry";

type Props = {
	locale: WellnessLocale;
	open: boolean;
	onClose: () => void;
};

const copy = {
	en: {
		title: "Notify me at launch",
		intro: "Leave your email and we will tell you when SARA Wellness becomes available. No account is created yet.",
		email: "Email address",
		firstName: "First name (optional)",
		language: "Preferred language",
		consent:
			"I agree to receive a launch notification email about WUJUD SARA Wellness. I can unsubscribe at any time.",
		submit: "Notify me",
		close: "Close",
		sent: "Check your email to confirm your place.",
		sentBody: "We sent a confirmation link. Your place on the waitlist is not confirmed until you open that link.",
		retry: "Something went wrong. Please try again.",
		unavailable: "Launch notifications are temporarily unavailable.",
		required: "Required",
	},
	ar: {
		title: "أبلغني عند الإطلاق",
		intro: "اترك بريدك وسنخبرك عند توفر سارة للعافية. لن يُنشأ حساب الآن.",
		email: "البريد الإلكتروني",
		firstName: "الاسم الأول (اختياري)",
		language: "اللغة المفضلة",
		consent:
			"أوافق على استلام رسالة إشعار عند إطلاق وُجود سارة للعافية. يمكنني إلغاء الاشتراك في أي وقت.",
		submit: "أبلغني",
		close: "إغلاق",
		sent: "تحقق من بريدك لتأكيد مكانك.",
		sentBody: "أرسلنا رابط تأكيد. لا يُعتبر انضمامك مؤكداً قبل فتح الرابط.",
		retry: "حدث خطأ. يرجى المحاولة مرة أخرى.",
		unavailable: "إشعارات الإطلاق غير متاحة مؤقتاً.",
		required: "مطلوب",
	},
} as const;

export function WaitlistDialog({ locale, open, onClose }: Props) {
	if (!open) return null;
	return <WaitlistDialogContent key={`${locale}-waitlist`} locale={locale} onClose={onClose} />;
}

function WaitlistDialogContent({ locale, onClose }: Omit<Props, "open">) {
	const t = copy[locale];
	const titleId = useId();
	const [state, setState] = useState<WaitlistUiState>("form");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [preferredLanguage, setPreferredLanguage] = useState<WellnessLocale>(locale);
	const [consent, setConsent] = useState(false);
	const [policyVersion, setPolicyVersion] = useState("v1");

	useEffect(() => {
		let cancelled = false;
		void (async () => {
			const policies = await fetchConsentPolicies(locale);
			if (cancelled) return;
			if (!policies.ok) {
				setState("unavailable");
				return;
			}
			const emailPolicy = policies.data.policies.find((p) => p.type === "EMAIL_NOTIFICATIONS");
			if (emailPolicy) setPolicyVersion(emailPolicy.version);
		})();
		return () => {
			cancelled = true;
		};
	}, [locale]);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!consent || !email.trim()) return;
		setState("submitting");
		const result = await joinWaitlist({
			email,
			preferredLanguage,
			firstName: firstName.trim() || undefined,
			consentPolicyVersion: policyVersion,
		});
		if (!result.ok) {
			setState(result.code === "API_UNAVAILABLE" || result.status === 0 ? "unavailable" : "retry");
			return;
		}
		setState("confirmation-email-sent");
	}

	return (
		<div className="ops-dialog-backdrop" role="presentation" onClick={onClose}>
			<div
				className="ops-dialog"
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				onClick={(event) => event.stopPropagation()}
			>
				<header>
					<h2 id={titleId}>{t.title}</h2>
					<button type="button" className="text-button" onClick={onClose}>
						{t.close}
					</button>
				</header>

				{state === "confirmation-email-sent" || state === "confirmed" ? (
					<div className="ops-dialog__status" role="status">
						<p>
							<strong>{t.sent}</strong>
						</p>
						<p>{t.sentBody}</p>
					</div>
				) : null}

				{state === "unavailable" ? (
					<div className="ops-dialog__status" role="alert">
						<p>{t.unavailable}</p>
					</div>
				) : null}

				{state === "retry" ? (
					<div className="ops-dialog__status" role="alert">
						<p>{t.retry}</p>
						<button type="button" onClick={() => setState("form")}>
							{t.submit}
						</button>
					</div>
				) : null}

				{(state === "form" || state === "submitting") && (
					<form onSubmit={onSubmit}>
						<p>{t.intro}</p>
						<label>
							<span>
								{t.email} <span className="sr-only">({t.required})</span>
							</span>
							<input
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={state === "submitting"}
							/>
						</label>
						<label>
							<span>{t.firstName}</span>
							<input
								type="text"
								autoComplete="given-name"
								maxLength={80}
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								disabled={state === "submitting"}
							/>
						</label>
						<label>
							<span>{t.language}</span>
							<select
								value={preferredLanguage}
								onChange={(e) => setPreferredLanguage(e.target.value as WellnessLocale)}
								disabled={state === "submitting"}
							>
								<option value="ar">العربية</option>
								<option value="en">English</option>
							</select>
						</label>
						<label className="ops-checkbox">
							<input
								type="checkbox"
								checked={consent}
								onChange={(e) => setConsent(e.target.checked)}
								required
								disabled={state === "submitting"}
							/>
							<span>{t.consent}</span>
						</label>
						<button type="submit" disabled={!consent || state === "submitting"}>
							{state === "submitting" ? "…" : t.submit}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
