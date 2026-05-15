import { useCallback, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const INTERESTED_OPTIONS = ["Sara", "Qais", "Hawraa", "Not Sure"] as const;
const CHANNEL_OPTIONS = ["WhatsApp", "Instagram", "Website", "CRM", "Other"] as const;
const SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "501+"] as const;

type FormState = {
	fullName: string;
	companyName: string;
	workEmail: string;
	phoneWhatsapp: string;
	companySize: string;
	interestedIn: string;
	mainChannel: string;
	message: string;
};

const initial: FormState = {
	fullName: "",
	companyName: "",
	workEmail: "",
	phoneWhatsapp: "",
	companySize: "",
	interestedIn: "",
	mainChannel: "",
	message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientValidate(f: FormState): string | null {
	if (!f.fullName.trim()) return "Full name is required.";
	if (!f.companyName.trim()) return "Company name is required.";
	if (!f.workEmail.trim() || !EMAIL_RE.test(f.workEmail.trim())) return "A valid work email is required.";
	if (!f.phoneWhatsapp.trim()) return "Phone / WhatsApp is required.";
	if (!f.companySize) return "Company size is required.";
	if (!INTERESTED_OPTIONS.includes(f.interestedIn as (typeof INTERESTED_OPTIONS)[number])) {
		return "Please select what you are interested in.";
	}
	if (!CHANNEL_OPTIONS.includes(f.mainChannel as (typeof CHANNEL_OPTIONS)[number])) {
		return "Please select a main channel.";
	}
	if (f.message.trim().length < 3) return "Please add a short message (at least a few characters).";
	return null;
}

export function DemoRequestForm() {
	const [form, setForm] = useState<FormState>(initial);
	const [clientError, setClientError] = useState<string | null>(null);
	const [serverError, setServerError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [sending, setSending] = useState(false);

	const disabled = sending || success;

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			const { name, value } = e.target;
			setForm((prev) => ({ ...prev, [name]: value }));
			setClientError(null);
			setServerError(null);
		},
		[],
	);

	const onSubmit = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			setClientError(null);
			setServerError(null);
			const err = clientValidate(form);
			if (err) {
				setClientError(err);
				return;
			}
			setSending(true);
			try {
				const res = await fetch("/api/demo", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						fullName: form.fullName.trim(),
						companyName: form.companyName.trim(),
						workEmail: form.workEmail.trim(),
						phoneWhatsapp: form.phoneWhatsapp.trim(),
						companySize: form.companySize,
						interestedIn: form.interestedIn,
						mainChannel: form.mainChannel,
						message: form.message.trim(),
					}),
				});
				const data = (await res.json()) as { success?: boolean; error?: string };
				if (!res.ok || !data.success) {
					setServerError(data.error || "Something went wrong. Please try again.");
					return;
				}
				setSuccess(true);
			} catch {
				setServerError("Network error. Check your connection and try again.");
			} finally {
				setSending(false);
			}
		},
		[form],
	);

	return (
		<form id="demo-form" className="demo-form" onSubmit={onSubmit} noValidate>
			{success ? (
				<p className="demo-form__banner demo-form__banner--success" role="status">
					Thank you — the WUJUD team will contact you shortly.
				</p>
			) : null}
			{clientError ? (
				<p className="demo-form__banner demo-form__banner--error" role="alert">
					{clientError}
				</p>
			) : null}
			{serverError ? (
				<p className="demo-form__banner demo-form__banner--error" role="alert">
					{serverError}
				</p>
			) : null}

			<div className="demo-form__grid">
				<label className="demo-form__field">
					<span className="demo-form__label">Full name</span>
					<input
						className="demo-form__input"
						name="fullName"
						value={form.fullName}
						onChange={onChange}
						autoComplete="name"
						required
						disabled={disabled}
					/>
				</label>
				<label className="demo-form__field">
					<span className="demo-form__label">Company name</span>
					<input
						className="demo-form__input"
						name="companyName"
						value={form.companyName}
						onChange={onChange}
						autoComplete="organization"
						required
						disabled={disabled}
					/>
				</label>
				<label className="demo-form__field">
					<span className="demo-form__label">Work email</span>
					<input
						className="demo-form__input"
						type="email"
						name="workEmail"
						value={form.workEmail}
						onChange={onChange}
						autoComplete="email"
						required
						disabled={disabled}
					/>
				</label>
				<label className="demo-form__field">
					<span className="demo-form__label">Phone / WhatsApp</span>
					<input
						className="demo-form__input"
						name="phoneWhatsapp"
						value={form.phoneWhatsapp}
						onChange={onChange}
						autoComplete="tel"
						required
						disabled={disabled}
					/>
				</label>
				<label className="demo-form__field">
					<span className="demo-form__label">Company size</span>
					<select
						className="demo-form__input demo-form__select"
						name="companySize"
						value={form.companySize}
						onChange={onChange}
						required
						disabled={disabled}
					>
						<option value="">Select…</option>
						{SIZE_OPTIONS.map((s) => (
							<option key={s} value={s}>
								{s} employees
							</option>
						))}
					</select>
				</label>
				<label className="demo-form__field">
					<span className="demo-form__label">Interested in</span>
					<select
						className="demo-form__input demo-form__select"
						name="interestedIn"
						value={form.interestedIn}
						onChange={onChange}
						required
						disabled={disabled}
					>
						<option value="">Select…</option>
						{INTERESTED_OPTIONS.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</label>
				<label className="demo-form__field demo-form__field--full">
					<span className="demo-form__label">Main channel</span>
					<select
						className="demo-form__input demo-form__select"
						name="mainChannel"
						value={form.mainChannel}
						onChange={onChange}
						required
						disabled={disabled}
					>
						<option value="">Select…</option>
						{CHANNEL_OPTIONS.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</label>
				<label className="demo-form__field demo-form__field--full">
					<span className="demo-form__label">Message</span>
					<textarea
						className="demo-form__input demo-form__textarea"
						name="message"
						value={form.message}
						onChange={onChange}
						rows={4}
						required
						disabled={disabled}
						placeholder="Tell us about your use case, channels, or timing."
					/>
				</label>
			</div>

			<div className="demo-form__actions">
				<button type="submit" className="btn btn--primary btn--lg" disabled={disabled}>
					{sending ? "Sending…" : success ? "Submitted" : "Request demo"}
				</button>
			</div>
		</form>
	);
}
