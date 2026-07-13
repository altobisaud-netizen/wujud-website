import { DemoRequestForm } from "../../components/DemoRequestForm";

type Props = {
	intro: string;
	pageLinkLabel: string;
};

export function BookDemoBlock({ intro, pageLinkLabel }: Props) {
	return (
		<div className="conv__bubble conv__bubble--sara" style={{ maxWidth: "100%" }}>
			<p>{intro}</p>
			<div className="conv__card" style={{ marginTop: "0.75rem" }}>
				<DemoRequestForm />
			</div>
			<nav className="conv__links">
				<a href="/book-demo">{pageLinkLabel}</a>
			</nav>
		</div>
	);
}
