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
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff8e1; color: #333;">
      
      <!-- HERO -->
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #FDC700; font-size: 32px;">Bienvenue sur CookMaster !</h1>
        <p style="font-size: 16px; margin: 10px 0;">
          Découvrez des <strong>recettes faciles à préparer</strong> pour tous les goûts.
        </p>
        <a href="https://projetaout.vercel.app/recipes" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #FDC700; color: #000; font-weight: bold; text-decoration: none; border-radius: 8px;">
          Voir toutes les recettes
        </a>
      </div>

      <!-- COOKING TIPS -->
      <div style="background-color: #FFF9E5; padding: 20px; border-radius: 12px; margin-bottom: 40px;">
        <h2 style="color: #F7A400; font-size: 24px; margin-bottom: 15px;">🧑‍🍳 Astuces de cuisine</h2>
        <ul style="list-style-type: none; padding: 0; font-size: 14px; line-height: 1.6;">
          <li>💡 Mélangez toujours les épices avant de les ajouter à vos plats.</li>
          <li>⏱️ Préparez vos ingrédients à l’avance pour gagner du temps.</li>
          <li>🌿 Utilisez des herbes fraîches pour rehausser le goût.</li>
        </ul>
      </div>

      <!-- RECIPES -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 24px; color: #333; text-align: center; margin-bottom: 20px;">Nos recettes populaires</h2>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;">
          <a href="https://projetaout.vercel.app/recipes/1" style="display: block; width: 200px; text-decoration: none; color: #000; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <img src="https://projetaout.vercel.app/_next/image?url=%2Ftarte.jpg&w=1920&q=75" alt="Tarte aux pommes" style="width: 100%; height: 120px; object-fit: cover;">
            <div style="padding: 10px;">
              <h3 style="font-size: 16px; font-weight: bold;">🍏 Tarte aux pommes</h3>
              <p style="font-size: 14px; color: #666;">Une recette simple pour tarte aux pommes.</p>
            </div>
          </a>
          <a href="https://projetaout.vercel.app/recipes/3" style="display: block; width: 200px; text-decoration: none; color: #000; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <img src="https://projetaout.vercel.app/_next/image?url=%2Fsalade.jpg&w=1920&q=75" alt="Salade fraîcheur" style="width: 100%; height: 120px; object-fit: cover;">
            <div style="padding: 10px;">
              <h3 style="font-size: 16px; font-weight: bold;">🥗 Salade fraîcheur</h3>
              <p style="font-size: 14px; color: #666;">Fraîche et légère, parfaite pour vos repas d’été.</p>
            </div>
          </a>
          <a href="https://projetaout.vercel.app/recipes/2" style="display: block; width: 200px; text-decoration: none; color: #000; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <img src="https://projetaout.vercel.app/_next/image?url=%2Fcarbonara.jpg&w=1920&q=75" alt="Spaguetti Carbonara" style="width: 100%; height: 120px; object-fit: cover;">
            <div style="padding: 10px;">
              <h3 style="font-size: 16px; font-weight: bold;">🍝 Spaguetti Carbonara</h3>
              <p style="font-size: 14px; color: #666;">Un plat classique italien, crémeux et gourmand.</p>
            </div>
          </a>
        </div>
      </div>

      <!-- ABOUT -->
      <div style="background-color: #F5F5F5; padding: 20px; border-radius: 12px; text-align: center;">
        <h2 style="font-size: 22px; color: #E53935; margin-bottom: 15px;">À propos de CookMaster</h2>
        <p style="font-size: 14px; color: #555; line-height: 1.5; margin-bottom: 20px;">
          CookMaster est une plateforme dédiée aux passionnés de cuisine. Notre objectif est de partager des recettes variées, simples et gourmandes pour inspirer vos repas au quotidien.
        </p>
        <a href="https://projetaout.vercel.app/recipes" style="display: inline-block; padding: 12px 24px; background-color: #E53935; color: #fff; font-weight: bold; text-decoration: none; border-radius: 8px;">
          Découvrir nos recettes
        </a>
      </div>

      <p style="text-align: center; font-size: 12px; color: #999; margin-top: 30px;">
        Vous recevez cet e-mail car vous vous êtes inscrit(e) à la newsletter CookMaster.
      </p>
    </div>
  `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'email :", err);
    return new Response(JSON.stringify({ error: "Impossible d'envoyer l'email" }), { status: 500 });
  }
}
