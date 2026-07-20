export type WellnessLocale = "en" | "ar";

export type DiscoveryStage =
	| "goal"
	| "challenge"
	| "planFit"
	| "journeyAsk"
	| "preview";

export type WellnessGoal =
	| "energy"
	| "sleep"
	| "movement"
	| "meals"
	| "consistency"
	| "unsure";

export type DiscoveryAnswers = {
	goal?: string;
	challenge?: string;
	planFit?: string;
	journeyAsk?: string;
	/** Optional coaching defaults used in the personalized preview. */
	supportTime?: string;
	coachingStyle?: string;
};

export type ConversationMessage = {
	id: string;
	role: "sara" | "user";
	text: string;
};

export type DiscoveryState = {
	stage: DiscoveryStage;
	answers: DiscoveryAnswers;
	messages: ConversationMessage[];
	history: Array<{
		stage: DiscoveryStage;
		answers: DiscoveryAnswers;
		messages: ConversationMessage[];
	}>;
};

export type LocalizedChoice = {
	id: string;
	label: string;
};

export type PersonalizedPreview = {
	goalLabel: string;
	startingFocus: string;
	dailySupport: string;
	weeklySupport: string;
	coachingStyle: string;
	actions: string[];
};
