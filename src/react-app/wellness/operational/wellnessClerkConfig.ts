export function isWellnessClerkConfigured(): boolean {
	return Boolean(import.meta.env.VITE_WELLNESS_CLERK_PUBLISHABLE_KEY);
}
