type Option = { id: string; label: string };

type SingleProps = {
	legend: string;
	options: readonly Option[];
	value: string | null;
	onChange: (id: string) => void;
	name: string;
};

export function SingleSelectQuestion({ legend, options, value, onChange, name }: SingleProps) {
	return (
		<fieldset className="conv__fieldset">
			<legend className="conv__legend">{legend}</legend>
			<div className="conv__options" role="radiogroup" aria-label={legend}>
				{options.map((opt) => (
					<label key={opt.id} className={`conv__chip${value === opt.id ? " conv__chip--quiet" : ""}`}>
						<input
							type="radio"
							name={name}
							value={opt.id}
							checked={value === opt.id}
							onChange={() => onChange(opt.id)}
							className="visually-hidden"
						/>
						{opt.label}
					</label>
				))}
			</div>
		</fieldset>
	);
}

type MultiProps = {
	legend: string;
	options: readonly Option[];
	values: readonly string[];
	onToggle: (id: string) => void;
};

export function MultiSelectQuestion({ legend, options, values, onToggle }: MultiProps) {
	return (
		<fieldset className="conv__fieldset">
			<legend className="conv__legend">{legend}</legend>
			<div className="conv__options" role="group" aria-label={legend}>
				{options.map((opt) => {
					const on = values.includes(opt.id);
					return (
						<label key={opt.id} className={`conv__chip${on ? " conv__chip--quiet" : ""}`}>
							<input
								type="checkbox"
								checked={on}
								onChange={() => onToggle(opt.id)}
								className="visually-hidden"
							/>
							{opt.label}
						</label>
					);
				})}
			</div>
		</fieldset>
	);
}
