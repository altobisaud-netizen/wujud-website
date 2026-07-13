import { forwardRef, type Ref } from "react";

type Props = {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	multiline?: boolean;
	placeholder?: string;
};

export const TextFieldBlock = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
	function TextFieldBlock({ id, label, value, onChange, multiline, placeholder }, ref) {
		if (multiline) {
			return (
				<>
					<label className="visually-hidden" htmlFor={id}>
						{label}
					</label>
					<textarea
						id={id}
						ref={ref as Ref<HTMLTextAreaElement>}
						className="conv__field"
						rows={3}
						value={value}
						placeholder={placeholder}
						aria-label={label}
						onChange={(e) => onChange(e.target.value)}
					/>
				</>
			);
		}
		return (
			<>
				<label className="visually-hidden" htmlFor={id}>
					{label}
				</label>
				<input
					id={id}
					ref={ref as Ref<HTMLInputElement>}
					className="conv__field"
					value={value}
					placeholder={placeholder}
					aria-label={label}
					onChange={(e) => onChange(e.target.value)}
				/>
			</>
		);
	},
);
