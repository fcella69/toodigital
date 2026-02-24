import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { client } from "@/lib/sanity/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const service = formData.get("service") as string;
    const budget = formData.get("budget") as string;
    const message = formData.get("message") as string;

    // Honeypot
    const honeypot = formData.get("website");
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!email) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // Salva su Sanity
    await client.create({
      _type: "contactRequest",
      name,
      surname,
      email,
      company,
      service,
      budget,
      message,
      createdAt: new Date().toISOString(),
    });

    // Recupera email destinatari da Sanity
    const settings = await client.fetch(
      `*[_type == "contactsPage"][0]{form{ contactEmails }}`
    );

    const recipients =
      settings?.form?.contactEmails?.filter(Boolean) || [];

    await resend.emails.send({
      from: "Too Digital <onboarding@resend.dev>", // cambierai dopo dominio verificato
      to: recipients.length
        ? recipients
        : ["tuaemail@gmail.com"],
      subject: `Nuova richiesta contatto`,
      html: `
        <h2>Nuova richiesta dal sito</h2>
        <p><strong>Nome:</strong> ${name || "-"}</p>
        <p><strong>Cognome:</strong> ${surname || "-"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Azienda:</strong> ${company || "-"}</p>
        <p><strong>Servizio:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${budget || "-"}</p>
        <p><strong>Messaggio:</strong><br/>${message || "-"}</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}