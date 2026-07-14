import { useEffect, useId, useState, type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import {
	CHANNEL_OPTIONS,
	GOAL_OPTIONS,
	TARGET_CUSTOMER_OPTIONS,
} from "../../onboarding/options";
import { ONBOARDING_STORAGE_KEY, type OnboardingDraft } from "../../onboarding/types";
import {
	BUILD_SEQUENCE,
	hasUsefulBuildProfile,
	mergeDraftFields,
	validateBusinessDescription,
	validateBusinessName,
	validateChannels,
	validateCustomers,
	validateGoals,
} from "../buildValidation";
import {
	continueAfterBuildSummary,
	executeContinueAfterBuild,
} from "../continueBoundary";
import { copy } from "../locale";
import type { BuildStep, ConvLocale } from "../types";
import { BusinessSummary } from "../blocks/BusinessSummary";
import { MultiSelectQuestion } from "../blocks/ChoiceQuestions";
import { ContinueCta } from "../blocks/ContinueCta";
import { SaraMessage } from "../blocks/SaraMessage";
import { TextFieldBlock } from "../blocks/TextFieldBlock";

type Props = {
	locale: ConvLocale;
	draft: OnboardingDraft;
	step: BuildStep;
	setDraft: Dispatch<SetStateAction<OnboardingDraft>>;
	setStep: (s: BuildStep) => void;
	fieldRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
	onAnnounce: (s: string) => void;
};

function stepMeta(locale: ConvLocale, step: BuildStep) {
	const idx = BUILD_SEQUENCE.indexOf(step);
	return locale === "ar" ? `الخطوة ${idx + 1} من 5` : `Step ${idx + 1} of 5`;
}

function Hint({ id, show, text }: { id: string; show: boolean; text: string }) {
	if (!show) return null;
	return (
		<p id={id} className="conv__field-hint" role="status">
			{text}
		</p>
	);
}

export function BuildPanel({
	locale,
	draft,
	step,
	setDraft,
	setStep,
	fieldRef,
	onAnnounce,
}: Props) {
	const c = copy(locale);
	const hintId = useId();
	const [name, setName] = useState(() => draft.businessName);
	const [desc, setDesc] = useState(() => draft.businessDescription);
	const [other, setOther] = useState(() => draft.otherCustomerText);

	useEffect(() => {
		if (step !== "summary") fieldRef.current?.focus();
	}, [step, fieldRef]);

	const goNext = (partial: Partial<OnboardingDraft>, next: BuildStep) => {
		setDraft((d) =>
			mergeDraftFields(d, {
				...partial,
				step: next === "summary" ? "review" : next,
			}),
		);
		setStep(next);
		onAnnounce(locale === "ar" ? "تم حفظ الإجابة" : "Answer saved");
	};

	if (step === "summary") {
		const customers = draft.targetCustomers
			.map((id) => TARGET_CUSTOMER_OPTIONS.find((o) => o.id === id)?.label ?? id)
			.join(", ");
		const channels = draft.channels
			.map((id) => CHANNEL_OPTIONS.find((o) => o.id === id)?.label ?? id)
			.join(", ");
		const goals = draft.goals
			.map((id) => GOAL_OPTIONS.find((o) => o.id === id)?.label ?? id)
			.join(", ");

		return (
			<>
				<SaraMessage announce>
					<BusinessSummary
						title={c.summaryLead}
						businessName={draft.businessName}
						businessDescription={draft.businessDescription}
						customersLabel={c.customers}
						customers={customers}
						channelsLabel={c.channels}
						channels={channels}
						goalsLabel={c.goals}
						goals={goals}
					/>
				</SaraMessage>
				{hasUsefulBuildProfile(draft) ? (
					<>
						<ContinueCta
							title={c.accountCtaTitle}
							body={c.accountCtaBody}
							note={c.accountContinueNote}
							ctaLabel={c.accountCtaButton}
							onContinue={() => {
								const result = continueAfterBuildSummary();
								executeContinueAfterBuild(result);
							}}
						/>
						<p className="conv__note">
							{locale === "ar" ? "المسودة: " : "Draft key: "}
							<code>{ONBOARDING_STORAGE_KEY}</code>
						</p>
					</>
				) : null}
			</>
		);
	}

	if (step === "name") {
		const ok = validateBusinessName(name);
		return (
			<SaraMessage announce>
				<p className="conv__step-meta">{stepMeta(locale, step)}</p>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (!ok) return;
						goNext({ businessName: name.trim() }, "description");
					}}
				>
					<TextFieldBlock
						id="build-name"
						ref={fieldRef}
						label={c.buildQ.name}
						value={name}
						onChange={setName}
						placeholder={c.buildQ.name}
						describedBy={!ok ? hintId : undefined}
					/>
					<Hint id={hintId} show={!ok} text={c.buildHints.name} />
					<div className="conv__actions">
						<button type="submit" className="conv__btn" disabled={!ok} aria-describedby={!ok ? hintId : undefined}>
							{c.continue}
						</button>
					</div>
				</form>
			</SaraMessage>
		);
	}

	if (step === "description") {
		const ok = validateBusinessDescription(desc);
		return (
			<SaraMessage announce>
				<p className="conv__step-meta">{stepMeta(locale, step)}</p>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (!ok) return;
						goNext({ businessDescription: desc.trim() }, "customers");
					}}
				>
					<TextFieldBlock
						id="build-desc"
						ref={fieldRef}
						label={c.buildQ.description}
						value={desc}
						onChange={setDesc}
						multiline
						placeholder={c.buildQ.description}
						describedBy={!ok ? hintId : undefined}
					/>
					<Hint id={hintId} show={!ok} text={c.buildHints.description} />
					<div className="conv__actions">
						<button type="submit" className="conv__btn" disabled={!ok} aria-describedby={!ok ? hintId : undefined}>
							{c.continue}
						</button>
					</div>
				</form>
			</SaraMessage>
		);
	}

	if (step === "customers") {
		const ok = validateCustomers(draft.targetCustomers, other);
		return (
			<SaraMessage announce>
				<p className="conv__step-meta">{stepMeta(locale, step)}</p>
				<MultiSelectQuestion
					legend={c.buildQ.customers}
					options={TARGET_CUSTOMER_OPTIONS}
					values={draft.targetCustomers}
					onToggle={(id) => {
						setDraft((d) => {
							const next = d.targetCustomers.includes(id)
								? d.targetCustomers.filter((x) => x !== id)
								: [...d.targetCustomers, id];
							return mergeDraftFields(d, { targetCustomers: next });
						});
					}}
				/>
				{draft.targetCustomers.includes("other") ? (
					<div style={{ marginTop: "0.75rem" }}>
						<TextFieldBlock
							id="build-other-customers"
							ref={fieldRef}
							label={locale === "ar" ? "وصف العملاء الآخرين" : "Describe other customers"}
							value={other}
							onChange={setOther}
						/>
					</div>
				) : null}
				<Hint id={hintId} show={!ok} text={c.buildHints.customers} />
				<div className="conv__actions">
					<button
						type="button"
						className="conv__btn"
						disabled={!ok}
						aria-describedby={!ok ? hintId : undefined}
						onClick={() =>
							goNext(
								{ targetCustomers: draft.targetCustomers, otherCustomerText: other },
								"channels",
							)
						}
					>
						{c.continue}
					</button>
				</div>
			</SaraMessage>
		);
	}

	if (step === "channels") {
		const ok = validateChannels(draft.channels);
		return (
			<SaraMessage announce>
				<p className="conv__step-meta">{stepMeta(locale, step)}</p>
				<MultiSelectQuestion
					legend={c.buildQ.channels}
					options={CHANNEL_OPTIONS}
					values={draft.channels}
					onToggle={(id) => {
						setDraft((d) => {
							const next = d.channels.includes(id)
								? d.channels.filter((x) => x !== id)
								: [...d.channels, id];
							return mergeDraftFields(d, { channels: next });
						});
					}}
				/>
				<Hint id={hintId} show={!ok} text={c.buildHints.channels} />
				<div className="conv__actions">
					<button
						type="button"
						className="conv__btn"
						disabled={!ok}
						aria-describedby={!ok ? hintId : undefined}
						onClick={() => goNext({ channels: draft.channels }, "goals")}
					>
						{c.continue}
					</button>
				</div>
			</SaraMessage>
		);
	}

	const ok = validateGoals(draft.goals);
	return (
		<SaraMessage announce>
			<p className="conv__step-meta">{stepMeta(locale, step)}</p>
			<MultiSelectQuestion
				legend={c.buildQ.goals}
				options={GOAL_OPTIONS}
				values={draft.goals}
				onToggle={(id) => {
					setDraft((d) => {
						const next = d.goals.includes(id)
							? d.goals.filter((x) => x !== id)
							: [...d.goals, id];
						return mergeDraftFields(d, { goals: next });
					});
				}}
			/>
			<Hint id={hintId} show={!ok} text={c.buildHints.goals} />
			<div className="conv__actions">
				<button
					type="button"
					className="conv__btn"
					disabled={!ok}
					aria-describedby={!ok ? hintId : undefined}
					onClick={() => goNext({ goals: draft.goals }, "summary")}
				>
					{c.seeSummary}
				</button>
			</div>
		</SaraMessage>
	);
}
