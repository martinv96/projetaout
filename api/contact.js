import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, message } = req.body;

  // ✅ Vérification des variables d'environnement
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return res.status(500).json({ message: "Configuration email manquante" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // mot de passe d’application
    },
  });

  const logoPath = path.join(process.cwd(), "public", "logo.JPG");
  const logoExists = fs.existsSync(logoPath);

  const mailOptions = {
    from: process.env.GMAIL_USER,
    replyTo: email,
    to: process.env.GMAIL_USER,
    subject: `Message de ${name} via le formulaire contact`,
    text: message,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Message reçu depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong> ${message}</p>
      </div>
    `,
    attachments: logoExists
      ? [
          {
            filename: "logo.JPG",
            path: logoPath,
            cid: "logo",
          },
        ]
      : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail envoyé :", info.response);
    return res.status(200).json({ success: true, message: "Message envoyé !" });
  } catch (error) {
    console.error("Erreur email :", error);
    return res
      .status(500)
      .json({ success: false, message: "Erreur lors de l'envoi" });
  }
}
