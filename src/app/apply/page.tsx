"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
  const [form, setForm] = useState({ dispensary: "", license: "", contact: "", phone: "", email: "", password: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Create auth account
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { dispensary: form.dispensary, contact: form.contact } },
    });
    if (authError) {
      setError(authError.message);
      setSubmitting(false);
      return;
    }

    // Save application to database
    await supabase.from("applications").insert({
      email: form.email,
      dispensary_name: form.dispensary,
      license_number: form.license,
      contact_name: form.contact,
      phone: form.phone,
      message: form.message,
      status: "pending",
    });

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "24px" }}>✓</div>
        <h1 style={{ fontSize: "36px", fontWeight: 900, marginBottom: "16px" }}>Application Submitted!</h1>
        <p style={{ fontSize: "16px", color: "#888", marginBottom: "16px" }}>
          We&apos;ll review your application and get back within 24 hours.
        </p>
        <p style={{ fontSize: "14px", color: "#555" }}>
          Check your email to verify your account. Once approved, you can log in and start ordering.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 24px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#39ff14", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
          WHOLESALE ACCESS
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, letterSpacing: "-1px" }}>Apply for Wholesale</h1>
        <p style={{ color: "#666", marginTop: "12px" }}>Licensed Oklahoma dispensaries only. We&apos;ll verify your info and set up your account.</p>
      </div>

      {error && (
        <div style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.2)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#ff5555", fontSize: "14px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        padding: "32px", borderRadius: "20px",
        background: "#111", border: "1px solid #1a1a1a",
        display: "flex", flexDirection: "column", gap: "20px",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px", display: "block" }}>Dispensary Name</label>
            <input className="tb-input" value={form.dispensary} onChange={(e) => update("dispensary", e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px", display: "block" }}>License #</label>
            <input className="tb-input" value={form.license} onChange={(e) => update("license", e.target.value)} required />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px", display: "block" }}>Contact Name</label>
            <input className="tb-input" value={form.contact} onChange={(e) => update("contact", e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px", display: "block" }}>Phone</label>
            <input className="tb-input" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          </div>
        </div>
        <div>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px", display: "block" }}>Email</label>
          <input className="tb-input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
        <div>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px", display: "block" }}>Create Password</label>
          <input className="tb-input" type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={6} />
        </div>
        <div>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px", display: "block" }}>Tell us about your dispensary</label>
          <textarea className="tb-input" value={form.message} onChange={(e) => update("message", e.target.value)} rows={4} style={{ resize: "vertical" }} />
        </div>
        <button type="submit" className="tb-btn tb-btn--primary tb-btn--full" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
