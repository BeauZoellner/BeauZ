"use client";
import Link from "next/link";

interface HarvestItem {
  strain: string;
  type: "Indica" | "Sativa" | "Hybrid";
  harvestDate: string;
  availableDate: string;
  estimatedLbs: string;
  status: "Curing" | "Drying" | "Flowering" | "Available Soon" | "Released";
}

// Populate this list as harvests come in
const SCHEDULE: HarvestItem[] = [
  { strain: "Lemon Drop", type: "Sativa", harvestDate: "Apr 8, 2026", availableDate: "Apr 22, 2026", estimatedLbs: "40 lbs", status: "Curing" },
  { strain: "Runtz", type: "Hybrid", harvestDate: "Apr 10, 2026", availableDate: "Apr 24, 2026", estimatedLbs: "45 lbs", status: "Curing" },
  { strain: "Wedding Cake", type: "Hybrid", harvestDate: "Apr 14, 2026", availableDate: "Apr 28, 2026", estimatedLbs: "35 lbs", status: "Drying" },
  { strain: "Garlic Cookies", type: "Indica", harvestDate: "Apr 20, 2026", availableDate: "May 4, 2026", estimatedLbs: "30 lbs", status: "Flowering" },
  { strain: "Tamalez", type: "Indica", harvestDate: "May 2, 2026", availableDate: "May 16, 2026", estimatedLbs: "25 lbs", status: "Flowering" },
  { strain: "La Rosa", type: "Hybrid", harvestDate: "May 6, 2026", availableDate: "May 20, 2026", estimatedLbs: "35 lbs", status: "Flowering" },
  { strain: "Ice Cream Cake", type: "Indica", harvestDate: "May 12, 2026", availableDate: "May 26, 2026", estimatedLbs: "30 lbs", status: "Flowering" },
];

function typeColor(type: string) {
  if (type === "Indica") return "#e056fd";
  if (type === "Sativa") return "#00e5ff";
  return "#39ff14";
}

function statusColor(status: string) {
  if (status === "Released") return "#39ff14";
  if (status === "Available Soon") return "#00e5ff";
  if (status === "Curing") return "#ffd700";
  if (status === "Drying") return "#ff9800";
  return "#888";
}

export default function HarvestSchedulePage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#39ff14", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
          UPCOMING DROPS
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-1.5px" }}>
          Harvest Schedule
        </h1>
        <p style={{ color: "#666", marginTop: "16px", fontSize: "16px", maxWidth: "600px", margin: "16px auto 0" }}>
          Know what&apos;s coming before your competitors do. Plan your orders around our upcoming harvests and secure your supply early.
        </p>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
        {(["Flowering", "Drying", "Curing", "Available Soon", "Released"] as const).map((s) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#888" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: statusColor(s) }} />
            {s}
          </div>
        ))}
      </div>

      {/* Schedule table */}
      <div style={{
        background: "#111", border: "1px solid #1a1a1a", borderRadius: "16px", overflow: "hidden",
      }}>
        {/* Header row */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 1.2fr 1fr 1.2fr",
          padding: "16px 24px", background: "#0a0a0a",
          borderBottom: "1px solid #1a1a1a",
          fontSize: "12px", fontWeight: 700, color: "#555",
          letterSpacing: "2px", textTransform: "uppercase",
        }}>
          <div>Strain</div>
          <div>Type</div>
          <div>Harvest Date</div>
          <div>Available</div>
          <div>Est. Yield</div>
          <div>Status</div>
        </div>

        {/* Data rows */}
        {SCHEDULE.map((item, idx) => (
          <div key={idx} style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr 1.2fr 1fr 1.2fr",
            padding: "20px 24px", alignItems: "center",
            borderBottom: idx === SCHEDULE.length - 1 ? "none" : "1px solid #1a1a1a",
            transition: "background 0.2s",
          }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>{item.strain}</div>
            <div>
              <span style={{
                display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                background: `${typeColor(item.type)}15`, color: typeColor(item.type),
                fontSize: "12px", fontWeight: 700,
              }}>
                {item.type}
              </span>
            </div>
            <div style={{ fontSize: "14px", color: "#ccc" }}>{item.harvestDate}</div>
            <div style={{ fontSize: "14px", color: "#ccc" }}>{item.availableDate}</div>
            <div style={{ fontSize: "14px", color: "#888" }}>{item.estimatedLbs}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: statusColor(item.status), flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: statusColor(item.status), fontWeight: 600 }}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        marginTop: "48px", padding: "32px", borderRadius: "16px",
        background: "linear-gradient(135deg, rgba(57,255,20,0.08), rgba(57,255,20,0.02))",
        border: "1px solid rgba(57,255,20,0.2)", textAlign: "center",
      }}>
        <h2 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px" }}>Reserve Early</h2>
        <p style={{ color: "#888", fontSize: "15px", marginBottom: "20px", maxWidth: "500px", margin: "0 auto 20px" }}>
          Our top-shelf harvests sell out fast. Apply for wholesale access or call us directly to reserve pounds from upcoming drops.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:9188964444" className="tb-btn tb-btn--primary">Call 918-896-4444</a>
          <Link href="/apply" className="tb-btn tb-btn--outline">Apply for Wholesale</Link>
        </div>
      </div>

      <p style={{ textAlign: "center", color: "#444", fontSize: "12px", marginTop: "32px" }}>
        Dates and yields are estimates. Schedule updates weekly.
      </p>
    </div>
  );
}
