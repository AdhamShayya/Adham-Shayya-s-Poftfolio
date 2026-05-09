import { useState, useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { useParallax } from "../../hooks/useParallax";
import { PROJECTS, SHOPIFY_STORES, MOBILE_APPS, type Project, type ShopifyStore, type MobileApp } from "../../animations/portfolio.data";

// ── Screenshot Project Card ───────────────────────────────────────────────────
function IframeCard({ p, index }: { p: Project; index: number }) {
  const { ref, inView } = useInView(0.08);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const accent = `rgb(${p.accent})`;
  const screenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(p.url)}?w=1200&h=750`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (el == null) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  }

  return (
    <div
      ref={ref}
      className={`${inView ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div
        ref={cardRef}
        className="group rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] bg-[#0f0f1a] transition-all duration-300 cursor-pointer"
        style={{
          transform: hovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          transition: hovered ? "transform 0.1s ease" : "transform 0.4s ease",
          boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(${p.accent},0.15)` : "none",
          borderColor: hovered ? `rgba(${p.accent},0.4)` : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      >
        {/* Accent top line */}
        <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${accent}, rgba(${p.accent},0.3), transparent)` }} />

        {/* Screenshot preview */}
        <div className="relative w-full overflow-hidden bg-[#08080f]" style={{ height: "220px" }}>
          {/* Loading skeleton */}
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-[rgba(0,212,255,0.3)] border-t-[#00d4ff] animate-spin" />
                <span className="text-xs text-[#4a5568]">Loading preview…</span>
              </div>
            </div>
          )}
          {/* Fallback when screenshot fails */}
          {imgError && (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(${p.accent},0.08) 0%, transparent 70%)` }}>
              <span className="text-[#4a5568] text-sm">{p.name}</span>
            </div>
          )}
          <img
            src={screenshotUrl}
            alt={`${p.name} preview`}
            className={`w-full h-full object-cover object-top transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true); }}
          />
          {/* Overlay with visit button on hover */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
            style={{ background: "rgba(6,6,14,0.7)", backdropFilter: "blur(2px)" }}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-[#06060e] bg-[#00d4ff] no-underline text-sm hover:bg-[#00eeff] transition-colors"
              style={{ boxShadow: "0 0 24px rgba(0,212,255,0.5)" }}
              onClick={(e) => e.stopPropagation()}
            >
              Open Live Site →
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-[#e8eaf6] group-hover:text-[#00d4ff] transition-colors">{p.name}</h3>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: `rgba(${p.accent},0.12)`, color: accent }}>
              {p.category === "fullstack" ? "Full-Stack" : p.category === "shopify" ? "Shopify" : "Freelance"}
            </span>
          </div>
          <p className="text-sm text-[#8892b0] leading-relaxed mb-4 line-clamp-2">{p.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.slice(0, 5).map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.05)] text-[#4a5568] font-mono">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shopify Store Card ────────────────────────────────────────────────────────
function StoreCard({ s, index }: { s: ShopifyStore; index: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>(0.08);
  const colors = ["#00d4ff", "#a855f7", "#00ff88", "#ffd700", "#ff6b6b", "#00d4ff", "#a855f7", "#00ff88"];
  const c = colors[index % colors.length]!;
  const newLocal = "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0";
  return (
    <a
      ref={ref}
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#0f0f1a] no-underline hover:border-[rgba(0,212,255,0.3)] hover:-translate-y-1 transition-all duration-200 ${
        inView ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Tooltip */}
      <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="px-3 py-1.5 rounded-lg bg-[#12121e] border border-[rgba(168,85,247,0.45)] text-xs text-[#e8eaf6] whitespace-nowrap shadow-lg shadow-black/50">
          Enter password{" "}
          <span className="font-mono text-[#a855f7]">"demo"</span>
          {" "}if required
        </div>
        {/* Arrow */}
        <div className="mx-auto w-fit">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid rgba(168,85,247,0.45)",
            }}
          />
        </div>
      </div>

      <div
        className={newLocal}
        style={{ background: `${c}18`, color: c, boxShadow: `0 0 12px ${c}30` }}
      >
        {s.name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#e8eaf6] group-hover:text-[#00d4ff] transition-colors truncate">{s.name}</p>
        <p className="text-[10px] text-[#a855f7]">password: demo</p>
      </div>
      <span className="text-[#4a5568] group-hover:text-[#00d4ff] transition-colors text-sm">→</span>
    </a>
  );
}

// ── Mobile App Card ───────────────────────────────────────────────────────────
function MobileAppCard({ app, index }: { app: MobileApp; index: number }) {
  const { ref, inView } = useInView(0.08);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const accent = `rgb(${app.accent})`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  }

  return (
    <div
      ref={ref}
      className={`${inView ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        ref={cardRef}
        className="group h-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] bg-[#0f0f1a] transition-all duration-300 cursor-default"
        style={{
          transform: hovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          transition: hovered ? "transform 0.1s ease" : "transform 0.4s ease",
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.6), 0 0 50px rgba(${app.accent},0.12)`
            : "none",
          borderColor: hovered ? `rgba(${app.accent},0.35)` : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      >
        {/* Accent top bar */}
        <div
          className="h-0.5"
          style={{ background: `linear-gradient(90deg, ${accent}, rgba(${app.accent},0.25), transparent)` }}
        />

        {/* Subtle glow bg */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse 60% 40% at 30% 0%, rgba(${app.accent},0.06) 0%, transparent 70%)` }}
        />

        <div className="relative p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            {/* App icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
              style={{
                background: `linear-gradient(135deg, rgba(${app.accent},0.25) 0%, rgba(${app.accent},0.08) 100%)`,
                border: `1px solid rgba(${app.accent},0.25)`,
                boxShadow: hovered ? `0 0 20px rgba(${app.accent},0.2)` : "none",
              }}
            >
              {app.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-base font-extrabold text-[#e8eaf6] group-hover:text-white transition-colors tracking-wide">
                  {app.name}
                </h3>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                  style={{ background: `rgba(${app.accent},0.12)`, color: accent }}
                >
                  {app.category}
                </span>
              </div>
              {/* Downloads + platform badge */}
              <div className="flex items-center gap-3 text-[11px] text-[#4a5568]">
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" style={{ color: accent }}>
                    <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-8 2h16v2H4v-2z" />
                  </svg>
                  {app.downloads} downloads
                </span>
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current text-[#3ddc84]">
                    <path d="M17.523 15.341L13 12.815V7h-2v6.185l5.023 2.86.5-.864zM6.18 1.003L.5 6.683l1.414 1.415L7.596 2.41 6.18 1.003zM23.5 6.683l-5.68-5.68-1.416 1.407 5.682 5.688L23.5 6.683zM12 4C7.032 4 3 8.032 3 13s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 16c-3.867 0-7-3.133-7-7s3.133-7 7-7 7 3.133 7 7-3.133 7-7 7z"/>
                  </svg>
                  Android
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#8892b0] leading-relaxed mb-5">{app.shortDescription}</p>

          {/* Features */}
          <ul className="space-y-2 mb-5">
            {app.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#8892b0]">
                <span
                  className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${app.accent},0.15)` }}
                >
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {app.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.05)] text-[#4a5568] font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA — dual store buttons */}
          <div className="mt-auto flex flex-col gap-2.5">
            {/* Google Play */}
            <a
              href={app.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-xl font-semibold text-sm no-underline transition-all duration-200"
              style={{
                background: hovered
                  ? `linear-gradient(135deg, rgba(${app.accent},0.18) 0%, rgba(${app.accent},0.06) 100%)`
                  : "rgba(255,255,255,0.04)",
                border: `1px solid rgba(${app.accent},${hovered ? "0.4" : "0.12"})`,
                color: hovered ? accent : "#8892b0",
                boxShadow: hovered ? `0 0 16px rgba(${app.accent},0.12)` : "none",
              }}
            >
              {/* Google Play icon */}
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M3.18 23.76a2 2 0 0 1-1.18-1.8V2.04C2 1.22 2.56.54 3.3.18L13.9 10.78l-10.72 12.98zM16.04 8.72l2.58-1.48 3.02 1.74c.86.5.86 1.56 0 2.06l-3.02 1.74-2.58-1.48 2.58-1.58-2.58-1zM4.14.06l11.48 11.5-3.6 3.6L4.14.06zm0 23.88l7.88-7.88 3.6 3.6L4.14 23.94z"/>
              </svg>
              Google Play
            </a>
            {/* App Store */}
            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-xl font-semibold text-sm no-underline transition-all duration-200"
              style={{
                background: hovered
                  ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,${hovered ? "0.15" : "0.07"})`,
                color: hovered ? "#e8eaf6" : "#8892b0",
              }}
            >
              {/* Apple icon */}
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Filter ────────────────────────────────────────────────────────────────────
type Filter = "all" | "fullstack" | "shopify" | "freelance";
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "shopify", label: "Shopify" },
  { id: "freelance", label: "Freelance" },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const scrollY = useParallax();
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden">
   <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 100%)",
      }}
    />
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: `translateY(${scrollY * 0.08}px)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.05)] text-[#00d4ff] text-xs font-medium mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Work
          </div>
          <h1
            className="font-serif font-extrabold text-[#e8eaf6] mb-6 animate-fade-in-up"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
          >
            Projects & <span className="gradient-text">Stores</span>
          </h1>
          <p className="text-[#8892b0] text-lg max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            Live sites, full-stack apps, and Shopify builds — all with real URLs.
          </p>
        </div>
      </section>

      {/* ── Filter tabs ── */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  filter === f.id
                    ? "bg-[#00d4ff] text-[#06060e] border-[#00d4ff]"
                    : "bg-transparent text-[#8892b0] border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.3)] hover:text-[#e8eaf6]"
                }`}
                style={filter === f.id ? { boxShadow: "0 0 20px rgba(0,212,255,0.3)" } : {}}
              >
                {f.label}
                <span className="ml-2 text-xs opacity-60">
                  {f.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects grid with iframe previews ── */}
      <section className="pb-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <IframeCard key={p.name} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent mb-24" />
      </div>

      {/* ── Shopify stores ── */}
      <section className="pb-32 relative">
        <div
          className="absolute right-0 top-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14 space-y-4">
            <span className="text-xs text-[#a855f7] uppercase tracking-[0.2em] font-medium">Shopify</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-[#e8eaf6] mt-3">
              Store Portfolio
            </h2>
            <p className="text-[#8892b0] mt-3 max-w-sm mx-auto text-sm">
              8 live Shopify stores built with Hydrogen, Oxygen, and Liquid — click any to visit.
            </p>
            <p className="mx-auto text-center text-2xl md:hidden"> Enter <span className="font-mono text-[#a855f7]">demo</span> to access the store.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {SHOPIFY_STORES.map((s, i) => (
              <StoreCard key={s.name} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(168,85,247,0.2)] to-transparent mb-24" />
      </div>

      {/* ── Mobile Apps ── */}
      <section className="pb-32 relative">
        <div
          className="absolute left-0 top-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)", filter: "blur(100px)" }}
        />
        <div
          className="absolute right-0 bottom-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.05)] text-[#00d4ff] text-xs font-medium animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
              Published on Google Play
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-[#e8eaf6] mt-3">
              Mobile <span className="gradient-text">Development</span>
            </h2>
            <p className="text-[#8892b0] mt-3 max-w-md mx-auto text-sm leading-relaxed">
              Cross-platform Android applications built with React Native — from B2B tools to consumer travel apps.
            </p>
          </div>

          {/* App cards — max 2 columns, wide cards */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {MOBILE_APPS.map((app, i) => (
              <MobileAppCard key={app.name} app={app} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
