"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  items: { name: string; type: string; qty: number }[];
  notes: string;
  status: string;
  created_at: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; dispensary?: string; contact?: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser({
        email: data.user.email || "",
        dispensary: data.user.user_metadata?.dispensary,
        contact: data.user.user_metadata?.contact,
      });

      supabase
        .from("orders")
        .select("*")
        .eq("email", data.user.email)
        .order("created_at", { ascending: false })
        .then(({ data: orderData }) => {
          if (orderData) setOrders(orderData);
          setLoading(false);
        });
    });
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 24px", color: "#555" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 100px" }}>
      {/* Account header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#39ff14", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
            YOUR ACCOUNT
          </p>
          <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "4px" }}>
            {user?.dispensary || "Welcome"}
          </h1>
          <p style={{ color: "#555", fontSize: "14px" }}>{user?.email}</p>
        </div>
        <button onClick={handleLogout} style={{
          padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
          background: "transparent", border: "1px solid #333", color: "#888", cursor: "pointer",
        }}>
          Log Out
        </button>
      </div>

      {/* Orders */}
      <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>Order History</h2>

      {orders.length === 0 ? (
        <div style={{
          padding: "48px", textAlign: "center", background: "#111",
          border: "1px solid #1a1a1a", borderRadius: "16px", color: "#555",
        }}>
          <p style={{ fontSize: "15px", marginBottom: "12px" }}>No orders yet.</p>
          <a href="/strains" style={{ color: "#39ff14", fontSize: "14px", fontWeight: 600 }}>Browse Strains →</a>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {orders.map((order) => (
            <div key={order.id} style={{
              padding: "20px", background: "#111",
              border: "1px solid #1a1a1a", borderRadius: "16px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", color: "#555" }}>
                  {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span style={{
                  padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                  background: order.status === "confirmed" ? "rgba(57,255,20,0.1)" : "rgba(255,165,0,0.1)",
                  color: order.status === "confirmed" ? "#39ff14" : "#ffa500",
                }}>
                  {order.status}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#ccc" }}>{item.name}</span>
                    <span style={{ color: "#555" }}>×{item.qty}</span>
                  </div>
                ))}
              </div>
              {order.notes && (
                <p style={{ fontSize: "13px", color: "#444", marginTop: "10px", fontStyle: "italic" }}>
                  {order.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
