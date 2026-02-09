// Edge Function : envoie un email via Resend quand un nouveau lead est inséré dans quiz_responses
// Déclenchée par un Database Webhook (INSERT sur quiz_responses)

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "Tradz Army <onboarding@resend.dev>";
const TO_EMAIL = Deno.env.get("TO_EMAIL"); // Email où tu reçois les notifications (tu peux le mettre dans les secrets)

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: { id?: string; firstname?: string; email?: string; phone?: string };
  old_record: unknown;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*" } });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquant");
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), { status: 500 });
  }

  try {
    const payload: WebhookPayload = await req.json();

    if (payload.type !== "INSERT" || payload.table !== "quiz_responses") {
      return new Response(JSON.stringify({ message: "Ignored" }), { status: 200 });
    }

    const { firstname, email } = payload.record || {};
    if (!email) {
      return new Response(JSON.stringify({ error: "No email in record" }), { status: 400 });
    }

    const prenom = firstname || "là";

    // Email HTML personnalisé pour le lead
    const emailHtml = TO_EMAIL
      ? `<h2>Nouveau lead : ${prenom}</h2><p><strong>Email :</strong> ${email}</p><p><strong>Prénom :</strong> ${prenom}</p><p>Ce lead a débloqué la vidéo sur le site.</p>`
      : `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #1a1a1a; margin-top: 0;">Salut ${prenom} ! 👋</h1>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Merci d'avoir débloqué la vidéo sur <strong>mathieub.com</strong>.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              On a hâte de t'accompagner dans ton parcours trading et de te montrer comment construire ta liberté financière.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0;">
              <p style="margin: 0; font-size: 15px; color: #666;">
                <strong>Prochaine étape :</strong> Accède <strong>GRATUITEMENT</strong> au groupe en envoyant « <strong>GO</strong> » sur Telegram.
              </p>
            </div>
            
            <a href="https://t.me/mathieubsupport" 
               style="display: inline-block; background-color: #D4AF37; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; text-align: center;">
              Rejoindre le groupe Telegram →
            </a>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="font-size: 14px; color: #666; margin-bottom: 0;">
              — L'équipe <strong>Tradz Army</strong>
            </p>
          </div>
          
          <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
            © 2026 Tradz Army. Tous droits réservés.
          </p>
        </body>
        </html>
      `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL ? [TO_EMAIL] : [email],
        subject: TO_EMAIL ? `[Tradz Army] Nouveau lead : ${prenom}` : `Bienvenue ${prenom} ! Ton accès est activé 🚀`,
        html: emailHtml,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(JSON.stringify(data), { status: res.status });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};

Deno.serve(handler);
