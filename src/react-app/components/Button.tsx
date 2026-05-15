import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from "react";

type Variant = "primary" | "ghost";

type Base = {
	variant?: Variant;
	className?: string;
	children: ReactNode;
};

export function Button({
	variant = "primary",
	className = "",
	...props
}: Base & ButtonHTMLAttributes<HTMLButtonElement>) {
	const v = variant === "ghost" ? "btn--ghost" : "btn--primary";
	return <button type="button" className={`btn ${v} ${className}`.trim()} {...props} />;
}

export function ButtonLink({
	variant = "primary",
	className = "",
	href,
	children,
	...props
}: Base & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
	const v = variant === "ghost" ? "btn--ghost" : "btn--primary";
	return (
		<a href={href} className={`btn ${v} ${className}`.trim()} {...props}>
			{children}
		</a>
	);
}
