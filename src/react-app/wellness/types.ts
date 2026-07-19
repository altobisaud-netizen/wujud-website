export type WellnessLocale = "en" | "ar";

export type DiscoveryStage =
	| "goal"
	| "routine"
	| "challenge"
	| "supportTime"
	| "coachingStyle"
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
	routine?: string;
	challenge?: string;
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
};

export type LocalizedChoice = {
	id: string;
	label: string;
};
