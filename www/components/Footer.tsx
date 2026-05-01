import { Link } from "react-router";

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Skills", to: "/features" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const EXTERNAL_LINKS = [
  { label: "GitHub", href: "https://github.com/adhamshayya" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adham-shayya" },
  { label: "Email", href: "mailto:adhamshayya123@gmail.com" },
];

function Footer() {
  return (
    <footer
      className="py-10 mt-auto"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="container mx-auto px-6">
        {/* top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          {/* brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold font-serif text-sm"
                style={{ background: "var(--color-primary)" }}
              >
                A
              </div>
              <span className="font-bold text-base tracking-tight">
                Adham
                <span style={{ color: "var(--color-info)" }}>.dev</span>
              </span>
            </div>
            <p
              className="text-xs leading-relaxed max-w-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Full-Stack Developer · Beirut, Lebanon.
              Building high-performance web experiences.
            </p>
          </div>

          {/* nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs font-medium transition-colors no-underline hover:underline"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* external links */}
          <div className="flex flex-wrap gap-3">
            {EXTERNAL_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full no-underline transition-all hover:-translate-y-0.5"
                style={{
                  color: "var(--color-info)",
                  background: "rgba(74,127,165,0.09)",
                  border: "1px solid rgba(74,127,165,0.18)",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* bottom rule */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            © {new Date().getFullYear()} Adham Shayya. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            +961 81 982 020 · adhamshayya123@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

