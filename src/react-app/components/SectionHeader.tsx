import type { ReactNode } from "react";

type Align = "left" | "center";

type SectionHeaderProps = {
	index: string;
	title: ReactNode;
	lead?: string;
	className?: string;
	headingId?: string;
	align?: Align;
};

export function SectionHeader({
	index,
	title,
	lead,
	className = "",
	headingId,
	align = "left",
}: SectionHeaderProps) {
	const alignClass = align === "center" ? " section-header--center" : "";
	return (
		<header className={`${className}${alignClass}`.trim()}>
			<p className="section__kicker">
				<span className="section__idx">{index}</span>
			</p>
			<h2 className="section__title" id={headingId}>
				{title}
			</h2>
			{lead ? <p className="section__lead">{lead}</p> : null}
		</header>
	);
}
