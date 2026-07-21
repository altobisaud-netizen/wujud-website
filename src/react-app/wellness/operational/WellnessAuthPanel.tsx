import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { isWellnessClerkConfigured } from "./wellnessClerkConfig";

type AuthPanelProps = {
	locale: "ar" | "en";
	onSignedIn: () => void;
	unavailableMessage: string;
	title: string;
	body: string;
};

export function WellnessAuthPanel({ locale, onSignedIn, unavailableMessage, title, body }: AuthPanelProps) {
	if (!isWellnessClerkConfigured()) {
		return <p role="alert">{unavailableMessage}</p>;
	}

	return (
		<div className="ops-auth-panel">
			<h3>{title}</h3>
			<p>{body}</p>
			<SignedOut>
				<SignIn routing="hash" forceRedirectUrl={window.location.href} signUpUrl="#/sign-up" />
			</SignedOut>
			<SignedIn>
				<p role="status">{locale === "ar" ? "تم تسجيل الدخول." : "You are signed in."}</p>
				<button type="button" onClick={onSignedIn}>
					{locale === "ar" ? "متابعة" : "Continue"}
				</button>
			</SignedIn>
		</div>
	);
}
