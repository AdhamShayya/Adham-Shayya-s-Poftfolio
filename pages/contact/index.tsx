import { useState, useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { useParallax } from "../../hooks/useParallax";

function GridBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 100%)",
      }}
    />
  );
}

const CONTACT_INFO = [
  { icon: "✉", label: "Email", value: "adhamshayya123@gmail.com", href: "mailto:adhamshayya123@gmail.com", color: "#00d4ff" },
  { icon: "📞", label: "Phone", value: "+961 81 982 020", href: "tel:+96181982020", color: "#a855f7" },
  { icon: "💼", label: "LinkedIn", value: "https://www.linkedin.com/in/adham-shayya-a38806289/", href: "https://www.linkedin.com/in/adham-shayya-a38806289/", color: "#00ff88" },
  { icon: "🐙", label: "GitHub", value: "github.com/adhamshayya", href: "https://github.com/AdhamShayya", color: "#ffd700" },
];

export default function ContactPage() {
  const scrollY = useParallax();
  const { ref: formRef, inView: formInView } = useInView(0.1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const mailto = `mailto:adhamshayya123@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Contact")}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
    window.open(mailto, "_blank");
    setSent(true);
  }

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden">
        <GridBg />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
            filter: "blur(100px)",
            transform: `translateY(${scrollY * 0.06}px)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.06)] text-[#00d4ff] text-xs font-medium mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            Available Now
          </div>
          <h1
            className="font-serif font-extrabold text-[#e8eaf6] mb-6 animate-fade-in-up"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
          >
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-[#8892b0] text-lg max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            Have a project in mind or just want to say hi? I'm always open to new opportunities.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="pb-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Left: contact cards */}
            <div className="lg:col-span-2 space-y-4">
              {CONTACT_INFO.map((c, i) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0f0f1a] no-underline hover:border-[rgba(0,212,255,0.3)] hover:-translate-y-1 transition-all duration-200 animate-fade-in-up`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${c.color}15`, boxShadow: `0 0 12px ${c.color}25` }}
                  >
                    {c.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[#4a5568] uppercase tracking-widest mb-0.5">{c.label}</p>
                    <p className="text-sm text-[#e8eaf6] font-medium break-all group-hover:text-[#00d4ff] transition-colors">{c.value}</p>
                  </div>
                  <span className="ml-auto text-[#4a5568] group-hover:text-[#00d4ff] transition-colors flex-shrink-0">→</span>
                </a>
              ))}

              {/* Availability card */}
                  <div className="mt-6 p-4 rounded-2xl border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.04)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="text-xs text-[#00ff88] font-medium uppercase tracking-widest">Open to work</span>
                </div>
                <p className="text-sm text-[#8892b0]">Available for full-time roles, freelance projects, and interesting collaborations.</p>
              </div>
            </div>

            {/* Right: form */}
            <div
              ref={formRef}
              className={`lg:col-span-3 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0f0f1a] p-4 sm:p-8 ${formInView ? "animate-fade-in-up" : "opacity-0"}`}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
                    style={{ background: "rgba(0,212,255,0.1)", boxShadow: "0 0 24px rgba(0,212,255,0.3)" }}
                  >
                    ✉
                  </div>
                  <h3 className="text-xl font-bold text-[#e8eaf6] mb-2">Message sent!</h3>
                  <p className="text-[#8892b0] text-sm">Your email client should have opened. I'll get back to you soon.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 px-6 py-2 rounded-xl border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm hover:bg-[rgba(0,212,255,0.06)] transition-colors cursor-pointer bg-transparent"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold text-[#e8eaf6] mb-6">Send a message</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                      { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs text-[#4a5568] uppercase tracking-widest mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          required
                          placeholder={field.placeholder}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-[#161625] border border-[rgba(255,255,255,0.08)] text-[#e8eaf6] text-sm placeholder-[#4a5568] outline-none focus:border-[rgba(0,212,255,0.4)] transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs text-[#4a5568] uppercase tracking-widest mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#161625] border border-[rgba(255,255,255,0.08)] text-[#e8eaf6] text-sm placeholder-[#4a5568] outline-none focus:border-[rgba(0,212,255,0.4)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#4a5568] uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project…"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#161625] border border-[rgba(255,255,255,0.08)] text-[#e8eaf6] text-sm placeholder-[#4a5568] outline-none focus:border-[rgba(0,212,255,0.4)] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-[#06060e] bg-[#00d4ff] hover:bg-[#00eeff] transition-all text-sm cursor-pointer border-0"
                    style={{ boxShadow: "0 0 24px rgba(0,212,255,0.35)" }}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
