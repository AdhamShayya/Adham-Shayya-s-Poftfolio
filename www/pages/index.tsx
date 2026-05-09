import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useParallax } from "../hooks/useParallax";
import { useInView } from "../hooks/useInView";
import { AnimatedCounter } from "../components/AnimatedCounter";
import {
  STATS,
  TECH_CATEGORIES,
  PROJECTS,
  HERO_TAGLINES,
  type Project,
} from "../animations/portfolio.data";

// ── Rotating tagline ──────────────────────────────────────────────────────────
function useRotating(items: string[], interval = 2800) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setFade(true);
      }, 300);
    }, interval);
    return () => clearInterval(t);
  }, [items, interval]);
  return { text: items[idx] ?? items[0], fade };
}

// ── Grid background ───────────────────────────────────────────────────────────
function GridBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
      }}
    />
  );
}

// ── Floating orb ─────────────────────────────────────────────────────────────
function Orb({ color, size, top, left, delay = 0, blur = 80 }: {
  color: string; size: number; top: string; left: string; delay?: number; blur?: number;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none animate-orb-pulse"
      style={{
        width: size, height: size, top, left,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        animationDelay: `${delay}s`,
        transform: "translate(-50%,-50%)",
      }}
    />
  );
}

// ── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>(0.1);
  const accent = `rgb(${p.accent})`;
  return (
    <a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] bg-bg-card no-underline transition-all duration-300 hover:border-[rgba(0,212,255,0.3)] hover:-translate-y-2 ${
        inView ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top accent bar */}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
            style={{ background: `rgba(${p.accent},0.15)`, color: accent }}
          >
            {p.name[0]}
          </div>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: `rgba(${p.accent},0.12)`, color: accent }}
          >
            {p.category === "fullstack" ? "Full-Stack" : p.category === "shopify" ? "Shopify" : "Freelance"}
          </span>
        </div>
        <h3 className="text-lg font-bold text-text mb-2 group-hover:text-[#00d4ff] transition-colors">
          {p.name}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">{p.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.05)] text-text-secondary">
              {t}
            </span>
          ))}
        </div>
      </div>
      {/* Hover glow footer */}
      <div
        className="px-6 py-3 border-t border-[rgba(255,255,255,0.05)] flex items-center gap-2 text-xs font-medium transition-colors"
        style={{ color: accent }}
      >
        <span>View Live</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </a>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const scrollY = useParallax();
  const { ref: statsRef, inView: statsInView } = useInView(0.2);
  const tagline = useRotating(HERO_TAGLINES);

  // Particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const h = (i * 2654435761) >>> 0;
    return {
      id: i,
      left: `${h % 95}%`,
      top: `${(h >> 5) % 90}%`,
      size: 2 + ((h >> 10) % 3),
      delay: `${(h >> 14) % 8}s`,
      dur: `${8 + ((h >> 18) % 6)}s`,
      color: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#a855f7" : "#00ff88",
    };
  });

  return (
    <main>
      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Grid + orbs */}
        <GridBg />
        <Orb color="rgba(0,212,255,0.25)" size={600} top="20%" left="15%" delay={0} blur={120} />
        <Orb color="rgba(124,58,237,0.2)" size={500} top="60%" left="80%" delay={2} blur={100} />
        <Orb color="rgba(0,255,136,0.15)" size={300} top="80%" left="30%" delay={4} blur={90} />

        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none animate-float"
            style={{
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-[rgba(0,212,255,0.4)] to-transparent pointer-events-none"
          style={{ top: `calc(40% - ${scrollY * 0.1}px)` }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-8 pb-20">
          {/* Status badge */}
          <div className="flex justify-center mb-8 animate-fade-in-down">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] text-electric text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              Available for new projects
            </span>
          </div>

          {/* Name */}
          <h1
            className="text-center font-serif font-extrabold leading-tight mb-4 animate-fade-in-up"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              transform: `translateY(${scrollY * 0.12}px)`,
            }}
          >
            <span className="text-text">Adham </span>
            <span className="gradient-text">Shayya</span>
          </h1>

          {/* Rotating tagline */}
          <div
            className="text-center mb-8 h-10 flex items-center justify-center animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <span
              className="text-xl md:text-2xl font-medium transition-opacity duration-300"
              style={{
                opacity: tagline.fade ? 1 : 0,
                color: "#00d4ff",
                textShadow: "0 0 20px rgba(0,212,255,0.5)",
              }}
            >
              {tagline.text}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-center text-text-secondary text-lg max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            Building high-performance web apps, Shopify experiences, and interactive 3D tools from
            <span className="text-text"> Beirut, Lebanon</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            <Link
              to="/projects"
              className="px-8 py-3.5 rounded-xl font-semibold text-[#06060e] bg-[#00d4ff] hover:bg-[#00eeff] transition-all no-underline text-sm"
              style={{ boxShadow: "0 0 30px rgba(0,212,255,0.4)" }}
            >
              View My Work
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 rounded-xl font-semibold text-text border border-[rgba(0,212,255,0.3)] hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.06)] transition-all no-underline text-sm"
            >
              About Me
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-20 animate-float opacity-40">
            <div className="w-px h-16 bg-linear-to-b from-[#00d4ff] to-transparent" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="relative py-16 border-y border-[rgba(0,212,255,0.08)]">
        <div className="absolute inset-0 bg-linear-to-r from-[rgba(0,212,255,0.02)] via-[rgba(124,58,237,0.03)] to-[rgba(0,255,136,0.02)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${statsInView ? "animate-counter-pop" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="text-4xl md:text-5xl font-extrabold font-serif mb-2"
                  style={{ color: i % 2 === 0 ? "#00d4ff" : "#a855f7", textShadow: i % 2 === 0 ? "0 0 20px rgba(0,212,255,0.4)" : "0 0 20px rgba(168,85,247,0.4)" }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix} inView={statsInView} />
                </div>
                <div className="text-xs text-text-secondary uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TECH MARQUEE
      ════════════════════════════════════════════════════ */}
      <section className="py-14 overflow-hidden">
        <p className="text-center text-xs text-text-muted uppercase tracking-[0.2em] mb-8">Tech Stack</p>
        <div className="relative">
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[...TECH_CATEGORIES, ...TECH_CATEGORIES].map((cat, i) => (
              <div
                key={`${cat.id}-${i}`}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.07)] bg-bg-card text-sm text-text-secondary"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURED PROJECTS
      ════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <Orb color="rgba(124,58,237,0.15)" size={400} top="50%" left="90%" blur={100} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs text-[#00d4ff] uppercase tracking-[0.2em] font-medium">Selected Work</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-text mt-3">
              Featured Projects
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.name} p={p} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-[rgba(0,212,255,0.3)] text-[#00d4ff] hover:bg-[rgba(0,212,255,0.06)] transition-all no-underline text-sm font-medium"
            >
              All Projects & Shopify Stores →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <GridBg />
          <Orb color="rgba(0,212,255,0.2)" size={500} top="50%" left="50%" blur={120} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2
            className="font-serif font-extrabold text-text mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Let's Build Something <span className="gradient-text">Remarkable</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10">
            Open to full-time roles, freelance projects, and interesting collaborations.
          </p>
          <a
            href="mailto:adhamshayya123@gmail.com"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-[#06060e] bg-[#00d4ff] hover:bg-[#00eeff] transition-all no-underline text-base btn-glow"
          >
            Get In Touch
            <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
