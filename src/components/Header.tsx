"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function readCart() {
      try {
        const cart = JSON.parse(localStorage.getItem("tb-cart") || "[]");
        setCartCount(cart.length);
      } catch { setCartCount(0); }
    }
    readCart();
    window.addEventListener("cart-updated", readCart);
    window.addEventListener("storage", readCart);
    return () => {
      window.removeEventListener("cart-updated", readCart);
      window.removeEventListener("storage", readCart);
    };
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "0 40px", height: "80px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid #1a1a1a",
    }}>
      <Link href="/">
        <Image
          src="/images/terpbunny-logo.png"
          alt="TerpBunny"
          width={180}
          height={180}
          style={{ height: "70px", width: "auto", objectFit: "contain" }}
          priority
        />
      </Link>
      <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {[
          { href: "/strains", label: "STRAINS" },
          { href: "/harvest-schedule", label: "HARVEST" },
          { href: "/#wholesale", label: "WHOLESALE" },
          { href: "/#about", label: "ABOUT" },
          { href: "/#contact", label: "CONTACT" },
        ].map((link) => (
          <Link key={link.href} href={link.href} style={{
            fontSize: "14px", fontWeight: 500, color: "#a0a0a0",
            letterSpacing: "0.5px", textTransform: "uppercase",
            transition: "color 0.2s",
          }}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <a href="tel:9188964444" style={{
          fontSize: "14px", fontWeight: 700, color: "#39ff14",
          padding: "8px 14px", borderRadius: "8px",
          border: "1px solid rgba(57,255,20,0.3)",
          letterSpacing: "0.5px", transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}>
          918-896-4444
        </a>
        <Link href="/cart" style={{
          position: "relative", fontSize: "14px", fontWeight: 600,
          color: cartCount > 0 ? "#39ff14" : "#a0a0a0",
          padding: "8px 12px", transition: "all 0.3s ease",
          filter: cartCount > 0 ? "drop-shadow(0 0 6px rgba(57,255,20,0.5))" : "none",
        }}>
          🛒
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: "2px", right: "2px",
              background: "#39ff14", color: "#000",
              fontSize: "10px", fontWeight: 900,
              width: "18px", height: "18px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              lineHeight: 1, boxShadow: "0 0 8px rgba(57,255,20,0.6)",
            }}>
              {cartCount}
            </span>
          )}
        </Link>
        <Link href="/login" style={{
          fontSize: "14px", fontWeight: 600, color: "#fff",
          padding: "8px 20px", borderRadius: "8px", border: "1px solid #333",
          transition: "all 0.3s ease",
        }}>
          Log In
        </Link>
        <Link href="/apply" style={{
          fontSize: "14px", fontWeight: 700, color: "#000",
          padding: "8px 24px", borderRadius: "8px", background: "#39ff14",
          transition: "all 0.3s ease",
        }}>
          Apply Now
        </Link>
      </div>
    </header>
  );
}
