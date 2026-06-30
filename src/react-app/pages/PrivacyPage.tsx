import { Header } from "../components/Header";
import { SiteFooter } from "../sections/SiteFooter";
import { useLegalPageMeta } from "./useLegalPageMeta";

const PAGE_TITLE = "Privacy Policy | WUJUD";
const PAGE_DESCRIPTION =
	"Privacy Policy for WUJUD, an Omani-born AI company building AI employees for modern businesses.";

export function PrivacyPage() {
	useLegalPageMeta(PAGE_TITLE, PAGE_DESCRIPTION);

	return (
		<div className="landing">
			<Header />
			<div className="main-canvas">
				<main>
					<section className="section container legal" aria-labelledby="privacy-title">
						<header className="legal__head">
							<h1 className="legal__title" id="privacy-title">
								Privacy Policy
							</h1>
							<p className="legal__updated">Last updated: May 15, 2026</p>
						</header>

						<div className="legal__body">
							<p>
								WUJUD is an Omani-born artificial intelligence company building AI employees for modern
								businesses. This Privacy Policy explains how WUJUD collects, uses, stores, and protects
								information when you visit our website, contact us, request a demo, or interact with our
								services.
							</p>

							<h2>Information We Collect</h2>
							<p>
								We may collect information that you provide directly, including your name, company name,
								email address, phone or WhatsApp number, company size, business inquiry, preferred
								communication channel, and any message you submit through our website forms.
							</p>
							<p>
								We may also collect basic technical information such as browser type, device type, IP
								address, pages visited, and general usage data to help improve website performance,
								security, and user experience.
							</p>

							<h2>How We Use Information</h2>
							<p>
								We use the information we collect to respond to inquiries, schedule demos, provide
								information about WUJUD and Sara, improve our website and services, support sales and
								customer service communications, maintain security, and comply with legal or platform
								requirements.
							</p>
							<p>
								If you contact us through WhatsApp, Instagram, website chat, or connected business
								channels, we may use your information to respond to your request and continue the
								conversation.
							</p>

							<h2>Meta and Third-Party Platforms</h2>
							<p>
								WUJUD may integrate with platforms such as WhatsApp, Instagram, Facebook, and other Meta
								services where authorized by a business or user. Information received through these
								platforms is used only to provide the requested communication, support, automation, or
								business service.
							</p>
							<p>We do not sell personal information to advertisers.</p>

							<h2>Data Sharing</h2>
							<p>
								We may share information with trusted service providers that help us operate our website,
								process demo requests, provide email delivery, host infrastructure, maintain security, or
								support integrations. These providers are only allowed to use information as needed to
								provide their services.
							</p>
							<p>
								We may also disclose information if required by law, regulation, legal process, or to
								protect the rights, safety, and security of WUJUD, our users, or others.
							</p>

							<h2>Data Storage and Security</h2>
							<p>
								We take reasonable technical and organizational measures to protect information from
								unauthorized access, loss, misuse, or disclosure. However, no method of transmission or
								storage is completely secure.
							</p>

							<h2>Data Retention</h2>
							<p>
								We keep information only as long as necessary to respond to inquiries, provide services,
								maintain business records, comply with legal obligations, and improve our systems.
							</p>

							<h2>Your Rights</h2>
							<p>
								You may contact us to request access, correction, or deletion of your personal
								information, subject to applicable laws and legitimate business or legal requirements.
							</p>

							<h2>Children’s Privacy</h2>
							<p>
								WUJUD services are intended for businesses and are not directed to children. We do not
								knowingly collect personal information from children.
							</p>

							<h2>International Use</h2>
							<p>
								WUJUD may process information through service providers or infrastructure located in
								different countries. By using our website or services, you understand that your
								information may be processed outside your country of residence.
							</p>

							<h2>Changes to This Policy</h2>
							<p>
								We may update this Privacy Policy from time to time. The updated version will be posted on
								this page with a revised “Last updated” date.
							</p>

							<h2>Contact Us</h2>
							<p>
								If you have questions about this Privacy Policy or wish to request access, correction, or
								deletion of your information, contact us at:
							</p>
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
