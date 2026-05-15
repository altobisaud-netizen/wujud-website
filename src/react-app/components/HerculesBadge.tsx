/** Reference site “Built with Hercules” attribution (bottom-right). */
export function HerculesBadge() {
	return (
		<a
			className="hercules-badge"
			href="https://onhercules.app"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Built with Hercules (opens in new tab)"
		>
			<span className="hercules-badge__icon" aria-hidden>
				⚡
			</span>
			<span>Built with Hercules</span>
		</a>
	);
}
