import { CHANNEL_OPTIONS, GOAL_OPTIONS, TARGET_CUSTOMER_OPTIONS } from "../options";
import type { OnboardingDraft, OnboardingStepId } from "../types";

type ReviewStepProps = {
	draft: OnboardingDraft;
	onEdit: (step: OnboardingStepId) => void;
	onCreate: () => void;
	onBack: () => void;
	loading?: boolean;
	disabled?: boolean;
	error?: string | null;
};

function labelsFor(ids: string[], options: readonly { id: string; label: string }[]) {
	return ids
		.map((id) => options.find((o) => o.id === id)?.label ?? id)
		.filter(Boolean)
		.join(", ");
}

export function ReviewStep({ draft, onEdit, onCreate, onBack, loading = false, disabled = false, error }: ReviewStepProps) {
	const customers = labelsFor(draft.targetCustomers, TARGET_CUSTOMER_OPTIONS);
	const channels = labelsFor(draft.channels, CHANNEL_OPTIONS);
	const goals = labelsFor(draft.goals, GOAL_OPTIONS);

	return (
		<div className="sara-step sara-review">
			<h2 className="sara-review__heading" data-sara-autofocus tabIndex={-1}>
				Your SARA profile is ready
			</h2>
			<p className="sara-field__hint">Review the details below. You can edit any section before continuing.</p>

			<div className="sara-review__list">
				<section className="sara-review__card">
					<div className="sara-review__card-head">
						<h3 className="sara-review__label">Business name</h3>
						<button type="button" className="sara-link-btn" onClick={() => onEdit("name")} disabled={disabled}>
							Edit
						</button>
					</div>
					<p className="sara-review__value">{draft.businessName.trim()}</p>
				</section>

				<section className="sara-review__card">
					<div className="sara-review__card-head">
						<h3 className="sara-review__label">Business description</h3>
						<button type="button" className="sara-link-btn" onClick={() => onEdit("description")} disabled={disabled}>
							Edit
						</button>
					</div>
					<p className="sara-review__value">{draft.businessDescription.trim()}</p>
				</section>

				<section className="sara-review__card">
					<div className="sara-review__card-head">
						<h3 className="sara-review__label">Target customers</h3>
						<button type="button" className="sara-link-btn" onClick={() => onEdit("customers")} disabled={disabled}>
							Edit
						</button>
					</div>
					<p className="sara-review__value">
						{customers}
						{draft.targetCustomers.includes("other") && draft.otherCustomerText.trim()
							? ` — ${draft.otherCustomerText.trim()}`
							: ""}
					</p>
				</section>

				<section className="sara-review__card">
					<div className="sara-review__card-head">
						<h3 className="sara-review__label">Selected channels</h3>
						<button type="button" className="sara-link-btn" onClick={() => onEdit("channels")} disabled={disabled}>
							Edit
						</button>
					</div>
					<p className="sara-review__value">{channels}</p>
				</section>

				<section className="sara-review__card">
					<div className="sara-review__card-head">
						<h3 className="sara-review__label">Goals</h3>
						<button type="button" className="sara-link-btn" onClick={() => onEdit("goals")} disabled={disabled}>
							Edit
						</button>
					</div>
					<p className="sara-review__value">{goals}</p>
				</section>
			</div>

			{error ? (
				<p className="sara-field__error" role="alert">
					{error}
				</p>
			) : null}

			<div className="sara-step__actions">
				<button type="button" className="sara-btn sara-btn--ghost" onClick={onBack} disabled={disabled}>
					Back
				</button>
				<button type="button" className="sara-btn sara-btn--primary" onClick={onCreate} disabled={disabled}>
					{loading ? "Creating your secure profile…" : "Create My SARA"}
				</button>
			</div>
		</div>
	);
}
