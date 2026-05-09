import { useInView } from "../../hooks/useInView";
import { useParallax } from "../../hooks/useParallax";
import { TECH_CATEGORIES, type TechCategory } from "../../animations/portfolio.data";


// Map accent rgb to a neon color
function accentColor(rgb: string) {
  if (rgb === "74,127,165") return "#00d4ff";
  if (rgb === "139,158,108") return "#00ff88";
  if (rgb === "212,168,67") return "#ffd700";
  return "#a855f7";
}

function CategoryCard({ cat, index }: { cat: TechCategory; index: number }) {
  const { ref, inView } = useInView(0.08);
  const color = accentColor(cat.accentRgb);
  // Alternate big/small bento cells
  const isBig = index === 0 || index === 3 || index === 4 || index === 7 || index === 8;

  return (
    <div
      ref={ref}
      className={`${isBig ? "lg:col-span-2" : "lg:col-span-1"} group rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0f0f1a] p-6 transition-all duration-300 hover:border-[rgba(0,212,255,0.25)] hover:-translate-y-1 ${
        inView ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `${color}15`, boxShadow: `0 0 16px ${color}25` }}
        >
          {cat.emoji}
        </div>
        <div>
          <h3 className="font-bold text-[#e8eaf6] text-base group-hover:text-[#00d4ff] transition-colors">
            {cat.label}
          </h3>
          <p className="text-xs text-[#4a5568] mt-0.5 line-clamp-1">{cat.description}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2">
        {cat.techs.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-lg font-mono transition-all duration-200 hover:scale-105 cursor-default"
            style={{
              background: `${color}0d`,
              color: "#8892b0",
              border: `1px solid ${color}20`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  const scrollY = useParallax();

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 100%)",
      }}
    />
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)",
            filter: "blur(100px)",
            transform: `translateY(${scrollY * 0.06}px)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] text-[#00ff88] text-xs font-medium mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
            Stack
          </div>
          <h1
            className="font-serif font-extrabold text-[#e8eaf6] mb-6 animate-fade-in-up"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
          >
            Full <span className="gradient-text">Tech Stack</span>
          </h1>
          <p className="text-[#8892b0] text-lg max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            {TECH_CATEGORIES.reduce((acc, c) => acc + c.techs.length, 0)}+ technologies across{" "}
            {TECH_CATEGORIES.length} domains — frontend to deployment.
          </p>
        </div>
      </section>

      {/* ── Bento grid ── */}
      <section className="pb-32 relative">
        <div
          className="absolute right-0 top-1/3 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)", filter: "blur(90px)" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TECH_CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
