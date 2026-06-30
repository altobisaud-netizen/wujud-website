import { Header } from "../components/Header";
import { SiteFooter } from "../sections/SiteFooter";
import { useLegalPageMeta } from "./useLegalPageMeta";

const PAGE_TITLE = "Terms of Service | WUJUD";
const PAGE_DESCRIPTION =
	"Terms of Service for WUJUD, operated by Tadweer Future Projects LLC in the Sultanate of Oman.";

export function TermsPage() {
	useLegalPageMeta(PAGE_TITLE, PAGE_DESCRIPTION);

	return (
		<div className="landing">
			<Header />
			<div className="main-canvas">
				<main>
					<section className="section container legal" aria-labelledby="terms-title">
						<header className="legal__head">
							<h1 className="legal__title" id="terms-title">
								Terms of Service
							</h1>
							<p className="legal__updated">Last updated: June 30, 2026</p>
						</header>

						<div className="legal__body">
							<p>
								WUJUD is operated by Tadweer Future Projects LLC, Sultanate of Oman. These Terms of
								Service govern your access to and use of the WUJUD website, demo forms, software,
								integrations, AI employees, and related services.
							</p>
							<p>
								By using WUJUD, requesting a demo, connecting a business account, or accessing our
								services, you agree to these Terms.
							</p>

							<h2>Use of Services</h2>
							<p>
								WUJUD provides AI-assisted sales, customer service, messaging, workflow, and business
								communication tools. Our services are intended for business use only.
							</p>
							<p>
								You agree to use WUJUD lawfully, responsibly, and only for legitimate business purposes.
								You may not use WUJUD to send spam, unlawful content, misleading messages, harmful
								content, or communications that violate applicable laws, platform policies, or
								third-party rights.
							</p>

							<h2>Business Account Connections</h2>
							<p>
								WUJUD may allow businesses to connect third-party platforms such as WhatsApp, Instagram,
								Facebook, CRM systems, email, or other business tools. You are responsible for ensuring
								that you have the authority to connect and manage those accounts.
							</p>

							<h2>AI-Assisted Responses</h2>
							<p>
								Sara and other WUJUD AI employees may help generate, suggest, or send responses based on
								your approved business information, workflows, and connected systems. You remain
								responsible for reviewing and approving business communications where required.
							</p>

							<h2>Data and Privacy</h2>
							<p>
								Our handling of personal data is described in our Privacy Policy at{" "}
								<a className="legal__link" href="/privacy">
									https://wujud.ai/privacy
								</a>
								.
							</p>

							<h2>Third-Party Platforms</h2>
							<p>
								Your use of third-party platforms, including Meta, WhatsApp, Instagram, Facebook, and
								other services, is also subject to those platforms’ own terms, policies, and
								requirements.
							</p>

							<h2>Service Availability</h2>
							<p>
								We aim to provide reliable services, but we do not guarantee uninterrupted or
								error-free operation. Services may change, be updated, suspended, or discontinued.
							</p>

							<h2>Limitation of Liability</h2>
							<p>
								To the fullest extent permitted by applicable law, WUJUD and Tadweer Future Projects LLC
								are not liable for indirect, incidental, special, consequential, or punitive damages
								arising from your use of the services.
							</p>

							<h2>Contact</h2>
							<p>For questions about these Terms, contact:</p>
							<p>
								<a className="legal__link" href="mailto:wujud.sales@gmail.com">
									wujud.sales@gmail.com
								</a>
							</p>
						</div>
					</section>
				</main>
				<SiteFooter />
			</div>
		</div>
	);
}
