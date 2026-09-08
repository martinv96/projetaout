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

  if (
    !process.env.BREVO_API_KEY ||
    !process.env.BREVO_CONTACT_EMAIL ||
    !process.env.BREVO_SENDER_EMAIL
  ) {
    return Response.json(
      { error: "Service de contact non configuré." },
      { status: 503 }
    );
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: process.env.BREVO_SENDER_EMAIL,
          name: process.env.BREVO_SENDER_NAME || "CookMaster",
        },
        to: [{ email: process.env.BREVO_CONTACT_EMAIL }],
        replyTo: { email: email.trim() },
        subject: `Nouveau message de ${name.trim()}`,
        htmlContent: `
        <h1>Nouveau message CookMaster</h1>
        <p><strong>Nom :</strong> ${safeName}</p>
        <p><strong>Email :</strong> ${safeEmail}</p>
        <p><strong>Message :</strong><br>${safeMessage}</p>
      `,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Erreur Brevo contact :", result);
      return Response.json(
        { error: result.message || "Impossible d'envoyer le message." },
        { status: 502 }
      );
    }

    console.info("Message contact accepté par Brevo :", result.messageId);
    return Response.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact :", error);
    return Response.json({ error: "Impossible d'envoyer le message." }, { status: 500 });
  }
}