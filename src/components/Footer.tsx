import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #1a1a1a", padding: "64px 24px 32px",
      background: "#0a0a0a",
    }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px",
      }}>
        <div>
          <Image src="/images/terpbunny-logo.png" alt="TerpBunny" width={140} height={50}
            style={{ height: "50px", width: "auto", objectFit: "contain", marginBottom: "16px",
            }} />
          <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, maxWidth: "280px" }}>
            Premium wholesale cannabis for licensed Oklahoma dispensaries. Hand-selected strains, craft-grown flower.
          </p>
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <a href="tel:918-864-4444" style={{ fontSize: "14px", color: "#888" }}>📞 (918) 864-4444</a>
            <a href="mailto:admin@terpbunny.com" style={{ fontSize: "14px", color: "#888" }}>✉️ admin@terpbunny.com</a>
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#666", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>Shop</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link href="/strains" style={{ fontSize: "14px", color: "#888" }}>All Strains</Link>
            <Link href="/strains?type=hybrid" style={{ fontSize: "14px", color: "#888" }}>Hybrid</Link>
            <Link href="/strains?type=indica" style={{ fontSize: "14px", color: "#888" }}>Indica</Link>
            <Link href="/strains?type=sativa" style={{ fontSize: "14px", color: "#888" }}>Sativa</Link>
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#666", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>Company</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link href="/#about" style={{ fontSize: "14px", color: "#888" }}>About</Link>
            <Link href="/#contact" style={{ fontSize: "14px", color: "#888" }}>Contact</Link>
            <Link href="/apply" style={{ fontSize: "14px", color: "#888" }}>Apply for Wholesale</Link>
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#666", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>Account</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link href="/login" style={{ fontSize: "14px", color: "#888" }}>Log In</Link>
            <Link href="/cart" style={{ fontSize: "14px", color: "#888" }}>Cart</Link>
            <Link href="/account" style={{ fontSize: "14px", color: "#888" }}>My Orders</Link>
          </div>
        </div>
      </div>
      <div style={{
        maxWidth: "1100px", margin: "48px auto 0", paddingTop: "24px",
        borderTop: "1px solid #1a1a1a",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: "13px", color: "#333",
      }}>
        <span>&copy; {new Date().getFullYear()} TerpBunny. All rights reserved.</span>
        <span>Oklahoma Licensed Wholesale Cannabis</span>
      </div>
    </footer>
  );
}
