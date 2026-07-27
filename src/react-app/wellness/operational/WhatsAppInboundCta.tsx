import { readOperationalFlags } from "./flags";

export const WHATSAPP_INBOUND_CTA_COPY = {
	en: {
		title: "Chat with SARA on WhatsApp",
		body: "Send SARA a message whenever you want to check in. You start the conversation, and SARA can support you during the active WhatsApp service window.",
		disclaimer:
			"You initiate the conversation. Replies work only during WhatsApp's active service window. Proactive reminders are unavailable while Meta template access is blocked. Reply STOP anytime. Messages are not sent to an external AI model. WhatsApp is separate from SARA Business.",
		prefill: "START",
		cta: "Open WhatsApp",
	},
	ar: {
		title: "تحدث مع سارا عبر واتساب",
		body: "أرسل رسالة إلى سارا عندما ترغب في تسجيل متابعتك. تبدأ أنت المحادثة، ويمكن لسارا دعمك خلال فترة المحادثة النشطة في واتساب.",
		disclaimer:
			"أنتِ تبدئين المحادثة. الردود متاحة خلال فترة المحادثة النشطة في واتساب فقط. التذكيرات الاستباقية غير متاحة حالياً. أرسلي STOP في أي وقت. لا تُرسل رسائلك إلى نموذج ذكاء اصطناعي خارجي. واتساب منفصل عن SARA Business.",
		prefill: "ابدأ",
		cta: "افتح واتساب",
	},
} as const;

function buildWaMeUrl(e164: string, prefill: string): string {
	const digits = e164.replace(/\D/g, "");
	return `https://wa.me/${digits}?text=${encodeURIComponent(prefill)}`;
}

type Props = {
	locale: "ar" | "en";
};

export function WhatsAppInboundCta({ locale }: Props) {
	const flags = readOperationalFlags();
	if (!flags.whatsappInboundFirstEnabled || !flags.whatsappWaMeE164) {
		return null;
	}

	const copy = WHATSAPP_INBOUND_CTA_COPY[locale];
	const href = buildWaMeUrl(flags.whatsappWaMeE164, copy.prefill);

	return (
		<section className="wellness-whatsapp-inbound" aria-labelledby="wellness-whatsapp-inbound-title">
			<h2 id="wellness-whatsapp-inbound-title">{copy.title}</h2>
			<p>{copy.body}</p>
			<p className="wellness-whatsapp-inbound__disclaimer">{copy.disclaimer}</p>
			<a className="hero-cta hero-cta--primary" href={href} target="_blank" rel="noopener noreferrer">
				{copy.cta}
			</a>
		</section>
	);
}

export function buildWhatsAppWaMeUrl(e164: string, locale: "ar" | "en"): string {
	return buildWaMeUrl(e164, WHATSAPP_INBOUND_CTA_COPY[locale].prefill);
}
