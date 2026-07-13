type Choice = { id: string; label: string };

type Props = {
	prompt: string;
	choices: readonly Choice[];
	onSelect: (id: string) => void;
	groupLabel?: string;
};

export function ClarificationChoices({ prompt, choices, onSelect, groupLabel }: Props) {
	return (
		<>
			<p>{prompt}</p>
			<div className="conv__chips" role="group" aria-label={groupLabel ?? prompt}>
				{choices.map((c) => (
					<button
						key={c.id}
						type="button"
						className="conv__chip"
						onClick={() => onSelect(c.id)}
					>
						{c.label}
					</button>
				))}
			</div>
		</>
	);
}
