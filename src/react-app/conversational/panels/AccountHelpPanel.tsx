import { copy } from "../locale";
import { resolveSignInTarget, openSignIn } from "../signIn";
import type { ConvLocale } from "../types";
import { SaraMessage } from "../blocks/SaraMessage";
import { ErrorRetry } from "../blocks/ContentBlocks";

type Props = {
	locale: ConvLocale;
	onBuild: () => void;
};

export function AccountHelpPanel({ locale, onBuild }: Props) {
	const c = copy(locale);
	const target = resolveSignInTarget();

	if (target.kind === "unavailable") {
		return (
			<SaraMessage announce>
				<ErrorRetry
					message={c.signInUnavailable}
					retryLabel={c.quick.build}
					onRetry={onBuild}
				/>
			</SaraMessage>
		);
	}

	return (
		<SaraMessage announce>
			<p>{c.signInHint}</p>
			<div className="conv__actions">
				<button type="button" className="conv__btn" onClick={() => openSignIn()}>
					{c.navSignIn}
				</button>
				<button type="button" className="conv__btn conv__btn--ghost" onClick={onBuild}>
					{c.quick.build}
				</button>
			</div>
		</SaraMessage>
	);
}
