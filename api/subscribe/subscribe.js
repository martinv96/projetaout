import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email requis" });
  }

  try {
    await resend.emails.send({
      from: "CookMaster <no-reply@cookmaster.com>",
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

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default handler;
