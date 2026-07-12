import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { staggerContainer, staggerItem } from "../motion/tokens";

const FAQS = [
	{
		q: "What exactly is an AI employee?",
		a: "An AI employee is an autonomous digital team member designed for a specific business role. Sara, for example, handles sales and customer service by replying to customers, qualifying leads, answering questions, following up, and helping your team move conversations toward real business outcomes.",
	},
	{
		q: "What can Sara do for my business?",
		a: "Sara can respond to customer inquiries, qualify leads, recommend products or services, answer FAQs, follow up with prospects, collect customer details, support quotations, and update your team with important conversation summaries.",
	},
	{
		q: "Can Sara work on WhatsApp and Instagram?",
		a: "Sara is designed for the channels businesses already use, including WhatsApp, Instagram, website chat, and CRM systems. WhatsApp connection currently requires setup and is pending availability — it is not live customer activation yet. Instagram and additional channels are planned for later releases.",
	},
	{
		q: "Does Sara replace my sales or customer service team?",
		a: "No. Sara supports your team by handling repetitive conversations, first responses, follow-ups, and lead qualification. Your human team can focus on closing important deals, handling complex cases, and building stronger customer relationships.",
	},
	{
		q: "Can Sara understand our products, prices, and company information?",
		a: "Yes. Sara can be trained using your company information, catalogues, FAQs, pricing guidelines, service details, and sales process. She then responds based on your approved business knowledge.",
	},
	{
		q: "Can Sara speak Arabic and English?",
		a: "Yes. Sara can support Arabic and English conversations, making her suitable for GCC businesses that deal with customers in both languages.",
	},
	{
		q: "What happens if Sara cannot answer a question?",
		a: "Sara can escalate the conversation to your team, mark it for human review, or collect the customer's details so your staff can follow up. The goal is to make sure no customer is ignored or lost.",
	},
	{
		q: "Can Sara integrate with our CRM and tools?",
		a: "Sara is built to work with your business tools over time. CRM and channel connections depend on your approved setup and availability — homepage previews are product demonstrations, not live connected integrations.",
	},
	{
		q: "Is our company data secure?",
		a: "WUJUD is built with security, access control, and business privacy in mind. Your data is handled according to your approved setup, and Sara only uses the information you allow her to access.",
	},
	{
		q: "Can we test Sara before committing?",
		a: "Yes. Businesses can book a demo to see how Sara would work for their sales and customer service process before moving into a full setup.",
	},
] as const;

const INITIAL_VISIBLE = 8;

export function FAQSection() {
	const [open, setOpen] = useState<number | null>(0);
	const [showAll, setShowAll] = useState(false);

	const visible = showAll ? [...FAQS] : FAQS.slice(0, INITIAL_VISIBLE);

	const hasMore = !showAll && FAQS.length > INITIAL_VISIBLE;

	return (
		<section className="section container" id="resources" aria-labelledby="faq-title">
			<Reveal>
				<SectionHeader
					align="center"
					headingId="faq-title"
					index="08"
					title={
						<>
							Frequently asked <span className="text-accent">questions.</span>
						</>
					}
					lead="Everything you need to know about WUJUD and Sara."
				/>
			</Reveal>
			<motion.div
				className="faq-list"
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.08 }}
			>
				{visible.map((item, i) => {
					const isOpen = open === i;
					return (
						<motion.div
							key={item.q}
							className={`faq-item${isOpen ? " is-open" : ""}`}
							variants={staggerItem}
						>
							<button
								type="button"
								id={`faq-btn-${i}`}
								aria-expanded={isOpen}
								aria-controls={`faq-panel-${i}`}
								onClick={() => setOpen(isOpen ? null : i)}
							>
								{item.q}
								<span className="faq-item__icon" aria-hidden>
									▼
								</span>
							</button>
							<div className="faq-item__body" id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`}>
								{item.a}
							</div>
						</motion.div>
					);
				})}
			</motion.div>
			{hasMore ? (
				<div style={{ textAlign: "center", marginTop: "0.75rem" }}>
					<button
						type="button"
						className="btn btn--ghost"
						onClick={() => setShowAll(true)}
					>
						Show 2 more questions
					</button>
				</div>
			) : null}
		</section>
	);
}
