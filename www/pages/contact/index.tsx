import React, { useState } from "react";
import { useInView } from "../../hooks/useInView";
import { GlowOrb } from "../../components/GlowOrb";
import { SectionBadge } from "../../components/SectionBadge";

const CONTACT_INFO = [
  { label: "Email", value: "adhamshayya123@gmail.com", href: "mailto:adhamshayya123@gmail.com" },
  { label: "Phone", value: "+961 81 982 020", href: "tel:+96181982020" },
  { label: "LinkedIn", value: "linkedin.com/in/adham-shayya", href: "https://www.linkedin.com/in/adham-shayya" },
  { label: "GitHub", value: "github.com/adhamshayya", href: "https://github.com/adhamshayya" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const formSection = useInView();
  const infoSection = useInView();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-bg)",
    border: "1.5px solid var(--color-border)",
    borderRadius: "0.625rem",
    padding: "0.8rem 1rem",
    fontSize: "0.875rem",
    color: "var(--color-text)",
    outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <div className="bg-bg">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 flex flex-col items-center text-center overflow-hidden">
        <GlowOrb color="accent" size={600} opacity={0.2} blur={2}
          className="animate-orb-pulse"
          style={{ top: -200, left: -150, zIndex: 1 }}
        />
        <GlowOrb color="info" size={380} opacity={0.16}
          style={{ bottom: -80, right: -80, zIndex: 1 }}
          animation="floatY 9s ease-in-out 1.5s infinite reverse"
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container relative z-10 max-w-2xl mx-auto px-6">
          <SectionBadge icon="send" color="info" className="mb-8 animate-fade-in">
            Contact
          </SectionBadge>
          <h1 className="font-serif text-4xl md:text-5xl mb-5 animate-fade-in-up" style={{ animationDelay: "80ms" }}>
            Let us build something together
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-text-secondary animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Have a project in mind or want to explore working together? Send me
            a message and I will get back to you shortly.
          </p>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── FORM + INFO ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-16 max-w-5xl grid  gap-12 items-start">
        {/* Left: info column */}
        <div
          ref={infoSection.ref}
          className={`md:col-span-2 flex flex-col gap-8 ${infoSection.inView ? "animate-slide-in-left" : "opacity-0"}`}
        >
          <div>
            <SectionBadge color="accent" icon="user" className="mb-5">
              Adham Shayya
            </SectionBadge>
            <p className="text-sm text-text-secondary leading-relaxed">
              Full-Stack Developer · Beirut, Lebanon.
              Available for freelance projects, full-time roles, and consulting.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {CONTACT_INFO.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-0.5 p-4 rounded-xl border border-border bg-bg-card card-lift no-underline group"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {item.label}
                </span>
                <span
                  className="text-sm font-medium group-hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-info)" }}
                >
                  {item.value}
                </span>
              </a>
            ))}
          </div>

          <div
            className="rounded-xl p-5 border border-border bg-bg-card"
            style={{ borderLeft: "4px solid rgba(139,158,108,0.8)" }}
          >
            <p className="text-sm font-semibold mb-1">Response time</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              I typically respond within 24 hours. For urgent matters,
              reach out by phone or LinkedIn.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
