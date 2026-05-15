/** Matches reference ArrowRightIcon at size-4 (16px). */
export function IconArrowRight({ className = "" }: { className?: string }) {
	return (
		<svg
			className={className}
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden
		>
			<path
				d="M5 12h14m-4-4 4 4-4 4"
				stroke="currentColor"
				strokeWidth="1.75"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
