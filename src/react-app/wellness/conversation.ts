import { getChoices, nextQuestion } from "./locale";
import type {
	ConversationMessage,
	DiscoveryAnswers,
	DiscoveryStage,
	DiscoveryState,
	WellnessLocale,
} from "./types";

const ORDER: DiscoveryStage[] = [
	"goal",
	"routine",
	"challenge",
	"supportTime",
	"coachingStyle",
	"preview",
];

export function createDiscoveryState(locale: WellnessLocale): DiscoveryState {
	return {
		stage: "goal",
		answers: {},
		messages: [{ id: "sara-opening", role: "sara", text: nextQuestion(locale, "goal") }],
	};
}

export function selectDiscoveryAnswer(
	state: DiscoveryState,
	answerId: string,
	label: string,
	locale: WellnessLocale,
): DiscoveryState {
	if (state.stage === "preview") return state;

	const current = state.stage;
	const index = ORDER.indexOf(current);
	const nextStage = ORDER[index + 1] ?? "preview";
	const answers = { ...state.answers, [current]: answerId };
	const userMessage: ConversationMessage = {
		id: `user-${current}-${state.messages.length}`,
		role: "user",
		text: label,
	};

	if (nextStage === "preview") {
		return {
			stage: "preview",
			answers,
			messages: [
				...state.messages,
				userMessage,
				{
					id: "sara-preview",
					role: "sara",
					text:
						locale === "ar"
							? "شكراً لمشاركتك. جهّزت لك نقطة بداية مرنة لرحلة الثمانية أسابيع."
							: "Thanks for sharing that. I’ve prepared a flexible starting point for your eight-week journey.",
				},
			],
		};
	}

	return {
		stage: nextStage,
		answers,
		messages: [
			...state.messages,
			userMessage,
			{
				id: `sara-${nextStage}`,
				role: "sara",
				text: nextQuestion(locale, nextStage),
			},
		],
	};
}

export function submitFreeText(
	state: DiscoveryState,
	text: string,
	locale: WellnessLocale,
): DiscoveryState {
	const normalized = text.normalize("NFC").replace(/\s+/g, " ").trim().slice(0, 400);
	if (!normalized || state.stage === "preview") return state;
	const boundaryReply = safetyBoundaryReply(normalized, locale);
	if (boundaryReply) {
		return {
			...state,
			messages: [
				...state.messages,
				{
					id: `user-boundary-${state.messages.length}`,
					role: "user",
					text: normalized,
				},
				{
					id: `sara-boundary-${state.messages.length + 1}`,
					role: "sara",
					text: boundaryReply,
				},
			],
		};
	}
	return selectDiscoveryAnswer(state, `free-${state.stage}`, normalized, locale);
}

function safetyBoundaryReply(text: string, locale: WellnessLocale): string | null {
	const urgent =
		/\b(suicid\w*|kill myself|hurt myself|self[- ]harm|end my life)\b|انتحار|أقتل نفسي|اقتل نفسي|إيذاء نفسي|أؤذي نفسي/i;
	const medical =
		/\b(diagnos\w*|medication|medicine dose|prescrib\w*|pregnan\w*|eating disorder|anorexi\w*|bulimi\w*)\b|تشخيص|دواء|جرعة|حامل|اضطراب الأكل|فقدان الشهية/i;

	if (urgent.test(text)) {
		return locale === "ar"
			? "يؤسفني أنك تمر بهذا. سارة ليست خدمة طوارئ. إذا كنت في خطر مباشر أو قد تؤذي نفسك، تواصل الآن مع خدمات الطوارئ المحلية ومع شخص تثق به."
			: "I’m sorry you’re going through this. SARA is not an emergency service. If you may be in immediate danger or might hurt yourself, contact local emergency services now and reach out to someone you trust.";
	}
	if (medical.test(text)) {
		return locale === "ar"
			? "يمكنني دعم روتين العافية العامة، لكن لا يمكنني تشخيص الحالات أو اقتراح الأدوية أو أن أحل محل مختص صحي مؤهل. يُرجى سؤال مختص مؤهل عن هذا الأمر."
			: "I can support general wellness routines, but I can’t diagnose conditions, recommend medication, or replace a qualified healthcare professional. Please ask a qualified professional about this.";
	}
	return null;
}

function goalAction(goal: string | undefined, locale: WellnessLocale): string {
	if (locale === "ar") {
		const actions: Record<string, string> = {
			energy: "تسجيل مستوى طاقتك مرة واحدة في اليوم",
			sleep: "إشارة مسائية بسيطة تساعدك على الاستعداد للنوم",
			movement: "فترة حركة قصيرة تناسب يومك",
			meals: "لحظة ملاحظة لانتظام وجباتك وتنوعها",
			consistency: "خطوة يومية صغيرة يسهل تكرارها",
			unsure: "تجربة خطوات صغيرة لمعرفة ما يفيدك أكثر",
		};
		return actions[goal ?? "unsure"] ?? actions.unsure;
	}
	const actions: Record<string, string> = {
		energy: "A consistent morning energy check-in",
		sleep: "One simple evening wind-down cue",
		movement: "One short movement action that fits your day",
		meals: "A brief reflection on meal regularity and variety",
		consistency: "One small daily action that is easy to repeat",
		unsure: "A few small experiments to learn what helps most",
	};
	return actions[goal ?? "unsure"] ?? actions.unsure;
}

function challengeAction(challenge: string | undefined, locale: WellnessLocale): string {
	if (locale === "ar") {
		const actions: Record<string, string> = {
			sleep: "مراجعة قصيرة لما يساعدك على التعافي بعد ليلة صعبة",
			meals: "خيار عملي لوجبة منتظمة في الأيام المزدحمة",
			sitting: "تذكير مرن بالمشي القصير أو التمدد",
			stress: "خطة أصغر للأيام المزدحمة والضاغطة",
			unsure: "تأمل مسائي قصير لملاحظة العوائق",
		};
		return actions[challenge ?? "unsure"] ?? actions.unsure;
	}
	const actions: Record<string, string> = {
		sleep: "A short recovery reflection after a difficult night",
		meals: "One practical regular-meal option for busy days",
		sitting: "A flexible prompt for a short walk or stretch",
		stress: "A smaller fallback action for stressful days",
		unsure: "A short evening reflection to notice barriers",
	};
	return actions[challenge ?? "unsure"] ?? actions.unsure;
}

function supportAction(answers: DiscoveryAnswers, locale: WellnessLocale): string {
	const time = answers.supportTime;
	const style = answers.coachingStyle;
	if (locale === "ar") {
		const timeLabel =
			time === "morning"
				? "الصباح"
				: time === "evening"
					? "المساء"
					: time === "midday"
						? "خلال اليوم"
						: "وقت مرن";
		const styleLabel =
			style === "practical"
				? "بأسلوب مختصر وعملي"
				: style === "reflective"
					? "بأسئلة هادئة للتأمل"
					: style === "gentle"
						? "بتشجيع لطيف"
						: "بمزيج متوازن";
		return `دعم في ${timeLabel} ${styleLabel}`;
	}
	const timeLabel =
		time === "morning"
			? "morning"
			: time === "evening"
				? "evening"
				: time === "midday"
					? "midday"
					: "flexible";
	const styleLabel =
		style === "practical"
			? "short, practical coaching"
			: style === "reflective"
				? "calm reflective questions"
				: style === "gentle"
					? "gentle encouragement"
					: "a balanced coaching mix";
	return `${timeLabel[0].toUpperCase()}${timeLabel.slice(1)} support with ${styleLabel}`;
}

export function buildPersonalizedPlan(
	answers: DiscoveryAnswers,
	locale: WellnessLocale,
): string[] {
	return [
		goalAction(answers.goal, locale),
		challengeAction(answers.challenge, locale),
		supportAction(answers, locale),
	];
}

export function choicesForState(state: DiscoveryState, locale: WellnessLocale) {
	return getChoices(locale, state.stage);
}
