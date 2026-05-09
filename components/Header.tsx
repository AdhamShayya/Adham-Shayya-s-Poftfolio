import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import SVGIcon from "./SVGIcon";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Skills", href: "/features" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* ── Main nav ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-2`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 bg-[rgba(6,6,14,0.92)] backdrop-blur-xl border border-[rgba(0,212,255,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.6)]
             
          `}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 no-underline group">
              <div className="relative w-9 h-9 flex-shrink-0">
                <div className="absolute inset-0 rounded-lg bg-[#00d4ff] opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
                <div className="relative w-9 h-9 rounded-lg border border-[rgba(0,212,255,0.5)] flex items-center justify-center text-[#00d4ff] font-bold text-lg font-serif">
                  A
                </div>
              </div>
              <span className="font-serif font-bold text-lg text-[#e8eaf6] tracking-tight">
                Adham<span className="text-[#00d4ff]">.</span><span className="text-[#a855f7]">dev</span>
              </span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((l) => {
                const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
                return (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 no-underline ${
                      active
                        ? "text-[#00d4ff] bg-[rgba(0,212,255,0.08)]"
                        : "text-[#8892b0] hover:text-[#e8eaf6] hover:bg-[rgba(255,255,255,0.05)]"
                    }`}
                  >
                    {active && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#00d4ff]" />
                    )}
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="/Adham.Shayya-CV (1).pdf"
                download
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#a855f7] border border-[rgba(168,85,247,0.4)] hover:bg-[rgba(168,85,247,0.1)] hover:border-[rgba(168,85,247,0.7)] transition-all duration-200 no-underline"
              >
                Download My CV
              </a>
              <a
                href="mailto:adhamshayya123@gmail.com"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#06060e] bg-[#00d4ff] hover:bg-[#00eeff] transition-all duration-200 no-underline"
                style={{ boxShadow: "0 0 20px rgba(0,212,255,0.35)" }}
              >
                Hire Me
              </a>
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-[rgba(0,212,255,0.2)] text-[#8892b0] hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.5)] transition-all bg-transparent cursor-pointer"
                aria-label="Toggle menu"
              >
                <SVGIcon name={open ? "x" : "menu"} size={17} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-[#0f0f1a] border-l border-[rgba(0,212,255,0.15)] flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Top accent */}
          <div className="h-0.5 bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-transparent" />
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-serif font-bold text-[#e8eaf6]">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[rgba(0,212,255,0.2)] text-[#8892b0] bg-transparent cursor-pointer hover:text-[#00d4ff]"
            >
              <SVGIcon name="x" size={15} />
            </button>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            {NAV.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl no-underline text-sm font-medium transition-all ${
                    active
                      ? "bg-[rgba(0,212,255,0.1)] text-[#00d4ff] border border-[rgba(0,212,255,0.2)]"
                      : "text-[#8892b0] hover:text-[#e8eaf6] hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 pb-8 flex flex-col gap-3">
            <a
              href="/Adham.Shayya-CV (1).pdf"
              download
              className="flex items-center justify-center py-3 rounded-xl text-sm font-semibold text-[#a855f7] border border-[rgba(168,85,247,0.4)] no-underline hover:bg-[rgba(168,85,247,0.1)] transition-all"
            >
              Download My CV
            </a>
            <a
              href="mailto:adhamshayya123@gmail.com"
              className="flex items-center justify-center py-3 rounded-xl text-sm font-semibold text-[#06060e] bg-[#00d4ff] no-underline"
              style={{ boxShadow: "0 0 20px rgba(0,212,255,0.35)" }}
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't hide behind fixed header */}
      <div className="h-20" />
    </>
  );
}
