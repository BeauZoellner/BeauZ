import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY missing — skipping signup email");
    return NextResponse.json({ ok: false, error: "missing_api_key" }, { status: 500 });
  }
  const resend = new Resend(apiKey);
  const { dispensary, address, license, contact, phone, email, message } = await req.json();

  const text = `New Wholesale Application

Dispensary: ${dispensary}
License #: ${license}
Address: ${address}
Contact: ${contact}
Phone: ${phone}
Email: ${email}
${message ? `\nAbout their dispensary:\n${message}` : ""}
`;

  const html = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 12px;">
  <h1 style="color: #39ff14; margin-bottom: 24px;">New Wholesale Application</h1>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr><td style="padding: 8px 0; color: #888;">Dispensary</td><td style="padding: 8px 0; font-weight: 700;">${dispensary}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">License #</td><td style="padding: 8px 0;">${license}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Address</td><td style="padding: 8px 0;">${address}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Contact</td><td style="padding: 8px 0;">${contact}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #39ff14;">${email}</a></td></tr>
  </table>
  ${message ? `<div style="background: #1a1a1a; padding: 16px; border-radius: 8px; margin-bottom: 16px;"><p style="color: #888; font-size: 13px; margin-bottom: 8px;">About their dispensary:</p><p style="line-height: 1.6;">${message}</p></div>` : ""}
  <p style="color: #888; font-size: 13px;">Account was auto-approved. They can log in right away.</p>
</div>`;

  try {
    await resend.emails.send({
      from: "TerpBunny Signups <orders@terpbunny.com>",
      to: "admin@terpbunny.com",
      subject: `New Wholesale Application — ${dispensary}`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Signup email send failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
