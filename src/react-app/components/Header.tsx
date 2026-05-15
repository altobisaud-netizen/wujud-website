import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TOP_NAV } from "../topNav";
import { useNavActive } from "../hooks/useNavActive";
import { dur, easeOutPremium } from "../motion/tokens";

export function Header() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const active = useNavActive();
	const close = useCallback(() => setOpen(false), []);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, close]);

	return (
		<>
			<AnimatePresence>
				{open ? (
					<motion.button
						key="nav-backdrop"
						type="button"
						className="header__backdrop"
						aria-label="Close menu"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: dur.fast, ease: easeOutPremium }}
						onClick={close}
					/>
				) : null}
			</AnimatePresence>
			<header className={`header${open ? " header--open" : ""}${scrolled ? " header--scrolled" : ""}`}>
				<div className="header__bar">
					<div className="header__inner">
						<a href="#top" className="brand-link" aria-label="WUJUD home" onClick={close}>
							<img src="/assets/wujud-icon.png" alt="" className="brand-icon-img" />
							<img src="/assets/wujud-wordmark.png" alt="WUJUD" className="brand-wordmark-img" />
						</a>
						<nav className="header__nav" aria-label="Primary">
							{TOP_NAV.map((item) => (
								<a
									key={item.href}
									className={`header__nav-link${active === item.href ? " header__nav-link--active" : ""}`}
									href={item.href}
									onClick={close}
								>
									{item.label}
								</a>
							))}
						</nav>
						<div className="header__actions">
							<a className="header__cta-text" href="#contact" onClick={close}>
								Book a Demo
							</a>
							<button
								type="button"
								className="header__menu-btn"
								aria-expanded={open}
								aria-controls="header-mobile-nav"
								onClick={() => setOpen((v) => !v)}
								aria-label={open ? "Close menu" : "Open menu"}
							>
								{open ? (
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
										<path
											d="M6 6l12 12M18 6L6 18"
											stroke="currentColor"
											strokeWidth="1.75"
											strokeLinecap="round"
										/>
									</svg>
								) : (
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
										<path
											d="M4 7h16M4 12h16M4 17h16"
											stroke="currentColor"
											strokeWidth="1.6"
											strokeLinecap="round"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
				<div id="header-mobile-nav" className="header__mobile-root" aria-hidden={!open}>
					<AnimatePresence initial={false}>
						{open ? (
							<motion.div
								key="mobile-panel"
								className="header__mobile-panel"
								initial={{ maxHeight: 0, opacity: 0 }}
								animate={{ maxHeight: 520, opacity: 1 }}
								exit={{ maxHeight: 0, opacity: 0 }}
								transition={{ duration: dur.md, ease: easeOutPremium }}
								style={{ overflow: "hidden" }}
							>
								<div className="header__mobile-inner">
									{TOP_NAV.map((item) => (
										<a key={item.href} className="header__mobile-link" href={item.href} onClick={close}>
											{item.label}
										</a>
									))}
									<a className="btn btn--primary btn--mobile-cta" href="#contact" onClick={close}>
										Book a Demo
									</a>
								</div>
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>
			</header>
		</>
	);
}
