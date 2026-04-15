"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/account";
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#0a0a0a" }}>
      {/* Left brand panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        background: "linear-gradient(135deg, #0a0a0a, #0f1a0f)",
        position: "relative", overflow: "hidden", padding: "48px",
      }}>
        <div style={{
          position: "absolute", top: "30%", left: "20%", width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(57,255,20,0.08), transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <Image src="/images/terpbunny-logo.png" alt="TerpBunny" width={300} height={120}
          style={{ height: "120px", width: "auto", objectFit: "contain", position: "relative",
            filter: "drop-shadow(0 0 12px rgba(57,255,20,0.5))" }} />
        <p style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "6px", textTransform: "uppercase", fontSize: "13px", marginTop: "16px", position: "relative" }}>
          LETS PLAY
        </p>
        <p style={{ color: "#555", fontSize: "14px", marginTop: "24px", textAlign: "center", maxWidth: "300px", position: "relative" }}>
          Premium wholesale cannabis platform for licensed retailers
        </p>
        <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
          {["Direct wholesale pricing — no middleman fees", "Real-time inventory & availability", "Streamlined ordering & reordering", "Lab-tested, compliant product"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#39ff14", fontSize: "14px" }}>✓</span>
              <span style={{ fontSize: "13px", color: "#666" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "48px",
      }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px" }}>Welcome Back</h1>
          <p style={{ color: "#666", marginBottom: "32px" }}>Log in to your wholesale account to browse strains and place orders.</p>

          {error && (
            <div style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.2)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#ff5555", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px", display: "block" }}>Email</label>
              <input className="tb-input" type="email" placeholder="you@dispensary.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px", display: "block" }}>Password</label>
              <input className="tb-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="tb-btn tb-btn--primary tb-btn--full" disabled={loading}>
              {loading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#555" }}>
            Don&apos;t have an account? <Link href="/apply" style={{ color: "#39ff14", fontWeight: 600 }}>Apply for Wholesale</Link>
          </p>
          <p style={{ textAlign: "center", marginTop: "16px" }}>
            <Link href="/" style={{ fontSize: "13px", color: "#444" }}>← Back to TerpBunny.com</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
