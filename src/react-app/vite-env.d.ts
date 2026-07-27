/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CUSTOMER_APP_URL?: string;
	readonly VITE_SARA_API_BASE_URL?: string;
	readonly VITE_SARA_HANDOFF_ENABLED?: string;
	readonly VITE_WELLNESS_API_BASE_URL?: string;
	readonly VITE_WELLNESS_WAITLIST_ENABLED?: string;
	readonly VITE_WELLNESS_AUTH_ENABLED?: string;
	readonly VITE_WELLNESS_PAYMENTS_ENABLED?: string;
	readonly VITE_WELLNESS_WHATSAPP_ENABLED?: string;
	readonly VITE_WELLNESS_WHATSAPP_OPERATIONAL_MESSAGES_ENABLED?: string;
	readonly VITE_WELLNESS_WHATSAPP_INBOUND_FIRST_ENABLED?: string;
	readonly VITE_WELLNESS_WHATSAPP_WA_ME_E164?: string;
	readonly VITE_WELLNESS_CANONICAL_ORIGIN?: string;
	readonly VITE_WELLNESS_CLERK_PUBLISHABLE_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
