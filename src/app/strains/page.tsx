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
  "wedding-cake": "/images/wedding-cake.png",
  "animal-heat": "/images/animal-heat.png",
  "baby-zereal": "/images/baby-zereal.png",
  "medusa": "/images/medusa.png",
  "project-z": "/images/project-z.png",
  "sherbert-pie": "/images/sherbert-pie.png",
  "sour-cream": "/images/sour-cream.jpeg",
  "georgia-heat": "/images/georgia-heat.png",
  "bubble-gum-runtz": "/images/bubble-gum-runtz.png",
  "ice-cream-cake": "/images/ice-cream-cake.png",
  "skywalker-og": "/images/skywalker-og.png",
};

const IN_STOCK = ["lemon-drop", "runtz", "la-rosa", "tamalez", "garlic-cookies", "wedding-cake", "ice-cream-cake"];

const ALL_STRAINS = [
  { name: "Lemon Drop", type: "Sativa", thc: "27%", slug: "lemon-drop", inventory: 2000 },
  { name: "Runtz", type: "Hybrid", thc: "31%", slug: "runtz", inventory: 2000 },
  { name: "La Rosa", type: "Hybrid", thc: "28%", slug: "la-rosa", inventory: 2000 },
  { name: "Tamalez", type: "Indica", thc: "29%", slug: "tamalez", inventory: 2000 },
  { name: "Garlic Cookies", type: "Indica", thc: "35%", slug: "garlic-cookies", inventory: 2000 },
  { name: "Wedding Cake", type: "Hybrid", thc: "32%", slug: "wedding-cake", inventory: 2000 },
  { name: "Ice Cream Cake", type: "Indica", thc: "31%", slug: "ice-cream-cake", inventory: 2000 },
  { name: "Animal Heat", type: "Hybrid", thc: "32%", slug: "animal-heat", inventory: 0 },
  { name: "Apples N Juice", type: "Hybrid", thc: "30%", slug: "apples-n-juice", inventory: 0 },
  { name: "Baby Zereal", type: "Indica", thc: "29%", slug: "baby-zereal", inventory: 0 },
  { name: "Lemon Cherry Gelato", type: "Hybrid", thc: "30%", slug: "lemon-cherry-gelato", inventory: 0 },
  { name: "Medusa", type: "Indica", thc: "34%", slug: "medusa", inventory: 0 },
  { name: "Skywalker OG", type: "Indica", thc: "33%", slug: "skywalker-og", inventory: 0 },
  { name: "Project Z", type: "Sativa", thc: "33%", slug: "project-z", inventory: 0 },
  { name: "Tear Gas", type: "Sativa", thc: "32%", slug: "tear-gas", inventory: 0 },
  { name: "Rancid Rainbows", type: "Hybrid", thc: "30%", slug: "rancid-rainbows", inventory: 0 },
  { name: "Sherbert Pie", type: "Indica", thc: "28%", slug: "sherbert-pie", inventory: 0 },
  { name: "Sour Cream", type: "Hybrid", thc: "26%", slug: "sour-cream", inventory: 0 },
  { name: "Georgia Heat", type: "Sativa", thc: "30%", slug: "georgia-heat", inventory: 0 },
  { name: "Bubble Gum Runtz", type: "Hybrid", thc: "31%", slug: "bubble-gum-runtz", inventory: 0 },
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
        {filtered.map((strain) => {
          const soldOut = strain.inventory === 0;
          return (
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
                    <span className="tb-product-card__price">{soldOut ? "" : "$12.50 / 8th"}</span>
                    <span className="tb-product-card__cta" style={soldOut ? { color: "#ff4444", fontWeight: 900, letterSpacing: "2px" } : {}}>{soldOut ? "SOLD OUT" : "View Details →"}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
