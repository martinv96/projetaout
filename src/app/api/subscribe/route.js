export async function POST(req) {
  const { email } = await req.json();
  const normalizedEmail = email?.trim();

  if (!normalizedEmail) {
    return new Response(JSON.stringify({ error: "Email requis" }), { status: 400 });
  }

  if (
    !process.env.BREVO_API_KEY ||
    !process.env.BREVO_SENDER_EMAIL
  ) {
    return new Response(
      JSON.stringify({ error: "Service d'email non configuré." }),
      { status: 503 }
    );
  }

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
        to: [{ email: normalizedEmail }],
        subject: "Bienvenue sur CookMaster 🍳",
        htmlContent: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #fcf8f2; font-family: Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fcf8f2; padding: 20px 0;">
        <tr>
          <td align="center">
            <!-- Conteneur principal (Largeur max 600px pour les clients mail) -->
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
              
              <!-- HERO -->
              <tr>
                <td align="center" style="padding: 40px 30px; background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%);">
                  <h1 style="color: #d97706; font-size: 28px; margin: 0 0 15px 0;">Bienvenue sur CookMaster ! 🍳</h1>
                  <p style="font-size: 16px; color: #4b5563; line-height: 1.5; margin: 0 0 25px 0;">
                    Découvrez des <strong>recettes faciles à préparer</strong> pour régaler vos proches au quotidien.
                  </p>
                  <a href="https://projetaout.vercel.app/recipes" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: #f59e0b; color: #ffffff; font-weight: bold; text-decoration: none; border-radius: 8px; font-size: 15px;">
                    Voir toutes les recettes
                  </a>
                </td>
              </tr>

              <!-- COOKING TIPS -->
              <tr>
                <td style="padding: 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; padding: 20px;">
                    <tr>
                      <td>
                        <h2 style="color: #b45309; font-size: 18px; margin: 0 0 12px 0;">🧑‍🍳 Astuces de cuisine</h2>
                        <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #374151; line-height: 1.6;">
                          <li style="margin-bottom: 6px;"><strong>Mélangez</strong> toujours les épices avant de les ajouter à vos plats.</li>
                          <li style="margin-bottom: 6px;"><strong>Préparez</strong> vos ingrédients à l’avance pour gagner du temps.</li>
                          <li><strong>Utilisez</strong> des herbes fraîches pour rehausser le goût.</li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- RECIPES SECTION -->
              <tr>
                <td style="padding: 10px 30px 30px 30px;">
                  <h2 style="font-size: 20px; color: #1f2937; text-align: center; margin-bottom: 20px;">Nos recettes populaires</h2>
                  
                  <!-- Grille de recettes avec des tableaux pour compatibilité Outlook/Gmail -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <!-- Recette 1 -->
                      <td align="center" width="33%" style="padding: 5px; vertical-align: top;">
                        <a href="https://projetaout.vercel.app/recipes/1" target="_blank" style="text-decoration: none; color: inherit; display: block; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #fff;">
                          <img src="https://projetaout.vercel.app/_next/image?url=%2Ftarte.jpg&w=1920&q=75" alt="Tarte aux pommes" width="100%" height="100" style="display: block; object-fit: cover;">
                          <div style="padding: 10px; text-align: left;">
                            <h3 style="font-size: 14px; font-weight: bold; margin: 0 0 5px 0; color: #111827;">🍏 Tarte aux pommes</h3>
                            <p style="font-size: 12px; color: #6b7280; margin: 0; line-height: 1.4;">Une recette simple et gourmande.</p>
                          </div>
                        </a>
                      </td>
                      <!-- Recette 2 -->
                      <td align="center" width="33%" style="padding: 5px; vertical-align: top;">
                        <a href="https://projetaout.vercel.app/recipes/3" target="_blank" style="text-decoration: none; color: inherit; display: block; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #fff;">
                          <img src="https://projetaout.vercel.app/_next/image?url=%2Fsalade.jpg&w=1920&q=75" alt="Salade fraîcheur" width="100%" height="100" style="display: block; object-fit: cover;">
                          <div style="padding: 10px; text-align: left;">
                            <h3 style="font-size: 14px; font-weight: bold; margin: 0 0 5px 0; color: #111827;">🥗 Salade fraîcheur</h3>
                            <p style="font-size: 12px; color: #6b7280; margin: 0; line-height: 1.4;">Fraîche et légère pour l’été.</p>
                          </div>
                        </a>
                      </td>
                      <!-- Recette 3 -->
                      <td align="center" width="33%" style="padding: 5px; vertical-align: top;">
                        <a href="https://projetaout.vercel.app/recipes/2" target="_blank" style="text-decoration: none; color: inherit; display: block; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #fff;">
                          <img src="https://projetaout.vercel.app/_next/image?url=%2Fcarbonara.jpg&w=1920&q=75" alt="Spaghetti Carbonara" width="100%" height="100" style="display: block; object-fit: cover;">
                          <div style="padding: 10px; text-align: left;">
                            <h3 style="font-size: 14px; font-weight: bold; margin: 0 0 5px 0; color: #111827;">🍝 Carbonara</h3>
                            <p style="font-size: 12px; color: #6b7280; margin: 0; line-height: 1.4;">Un classique italien crémeux.</p>
                          </div>
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- ABOUT -->
              <tr>
                <td style="padding: 0 30px 40px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; text-align: center;">
                    <tr>
                      <td>
                        <h2 style="font-size: 18px; color: #374151; margin: 0 0 10px 0;">À propos de CookMaster</h2>
                        <p style="font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0 0 15px 0;">
                          CookMaster est une plateforme dédiée aux passionnés de cuisine pour inspirer vos repas au quotidien.
                        </p>
                        <a href="https://projetaout.vercel.app/recipes" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #374151; color: #ffffff; font-weight: bold; text-decoration: none; border-radius: 6px; font-size: 13px;">
                          Découvrir nos recettes
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td align="center" style="padding: 20px 30px; background-color: #f3f4f6; color: #9ca3af; font-size: 11px; line-height: 1.4;">
                  <p style="margin: 0;">
                    Vous recevez cet e-mail suite à votre inscription sur CookMaster.<br>
                    © 2026 CookMaster. Tous droits réservés.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Erreur Brevo newsletter :", result);
      return new Response(
        JSON.stringify({ error: result.message || "Impossible d'envoyer l'email" }),
        { status: 502 }
      );
    }

    console.info("Newsletter acceptée par Brevo :", result.messageId);
    return new Response(JSON.stringify({ success: true, messageId: result.messageId }), { status: 200 });
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'email :", err);
    return new Response(JSON.stringify({ error: "Impossible d'envoyer l'email" }), { status: 500 });
  }
}
