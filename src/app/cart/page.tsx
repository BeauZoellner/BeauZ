"use client";
import { useState, useEffect } from "react";
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

interface CartItem {
  slug: string;
  name: string;
  type: string;
  qty: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notes, setNotes] = useState("");
  const [user, setUser] = useState<{ email: string; dispensary?: string; address?: string; contact?: string; phone?: string } | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tb-cart") || "[]");
    setCart(stored);
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({
        email: data.user.email || "",
        dispensary: data.user.user_metadata?.dispensary,
        address: data.user.user_metadata?.address,
        contact: data.user.user_metadata?.contact,
        phone: data.user.user_metadata?.phone,
      });
    });
  }, []);

  function updateQty(slug: string, delta: number) {
    const updated = cart.map((item) =>
      item.slug === slug ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCart(updated);
    localStorage.setItem("tb-cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  }

  function setQtyDirect(slug: string, newQty: number) {
    const updated = cart.map((item) =>
      item.slug === slug ? { ...item, qty: Math.max(1, newQty) } : item
    );
    setCart(updated);
    localStorage.setItem("tb-cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  }

  function removeItem(slug: string) {
    const updated = cart.filter((item) => item.slug !== slug);
    setCart(updated);
    localStorage.setItem("tb-cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  }

  async function submitOrder() {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("orders").insert({
      email: user.email,
      dispensary_name: user.dispensary || "",
      store_address: user.address || "",
      contact_name: user.contact || "",
      phone: user.phone || "",
      items: cart,
      notes,
      status: "pending",
    });
    if (!error) {
      fetch("/api/order-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dispensary: user.dispensary || "",
          address: user.address || "",
          contact: user.contact || "",
          phone: user.phone || "",
          email: user.email,
          items: cart,
          notes,
        }),
      }).catch(() => {});
      localStorage.removeItem("tb-cart");
      setCart([]);
      window.dispatchEvent(new Event("cart-updated"));
      setSubmitted(true);
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "24px" }}>✓</div>
        <h1 style={{ fontSize: "36px", fontWeight: 900, marginBottom: "16px" }}>Order Submitted!</h1>
        <p style={{ fontSize: "16px", color: "#888", marginBottom: "32px" }}>
          We&apos;ll review your order and reach out to confirm. Payment is collected on delivery.
        </p>
        <Link href="/strains" className="tb-btn tb-btn--primary">Continue Browsing</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px 24px", color: "#444" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", color: "#fff" }}>Your cart is empty</h2>
        <p style={{ fontSize: "15px", marginBottom: "32px" }}>Browse our strains and add some to your order.</p>
        <Link href="/strains" className="tb-btn tb-btn--primary">Browse Strains</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 100px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "32px" }}>Your Order</h1>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
        {/* Cart items */}
        <div style={{ flex: 1 }}>
          {cart.map((item) => (
            <div key={item.slug} style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "16px", marginBottom: "12px",
              background: "#111", border: "1px solid #1a1a1a", borderRadius: "12px",
            }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "8px", background: "#1a1a1a",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", fontWeight: 900, color: "#333",
                position: "relative", overflow: "hidden", flexShrink: 0,
              }}>
                {STRAIN_IMAGES[item.slug] ? (
                  <Image
                    src={STRAIN_IMAGES[item.slug]}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="64px"
                  />
                ) : (
                  item.name.charAt(0)
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "16px" }}>{item.name}</div>
                <div style={{ fontSize: "13px", color: "#666" }}>{item.type}</div>
              </div>
              <div className="tb-qty">
                <button className="tb-qty__btn tb-qty__btn--minus" onClick={() => updateQty(item.slug, -1)}>−</button>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val >= 1) setQtyDirect(item.slug, val);
                  }}
                  style={{
                    width: "60px", textAlign: "center", fontSize: "14px", fontWeight: 700,
                    background: "transparent", border: "1px solid #333", borderRadius: "6px",
                    color: "#fff", padding: "4px 6px", outline: "none",
                    MozAppearance: "textfield",
                  }}
                />
                <button className="tb-qty__btn tb-qty__btn--plus" onClick={() => updateQty(item.slug, 1)}>+</button>
              </div>
              <button onClick={() => removeItem(item.slug)} style={{ color: "#555", fontSize: "18px", padding: "8px" }}>✕</button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        {(() => {
          const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
          const bulkUnlocked = totalQty >= 640;
          const rate = bulkUnlocked ? 10 : 12.5;
          const orderTotal = totalQty * rate;
          const remaining = 640 - totalQty;
          const savings = bulkUnlocked ? totalQty * 2.5 : 0;
          return (
        <div style={{
          width: "320px", padding: "24px",
          background: "#111", border: "1px solid #1a1a1a",
          borderRadius: "16px", position: "sticky", top: "104px",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Order Summary</h3>
          {cart.map((item) => (
            <div key={item.slug} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#888", marginBottom: "8px" }}>
              <span style={{ flex: 1 }}>{item.name}</span>
              <span style={{ color: "#aaa", marginLeft: "8px" }}>×{item.qty}</span>
              <span style={{ minWidth: "70px", textAlign: "right", color: "#ccc" }}>${(item.qty * rate).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
          ))}

          <div style={{ borderTop: "1px solid #1a1a1a", marginTop: "16px", paddingTop: "16px" }}>
            {/* Quantity progress bar toward 640 */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                <span style={{ color: "#888" }}>Total 8ths: <span style={{ color: "#fff", fontWeight: 700 }}>{totalQty}</span></span>
                <span style={{ color: bulkUnlocked ? "#39ff14" : "#555" }}>{bulkUnlocked ? "Bulk unlocked!" : `${remaining} to bulk`}</span>
              </div>
              <div style={{ height: "6px", borderRadius: "3px", background: "#1a1a1a", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: "3px",
                  width: `${Math.min(100, (totalQty / 640) * 100)}%`,
                  background: bulkUnlocked ? "#39ff14" : `linear-gradient(90deg, #555, ${totalQty > 400 ? "#ffd700" : "#888"})`,
                  transition: "width 0.3s ease",
                }} />
              </div>
            </div>

            {/* Pricing */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#888", marginBottom: "4px" }}>
              <span>Rate</span>
              <span style={{ color: bulkUnlocked ? "#39ff14" : "#fff", fontWeight: 600 }}>${rate.toFixed(2)}/8th</span>
            </div>
            {bulkUnlocked && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#39ff14", marginBottom: "4px" }}>
                <span>You save</span>
                <span style={{ fontWeight: 600 }}>−${savings.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 800, color: "#fff", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #1a1a1a" }}>
              <span>Total</span>
              <span>${orderTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>

            {bulkUnlocked ? (
              <p style={{ fontSize: "12px", color: "#39ff14", marginTop: "8px", fontWeight: 600 }}>
                Mix &amp; match bulk discount applied across all strains
              </p>
            ) : (
              <p style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
                Add {remaining} more 8ths (any strain) to unlock $10.00/8th pricing{remaining <= 128 ? " 🔥" : ""}
              </p>
            )}
            <p style={{ fontSize: "11px", color: "#555", marginTop: "4px" }}>Final pricing confirmed after review. COD payment.</p>
          </div>

          <textarea
            className="tb-input"
            placeholder="Order notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={{ marginTop: "16px", resize: "vertical" }}
          />

          {!user && (
            <p style={{ fontSize: "13px", color: "#ff5555", marginTop: "12px" }}>
              You must <Link href="/login" style={{ color: "#39ff14" }}>log in</Link> to submit an order.
            </p>
          )}

          <button
            onClick={submitOrder}
            className="tb-btn tb-btn--primary tb-btn--full"
            style={{ marginTop: "16px" }}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
          );
        })()}
      </div>
    </div>
  );
}
