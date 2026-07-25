import {
	buildPersonalizedPreview,
	challengePromptForGoal,
	getChoices,
	nextQuestion,
	planSuggestion,
} from "./locale";
import type {
	ConversationMessage,
	DiscoveryAnswers,
	DiscoveryStage,
	DiscoveryState,
	WellnessLocale,
} from "./types";

const ORDER: DiscoveryStage[] = ["goal", "challenge", "planFit", "journeyAsk", "preview"];

const SESSION_KEY = "wujud-wellness-session-answers";

export function createDiscoveryState(locale: WellnessLocale): DiscoveryState {
	return {
		stage: "goal",
		answers: {},
		messages: [{ id: "sara-opening", role: "sara", text: nextQuestion(locale, "goal") }],
		history: [],
	};
}

function snapshot(state: DiscoveryState) {
	return {
		stage: state.stage,
		answers: { ...state.answers },
		messages: state.messages.map((message) => ({ ...message })),
	};
}

export function persistSessionAnswers(answers: DiscoveryAnswers): void {
	try {
		window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(answers));
	} catch {
		// Preview still works when storage is unavailable.
	}
}

export function clearSessionAnswers(): void {
	try {
		window.sessionStorage.removeItem(SESSION_KEY);
	} catch {
		// Ignore storage failures.
	}
}

export function readSessionAnswers(): DiscoveryAnswers | null {
	try {
		const raw = window.sessionStorage.getItem(SESSION_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as DiscoveryAnswers;
	} catch {
		return null;
	}
}

export function undoLastChoice(state: DiscoveryState): DiscoveryState {
	const previous = state.history[state.history.length - 1];
	if (!previous) return state;
	const restored = {
		stage: previous.stage,
		answers: previous.answers,
		messages: previous.messages,
		history: state.history.slice(0, -1),
	};
	persistSessionAnswers(restored.answers);
	return restored;
}

export function selectDiscoveryAnswer(
	state: DiscoveryState,
	answerId: string,
	label: string,
	locale: WellnessLocale,
): DiscoveryState {
	if (state.stage === "preview") return state;

	const current = state.stage;
	const userMessage: ConversationMessage = {
		id: `user-${current}-${state.messages.length}`,
		role: "user",
		text: label,
	};
	const history = [...state.history, snapshot(state)];

	if (current === "planFit" && answerId === "edit") {
		const answers = { ...state.answers };
		delete answers.planFit;
		delete answers.challenge;
		const next: DiscoveryState = {
			stage: "challenge",
			answers,
			history,
			messages: [
				...state.messages,
				userMessage,
				{
					id: `sara-edit-${state.messages.length + 1}`,
					role: "sara",
					text: challengePromptForGoal(answers.goal, locale),
				},
			],
		};
		persistSessionAnswers(next.answers);
		return next;
	}

	if (current === "journeyAsk" && (answerId === "howWorks" || answerId === "pricing")) {
		const answers = { ...state.answers, journeyAsk: answerId };
		const saraText =
			answerId === "howWorks"
				? locale === "ar"
					? "سارة تساعدك عبر محادثة بسيطة: تشارك ما ترغب في تحسينه، ثم تحصل على خطوة يومية ومراجعة أسبوعية، مع تعديل الخطة عندما يكون يومك مزدحماً.\n\nسأعرض الآن نقطة البداية المقترحة لرحلتك."
					: "SARA helps through a simple conversation: you share what you want to improve, then get a daily step and weekly review, with plan adjustments on busy days.\n\nI’ll show your suggested starting point now."
				: locale === "ar"
					? "الأسعار ستُعلَن بعد مرحلة الوصول المبكر. لا يوجد شراء الآن، ويمكنك الانضمام إلى قائمة الإطلاق بعد عرض رحلتك."
					: "Pricing will be announced after the early-access phase. There is no purchase today, and you can join the launch list after viewing your journey.";
		const next: DiscoveryState = {
			stage: "preview",
			answers,
			history,
			messages: [
				...state.messages,
				userMessage,
				{ id: `sara-${answerId}`, role: "sara", text: saraText },
			],
		};
		persistSessionAnswers(next.answers);
		return next;
	}

	const answers = { ...state.answers, [current]: answerId };
	const index = ORDER.indexOf(current);
	let nextStage = ORDER[index + 1] ?? "preview";
	let saraText = "";

	if (current === "goal") {
		nextStage = "challenge";
		saraText = challengePromptForGoal(answerId, locale);
	} else if (current === "challenge") {
		nextStage = "planFit";
		saraText = planSuggestion(answers.goal, answerId, locale);
	} else if (current === "planFit") {
		nextStage = "journeyAsk";
		saraText = nextQuestion(locale, "journeyAsk");
	} else if (current === "journeyAsk") {
		nextStage = "preview";
		saraText =
			locale === "ar"
				? "إليك نقطة بداية مرنة لرحلتك المقترحة مع سارة."
				: "Here is a flexible starting point for your suggested journey with SARA.";
	}

	const next: DiscoveryState = {
		stage: nextStage,
		answers,
		history,
		messages: [
			...state.messages,
			userMessage,
			{
				id: `sara-${nextStage}-${state.messages.length + 1}`,
				role: "sara",
				text: saraText,
			},
		],
	};
	persistSessionAnswers(next.answers);
	return next;
}

export function submitFreeText(
	state: DiscoveryState,
	text: string,
	locale: WellnessLocale,
): DiscoveryState {
	const normalized = text.normalize("NFC").replace(/\s+/g, " ").trim().slice(0, 400);
	if (!normalized || state.stage === "preview" || state.stage === "planFit" || state.stage === "journeyAsk") {
		return state;
	}
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
		/\b(suicid\w*|kill myself|hurt myself|self[- ]harm|end my life|urgent help|need urgent|immediate danger)\b|انتحار|أقتل نفسي|اقتل نفسي|إيذاء نفسي|أؤذي نفسي|مساعدة عاجلة|مساعدة طارئة|حالة عاجلة/i;
	const medical =
		/\b(diagnos\w*|medication|medicine dose|prescrib\w*|pregnan\w*|eating disorder|anorexi\w*|bulimi\w*)\b|تشخيص|دواء|جرعة|حامل|اضطراب الأكل|فقدان الشهية/i;
	const unsafeRoutine =
		/\b(extreme diet|crash diet|starv\w*|stop eating|no food|exercise (for )?(several|many) hours|work ?out (for )?(several|many) hours)\b|حمية قاسية|نظام غذائي قاس|أتوقف عن الأكل|امتنع عن الأكل|أتمرن لساعات|تمارين لساعات/i;

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
	if (unsafeRoutine.test(text)) {
		return locale === "ar"
			? "لا أستطيع المساعدة في الحرمان الشديد أو التمارين المفرطة. يمكننا بدلاً من ذلك اختيار خطوة عافية صغيرة ومتوازنة، وإذا كان هذا الأمر يعرّض صحتك للخطر فتواصل مع مختص صحي مؤهل."
			: "I can’t help with extreme restriction or excessive exercise. We can choose a small, balanced wellness action instead; if this may put your health at risk, contact a qualified healthcare professional.";
	}
	return null;
}

/** @deprecated Prefer buildPersonalizedPreview — kept for existing test/import compatibility. */
export function buildPersonalizedPlan(
	answers: DiscoveryAnswers,
	locale: WellnessLocale,
): string[] {
	return buildPersonalizedPreview(answers, locale).actions;
}

export { buildPersonalizedPreview };

export function choicesForState(state: DiscoveryState, locale: WellnessLocale) {
	return getChoices(locale, state.stage);
}
