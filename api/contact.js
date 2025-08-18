import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, message } = req.body;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return res.status(500).json({ message: "Configuration email manquante" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const logoPath = path.join(process.cwd(), "public", "logo.JPG");
  const logoExists = fs.existsSync(logoPath);

  const mailOptions = {
    from: process.env.GMAIL_USER,
    replyTo: email,
    to: process.env.GMAIL_USER,
    subject: `📩 Nouveau message de ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #FDC700; padding: 20px; text-align: center;">
          ${logoExists ? `<img src="cid:logo" alt="Logo" style="max-width: 150px; margin-bottom: 10px;" />` : ""}
          <h1 style="margin: 0; color: #000; font-size: 22px;">Nouveau message reçu</h1>
        </div>

        <!-- Body -->
        <div style="padding: 20px; background-color: #fff; color: #333;">
          <p style="font-size: 16px;">Bonjour 👋,</p>
          <p style="font-size: 16px;">Vous avez reçu un nouveau message via le formulaire de contact :</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 120px;">Nom :</td>
              <td style="padding: 8px; background: #f9f9f9;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Email :</td>
              <td style="padding: 8px; background: #f9f9f9;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message :</td>
              <td style="padding: 8px; background: #f9f9f9;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background-color: #FDC700; padding: 10px; text-align: center; color: #000; font-size: 14px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} - Formulaire de contact</p>
        </div>
      </div>
    `,
    attachments: logoExists
      ? [
          {
            filename: "logo.PNG",
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
    return res.status(500).json({ success: false, message: "Erreur lors de l'envoi" });
  }
}
