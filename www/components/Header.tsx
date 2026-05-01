import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import SVGIcon from "./SVGIcon";
import { useThemeStore } from "../store/theme";

type NavLinkItem = { label: string; href: string };

function NavLink(props: NavLinkItem & { onClick?: () => void }) {
  const { label, href, onClick } = props;
  const { pathname } = useLocation();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`no-underline transition-colors text-sm font-medium border-b-2 pb-0.5 ${
        active ? "text-info border-info" : "text-text-secondary border-transparent hover:text-text"
      }`}
    >
      {label}
    </Link>
  );
}

function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useThemeStore();

  useEffect(() => { setOpen(false); }, [pathname]);

  const navLinks: NavLinkItem[] = [
    { label: "Home", href: "/" },
    { label: "Skills", href: "/features" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="animate-slide-down border-b border-border bg-bg/80 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 no-underline">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold font-serif text-base shrink-0"
            style={{ background: "var(--color-primary)" }}
          >
            A
          </div>
          <span className="font-sans font-bold text-[1.1rem] tracking-[-0.03em] leading-none text-text select-none">
            Adham
            <span className={`font-normal mx-px text-base ${isDark ? "text-[#7c3aed]" : "text-[#6c7d50]"}`}>
              .
            </span>
            <span style={{ color: "var(--color-info)" }}>dev</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 h-full">
          {navLinks.map((l) => <NavLink key={l.href} {...l} />)}
        </div>

        {/* Right slot */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-1.5 rounded-lg border border-border bg-transparent cursor-pointer transition-colors hover:bg-bg-hover"
          >
            <SVGIcon name={isDark ? "sun" : "moon"} size={17} className="text-text-secondary" />
          </button>
          <div
            className="md:hidden p-2 flex items-center justify-center rounded-md border border-border bg-bg-card transition-colors hover:bg-bg-hover cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <SVGIcon name={open ? "x" : "menu"} size={16} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 px-4 pb-5 pt-4 flex flex-col gap-3 backdrop-blur-md">
          {navLinks.map((l) => <NavLink key={l.href} {...l} onClick={() => setOpen(false)} />)}
        </div>
      )}
    </nav>
  );
}

export default Header;

