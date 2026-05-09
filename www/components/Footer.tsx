import { Link } from "react-router";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Skills", href: "/features" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/AdhamShayya" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adham-shayya-a38806289" },
  { label: "Email", href: "mailto:adhamshayya123@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(0,212,255,0.1)] bg-[#06060e] overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-40" />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="container mx-auto px-4 py-14 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="no-underline inline-block mb-3">
              <span className="font-serif font-extrabold text-2xl text-[#e8eaf6]">
                Adham<span className="text-[#00d4ff]">.</span><span className="text-[#a855f7]">dev</span>
              </span>
            </Link>
            <p className="text-xs text-[#4a5568] max-w-xs">
              Full-Stack Developer & Shopify Expert · Beirut, Lebanon
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-5">
            {NAV.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm text-[#4a5568] hover:text-[#00d4ff] transition-colors no-underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0f0f1a] flex items-center justify-center text-base hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.06)] transition-all no-underline px-4"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.04)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4a5568]">
          <span>© {new Date().getFullYear()} Adham Shayya. All rights reserved.</span>
          <span>Built with React · TypeScript · Vite</span>
        </div>
      </div>
    </footer>
  );
}
