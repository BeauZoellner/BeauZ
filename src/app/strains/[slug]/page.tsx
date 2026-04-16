"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

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
  "rancid-rainbows": { name: "Rancid Rainbows", type: "Hybrid", thc: "30%", desc: "Funky and colorful. Rotten-sweet terpenes with psychedelic bag appeal." },
  "sherbert-pie": { name: "Sherbert Pie", type: "Indica", thc: "28%", desc: "Creamy sherbet meets warm pie crust. Smooth, dessert-forward indica." },
  "sour-cream": { name: "Sour Cream", type: "Hybrid", thc: "26%", desc: "Smooth, creamy, and subtly tangy. A sativa-leaning hybrid with classic flavor." },
  "georgia-heat": { name: "Georgia Heat", type: "Sativa", thc: "30%", desc: "Warm, spicy, peach-forward terps. A sativa that brings the heat." },
  "bubble-gum-runtz": { name: "Bubble Gum Runtz", type: "Hybrid", thc: "31%", desc: "Candy-sweet bubblegum crossed with Runtz genetics. Sweet, chewy, and loud." },
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
  const soldOut = !IN_STOCK.includes(slug);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setLoggedIn(true);
    });
    // Read existing cart to calculate mix & match total
    const cart = JSON.parse(localStorage.getItem("tb-cart") || "[]");
    const otherQty = cart
      .filter((item: { slug: string }) => item.slug !== slug)
      .reduce((sum: number, item: { qty: number }) => sum + item.qty, 0);
    setCartQty(otherQty);
  }, [slug]);

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
    window.dispatchEvent(new Event("cart-updated"));
    // Refresh cart qty for mix & match calculation
    const otherQty = cart
      .filter((item: { slug: string }) => item.slug !== slug)
      .reduce((sum: number, item: { qty: number }) => sum + item.qty, 0);
    setCartQty(otherQty);
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
          <p style={{ fontSize: "16px", color: "#39ff14", fontWeight: 700, marginBottom: "8px" }}>{strain.thc} THC</p>
          <div style={{ marginBottom: "24px" }}>
            <span style={{ fontSize: "22px", fontWeight: 800, color: "#fff" }}>$12.50</span>
            <span style={{ fontSize: "14px", color: "#888" }}> / 8th</span>
            <span style={{ fontSize: "13px", color: "#555", margin: "0 8px" }}>|</span>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#39ff14" }}>$10.00</span>
            <span style={{ fontSize: "13px", color: "#888" }}> / 8th at 640+ (mix &amp; match)</span>
          </div>
          <p style={{ fontSize: "15px", color: "#888", lineHeight: 1.7, marginBottom: "32px" }}>{strain.desc}</p>

          {soldOut ? (
            <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "24px", marginBottom: "24px" }}>
              <div style={{
                padding: "16px 24px", borderRadius: "12px", textAlign: "center",
                background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.2)",
              }}>
                <span style={{ fontSize: "18px", fontWeight: 900, color: "#ff4444", letterSpacing: "2px" }}>SOLD OUT</span>
                <p style={{ fontSize: "13px", color: "#888", marginTop: "8px" }}>This strain is currently unavailable. Check back soon for restocks.</p>
              </div>
            </div>
          ) : (
            <>
              <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "24px", marginBottom: "24px" }}>
                <p style={{ fontSize: "13px", color: "#39ff14", marginBottom: "12px", fontWeight: 600 }}>In Stock</p>
                {loggedIn ? (
                  <>
                    <p style={{ fontSize: "13px", color: "#555", marginBottom: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Quantity (8ths)</p>
                    <div className="tb-qty">
                      <button className="tb-qty__btn tb-qty__btn--minus" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                      <input
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val) && val >= 1) setQty(val);
                          else if (e.target.value === "") setQty(1);
                        }}
                        style={{
                          width: "70px", textAlign: "center", fontSize: "18px", fontWeight: 700,
                          background: "transparent", border: "1px solid #333", borderRadius: "6px",
                          color: "#fff", padding: "4px 8px", outline: "none",
                          MozAppearance: "textfield",
                        }}
                      />
                      <button className="tb-qty__btn tb-qty__btn--plus" onClick={() => setQty(qty + 1)}>+</button>
                    </div>
                    {/* Quick-add buttons */}
                    <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                      <button
                        onClick={() => setQty(32)}
                        style={{
                          padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                          background: qty === 32 ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.05)",
                          border: qty === 32 ? "1px solid rgba(57,255,20,0.4)" : "1px solid #333",
                          color: qty === 32 ? "#39ff14" : "#aaa",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        QP (32)
                      </button>
                      <button
                        onClick={() => setQty(64)}
                        style={{
                          padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                          background: qty === 64 ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.05)",
                          border: qty === 64 ? "1px solid rgba(57,255,20,0.4)" : "1px solid #333",
                          color: qty === 64 ? "#39ff14" : "#aaa",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        HP (64)
                      </button>
                      <button
                        onClick={() => setQty(128)}
                        style={{
                          padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                          background: qty === 128 ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.05)",
                          border: qty === 128 ? "1px solid rgba(57,255,20,0.4)" : "1px solid #333",
                          color: qty === 128 ? "#39ff14" : "#aaa",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        1 LB (128)
                      </button>
                      <button
                        onClick={() => setQty(640)}
                        style={{
                          padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                          background: qty === 640 ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.05)",
                          border: qty === 640 ? "1px solid rgba(57,255,20,0.4)" : "1px solid #333",
                          color: qty === 640 ? "#39ff14" : "#aaa",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        5 LB (640)
                      </button>
                    </div>
                    {(() => {
                      const combinedTotal = cartQty + qty;
                      const rate = combinedTotal >= 640 ? 10 : 12.5;
                      const bulkUnlocked = combinedTotal >= 640;
                      const remaining = 640 - combinedTotal;
                      return (
                        <div style={{ marginTop: "16px", padding: "12px 16px", borderRadius: "10px", background: bulkUnlocked ? "rgba(57,255,20,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${bulkUnlocked ? "rgba(57,255,20,0.2)" : "#1a1a1a"}` }}>
                          <p style={{ fontSize: "14px", color: "#ccc", fontWeight: 600 }}>
                            Total: <span style={{ color: "#fff", fontSize: "18px", fontWeight: 800 }}>${(qty * rate).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                            <span style={{ fontSize: "13px", color: "#888", marginLeft: "8px" }}>({qty} × ${rate.toFixed(2)})</span>
                          </p>
                          {bulkUnlocked ? (
                            <p style={{ fontSize: "12px", color: "#39ff14", marginTop: "4px", fontWeight: 600 }}>
                              Bulk discount applied — $10.00/8th across your order
                              {cartQty > 0 && <span style={{ color: "#888", fontWeight: 400 }}> ({cartQty} already in cart + {qty} = {combinedTotal} total)</span>}
                            </p>
                          ) : (
                            <>
                              <p style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
                                Mix &amp; match 640+ 8ths across strains for $10.00 each
                              </p>
                              {cartQty > 0 && (
                                <p style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
                                  Cart: {cartQty} + this: {qty} = <span style={{ color: "#fff", fontWeight: 600 }}>{combinedTotal}</span> total — <span style={{ color: remaining <= 128 ? "#ffd700" : "#555" }}>{remaining} more to unlock bulk pricing</span>
                                </p>
                              )}
                              {cartQty === 0 && remaining <= 128 && (
                                <p style={{ fontSize: "12px", color: "#ffd700", marginTop: "4px" }}>Only {remaining} more 8ths to unlock $10.00 pricing!</p>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })()}
                  </>
                ) : null}
              </div>

              {loggedIn ? (
                <>
                  <button onClick={addToCart} className="tb-btn tb-btn--primary tb-btn--full" style={{ marginBottom: "12px" }}>
                    {added ? "✓ Added to Cart!" : "Add to Cart"}
                  </button>
                  <Link href="/cart" className="tb-btn tb-btn--outline tb-btn--full" style={{ textAlign: "center", display: "block" }}>
                    View Cart
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="tb-btn tb-btn--primary tb-btn--full" style={{ textAlign: "center", display: "block", marginBottom: "12px" }}>
                    Log In to Order
                  </Link>
                  <Link href="/apply" className="tb-btn tb-btn--outline tb-btn--full" style={{ textAlign: "center", display: "block" }}>
                    Apply for Wholesale
                  </Link>
                </>
              )}
            </>
          )}

          <div style={{ marginTop: "32px", padding: "16px", background: "rgba(57,255,20,0.05)", border: "1px solid rgba(57,255,20,0.1)", borderRadius: "10px" }}>
            <p style={{ fontSize: "13px", color: "#888" }}>
              <strong style={{ color: "#ccc" }}>Wholesale</strong> — Orders are fulfilled COD (cash on delivery). Mix &amp; match 640+ 8ths across any strains to unlock $10/8th bulk pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
