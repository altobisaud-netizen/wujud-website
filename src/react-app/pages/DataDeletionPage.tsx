import { Header } from "../components/Header";
import { SiteFooter } from "../sections/SiteFooter";
import { useLegalPageMeta } from "./useLegalPageMeta";

const PAGE_TITLE = "Data Deletion Instructions | WUJUD";
const PAGE_DESCRIPTION =
	"Instructions for requesting deletion of personal data from WUJUD, including data received through Meta, Instagram, Facebook, or WhatsApp Business integrations.";

export function DataDeletionPage() {
	useLegalPageMeta(PAGE_TITLE, PAGE_DESCRIPTION);

	return (
		<div className="landing">
			<Header />
			<div className="main-canvas">
				<main>
					<section className="section container legal" aria-labelledby="data-deletion-title">
						<header className="legal__head">
							<h1 className="legal__title" id="data-deletion-title">
								Data Deletion Instructions
							</h1>
							<p className="legal__updated">Last updated: June 30, 2026</p>
						</header>

						<div className="legal__body">
							<p>
								WUJUD is operated by Tadweer Future Projects LLC, Sultanate of Oman.
							</p>
							<p>
								If you would like to request deletion of personal data associated with your use of WUJUD,
								including data received through Meta, Instagram, Facebook, or WhatsApp Business
								integrations, you may contact us by email.
							</p>

							<h2>How to Request Data Deletion</h2>
							<p>Send an email to:</p>
							<p>
								<a className="legal__link" href="mailto:wujud.sales@gmail.com">
									wujud.sales@gmail.com
								</a>
							</p>
							<p>Use the subject line:</p>
							<p>
								<strong>Data Deletion Request - WUJUD</strong>
							</p>
							<p>Please include:</p>
							<ul>
								<li>Your full name</li>
								<li>Your company name, if applicable</li>
								<li>Your email address</li>
								<li>The connected Instagram, Facebook, or WhatsApp Business account, if applicable</li>
								<li>A short description of the data you want deleted</li>
							</ul>

							<h2>What Happens Next</h2>
							<p>
								After receiving your request, Tadweer Future Projects LLC / WUJUD will review the
								request, verify relevant account details where necessary, and delete or anonymize
								applicable personal data unless retention is required for legal, security, fraud
								prevention, accounting, dispute resolution, or legitimate business purposes.
							</p>
							<p>
								We may contact you if we need additional information to verify or complete the request.
							</p>

							<h2>Privacy Policy</h2>
							<p>
								For more information about how WUJUD collects, uses, stores, and protects data, please
								visit:
							</p>
							<p>
								<a className="legal__link" href="/privacy">
									https://wujud.ai/privacy
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
