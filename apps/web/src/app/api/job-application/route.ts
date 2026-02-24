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
        const region = formData.get("region") as string;
        const role = formData.get("role") as string;
        const message = formData.get("message") as string;
        const file = formData.get("cv") as File | null;

        // Honeypot
        const honeypot = formData.get("website");
        if (honeypot) {
            return NextResponse.json({ success: true });
        }

        if (!name || !surname || !email || !role) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        let uploadedFileRef = null;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());

            const asset = await client.assets.upload("file", buffer, {
                filename: file.name,
            });

            uploadedFileRef = {
                _type: "file",
                asset: { _type: "reference", _ref: asset._id },
            };
        }

        // Salva candidatura su Sanity
        await client.create({
            _type: "jobApplication",
            name,
            surname,
            email,
            region,
            role,
            message,
            cv: uploadedFileRef,
            createdAt: new Date().toISOString(),
        });

        // Recupera email destinatari da Sanity
        const settings = await client.fetch(
            `*[_type == "careers"][0]{form{applicationEmails}}`
        );

        console.log("SETTINGS:", settings);

        const recipients =
            settings?.form?.applicationEmails?.filter(Boolean) || [];

        console.log("RECIPIENTS:", recipients);

        // INVIO EMAIL CON RESEND
        await resend.emails.send({
            from: "Too Digital <onboarding@resend.dev>", // temporaneo
            to: recipients.length ? recipients : ["tuaemail@gmail.com"],
            subject: `Nuova candidatura: ${name} ${surname}`,
            html: `
        <h2>Nuova candidatura</h2>
        <p><strong>Nome:</strong> ${name} ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Regione:</strong> ${region}</p>
        <p><strong>Ruolo:</strong> ${role}</p>
        <p><strong>Messaggio:</strong><br/>${message}</p>
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