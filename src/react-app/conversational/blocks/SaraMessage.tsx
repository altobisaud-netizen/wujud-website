import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
	announce?: boolean;
	className?: string;
};

export function SaraMessage({ children, announce = false, className = "" }: Props) {
	return (
		<div
			className={`conv__bubble conv__bubble--sara ${className}`.trim()}
			{...(announce ? { "aria-live": "polite" as const } : {})}
		>
			{children}
		</div>
	);
}

export function VisitorMessage({ children }: { children: ReactNode }) {
	return <div className="conv__bubble conv__bubble--visitor">{children}</div>;
}

export function SystemMessage({ children }: { children: ReactNode }) {
	return <div className="conv__bubble conv__bubble--system">{children}</div>;
}
