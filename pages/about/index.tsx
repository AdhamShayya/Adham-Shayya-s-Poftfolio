import { useParallax } from "../../hooks/useParallax";
import { useInView } from "../../hooks/useInView";
import { AnimatedCounter } from "../../components/AnimatedCounter";
import { EXPERIENCES, STATS } from "../../animations/portfolio.data";

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

const SKILLS = [
  { name: "React / Next.js", pct: 95, color: "#00d4ff" },
  { name: "TypeScript", pct: 92, color: "#a855f7" },
  { name: "Node.js / Express", pct: 90, color: "#00ff88" },
  { name: "Shopify / Hydrogen", pct: 88, color: "#ffd700" },
  { name: "Three.js / WebGL", pct: 80, color: "#00d4ff" },
  { name: "PostgreSQL / SQL", pct: 85, color: "#a855f7" },
];

function SkillBar({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[#e8eaf6] font-medium">{name}</span>
        <span className="font-mono" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#0f0f1a] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: inView ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: inView ? `0 0 8px ${color}60` : "none",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

const EDUCATION = [
  {
    degree: "B.S. Computer Science",
    school: "Lebanese International University (LIU)",
    period: "2021 – 2023",
    gpa: "3.86 / 4.0",
    color: "#00d4ff",
  },
];

const LANGUAGES = [
  { lang: "Arabic", level: "Native", color: "#00d4ff" },
  { lang: "English", level: "Fluent", color: "#a855f7" },
];

const SOFT_SKILLS = ["Fast Learner", "Problem Solver", "Team Player", "Detail-Oriented", "Self-Managed", "Deadline Driven"];

type Experience = (typeof EXPERIENCES)[number];

function ExperienceItem({ exp, index }: { exp: Experience; index: number }) {
  const { ref, inView } = useInView(0.1);
  const accent = `rgb(${exp.accent})`;
  return (
    <div
      ref={ref}
      className={`relative ${inView ? "animate-slide-in-right" : "opacity-0"}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Timeline dot */}
      <div
        className="absolute -left-[46px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: accent,
          background: "#06060e",
          boxShadow: `0 0 12px ${accent}60`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
      </div>

      {/* Card */}
      <div
        className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0f0f1a] p-6 transition-all duration-300 hover:border-[rgba(0,212,255,0.2)]"
        style={{ borderLeftColor: `rgba(${exp.accent},0.4)`, borderLeftWidth: "2px" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#e8eaf6]">{exp.role}</h3>
            <p className="font-semibold mt-0.5" style={{ color: accent }}>{exp.company}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: `rgba(${exp.accent},0.12)`, color: accent }}
            >
              {exp.period}
            </span>
            <p className="text-xs text-[#4a5568] mt-1.5">{exp.location} · {exp.type}</p>
          </div>
        </div>
        <ul className="space-y-2">
          {exp.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-[#8892b0]">
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent }} />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const scrollY = useParallax();
  const { ref: statsRef, inView: statsInView } = useInView(0.2);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden">
        <GridBg />
        <div
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
            filter: "blur(100px)",
            transform: `translateY(${scrollY * 0.06}px)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(168,85,247,0.3)] bg-[rgba(168,85,247,0.06)] text-[#a855f7] text-xs font-medium mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              About Me
            </div>
            <h1
              className="font-serif font-extrabold text-[#e8eaf6] mb-6 animate-fade-in-up"
              style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
            >
              The <span className="gradient-text">Developer</span> Behind the Code
            </h1>
            <p className="text-[#8892b0] text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              I'm a full-stack developer from Beirut who turns complex ideas into fast, polished digital products.
              From Shopify stores to 3D interactive tools — I love building things that push the web forward.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} className="py-14 border-y border-[rgba(0,212,255,0.08)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${statsInView ? "animate-counter-pop" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="text-4xl font-extrabold font-serif mb-1"
                  style={{ color: i % 2 === 0 ? "#00d4ff" : "#a855f7", textShadow: `0 0 20px ${i % 2 === 0 ? "rgba(0,212,255,0.4)" : "rgba(168,85,247,0.4)"}` }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix} inView={statsInView} />
                </div>
                <div className="text-xs text-[#4a5568] uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience Timeline ── */}
      <section className="py-24 relative">
        <div
          className="absolute left-0 top-1/2 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs text-[#00d4ff] uppercase tracking-[0.2em] font-medium">Career</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-[#e8eaf6] mt-3">Work Experience</h2>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff] via-[rgba(168,85,247,0.5)] to-transparent" />

            <div className="space-y-12 pl-16">
              {EXPERIENCES.map((exp, i) => (
                <ExperienceItem key={exp.company} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills + Education + Languages ── */}
      <section className="py-24 relative border-t border-[rgba(0,212,255,0.08)]">
        <div
          className="absolute right-0 top-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,255,136,0.07) 0%, transparent 70%)", filter: "blur(90px)" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Skill bars */}
            <div>
              <h2 className="text-2xl font-extrabold font-serif text-[#e8eaf6] mb-8">
                Core <span className="gradient-text">Skills</span>
              </h2>
              <div className="space-y-5">
                {SKILLS.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 80} />
                ))}
              </div>
            </div>

            <div className="space-y-10">
              {/* Education */}
              <div>
                <h2 className="text-2xl font-extrabold font-serif text-[#e8eaf6] mb-6">Education</h2>
                {EDUCATION.map((e) => (
                  <div
                    key={e.school}
                    className="rounded-2xl border border-[rgba(0,212,255,0.15)] bg-[#0f0f1a] p-5"
                    style={{ borderLeftColor: e.color, borderLeftWidth: "2px" }}
                  >
                    <p className="font-bold text-[#e8eaf6] mb-0.5">{e.degree}</p>
                    <p className="text-sm font-medium mb-1" style={{ color: e.color }}>{e.school}</p>
                    <div className="flex gap-4 text-xs text-[#4a5568]">
                      <span>{e.period}</span>
                      <span className="text-[#00ff88] font-semibold">GPA {e.gpa}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div>
                <h2 className="text-2xl font-extrabold font-serif text-[#e8eaf6] mb-6">Languages</h2>
                <div className="space-y-3">
                  {LANGUAGES.map((l) => (
                    <div key={l.lang} className="flex items-center justify-between px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0f0f1a]">
                      <span className="text-sm font-medium text-[#e8eaf6]">{l.lang}</span>
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${l.color}18`, color: l.color }}>{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft skills */}
              <div>
                <h2 className="text-2xl font-extrabold font-serif text-[#e8eaf6] mb-6">Soft Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {SOFT_SKILLS.map((s, i) => {
                    const colors = ["#00d4ff", "#a855f7", "#00ff88", "#ffd700"];
                    const c = colors[i % colors.length]!;
                    return (
                      <span key={s} className="text-sm px-3 py-1.5 rounded-full border font-medium"
                        style={{ borderColor: `${c}30`, background: `${c}0d`, color: c }}>
                        {s}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
