import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { dispensary, address, contact, phone, email, items, notes } = await req.json();

  const itemLines = items
    .map((i: { name: string; qty: number }) => `• ${i.name} — ${i.qty} 8ths`)
    .join("\n");

  const totalQty = items.reduce((sum: number, i: { qty: number }) => sum + i.qty, 0);
  const pricePerUnit = totalQty >= 640 ? 10 : 12.5;
  const total = (totalQty * pricePerUnit).toLocaleString("en-US", { minimumFractionDigits: 2 });

  const text = `New Order from ${dispensary}

Dispensary: ${dispensary}
Address: ${address}
Contact: ${contact}
Phone: ${phone}
Email: ${email}

Items:
${itemLines}

Total: ${totalQty} 8ths × $${pricePerUnit.toFixed(2)} = $${total}
${notes ? `\nNotes: ${notes}` : ""}

Payment: COD (Cash on Delivery)`;

  const html = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 12px;">
  <h1 style="color: #39ff14; margin-bottom: 24px;">New Order</h1>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr><td style="padding: 8px 0; color: #888;">Dispensary</td><td style="padding: 8px 0; font-weight: 700;">${dispensary}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Address</td><td style="padding: 8px 0;">${address}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Contact</td><td style="padding: 8px 0;">${contact}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
  </table>
  <h2 style="color: #39ff14; font-size: 16px; margin-bottom: 12px;">Items</h2>
  <div style="background: #1a1a1a; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
    ${items.map((i: { name: string; qty: number }) => `<div style="padding: 6px 0; display: flex; justify-content: space-between;"><span>${i.name}</span><span style="color: #39ff14; font-weight: 700;">×${i.qty}</span></div>`).join("")}
  </div>
  <div style="border-top: 1px solid #333; padding-top: 16px; margin-bottom: 16px;">
    <p style="font-size: 18px; font-weight: 800;">Total: ${totalQty} 8ths × $${pricePerUnit.toFixed(2)} = <span style="color: #39ff14;">$${total}</span></p>
    ${totalQty >= 640 ? '<p style="color: #39ff14; font-size: 13px;">Bulk discount applied</p>' : ""}
  </div>
  ${notes ? `<div style="background: #1a1a1a; padding: 12px; border-radius: 8px; margin-bottom: 16px;"><p style="color: #888; font-size: 13px; margin-bottom: 4px;">Notes:</p><p>${notes}</p></div>` : ""}
  <p style="color: #888; font-size: 13px;">Payment: COD (Cash on Delivery)</p>
</div>`;

  try {
    await resend.emails.send({
      from: "TerpBunny Orders <orders@terpbunny.com>",
      to: "admin@terpbunny.com",
      subject: `New Order — ${dispensary} (${totalQty} 8ths)`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
