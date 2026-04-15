import Image from "next/image";
import Link from "next/link";

const FEATURED_STRAINS = [
  { name: "Garlic Cookies", type: "Indica", thc: "35%", price: "$2,000", slug: "garlic-cookies", color: "#ff4da6" },
  { name: "Medusa", type: "Hybrid", thc: "34%", price: "$1,800", slug: "medusa", color: "#39ff14" },
  { name: "Project Z", type: "Sativa", thc: "33%", price: "$1,900", slug: "project-z", color: "#00e5ff" },
  { name: "Animal Heat", type: "Hybrid", thc: "32%", price: "$1,800", slug: "animal-heat", color: "#39ff14" },
  { name: "Tear Gas", type: "Sativa", thc: "32%", price: "$1,750", slug: "tear-gas", color: "#00e5ff" },
  { name: "Runtz", type: "Hybrid", thc: "31%", price: "$1,850", slug: "runtz", color: "#39ff14" },
];

const STATS = [
  { value: "17+", label: "Premium Strains" },
  { value: "35%", label: "Max THC" },
  { value: "100%", label: "Lab Tested" },
  { value: "OK", label: "Licensed" },
];

function typeColor(type: string) {
  if (type === "Indica") return "#ff4da6";
  if (type === "Sativa") return "#00e5ff";
  return "#39ff14";
}

export default function Home() {
  return (
    <div style={{ background: "#0a0a0a" }}>
      {/* ===== HERO ===== */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "120px 24px 80px",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "800px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "-100px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ textAlign: "center", maxWidth: "800px", position: "relative", zIndex: 1 }}>
          <Image
            src="/images/terpbunny-logo.png"
            alt="TerpBunny"
            width={400}
            height={150}
            style={{ height: "120px", width: "auto", objectFit: "contain", margin: "0 auto 32px",
              filter: "drop-shadow(0 0 40px rgba(57,255,20,0.3))" }}
            priority
          />
          <h1 style={{
            fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-2px", marginBottom: "24px",
          }}>
            Premium Cannabis
            <br />
            <span style={{ color: "#39ff14" }}>Wholesale</span>
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)", color: "#888", maxWidth: "540px",
            margin: "0 auto 48px", lineHeight: 1.7,
          }}>
            Hand-selected strains, craft-grown flower. Oklahoma&apos;s trusted source for licensed dispensaries.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/apply" className="tb-btn tb-btn--primary">
              Apply for Wholesale
            </Link>
            <Link href="#strains" className="tb-btn tb-btn--outline">
              View Strains
            </Link>
          </div>

          {/* Stats bar */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "48px", marginTop: "80px",
            flexWrap: "wrap",
          }}>
            {STATS.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "#39ff14", letterSpacing: "-1px" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "13px", color: "#555", textTransform: "uppercase", letterSpacing: "2px", marginTop: "4px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED STRAINS ===== */}
      <section id="strains" style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#39ff14", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
            The Menu
          </p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-1.5px" }}>
            Featured Strains
          </h2>
          <p style={{ fontSize: "16px", color: "#666", marginTop: "16px", maxWidth: "500px", margin: "16px auto 0" }}>
            Our highest-THC, most sought-after genetics. All lab-tested and hand-selected.
          </p>
        </div>

        <div className="tb-product-grid">
          {FEATURED_STRAINS.map((strain) => (
            <div key={strain.slug} className="tb-product-card">
              <div className="tb-product-card__image" style={{ background: "#111" }}>
                {/* Placeholder gradient for product images */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `radial-gradient(circle at 50% 60%, ${strain.color}15, transparent 70%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "48px", opacity: 0.15, fontWeight: 900 }}>
                    {strain.name.charAt(0)}
                  </span>
                </div>
                <div className="tb-product-card__badge" style={{ color: typeColor(strain.type) }}>
                  {strain.thc} THC
                </div>
              </div>
              <div className="tb-product-card__content">
                <div className="tb-product-card__name">{strain.name}</div>
                <div style={{ fontSize: "13px", color: typeColor(strain.type), fontWeight: 600, marginTop: "6px" }}>
                  {strain.type}
                </div>
                <div className="tb-product-card__meta">
                  <span className="tb-product-card__price">{strain.price} / lb</span>
                  <span className="tb-product-card__cta">View Details &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <Link href="/strains" className="tb-btn tb-btn--outline">
            View All 17 Strains &rarr;
          </Link>
        </div>
      </section>

      {/* ===== WHOLESALE / WHY TERPBUNNY ===== */}
      <section id="wholesale" style={{
        padding: "100px 24px", background: "#0d0d0d",
        borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#39ff14", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
              Why TerpBunny
            </p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-1.5px" }}>
              Built for Dispensaries
            </h2>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px",
          }}>
            {[
              { icon: "🧬", title: "Hand-Selected Genetics", desc: "Every strain is chosen for potency, flavor, and bag appeal. We don't do mid." },
              { icon: "🔬", title: "Lab Tested", desc: "Full COA on every batch. Know exactly what you're putting on your shelves." },
              { icon: "📦", title: "Wholesale Direct", desc: "No middlemen. Order by the pound directly from our cultivation partners." },
              { icon: "⚡", title: "Fast Fulfillment", desc: "Oklahoma-based operations. Quick turnaround on orders for licensed dispensaries." },
              { icon: "💎", title: "Premium Quality", desc: "Up to 35% THC. Craft-grown, properly cured, and packaged to impress." },
              { icon: "🤝", title: "Dedicated Support", desc: "Real people, real answers. Your account manager is one message away." },
            ].map((item) => (
              <div key={item.title} style={{
                padding: "32px", borderRadius: "16px",
                background: "#111", border: "1px solid #1a1a1a",
                transition: "all 0.3s ease",
              }}>
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" style={{ padding: "100px 24px" }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto", textAlign: "center",
        }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#39ff14", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
            About Us
          </p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "32px" }}>
            Let&apos;s Play
          </h2>
          <p style={{ fontSize: "18px", color: "#888", lineHeight: 1.8, maxWidth: "700px", margin: "0 auto" }}>
            TerpBunny is Oklahoma&apos;s premium wholesale cannabis brand. We partner with top cultivators to bring licensed dispensaries the highest quality flower on the market. From Garlic Cookies at 35% THC to our full lineup of 17+ strains &mdash; every product is hand-selected, lab-tested, and ready to move.
          </p>
          <div style={{
            marginTop: "48px", padding: "32px", borderRadius: "16px",
            background: "#111", border: "1px solid #1a1a1a",
            display: "inline-block",
          }}>
            <p style={{ fontSize: "14px", color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
              Licensed &amp; Operating In
            </p>
            <p style={{ fontSize: "24px", fontWeight: 800, color: "#39ff14" }}>
              Oklahoma
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT / CTA ===== */}
      <section id="contact" style={{
        padding: "100px 24px", background: "#0d0d0d",
        borderTop: "1px solid #1a1a1a",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#39ff14", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
            Get Started
          </p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "24px" }}>
            Ready to Stock TerpBunny?
          </h2>
          <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.7, marginBottom: "48px" }}>
            Apply for a wholesale account and get access to our full strain menu, pricing, and direct ordering.
          </p>

          <div style={{
            padding: "48px 32px", borderRadius: "20px",
            background: "#111", border: "1px solid #1a1a1a",
          }}>
            <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <input className="tb-input" placeholder="Dispensary Name" type="text" />
                <input className="tb-input" placeholder="License #" type="text" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <input className="tb-input" placeholder="Contact Name" type="text" />
                <input className="tb-input" placeholder="Phone" type="tel" />
              </div>
              <input className="tb-input" placeholder="Email" type="email" />
              <textarea className="tb-input" placeholder="Tell us about your dispensary..." rows={4}
                style={{ resize: "vertical" }} />
              <button type="submit" className="tb-btn tb-btn--primary tb-btn--full" style={{ marginTop: "8px" }}>
                Submit Application
              </button>
            </form>
            <p style={{ fontSize: "13px", color: "#444", marginTop: "16px" }}>
              We&apos;ll review your application and get back within 24 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
