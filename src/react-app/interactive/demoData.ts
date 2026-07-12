/** Deterministic demo content for the interactive homepage. No production APIs. */

export type ScenarioId = "qualify" | "answer" | "follow-up" | "escalate";

export type ChannelId = "whatsapp" | "instagram" | "website-chat" | "email";

export type IndustryId =
	| "retail"
	| "healthcare"
	| "real-estate"
	| "hospitality"
	| "professional"
	| "other";

export type ChannelAvailability = "Available" | "Connection required" | "Coming later";

export const HERO_CHIPS = [
	{
		id: "coffee",
		label: "Coffee shop",
		businessName: "Harbor Roast",
		businessDescription: "Specialty coffee shop serving drinks, pastries, and local beans.",
		channel: "whatsapp" as const,
	},
	{
		id: "clinic",
		label: "Clinic",
		businessName: "BrightCare Clinic",
		businessDescription: "Family clinic helping patients book visits and ask general service questions.",
		channel: "whatsapp" as const,
	},
	{
		id: "real-estate",
		label: "Real estate",
		businessName: "Oasis Homes",
		businessDescription: "Residential real estate agency helping buyers and renters find properties.",
		channel: "instagram" as const,
	},
	{
		id: "retail",
		label: "Retail",
		businessName: "Noon & Night",
		businessDescription: "Retail store selling lifestyle products online and in person.",
		channel: "website-chat" as const,
	},
] as const;

export const SCENARIOS: Record<
	ScenarioId,
	{
		label: string;
		messages: Array<{ role: "customer" | "sara"; text: string }>;
		outcomes: string[];
	}
> = {
	qualify: {
		label: "Qualify a lead",
		messages: [
			{ role: "customer", text: "Hi — do you take new customers this week?" },
			{ role: "sara", text: "Yes. I can help you get started. What are you looking for?" },
			{ role: "customer", text: "We need help for about 20 people." },
			{ role: "sara", text: "Understood. I’ll note the size and share next steps with your team." },
		],
		outcomes: ["Lead captured", "Need identified", "Contact details requested"],
	},
	answer: {
		label: "Answer a question",
		messages: [
			{ role: "customer", text: "What are your opening hours?" },
			{ role: "sara", text: "We’re open Sunday–Thursday, 9am–6pm. Would you like booking options?" },
			{ role: "customer", text: "Yes, tomorrow morning please." },
			{ role: "sara", text: "I can request a morning slot and send confirmation details." },
		],
		outcomes: ["Need identified", "Consistent answer", "Next step offered"],
	},
	"follow-up": {
		label: "Follow up",
		messages: [
			{ role: "sara", text: "Hi again — checking if you still want help choosing a plan." },
			{ role: "customer", text: "Yes, I got busy yesterday." },
			{ role: "sara", text: "No problem. I saved your preferences and can continue from there." },
		],
		outcomes: ["Planned follow-up", "Context retained", "Conversation restarted"],
	},
	escalate: {
		label: "Escalate to a human",
		messages: [
			{ role: "customer", text: "I need to speak with someone about a custom request." },
			{ role: "sara", text: "Of course. I’ll prepare a short summary and connect you with your team." },
			{ role: "customer", text: "Thank you." },
			{ role: "sara", text: "Human assistance is available — I’ve flagged this conversation." },
		],
		outcomes: ["Human assistance available", "Context prepared", "Handoff ready"],
	},
};

export const BUILD_STEPS = [
	{
		id: "profile",
		title: "Business profile",
		body: "Describe what you sell and who you serve so SARA starts with the right context.",
		previewTitle: "Business profile",
		previewLines: ["Business name", "What you sell", "Customer segments"],
	},
	{
		id: "knowledge",
		title: "Knowledge",
		body: "Add approved FAQs, offers, and product details SARA can use confidently.",
		previewTitle: "Knowledge library",
		previewLines: ["Approved answers", "Offers & packages", "Service details"],
	},
	{
		id: "behaviour",
		title: "Sales behaviour",
		body: "Choose how SARA qualifies, follows up, and when she should involve a person.",
		previewTitle: "Sales behaviour",
		previewLines: ["Qualification style", "Follow-up cadence", "Escalation rules"],
	},
	{
		id: "channels",
		title: "Channel selection",
		body: "Pick the channels your customers already use. Connection comes after setup.",
		previewTitle: "Channel selection",
		previewLines: ["WhatsApp", "Instagram", "Website chat"],
	},
	{
		id: "monitor",
		title: "Monitor and improve",
		body: "Review conversations, leads, and performance — then refine what SARA knows.",
		previewTitle: "Operations view",
		previewLines: ["Conversations", "Leads", "Improvement cues"],
	},
] as const;

export const CHANNEL_CARDS: Array<{
	id: ChannelId;
	label: string;
	availability: ChannelAvailability;
	note: string;
}> = [
	{
		id: "whatsapp",
		label: "WhatsApp",
		availability: "Connection required",
		note: "Connection setup after Meta approval — not live provisioning yet.",
	},
	{
		id: "instagram",
		label: "Instagram",
		availability: "Coming later",
		note: "Shown for product planning. Connection comes in a later release.",
	},
	{
		id: "website-chat",
		label: "Website Chat",
		availability: "Coming later",
		note: "Preview of how SARA can support on-site visitors.",
	},
	{
		id: "email",
		label: "Email",
		availability: "Coming later",
		note: "Useful for longer customer conversations once connected.",
	},
];

export const INDUSTRIES: Array<{
	id: IndustryId;
	label: string;
	question: string;
	answer: string;
	qualification: string[];
	dashboard: string[];
}> = [
	{
		id: "retail",
		label: "Retail",
		question: "Do you have this in stock for delivery tomorrow?",
		answer: "I can check availability and share the next delivery options for your area.",
		qualification: ["Product interest", "Urgency", "Delivery preference"],
		dashboard: ["Hot lead", "Product inquiry", "Follow-up scheduled"],
	},
	{
		id: "healthcare",
		label: "Healthcare",
		question: "Can I book a general consultation this week?",
		answer: "Yes — I can share available visit windows and collect the details your clinic needs.",
		qualification: ["Visit type", "Preferred day", "Contact details"],
		dashboard: ["Appointment intent", "Clinic intake", "Human review ready"],
	},
	{
		id: "real-estate",
		label: "Real estate",
		question: "Do you have 2-bedroom homes near the city center?",
		answer: "I can shortlist matching homes and ask a few questions to understand your budget and timeline.",
		qualification: ["Bedrooms", "Location", "Budget range"],
		dashboard: ["Buyer lead", "Property match", "Agent handoff"],
	},
	{
		id: "hospitality",
		label: "Hospitality",
		question: "Do you have a table for four on Friday evening?",
		answer: "I can check seating options and note any preferences for your visit.",
		qualification: ["Party size", "Date & time", "Special requests"],
		dashboard: ["Reservation intent", "Guest preference", "Host notified"],
	},
	{
		id: "professional",
		label: "Professional services",
		question: "Can you help with a consultation next week?",
		answer: "Absolutely. I’ll gather your goals and prepare a clean summary for your team.",
		qualification: ["Service need", "Timeline", "Decision maker"],
		dashboard: ["Qualified inquiry", "Brief prepared", "Meeting request"],
	},
	{
		id: "other",
		label: "Other",
		question: "Can SARA help with customer questions when our team is busy?",
		answer: "Yes — she can reply using your approved knowledge and escalate when a person should take over.",
		qualification: ["Channel preference", "Common questions", "Escalation rules"],
		dashboard: ["Coverage example", "Knowledge applied", "Escalation path"],
	},
];

export const BEFORE_ITEMS = [
	"Missed messages",
	"Delayed follow-up",
	"Manual lead tracking",
	"Inconsistent answers",
] as const;

export const AFTER_ITEMS = [
	"Immediate replies",
	"Structured qualification",
	"Consistent business knowledge",
	"Planned follow-up",
	"Human escalation",
] as const;

export const DASHBOARD_TABS = {
	conversations: {
		label: "Conversations",
		rows: [
			{ title: "Maya · WhatsApp", meta: "Qualified · 2m ago" },
			{ title: "Omar · Instagram", meta: "Waiting · 11m ago" },
			{ title: "Lina · Website", meta: "Escalated · 28m ago" },
		],
	},
	leads: {
		label: "Leads",
		rows: [
			{ title: "Harbor Roast inquiry", meta: "High intent" },
			{ title: "Clinic booking request", meta: "Needs follow-up" },
			{ title: "Property shortlist", meta: "Agent ready" },
		],
	},
	knowledge: {
		label: "Knowledge",
		rows: [
			{ title: "Opening hours", meta: "Approved" },
			{ title: "Delivery policy", meta: "Approved" },
			{ title: "Service packages", meta: "Draft" },
		],
	},
	performance: {
		label: "Performance",
		rows: [
			{ title: "Replies within 1 minute", meta: "Demo sample" },
			{ title: "Leads qualified", meta: "Demo sample" },
			{ title: "Human handoffs", meta: "Demo sample" },
		],
	},
	channels: {
		label: "Channels",
		rows: [
			{ title: "WhatsApp", meta: "Connection required" },
			{ title: "Instagram", meta: "Coming later" },
			{ title: "Website Chat", meta: "Coming later" },
		],
	},
} as const;

export const INTEGRATION_NODES = [
	"WhatsApp",
	"Instagram",
	"Website",
	"Email",
	"CRM",
	"Calendar",
	"Payments",
] as const;

export const CHANNEL_DEMO_OPENERS: Record<ChannelId, string> = {
	whatsapp: "Hi! I saw your WhatsApp — can you help me today?",
	instagram: "Loved your latest post. Do you still have this available?",
	"website-chat": "Hello — I’m on your website. Can SARA help me choose?",
	email: "Hi team — following up on my earlier request.",
};
