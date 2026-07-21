/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CUSTOMER_APP_URL?: string;
	readonly VITE_SARA_API_BASE_URL?: string;
	readonly VITE_SARA_HANDOFF_ENABLED?: string;
	readonly VITE_WELLNESS_API_BASE_URL?: string;
	readonly VITE_WELLNESS_WAITLIST_ENABLED?: string;
	readonly VITE_WELLNESS_AUTH_ENABLED?: string;
	readonly VITE_WELLNESS_PAYMENTS_ENABLED?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
