import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  if (!resend || !process.env.RESEND_CONTACT_EMAIL) {
    return Response.json(
      { error: "Service de contact non configuré." },
      { status: 503 }
    );
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

  try {
    await resend.emails.send({
      from: "CookMaster <onboarding@resend.dev>",
      to: process.env.RESEND_CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `Nouveau message de ${name.trim()}`,
      html: `
        <h1>Nouveau message CookMaster</h1>
        <p><strong>Nom :</strong> ${safeName}</p>
        <p><strong>Email :</strong> ${safeEmail}</p>
        <p><strong>Message :</strong><br>${safeMessage}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact :", error);
    return Response.json({ error: "Impossible d'envoyer le message." }, { status: 500 });
  }
}