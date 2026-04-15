"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const STRAIN_IMAGES: Record<string, string> = {
  "apples-n-juice": "/images/apples-n-juice.png",
  "garlic-cookies": "/images/garlic-cookies.png",
  "la-rosa": "/images/la-rosa.png",
  "lemon-cherry-gelato": "/images/lemon-cherry-gelato.png",
  "lemon-drop": "/images/lemon-drop.png",
  "runtz": "/images/runtz.png",
  "tamalez": "/images/tamalez.png",
  "tear-gas": "/images/tear-gas.png",
  "rancid-rainbows": "/images/rancid-rainbows.png",
};

const ALL_STRAINS = [
  { name: "Animal Heat", type: "Hybrid", thc: "32%", slug: "animal-heat" },
  { name: "Apples N Juice", type: "Hybrid", thc: "30%", slug: "apples-n-juice" },
  { name: "Baby Zereal", type: "Indica", thc: "29%", slug: "baby-zereal" },
  { name: "Garlic Cookies", type: "Indica", thc: "35%", slug: "garlic-cookies" },
  { name: "Ice Cream Cake", type: "Indica", thc: "31%", slug: "ice-cream-cake" },
  { name: "La Rosa", type: "Hybrid", thc: "28%", slug: "la-rosa" },
  { name: "Lemon Cherry Gelato", type: "Hybrid", thc: "30%", slug: "lemon-cherry-gelato" },
  { name: "Lemon Drop", type: "Sativa", thc: "27%", slug: "lemon-drop" },
  { name: "Medusa", type: "Indica", thc: "34%", slug: "medusa" },
  { name: "Runtz", type: "Hybrid", thc: "31%", slug: "runtz" },
  { name: "Skywalker OG", type: "Indica", thc: "33%", slug: "skywalker-og" },
  { name: "Tamalez", type: "Indica", thc: "29%", slug: "tamalez" },
  { name: "Wedding Cake", type: "Hybrid", thc: "32%", slug: "wedding-cake" },
  { name: "Project Z", type: "Sativa", thc: "33%", slug: "project-z" },
  { name: "Tear Gas", type: "Sativa", thc: "32%", slug: "tear-gas" },
  { name: "Bacio Gelato", type: "Hybrid", thc: "30%", slug: "bacio-gelato" },
  { name: "Jealousy", type: "Hybrid", thc: "31%", slug: "jealousy" },
];

function typeColor(type: string) {
  if (type === "Indica") return "#e056fd";
  if (type === "Sativa") return "#00e5ff";
  return "#39ff14";
}

export default function StrainsPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? ALL_STRAINS : ALL_STRAINS.filter((s) => s.type === filter);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#39ff14", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
          OUR CATALOG
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-1.5px" }}>
          All Strains
        </h1>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "48px", flexWrap: "wrap" }}>
        {["All", "Hybrid", "Indica", "Sativa"].map((type) => (
          <button key={type} onClick={() => setFilter(type)} style={{
            padding: "8px 24px", borderRadius: "100px", fontSize: "14px", fontWeight: 600,
            border: `1px solid ${filter === type ? "#39ff14" : "#333"}`,
            background: filter === type ? "rgba(57,255,20,0.1)" : "transparent",
            color: filter === type ? "#39ff14" : "#888",
            cursor: "pointer", transition: "all 0.2s",
          }}>
            {type} {type !== "All" && `(${ALL_STRAINS.filter((s) => s.type === type).length})`}
          </button>
        ))}
      </div>

      {/* Strain grid */}
      <div className="tb-product-grid">
        {filtered.map((strain) => (
          <Link href={`/strains/${strain.slug}`} key={strain.slug}>
            <div className="tb-product-card">
              <div className="tb-product-card__image" style={{ background: "#111" }}>
                {STRAIN_IMAGES[strain.slug] ? (
                  <Image
                    src={STRAIN_IMAGES[strain.slug]}
                    alt={strain.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `radial-gradient(circle at 50% 60%, ${typeColor(strain.type)}15, transparent 70%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "48px", opacity: 0.15, fontWeight: 900 }}>{strain.name.charAt(0)}</span>
                  </div>
                )}
                <div className="tb-product-card__badge" style={{ color: typeColor(strain.type) }}>
                  {strain.type}
                </div>
              </div>
              <div className="tb-product-card__content">
                <div className="tb-product-card__name">{strain.name}</div>
                <div className="tb-product-card__meta">
                  <span className="tb-product-card__price">Wholesale pricing available</span>
                  <span className="tb-product-card__cta">View Details →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
