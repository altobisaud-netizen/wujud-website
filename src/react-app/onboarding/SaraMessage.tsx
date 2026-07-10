import { REF_IMG } from "../assetsRef";

type SaraMessageProps = {
	title: string;
	body?: string;
	variant?: "panel" | "inline";
};

export function SaraMessage({ title, body, variant = "panel" }: SaraMessageProps) {
	return (
		<div className={`sara-msg sara-msg--${variant}`}>
			<div className="sara-msg__avatar-wrap">
				<img src={REF_IMG.sara} alt="" className="sara-msg__avatar" width={48} height={48} />
			</div>
			<div className="sara-msg__copy">
				<p className="sara-msg__eyebrow">SARA · AI Sales Employee by WUJUD.ai</p>
				<p className="sara-msg__title">{title}</p>
				{body ? <p className="sara-msg__body">{body}</p> : null}
			</div>
		</div>
	);
}
