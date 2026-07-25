import { useEffect, useId, useMemo, useState, type FormEvent } from "react";

import {

	confirmProfileDraft,

	saveProfileDraft,

	fetchConsentPolicies,

	type ConsentPolicyPublic,

} from "./api";

import { WellnessAuthPanel } from "./WellnessAuthPanel";

import type { WellnessLocale } from "../types";



type StructuredAnswers = {

	primaryGoal: string;

	routineChallenge: string;

	preferredSupportTiming: string;

	preferredCoachingStyle: string;

	language: WellnessLocale;

	timezone?: string;

};



type Props = {

	locale: WellnessLocale;

	open: boolean;

	onClose: () => void;

	answers: StructuredAnswers;

	getSessionToken?: () => Promise<string | null>;

};



type Step = "explain" | "consent" | "auth" | "review" | "confirming" | "saved" | "unavailable";



const copy = {

	en: {

		title: "Save my journey",

		explainTitle: "What will and will not be stored",

		willStore:

			"If you continue, we store only the structured answers you confirm: primary goal, routine challenge, preferred support timing, coaching style, language, and timezone.",

		willNotStore:

			"We do not store the anonymous chat transcript, medical history, meal photos, or daily wellness measurements in this step.",

		continue: "Continue",

		consentTitle: "Consent required",

		consentBody: "Accept Terms, Privacy, and general wellness-data consent to create your Wellness account profile draft.",

		authTitle: "Create or sign in to your Wellness account",

		authBody:

			"Sign in uses the independent WUJUD Wellness identity application. Business-product accounts are not accepted.",

		authUnavailable: "Wellness account sign-in is not configured in this environment yet.",

		reviewTitle: "Review your answers",

		reviewBody: "Correct anything before confirmation. Nothing becomes an active profile until you confirm.",

		confirm: "Confirm and save",

		saved: "Your structured journey draft is saved.",

		close: "Close",

		unavailable: "Account services are temporarily unavailable.",

		back: "Back",

		signInRequired: "Sign in to your Wellness account to continue.",

	},

	ar: {

		title: "احفظ رحلتك",

		explainTitle: "ما الذي سيُحفظ وما الذي لن يُحفظ",

		willStore:

			"عند المتابعة نحفظ فقط الإجابات المنظمة التي تؤكدها: الهدف الأساسي، تحدي الروتين، وقت الدعم المفضل، أسلوب المرافقة، اللغة، والمنطقة الزمنية.",

		willNotStore:

			"لا نحفظ نص المحادثة المجهولة، ولا التاريخ الطبي، ولا صور الوجبات، ولا قياسات العافية اليومية في هذه الخطوة.",

		continue: "متابعة",

		consentTitle: "الموافقات المطلوبة",

		consentBody: "اقبل الشروط والخصوصية وموافقة بيانات العافية العامة لإنشاء مسودة ملف حساب العافية.",

		authTitle: "أنشئ حساب العافية أو سجّل الدخول",

		authBody: "تسجيل الدخول عبر تطبيق هوية Wellness SARA المستقل. حسابات منتج الأعمال غير مقبولة.",

		authUnavailable: "تسجيل دخول حساب العافية غير مهيأ في هذه البيئة بعد.",

		reviewTitle: "راجع إجاباتك",

		reviewBody: "صحّح ما تحتاج قبل التأكيد. لا يصبح الملف نشطاً قبل التأكيد.",

		confirm: "تأكيد والحفظ",

		saved: "تم حفظ مسودة رحلتك المنظمة.",

		close: "إغلاق",

		unavailable: "خدمات الحساب غير متاحة مؤقتاً.",

		back: "رجوع",

		signInRequired: "سجّل الدخول إلى حساب العافية للمتابعة.",

	},

} as const;



const REQUIRED_TYPES = ["TERMS", "PRIVACY", "GENERAL_WELLNESS_DATA"] as const;



function SaveJourneyDialogContent({

	locale,

	onClose,

	answers,

	getSessionToken,

}: Omit<Props, "open">) {

	const t = copy[locale];

	const titleId = useId();
	const [step, setStep] = useState<Step>("explain");
	const [policies, setPolicies] = useState<ConsentPolicyPublic[]>([]);
	const [accepted, setAccepted] = useState<Record<string, boolean>>({});
	const [draft, setDraft] = useState(answers);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		void fetchConsentPolicies(locale).then((result) => {
			if (cancelled) return;
			if (!result.ok) {
				setStep("unavailable");
				return;
			}
			setPolicies(
				result.data.policies.filter((p) => REQUIRED_TYPES.includes(p.type as (typeof REQUIRED_TYPES)[number])),
			);
		});
		return () => {
			cancelled = true;
		};
	}, [locale]);



	const allRequiredAccepted = useMemo(

		() => policies.length > 0 && policies.every((p) => accepted[p.id]),

		[policies, accepted],

	);



	async function resolveToken(): Promise<string | null> {

		if (!getSessionToken) return null;

		return getSessionToken();

	}



	async function onConfirm(e: FormEvent) {

		e.preventDefault();

		setError(null);

		const session = await resolveToken();

		if (!session) {

			setError(t.signInRequired);

			setStep("auth");

			return;

		}

		setStep("confirming");

		const saved = await saveProfileDraft(session, {

			structured: {

				primaryGoal: draft.primaryGoal,

				routineChallenge: draft.routineChallenge,

				preferredSupportTiming: draft.preferredSupportTiming,

				preferredCoachingStyle: draft.preferredCoachingStyle,

				language: draft.language,

				timezone: draft.timezone,

			},

			acceptedPolicyIds: policies.filter((p) => accepted[p.id]).map((p) => p.id),

		});

		if (!saved.ok) {

			setError(saved.message);

			setStep("review");

			return;

		}

		const confirmed = await confirmProfileDraft(session, saved.data.version, {

			structured: saved.data.structured,

		});

		if (!confirmed.ok) {

			setError(confirmed.message);

			setStep("review");

			return;

		}

		setStep("saved");

	}



	return (

		<div className="ops-dialog-backdrop" role="presentation" onClick={onClose}>

			<div

				className="ops-dialog ops-dialog--wide"

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



				{step === "unavailable" ? <p role="alert">{t.unavailable}</p> : null}



				{step === "explain" ? (

					<div>

						<h3>{t.explainTitle}</h3>

						<p>{t.willStore}</p>

						<p>{t.willNotStore}</p>

						<button type="button" onClick={() => setStep("consent")}>

							{t.continue}

						</button>

					</div>

				) : null}



				{step === "consent" ? (

					<div>

						<h3>{t.consentTitle}</h3>

						<p>{t.consentBody}</p>

						<ul className="ops-consent-list">

							{policies.map((policy) => (

								<li key={policy.id}>

									<label className="ops-checkbox">

										<input

											type="checkbox"

											checked={Boolean(accepted[policy.id])}

											onChange={(e) =>

												setAccepted((current) => ({ ...current, [policy.id]: e.target.checked }))

											}

										/>

										<span>

											<strong>

												{policy.title} ({policy.version})

											</strong>

											<br />

											{policy.summaryText}

										</span>

									</label>

								</li>

							))}

						</ul>

						<div className="ops-dialog__actions">

							<button type="button" className="text-button" onClick={() => setStep("explain")}>

								{t.back}

							</button>

							<button type="button" disabled={!allRequiredAccepted} onClick={() => setStep("auth")}>

								{t.continue}

							</button>

						</div>

					</div>

				) : null}



				{step === "auth" ? (

					<div>

						<WellnessAuthPanel

							locale={locale}

							title={t.authTitle}

							body={t.authBody}

							unavailableMessage={t.authUnavailable}

							onSignedIn={() => setStep("review")}

						/>

						<div className="ops-dialog__actions">

							<button type="button" className="text-button" onClick={() => setStep("consent")}>

								{t.back}

							</button>

						</div>

					</div>

				) : null}



				{(step === "review" || step === "confirming") && (

					<form onSubmit={onConfirm}>

						<h3>{t.reviewTitle}</h3>

						<p>{t.reviewBody}</p>

						{error ? (

							<p role="alert" className="ops-form-error">

								{error}

							</p>

						) : null}

						<label>

							<span>{locale === "ar" ? "الهدف" : "Primary goal"}</span>

							<input

								value={draft.primaryGoal}

								onChange={(e) => setDraft((d) => ({ ...d, primaryGoal: e.target.value }))}

								required

								disabled={step === "confirming"}

							/>

						</label>

						<label>

							<span>{locale === "ar" ? "تحدي الروتين" : "Routine challenge"}</span>

							<input

								value={draft.routineChallenge}

								onChange={(e) => setDraft((d) => ({ ...d, routineChallenge: e.target.value }))}

								required

								disabled={step === "confirming"}

							/>

						</label>

						<label>

							<span>{locale === "ar" ? "وقت الدعم" : "Preferred support timing"}</span>

							<input

								value={draft.preferredSupportTiming}

								onChange={(e) => setDraft((d) => ({ ...d, preferredSupportTiming: e.target.value }))}

								required

								disabled={step === "confirming"}

							/>

						</label>

						<label>

							<span>{locale === "ar" ? "أسلوب المرافقة" : "Coaching style"}</span>

							<input

								value={draft.preferredCoachingStyle}

								onChange={(e) => setDraft((d) => ({ ...d, preferredCoachingStyle: e.target.value }))}

								required

								disabled={step === "confirming"}

							/>

						</label>

						<div className="ops-dialog__actions">

							<button type="button" className="text-button" onClick={() => setStep("auth")} disabled={step === "confirming"}>

								{t.back}

							</button>

							<button type="submit" disabled={step === "confirming"}>

								{step === "confirming" ? "…" : t.confirm}

							</button>

						</div>

					</form>

				)}



				{step === "saved" ? (

					<p role="status">

						<strong>{t.saved}</strong>

					</p>

				) : null}

			</div>

		</div>

	);

}



export function SaveJourneyDialog({ locale, open, onClose, answers, getSessionToken }: Props) {

	if (!open) return null;

	return (

		<SaveJourneyDialogContent

			key={`${locale}:${answers.primaryGoal}:${answers.routineChallenge}`}

			locale={locale}

			onClose={onClose}

			answers={answers}

			getSessionToken={getSessionToken}

		/>

	);

}

