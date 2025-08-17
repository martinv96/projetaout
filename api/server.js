import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// ✅ Charger les variables d'environnement
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Vérification des variables d'environnement
console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_PASS:", process.env.GMAIL_PASS ? "✓ défini" : "✗ manquant");

// ✅ Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // mot de passe d'application
  },
});

// ✅ Test rapide d'envoi de mail au démarrage
async function testMail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "Test Nodemailer",
      text: "Test d'envoi depuis Node.js avec Gmail",
    });
    console.log("Test mail envoyé avec succès :", info.response);
  } catch (err) {
    console.error("Erreur test mail :", err);
  }
}
testMail();

// ✅ Route racine
app.get("/", (req, res) => {
  res.send("Le serveur fonctionne !");
});

// ✅ Endpoint contact
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const logoPath = path.join(process.cwd(), "public", "logo.JPG");
  const logoExists = fs.existsSync(logoPath);

  const mailOptions = {
    from: process.env.GMAIL_USER,
    replyTo: email,
    to: process.env.GMAIL_USER,
    subject: `Message de ${name} via le formulaire contact`,
    text: message,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #FDC700; padding: 20px; text-align: center; color: white;">
          ${logoExists ? `<img src="cid:logo" alt="Logo" style="height: 50px; margin-bottom: 10px;">` : ""}
          <h2>Message reçu depuis le formulaire de contact</h2>
        </div>
        <div style="padding: 20px; color: #333;">
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <p style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
        </div>
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
    console.log("Mail contact envoyé :", info.response);
    res.status(200).json({ success: true, message: "Message envoyé !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email" });
  }
});

// ✅ Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
