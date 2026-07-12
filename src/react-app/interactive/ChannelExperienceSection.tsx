import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { dur, easeOutPremium } from "../motion/tokens";
import { CHANNEL_CARDS, CHANNEL_DEMO_OPENERS, type ChannelId } from "./demoData";
import { useStagedMessages } from "./useStagedMessages";

export function ChannelExperienceSection() {
	const reduce = useReducedMotion();
	const [channel, setChannel] = useState<ChannelId>("whatsapp");
	const card = CHANNEL_CARDS.find((c) => c.id === channel)!;
	const messages = useMemo(
		() => [
			{ role: "customer" as const, text: CHANNEL_DEMO_OPENERS[channel] },
			{
				role: "sara" as const,
				text: "Happy to help. I’ll use your approved business knowledge and keep things clear.",
			},
			{ role: "customer" as const, text: "Can you also follow up if I get busy?" },
			{
				role: "sara" as const,
				text: "Yes — planned follow-up is part of the product experience once your channels are connected.",
			},
		],
		[channel]
	);
	const visible = useStagedMessages(messages.length, channel, reduce);

	return (
		<section className="ihp-section" id="channels" aria-labelledby="channels-title">
			<div className="container">
				<p className="ihp-kicker">Channel experience</p>
				<h2 id="channels-title" className="ihp-section__title">
					Meet customers where they already are
				</h2>
				<p className="ihp-section__lead">
					Select a channel to preview the conversation style. Availability labels stay accurate while
					connections are prepared.
				</p>

				<div className="ihp-channel-grid">
					{CHANNEL_CARDS.map((item) => (
						<button
							key={item.id}
							type="button"
							className={`ihp-channel-card${channel === item.id ? " ihp-channel-card--on" : ""}`}
							aria-pressed={channel === item.id}
							onClick={() => setChannel(item.id)}
						>
							<strong>{item.label}</strong>
							<span className={`ihp-badge ihp-badge--${item.availability.replace(/\s+/g, "-").toLowerCase()}`}>
								{item.availability}
							</span>
							<small>{item.note}</small>
						</button>
					))}
				</div>

				<div className="ihp-panel ihp-channel-demo">
					<p className="ihp-channel-demo__meta">
						{card.label} preview · {card.availability}
					</p>
					<div className="ihp-scenario__thread">
						<AnimatePresence initial={false}>
							{messages.slice(0, visible).map((msg, index) => (
								<motion.div
									key={`${channel}-${index}`}
									className={`ihp-msg ihp-msg--${msg.role}`}
									initial={reduce ? false : { opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: dur.md, ease: easeOutPremium }}
								>
									<span className="ihp-msg__who">{msg.role === "sara" ? "SARA" : "Customer"}</span>
									<p className={`ihp-bubble ihp-bubble--${msg.role}`}>{msg.text}</p>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
					<p className="ihp-sr-only" aria-live="polite">
						{visible > 0
							? `${messages[visible - 1].role === "sara" ? "SARA" : "Customer"}: ${messages[visible - 1].text}`
							: ""}
					</p>
					<p className="ihp-note">Interactive product demonstration — channel not connected from this page.</p>
				</div>
			</div>
		</section>
	);
}
