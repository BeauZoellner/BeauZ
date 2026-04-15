"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tb-cart") || "[]");
    setCart(stored);
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email || "" });
    });
  }, []);

  function updateQty(slug: string, delta: number) {
    const updated = cart.map((item) =>
      item.slug === slug ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCart(updated);
    localStorage.setItem("tb-cart", JSON.stringify(updated));
  }

  function removeItem(slug: string) {
    const updated = cart.filter((item) => item.slug !== slug);
    setCart(updated);
    localStorage.setItem("tb-cart", JSON.stringify(updated));
  }

  async function submitOrder() {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("orders").insert({
      email: user.email,
      items: cart,
      notes,
      status: "pending",
    });
    if (!error) {
      localStorage.removeItem("tb-cart");
      setCart([]);
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
              }}>{item.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "16px" }}>{item.name}</div>
                <div style={{ fontSize: "13px", color: "#666" }}>{item.type}</div>
              </div>
              <div className="tb-qty">
                <button className="tb-qty__btn tb-qty__btn--minus" onClick={() => updateQty(item.slug, -1)}>−</button>
                <span style={{ minWidth: "30px", textAlign: "center", fontSize: "14px", fontWeight: 700 }}>{item.qty}</span>
                <button className="tb-qty__btn tb-qty__btn--plus" onClick={() => updateQty(item.slug, 1)}>+</button>
              </div>
              <button onClick={() => removeItem(item.slug)} style={{ color: "#555", fontSize: "18px", padding: "8px" }}>✕</button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div style={{
          width: "320px", padding: "24px",
          background: "#111", border: "1px solid #1a1a1a",
          borderRadius: "16px", position: "sticky", top: "104px",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Order Summary</h3>
          {cart.map((item) => (
            <div key={item.slug} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#888", marginBottom: "8px" }}>
              <span>{item.name}</span>
              <span>×{item.qty}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #1a1a1a", marginTop: "16px", paddingTop: "16px" }}>
            <p style={{ fontSize: "13px", color: "#555", marginBottom: "8px" }}>Total items: {cart.reduce((sum, i) => sum + i.qty, 0)}</p>
            <p style={{ fontSize: "12px", color: "#39ff14" }}>Pricing confirmed after review. COD payment.</p>
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
      </div>
    </div>
  );
}
