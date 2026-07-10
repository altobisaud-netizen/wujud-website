export type OptionItem = {
	id: string;
	label: string;
};

export const TARGET_CUSTOMER_OPTIONS: readonly OptionItem[] = [
	{ id: "individuals", label: "Individuals" },
	{ id: "small-businesses", label: "Small businesses" },
	{ id: "large-companies", label: "Large companies" },
	{ id: "government", label: "Government entities" },
	{ id: "schools", label: "Schools and universities" },
	{ id: "contractors", label: "Contractors and consultants" },
	{ id: "retail", label: "Retail customers" },
	{ id: "other", label: "Other" },
] as const;

export const CHANNEL_OPTIONS: readonly OptionItem[] = [
	{ id: "whatsapp", label: "WhatsApp" },
	{ id: "instagram", label: "Instagram" },
	{ id: "website-chat", label: "Website chat" },
	{ id: "facebook-messenger", label: "Facebook Messenger" },
	{ id: "email", label: "Email" },
] as const;

export const GOAL_OPTIONS: readonly OptionItem[] = [
	{ id: "leads", label: "Generate more leads" },
	{ id: "qualify", label: "Qualify potential customers" },
	{ id: "answer", label: "Answer customer questions" },
	{ id: "recommend", label: "Recommend products or services" },
	{ id: "book", label: "Book meetings or appointments" },
	{ id: "follow-up", label: "Follow up with customers" },
	{ id: "quotation", label: "Prepare quotation requests" },
	{ id: "support", label: "Improve customer support" },
] as const;
