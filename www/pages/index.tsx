import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { GlowOrb } from "../components/GlowOrb";
import { useParallax } from "../hooks/useParallax";
import { SectionBadge } from "../components/SectionBadge";
import { AnimatedCounter } from "../components/AnimatedCounter";
import {
  STATS,
  PROJECTS,
  PARTICLES,
  GHOST_WORDS,
  GHOST_CONFIG,
  PARTICLE_COLORS,
  TECH_CATEGORIES,
  HERO_TAGLINES,
} from "../animations/portfolio.data";

// ── Rotating tagline hook ────────────────────────────────────────────────────
function useRotatingTagline(items: string[], interval = 2800) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setVisible(true);
      }, 350);
    }, interval);
    return () => clearInterval(timer);
  }, [items, interval]);

  return { label: items[idx] ?? items[0]!, visible };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const scrollY = useParallax();
  const statsSection = useInView();
  const techSection = useInView();
  const projectsSection = useInView();
  const projectsHeader = useInView();
  const ctaSection = useInView();
  const { label: tagline, visible: taglineVisible } =
    useRotatingTagline(HERO_TAGLINES);

  return (
    <div className="flex flex-col bg-bg">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-[92vh] py-20">
        {/* dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(26,35,50,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* parallax ghost words */}
        {GHOST_WORDS.map((word, i) => {
          const cfg = GHOST_CONFIG[i]!;
          return (
            <div
              key={word}
              className="absolute pointer-events-none select-none"
              style={{
                fontSize: "clamp(40px,7vw,108px)",
                fontWeight: 900,
                fontFamily: "var(--font-serif)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(26,35,50,0.045)",
                whiteSpace: "nowrap",
                left: cfg.left,
                top: cfg.top,
                zIndex: 1,
                transform: `translateY(${scrollY * cfg.pSpeed}px)`,
                animation: `floatY ${8 + i * 1.6}s ease-in-out ${i * 0.9}s infinite${cfg.reverse ? " reverse" : ""}`,
              }}
            >
              {word}
            </div>
          );
        })}

        {/* floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                bottom: "-8px",
                background: PARTICLE_COLORS[p.colorIdx],
                animation: `particleRise ${p.duration} ${p.delay} ease-in-out infinite`,
                filter: "blur(0.4px)",
              }}
            />
          ))}
        </div>

        {/* glow orbs */}
        <GlowOrb color="accent" size={700} opacity={0.2} blur={2}
          className="animate-orb-pulse"
          style={{ top: -220, left: -200, transform: `translateY(${scrollY * 0.2}px)`, zIndex: 1 }}
        />
        <GlowOrb color="warning" size={500} opacity={0.15}
          style={{ bottom: -150, right: -80, zIndex: 1, transform: `translateY(${scrollY * -0.14}px)`, animation: "floatY 11s ease-in-out 1s infinite reverse" }}
        />
        <GlowOrb color="info" size={320} opacity={0.14}
          style={{ top: "32%", right: "7%", zIndex: 1, transform: `translateY(${scrollY * 0.1}px)`, animation: "floatY 8s ease-in-out 2s infinite" }}
        />

        {/* hero content */}
        <div className="container relative mx-auto px-6 flex flex-col items-center text-center" style={{ zIndex: 10 }}>
          <SectionBadge color="info" icon="rocket" className="mb-8 animate-fade-in">
            Available for new projects
          </SectionBadge>

          <h1
            className="font-serif leading-tight mb-4 animate-fade-in-up"
            style={{ fontSize: "clamp(2.8rem,7.5vw,5.2rem)", animationDelay: "80ms" }}
          >
            Adham Shayya
          </h1>

          {/* rotating tagline */}
          <div className="h-12 flex items-center justify-center mb-6">
            <span
              className="text-xl md:text-2xl font-semibold font-mono"
              style={{
                color: "var(--color-info)",
                opacity: taglineVisible ? 1 : 0,
                transform: taglineVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {tagline}
            </span>
          </div>

          <p
            className="animate-fade-in-up text-base md:text-lg leading-relaxed mb-10 max-w-2xl text-text-secondary"
            style={{ animationDelay: "220ms" }}
          >
            I build full-stack web applications, Shopify experiences and
            3D-powered UIs — from performant Node.js backends to WebGL
            product configurators. Based in Beirut, working globally.
          </p>

          <div
            className="animate-fade-in-up flex flex-wrap gap-4 justify-center mb-10"
            style={{ animationDelay: "340ms" }}
          >
            <Link
              to="/projects"
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-primary no-underline transition-all hover:opacity-90 hover:-translate-y-0.5"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border border-border text-text no-underline transition-all hover:bg-bg-card hover:-translate-y-0.5"
            >
              Get In Touch
            </Link>
          </div>

          {/* quick contact badges */}
          <div
            className="animate-fade-in flex flex-wrap gap-3 justify-center"
            style={{ animationDelay: "500ms" }}
          >
            {[
              { label: "adhamshayya123@gmail.com", href: "mailto:adhamshayya123@gmail.com" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/adham-shayya" },
              { label: "GitHub", href: "https://github.com/adhamshayya" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-3.5 py-1.5 rounded-full no-underline transition-all hover:-translate-y-0.5"
                style={{
                  color: "var(--color-info)",
                  background: "rgba(74,127,165,0.1)",
                  border: "1px solid rgba(74,127,165,0.2)",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────────── */}
      <div
        ref={statsSection.ref}
        className="py-8 border-y border-border bg-bg-card"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col gap-1 ${statsSection.inView ? "animate-counter-pop" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-3xl md:text-4xl font-bold font-serif" style={{ color: "var(--color-info)" }}>
                  <AnimatedCounter
                    target={s.value}
                    suffix={s.suffix}
                    inView={statsSection.inView}
                    duration={1600}
                  />
                </span>
                <span className="text-xs font-medium text-text-secondary uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TECH HIGHLIGHTS ───────────────────────────────────────────────────── */}
      <section className="py-16 container mx-auto px-6">
        <div
          ref={techSection.ref}
          className={`text-center mb-12 ${techSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <SectionBadge color="accent" icon="cpu" className="mb-6">
            Tech Stack
          </SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Tools I work with every day
          </h2>
          <p className="text-base max-w-xl mx-auto text-text-secondary">
            From 3D WebGL scenes to Shopify storefronts, I pick the right tool for the job.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_CATEGORIES.slice(0, 6).map((cat, i) => (
            <div
              key={cat.id}
              className={`card-lift bg-bg-card rounded-2xl p-6 border border-border shadow-sm ${techSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                borderTop: `3px solid rgba(${cat.accentRgb},0.8)`,
                animationDelay: techSection.inView ? `${i * 90}ms` : "0ms",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{cat.emoji}</span>
                <span
                  className="font-bold text-sm uppercase tracking-widest"
                  style={{ color: `rgba(${cat.accentRgb},1)` }}
                >
                  {cat.label}
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                {cat.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.techs.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: `rgba(${cat.accentRgb},0.08)`,
                      color: `rgba(${cat.accentRgb},1)`,
                      border: `1px solid rgba(${cat.accentRgb},0.18)`,
                    }}
                  >
                    {t}
                  </span>
                ))}
                {cat.techs.length > 6 && (
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium text-text-muted border border-border">
                    +{cat.techs.length - 6} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm border border-border text-text-secondary no-underline transition-all hover:bg-bg-card hover:-translate-y-0.5"
          >
            View full tech stack →
          </Link>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── FEATURED PROJECTS ─────────────────────────────────────────────────── */}
      <section className="py-16 container mx-auto px-6">
        <div
          ref={projectsHeader.ref}
          className={`text-center mb-12 ${projectsHeader.inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <SectionBadge color="warning" icon="globe" className="mb-6">
            Work
          </SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Projects I have shipped
          </h2>
          <p className="text-base max-w-xl mx-auto text-text-secondary">
            Live production applications — from Shopify storefronts to full-stack platforms.
          </p>
        </div>

        <div
          ref={projectsSection.ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.slice(0, 6).map((project, i) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-lift bg-bg-card rounded-2xl p-6 border border-border shadow-sm no-underline flex flex-col gap-4 group ${projectsSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                borderTop: `3px solid rgba(${project.accent},0.8)`,
                animationDelay: projectsSection.inView ? `${i * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3
                  className="font-bold text-lg group-hover:opacity-80 transition-opacity"
                  style={{ color: `rgba(${project.accent},1)` }}
                >
                  {project.name}
                </h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
                  style={{
                    background: `rgba(${project.accent},0.1)`,
                    color: `rgba(${project.accent},1)`,
                    border: `1px solid rgba(${project.accent},0.2)`,
                  }}
                >
                  {project.category === "shopify" ? "Shopify" : project.category === "freelance" ? "Freelance" : "Full-Stack"}
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-md font-medium text-text-muted"
                    style={{ background: "var(--color-bg-muted)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: `rgba(${project.accent},0.9)` }}
              >
                {project.url.replace("https://", "")} →
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/projects"
            className="btn-glow inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white bg-primary no-underline transition-all hover:opacity-90 hover:-translate-y-0.5"
          >
            View all projects →
          </Link>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 container mx-auto px-6">
        <div
          ref={ctaSection.ref}
          className={`rounded-3xl px-10 py-16 flex flex-col items-center text-center max-w-2xl mx-auto relative overflow-hidden bg-bg-card shadow-xl border border-border ${ctaSection.inView ? "animate-scale-in" : "opacity-0"}`}
        >
          <GlowOrb color="accent" size={400} opacity={0.22} blur={0}
            style={{ top: -120, left: -60 }}
            animation="floatY 9s ease-in-out infinite"
          />
          <GlowOrb color="info" size={280} opacity={0.16} blur={0}
            style={{ bottom: -80, right: -60 }}
            animation="floatY 7s ease-in-out 1.5s infinite reverse"
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <SectionBadge color="info" icon="send" className="mb-2">
              Let us work together
            </SectionBadge>
            <h2 className="font-serif text-3xl md:text-4xl">
              Have a project in mind?
            </h2>
            <p className="text-base text-text-secondary max-w-md">
              Whether it is a new Shopify storefront, a full-stack platform, or a
              3D product experience — I would love to hear about it.
            </p>
            <Link
              to="/contact"
              className="btn-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-primary no-underline transition-all hover:opacity-90 hover:-translate-y-0.5"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
