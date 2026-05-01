import { useInView } from "../../hooks/useInView";
import { GlowOrb } from "../../components/GlowOrb";
import { SectionBadge } from "../../components/SectionBadge";
import { AnimatedCounter } from "../../components/AnimatedCounter";
import { EXPERIENCES, GHOST_WORDS, GHOST_CONFIG, PARTICLES, PARTICLE_COLORS } from "../../animations/portfolio.data";
import { useParallax } from "../../hooks/useParallax";

const EDUCATION = {
  degree: "Bachelor of Science in Computer Science",
  school: "Lebanese International University (LIU)",
  gpa: "3.86 / 4.0",
  period: "2021 – 2025",
};

const SOFT_SKILLS = [
  "Communication", "Problem-Solving", "Time Management",
  "Critical Thinking", "Attention to Detail", "Team Collaboration",
];

const LANGUAGES = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Fluent" },
];

export default function AboutPage() {
  const scrollY = useParallax();
  const heroSection = useInView();
  const expSection = useInView();
  const eduSection = useInView();
  const softSection = useInView();

  return (
    <div className="bg-bg overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroSection.ref}
        className="relative pt-4 pb-16 flex flex-col items-center text-center overflow-hidden"
      >
        <GlowOrb color="accent" size={700} opacity={0.26} blur={2}
          className="animate-orb-pulse"
          style={{ top: "-250px", left: "-200px" }}
        />
        <GlowOrb color="warning" size={450} opacity={0.42}
          style={{ bottom: "-120px", right: "-80px" }}
          animation="floatY 11s ease-in-out 1.5s infinite reverse"
        />
        <GlowOrb color="info" size={280} opacity={0.32}
          style={{ top: "35%", right: "8%" }}
          animation="floatY 9s ease-in-out 3s infinite"
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
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
                fontSize: "clamp(40px,6.5vw,100px)",
                fontWeight: 900,
                fontFamily: "var(--font-serif)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(26,35,50,0.04)",
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

        <div className="container relative z-10 max-w-3xl mx-auto px-6 py-20">
          <SectionBadge icon="user" color="info"
            className={`mb-8 ${heroSection.inView ? "animate-fade-in" : "opacity-0"}`}
          >
            About Me
          </SectionBadge>
          <h1
            className={`font-serif text-4xl md:text-5xl mb-6 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "80ms" }}
          >
            Crafting digital products that perform at scale
          </h1>
          <p
            className={`text-base md:text-lg leading-relaxed text-text-secondary max-w-2xl mx-auto ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            I am a Full-Stack Developer based in Beirut with a passion for building
            high-performance web applications — from pixel-perfect React frontends to
            robust Node.js backends, Shopify storefronts, and immersive 3D experiences
            using Three.js and WebGL.
          </p>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "340ms" }}
          >
            {[
              { value: 2, suffix: "+", label: "Years Exp." },
              { value: 15, suffix: "+", label: "Projects" },
              { value: 8, suffix: "", label: "Shopify Stores" },
              { value: 3.86, suffix: "", label: "GPA" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 text-center">
                <span
                  className="text-3xl font-bold font-serif"
                  style={{ color: "var(--color-info)" }}
                >
                  <AnimatedCounter
                    target={s.value}
                    suffix={s.suffix}
                    inView={heroSection.inView}
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
      </section>

      <div className="h-px bg-border" />

      {/* ── EXPERIENCE ───────────────────────────────────────────────────────── */}
      <section ref={expSection.ref} className="py-16 container mx-auto px-6 max-w-4xl">
        <div
          className={`mb-12 ${expSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <SectionBadge icon="award" color="accent" className="mb-4">
            Experience
          </SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl">Work History</h2>
        </div>

        <div className="flex flex-col gap-8">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.company + exp.period}
              className={`relative bg-bg-card rounded-2xl p-7 border border-border shadow-sm card-lift ${expSection.inView ? "animate-slide-in-left" : "opacity-0"}`}
              style={{
                borderLeft: `4px solid rgba(${exp.accent},0.9)`,
                animationDelay: expSection.inView ? `${i * 140}ms` : "0ms",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <h3
                    className="font-bold text-xl"
                    style={{ color: `rgba(${exp.accent},1)` }}
                  >
                    {exp.company}
                  </h3>
                  <p className="font-semibold text-base text-text mt-0.5">
                    {exp.role}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: `rgba(${exp.accent},0.12)`,
                      color: `rgba(${exp.accent},1)`,
                    }}
                  >
                    {exp.period}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {exp.location} · {exp.type}
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: `rgba(${exp.accent},0.8)` }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── EDUCATION ────────────────────────────────────────────────────────── */}
      <section ref={eduSection.ref} className="py-16 container mx-auto px-6 max-w-4xl">
        <div
          className={`mb-10 ${eduSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <SectionBadge icon="graduation-cap" color="warning" className="mb-4">
            Education
          </SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl">Academic Background</h2>
        </div>

        <div
          className={`bg-bg-card rounded-2xl p-8 border border-border shadow-sm ${eduSection.inView ? "animate-scale-in" : "opacity-0"}`}
          style={{ borderTop: "3px solid rgba(212,168,67,0.8)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="font-bold text-xl mb-1">{EDUCATION.school}</h3>
              <p className="text-base font-medium text-text-secondary">{EDUCATION.degree}</p>
              <p className="text-sm text-text-muted mt-1">{EDUCATION.period}</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1">
              <span
                className="text-4xl font-bold font-serif"
                style={{ color: "var(--color-warning)" }}
              >
                {EDUCATION.gpa}
              </span>
              <span className="text-xs font-medium text-text-secondary uppercase tracking-widest">
                GPA
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── SOFT SKILLS + LANGUAGES ──────────────────────────────────────────── */}
      <section ref={softSection.ref} className="py-16 container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* soft skills */}
          <div className={`${softSection.inView ? "animate-slide-in-left" : "opacity-0"}`}>
            <SectionBadge icon="star" color="accent" className="mb-4">
              Soft Skills
            </SectionBadge>
            <div className="flex flex-wrap gap-2 mt-4">
              {SOFT_SKILLS.map((s) => (
                <span
                  key={s}
                  className="text-sm px-4 py-1.5 rounded-full font-medium"
                  style={{
                    background: "rgba(139,158,108,0.1)",
                    color: "var(--color-info)",
                    border: "1px solid rgba(139,158,108,0.22)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* languages */}
          <div
            className={`${softSection.inView ? "animate-slide-in-right" : "opacity-0"}`}
            style={{ animationDelay: "120ms" }}
          >
            <SectionBadge icon="globe" color="info" className="mb-4">
              Languages
            </SectionBadge>
            <div className="flex flex-col gap-3 mt-4">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between bg-bg-card rounded-xl px-5 py-3 border border-border"
                >
                  <span className="font-semibold text-base">{lang.name}</span>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(74,127,165,0.12)",
                      color: "var(--color-info)",
                    }}
                  >
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
