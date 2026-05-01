import { useInView } from "../../hooks/useInView";
import { GlowOrb } from "../../components/GlowOrb";
import { SectionBadge } from "../../components/SectionBadge";
import { TECH_CATEGORIES, PARTICLES, PARTICLE_COLORS, GHOST_WORDS, GHOST_CONFIG } from "../../animations/portfolio.data";
import { useParallax } from "../../hooks/useParallax";

export default function SkillsPage() {
  const scrollY = useParallax();
  const heroSection = useInView();
  const gridSection = useInView();

  return (
    <div className="flex flex-col bg-bg overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroSection.ref}
        className="relative flex flex-col items-center text-center overflow-hidden py-20"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
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
                WebkitTextStroke: "1.5px rgba(26,35,50,0.042)",
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

        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size, height: p.size,
                left: p.left, bottom: "-8px",
                background: PARTICLE_COLORS[p.colorIdx],
                animation: `particleRise ${p.duration} ${p.delay} ease-in-out infinite`,
                filter: "blur(0.4px)",
              }}
            />
          ))}
        </div>

        <GlowOrb color="accent" size={700} opacity={0.22} blur={2}
          className="animate-orb-pulse"
          style={{ top: -220, left: -180, zIndex: 1 }}
        />
        <GlowOrb color="info" size={450} opacity={0.16}
          style={{ bottom: -100, right: -80, zIndex: 1 }}
          animation="floatY 10s ease-in-out 1s infinite reverse"
        />

        <div className="container relative z-10 max-w-3xl mx-auto px-6">
          <SectionBadge icon="cpu" color="info"
            className={`mb-8 ${heroSection.inView ? "animate-fade-in" : "opacity-0"}`}
          >
            Tech Stack
          </SectionBadge>
          <h1
            className={`font-serif text-4xl md:text-5xl mb-5 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "80ms" }}
          >
            Tools, technologies &amp; expertise
          </h1>
          <p
            className={`text-base md:text-lg leading-relaxed text-text-secondary ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            A comprehensive breakdown of every tool and technology I use to build
            production-ready applications — from WebGL 3D scenes to Shopify storefronts.
          </p>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── TECH GRID ────────────────────────────────────────────────────────── */}
      <section
        ref={gridSection.ref}
        className="py-16 container mx-auto px-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              className={`card-lift bg-bg-card rounded-2xl p-7 border border-border shadow-sm flex flex-col gap-5 ${gridSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                borderTop: `4px solid rgba(${cat.accentRgb},0.85)`,
                animationDelay: gridSection.inView ? `${i * 75}ms` : "0ms",
              }}
            >
              {/* category header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `rgba(${cat.accentRgb},0.1)` }}
                >
                  {cat.emoji}
                </div>
                <div>
                  <span
                    className="font-bold text-sm uppercase tracking-widest block"
                    style={{ color: `rgba(${cat.accentRgb},1)` }}
                  >
                    {cat.label}
                  </span>
                </div>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {cat.techs.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full font-medium transition-all hover:-translate-y-0.5"
                    style={{
                      background: `rgba(${cat.accentRgb},0.07)`,
                      color: `rgba(${cat.accentRgb},1)`,
                      border: `1px solid rgba(${cat.accentRgb},0.18)`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
