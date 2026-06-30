const PRODUCT = [
	["Overview", "#top"],
	["Sara", "#top"],
	["Sales", "#product"],
	["Integrations", "#integrations"],
] as const;

const SOLUTIONS = [
	["Outcomes", "#solutions"],
	["Security", "#security"],
	["Pricing", "#pricing"],
] as const;

const RESOURCES = [
	["FAQ", "#resources"],
	["Blog", "#resources"],
] as const;

const COMPANY = [
	["AI Employees", "#company"],
	["Contact", "#contact"],
] as const;

function Col({
	title,
	links,
}: {
	title: string;
	links: readonly (readonly [string, string])[];
}) {
	return (
		<div className="footer__col">
			<h3 className="footer__col-title">{title}</h3>
			<ul className="footer__list">
				{links.map(([label, href]) => (
					<li key={label}>
						<a href={href}>{label}</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export function SiteFooter() {
	return (
		<footer className="footer">
			<div className="container footer__mega">
				<div className="footer__brand-block">
					<div className="footer__brand">
						<a href="#top" className="brand-link footer-brand" aria-label="WUJUD home">
							<img src="/assets/wujud-icon.png" alt="" className="brand-icon-img" />
							<img src="/assets/wujud-wordmark.png" alt="WUJUD" className="brand-wordmark-img" />
						</a>
					</div>
					<p className="footer__tagline">Intelligence that exists. Value that lasts.</p>
					<p className="footer__news-title">Stay updated</p>
					<form className="footer__news" onSubmit={(e) => e.preventDefault()}>
						<input type="email" placeholder="Enter your email" aria-label="Email" className="footer__input" />
						<button type="submit" className="footer__submit" aria-label="Subscribe">
							→
						</button>
					</form>
				</div>
				<div className="footer__cols">
					<Col title="Product" links={PRODUCT} />
					<Col title="Solutions" links={SOLUTIONS} />
					<Col title="Resources" links={RESOURCES} />
					<Col title="Company" links={COMPANY} />
				</div>
			</div>
			<div className="footer__bar">
				<div className="container footer__bar-inner">
					<p className="footer__copy">© {new Date().getFullYear()} WUJUD. All rights reserved.</p>
					<nav className="footer__legal" aria-label="Legal">
						<a href="/privacy">Privacy Policy</a>
						<a href="/terms">Terms of Service</a>
						<a href="/data-deletion">Data Deletion</a>
					</nav>
					<div className="footer__social" aria-label="Social">
						<a href="https://www.linkedin.com" className="footer__soc" aria-label="LinkedIn">
							in
						</a>
						<a href="https://twitter.com" className="footer__soc" aria-label="X">
							𝕏
						</a>
						<a href="https://www.youtube.com" className="footer__soc" aria-label="YouTube">
							▶
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
