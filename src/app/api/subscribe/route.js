// app/api/subscribe/route.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email requis" }), { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "CookMaster <onboarding@resend.dev>",
      to: email,
      subject: "Bienvenue sur CookMaster 🍳",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff8e1;">
          <h1 style="color: #FDC700;">Bienvenue sur CookMaster !</h1>
          <p>Merci de vous être abonné(e) à notre newsletter 🎉.</p>
          <p>Voici quelques recettes mises en avant pour vous :</p>
          <ul>
            <li><a href="https://tonsite.com/recipes/1">🍕 Pizza maison</a></li>
            <li><a href="https://tonsite.com/recipes/2">🥗 Salade fraîcheur</a></li>
            <li><a href="https://tonsite.com/recipes/3">🍰 Tarte au citron</a></li>
          </ul>
          <p>À bientôt pour encore plus d’inspiration en cuisine 👩‍🍳👨‍🍳</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'email :", err);
    return new Response(JSON.stringify({ error: "Impossible d'envoyer l'email" }), { status: 500 });
  }
}
