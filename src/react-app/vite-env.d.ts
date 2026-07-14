/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CUSTOMER_APP_URL?: string;
	readonly VITE_SARA_API_BASE_URL?: string;
	readonly VITE_SARA_HANDOFF_ENABLED?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
