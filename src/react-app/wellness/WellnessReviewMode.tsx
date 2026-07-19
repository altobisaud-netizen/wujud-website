import { useState } from "react";
import { shouldEnableReviewMode } from "./reviewMode";

const REVIEW_TASKS = [
	"Explain what SARA does",
	"Select one wellness goal",
	"Complete the discovery journey",
	"Describe the eight-week journey",
	"Find the Safety page",
	"Explain what SARA cannot do",
	"Reach the personalized preview",
	"Consider account willingness",
	"Explain pricing expectations",
	"Switch language where relevant",
] as const;

export function WellnessReviewMode({ onReset }: { onReset: () => void }) {
	const [taskIndex, setTaskIndex] = useState(0);
	const [markers, setMarkers] = useState<string[]>([]);

	if (!shouldEnableReviewMode()) return null;

	function addMarker(marker: string) {
		setMarkers((current) => [...current, `${taskIndex + 1}:${marker}`]);
	}

	function resetSession() {
		setTaskIndex(0);
		setMarkers([]);
		onReset();
	}

	return (
		<aside className="review-mode" aria-label="Moderator review mode">
			<div>
				<strong>Product review mode</strong>
				<span>Sample data only · local session · no analytics</span>
			</div>
			<label>
				Task
				<select
					value={taskIndex}
					onChange={(event) => setTaskIndex(Number(event.target.value))}
				>
					{REVIEW_TASKS.map((task, index) => (
						<option key={task} value={index}>
							{index + 1}. {task}
						</option>
					))}
				</select>
			</label>
			<div className="review-mode__markers" aria-label="Local observation markers">
				<button type="button" onClick={() => addMarker("confusion")}>
					Mark confusion
				</button>
				<button type="button" onClick={() => addMarker("hesitation")}>
					Mark hesitation
				</button>
				<button type="button" onClick={() => addMarker("completed")}>
					Mark complete
				</button>
			</div>
			<button type="button" onClick={resetSession}>
				Reset review journey
			</button>
			<output aria-live="polite">
				{markers.length
					? `${markers.length} local marker${markers.length === 1 ? "" : "s"} — not saved`
					: "No observation markers"}
			</output>
		</aside>
	);
}
