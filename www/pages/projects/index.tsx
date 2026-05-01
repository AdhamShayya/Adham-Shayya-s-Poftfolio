import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import { GlowOrb } from "../../components/GlowOrb";
import { SectionBadge } from "../../components/SectionBadge";
import { useParallax } from "../../hooks/useParallax";
import {
  PROJECTS,
  SHOPIFY_STORES,
  PARTICLES,
  PARTICLE_COLORS,
  GHOST_WORDS,
  GHOST_CONFIG,
  type Project,
} from "../../animations/portfolio.data";

type Filter = "all" | "fullstack" | "shopify" | "freelance";

const FILTER_LABELS: Record<Filter, string> = {
  all: "All",
  fullstack: "Full-Stack",
  shopify: "Shopify",
  freelance: "Freelance",
};

export default function ProjectsPage() {
  const scrollY = useParallax();
  const heroSection = useInView();
  const projectsSection = useInView();
  const shopifySection = useInView();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered: Project[] =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

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
            backgroundImage:
              "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
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

        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 3 }}
        >
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

        <GlowOrb
          color="accent"
          size={700}
          opacity={0.2}
          blur={2}
          className="animate-orb-pulse"
          style={{ top: -220, left: -180, zIndex: 1 }}
        />
        <GlowOrb
          color="warning"
          size={450}
          opacity={0.15}
          style={{
            bottom: -100,
            right: -80,
            zIndex: 1,
            animation: "floatY 10s ease-in-out 1s infinite reverse",
          }}
        />

        <div className="container relative z-10 max-w-3xl mx-auto px-6">
          <SectionBadge
            icon="globe"
            color="warning"
            className={`mb-8 ${heroSection.inView ? "animate-fade-in" : "opacity-0"}`}
          >
            Portfolio
          </SectionBadge>
          <h1
            className={`font-serif text-4xl md:text-5xl mb-5 ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "80ms" }}
          >
            Projects I've shipped
          </h1>
          <p
            className={`text-base md:text-lg leading-relaxed text-text-secondary ${heroSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            Live production applications across full-stack platforms, Shopify
            storefronts, and freelance engagements.
          </p>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── FILTER TABS ──────────────────────────────────────────────────────── */}
      <div className="py-6 container mx-auto px-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={
                filter === f
                  ? {
                      background: "var(--color-primary)",
                      color: "white",
                      border: "1.5px solid transparent",
                    }
                  : {
                      background: "transparent",
                      color: "var(--color-text-secondary)",
                      border: "1.5px solid var(--color-border)",
                    }
              }
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* ── PROJECTS GRID ────────────────────────────────────────────────────── */}
      <section
        ref={projectsSection.ref}
        className="py-8 pb-16 container mx-auto px-6"
      >
        {filtered.length === 0 ? (
          <p className="text-center text-text-muted py-16">
            No projects in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-lift bg-bg-card rounded-2xl p-7 border border-border shadow-sm no-underline flex flex-col gap-4 group ${projectsSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{
                  borderTop: `4px solid rgba(${project.accent},0.85)`,
                  animationDelay: projectsSection.inView
                    ? `${i * 90}ms`
                    : "0ms",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="font-bold text-xl group-hover:opacity-80 transition-opacity"
                    style={{ color: `rgba(${project.accent},1)` }}
                  >
                    {project.name}
                  </h3>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold shrink-0 mt-1"
                    style={{
                      background: `rgba(${project.accent},0.1)`,
                      color: `rgba(${project.accent},1)`,
                      border: `1px solid rgba(${project.accent},0.22)`,
                    }}
                  >
                    {project.category === "shopify"
                      ? "Shopify"
                      : project.category === "freelance"
                        ? "Freelance"
                        : "Full-Stack"}
                  </span>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
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
                  className="text-xs font-semibold mt-auto pt-2 border-t border-border"
                  style={{ color: `rgba(${project.accent},0.9)` }}
                >
                  {project.url.replace("https://", "")} →
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <div className="h-px bg-border" />

      {/* ── SHOPIFY STORES ───────────────────────────────────────────────────── */}
      <section
        ref={shopifySection.ref}
        className="py-16 container mx-auto px-6"
      >
        <div
          className={`text-center mb-12 ${shopifySection.inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <SectionBadge color="warning" className="mb-6">
            🛍️ Shopify Stores
          </SectionBadge>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Shopify storefronts I've built
          </h2>
          <p className="text-base max-w-xl mx-auto text-text-secondary">
            Custom Hydrogen/Oxygen deployments, Liquid themes, Metaobjects, and 3D
            product experiences for brands across fitness, sport, and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SHOPIFY_STORES.map((store, i) => (
            <a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-lift bg-bg-card rounded-xl p-5 border border-border shadow-sm no-underline flex flex-col gap-2 group text-center ${shopifySection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                borderTop: "3px solid rgba(212,168,67,0.8)",
                animationDelay: shopifySection.inView ? `${i * 70}ms` : "0ms",
              }}
            >
              <span className="font-bold text-base group-hover:opacity-80 transition-opacity" style={{ color: "rgba(212,168,67,1)" }}>
                {store.name}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: "rgba(212,168,67,0.1)",
                  color: "rgba(212,168,67,0.9)",
                  border: "1px solid rgba(212,168,67,0.2)",
                }}
              >
                {store.niche}
              </span>
              <span className="text-xs text-text-muted mt-1 truncate">
                {store.url.replace("https://", "")} →
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
