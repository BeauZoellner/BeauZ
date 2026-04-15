"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
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

const STRAINS: Record<string, { name: string; type: string; thc: string; desc: string }> = {
  "animal-heat": { name: "Animal Heat", type: "Hybrid", thc: "32%", desc: "A powerful hybrid with an intense terpene profile. Earthy, pungent, and heavy-hitting." },
  "apples-n-juice": { name: "Apples N Juice", type: "Hybrid", thc: "30%", desc: "Sweet and fruity with a smooth finish. Perfect for customers who love flavor." },
  "baby-zereal": { name: "Baby Zereal", type: "Indica", thc: "29%", desc: "Creamy, sweet, and relaxing. A nighttime favorite with beautiful purple hues." },
  "garlic-cookies": { name: "Garlic Cookies", type: "Indica", thc: "35%", desc: "Our highest-testing strain. Pungent garlic and diesel aroma with incredible potency." },
  "ice-cream-cake": { name: "Ice Cream Cake", type: "Indica", thc: "31%", desc: "Creamy vanilla and sweet dough flavors. Dense, frosty buds with a relaxing high." },
  "la-rosa": { name: "La Rosa", type: "Hybrid", thc: "28%", desc: "Floral and sweet with rose-like terpenes. Beautiful bag appeal with purple and green hues." },
  "lemon-cherry-gelato": { name: "Lemon Cherry Gelato", type: "Hybrid", thc: "30%", desc: "Citrus meets cherry in this dessert strain. Uplifting and creative effects." },
  "lemon-drop": { name: "Lemon Drop", type: "Sativa", thc: "27%", desc: "Bright citrus flavor with energizing effects. Perfect daytime strain for your shelves." },
  "medusa": { name: "Medusa", type: "Indica", thc: "34%", desc: "Stone-cold potency. Dense, trichome-covered buds with a mythical reputation." },
  "runtz": { name: "Runtz", type: "Hybrid", thc: "31%", desc: "Candy-sweet and colorful. One of the most popular strains on the market." },
  "skywalker-og": { name: "Skywalker OG", type: "Indica", thc: "33%", desc: "Spacy, relaxing indica with a legendary lineage. Pine and fuel terps dominate." },
  "tamalez": { name: "Tamalez", type: "Indica", thc: "29%", desc: "Unique spicy and earthy profile. Deep red and orange hues with heavy effects." },
  "wedding-cake": { name: "Wedding Cake", type: "Hybrid", thc: "32%", desc: "Rich, tangy sweetness with peppery undertones. Always a top seller." },
  "project-z": { name: "Project Z", type: "Sativa", thc: "33%", desc: "Energizing sativa with exotic genetics. Great for daytime customers." },
  "tear-gas": { name: "Tear Gas", type: "Sativa", thc: "32%", desc: "Pungent, gassy, and potent. An unforgettable sativa experience." },
  "bacio-gelato": { name: "Bacio Gelato", type: "Hybrid", thc: "30%", desc: "Creamy gelato flavor with balanced effects. A crowd-pleaser every time." },
  "jealousy": { name: "Jealousy", type: "Hybrid", thc: "31%", desc: "Funky, gassy terps with a smooth smoke. Hot genetics that customers ask for by name." },
};

function typeColor(type: string) {
  if (type === "Indica") return "#e056fd";
  if (type === "Sativa") return "#00e5ff";
  return "#39ff14";
}

export default function StrainDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const strain = STRAINS[slug];
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!strain) {
    return (
      <div style={{ textAlign: "center", padding: "100px 24px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 900 }}>Strain not found</h1>
        <Link href="/strains" style={{ color: "#39ff14", marginTop: "16px", display: "inline-block" }}>← Back to all strains</Link>
      </div>
    );
  }

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("tb-cart") || "[]");
    const existing = cart.find((item: { slug: string }) => item.slug === slug);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ slug, name: strain.name, type: strain.type, qty });
    }
    localStorage.setItem("tb-cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 100px" }}>
      <Link href="/strains" style={{ fontSize: "14px", color: "#555", display: "inline-block", marginBottom: "32px" }}>← Back to all strains</Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
        {/* Strain image */}
        <div style={{
          aspectRatio: "1", borderRadius: "16px", background: "#111",
          border: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          {STRAIN_IMAGES[slug] ? (
            <Image
              src={STRAIN_IMAGES[slug]}
              alt={strain.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="450px"
              priority
            />
          ) : (
            <>
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(circle at 50% 60%, ${typeColor(strain.type)}20, transparent 70%)`,
              }} />
              <span style={{ fontSize: "80px", opacity: 0.1, fontWeight: 900, position: "relative" }}>{strain.name.charAt(0)}</span>
            </>
          )}
        </div>

        {/* Details */}
        <div>
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: "8px",
            background: `${typeColor(strain.type)}15`, color: typeColor(strain.type),
            fontSize: "13px", fontWeight: 700, marginBottom: "12px",
          }}>{strain.type}</span>
          <h1 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-1px", marginBottom: "8px" }}>{strain.name}</h1>
          <p style={{ fontSize: "16px", color: "#39ff14", fontWeight: 700, marginBottom: "24px" }}>{strain.thc} THC</p>
          <p style={{ fontSize: "15px", color: "#888", lineHeight: 1.7, marginBottom: "32px" }}>{strain.desc}</p>

          <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "24px", marginBottom: "24px" }}>
            <p style={{ fontSize: "13px", color: "#555", marginBottom: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Quantity (units)</p>
            <div className="tb-qty">
              <button className="tb-qty__btn tb-qty__btn--minus" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span style={{ minWidth: "40px", textAlign: "center", fontSize: "18px", fontWeight: 700 }}>{qty}</span>
              <button className="tb-qty__btn tb-qty__btn--plus" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <button onClick={addToCart} className="tb-btn tb-btn--primary tb-btn--full" style={{ marginBottom: "12px" }}>
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
          <Link href="/cart" className="tb-btn tb-btn--outline tb-btn--full" style={{ textAlign: "center", display: "block" }}>
            View Cart
          </Link>

          <div style={{ marginTop: "32px", padding: "16px", background: "rgba(57,255,20,0.05)", border: "1px solid rgba(57,255,20,0.1)", borderRadius: "10px" }}>
            <p style={{ fontSize: "13px", color: "#888" }}>
              <strong style={{ color: "#ccc" }}>Wholesale pricing</strong> — Log in to see pricing. Orders are fulfilled COD (cash on delivery).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
