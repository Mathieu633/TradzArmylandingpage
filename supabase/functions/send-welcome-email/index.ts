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

    const raw = (firstname || "là").trim();
    const prenom = raw ? raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase() : "là";

    const LINK_GROUPE = "https://t.me/mathieubsupport";
    const LINK_CANAL_PUBLIC = "https://t.me/+KCUZfhJxd88xYTQ8";
    const LOGO_URL = "https://mathieub.com/favicon.png";

    // Email HTML selon le template : prénom dynamique, boutons, logo en bas
    const emailHtml = TO_EMAIL
      ? `<h2>Nouveau lead : ${prenom}</h2><p><strong>Email :</strong> ${email}</p><p><strong>Prénom :</strong> ${prenom}</p><p>Ce lead a débloqué la vidéo sur le site.</p>`
      : `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff;">
          <p style="font-size: 16px; margin-bottom: 16px;">Salut ${prenom} 👋,</p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Comme promis, tu peux maintenant <strong>débloquer la vidéo privée</strong> dans laquelle je t'explique exactement :
          </p>
          <ul style="font-size: 15px; margin-bottom: 24px; padding-left: 20px;">
            <li>comment fonctionne le groupe,</li>
            <li>ce que tu vas apprendre,</li>
            <li>et comment on trade de manière structurée et disciplinée 📈</li>
          </ul>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 28px 0;">
          <p style="font-size: 16px; font-weight: bold; margin-bottom: 12px;">🚀 Rejoindre Tradz Army</p>
          <p style="font-size: 15px; margin-bottom: 20px;">
            Si après la vidéo tu veux passer au niveau supérieur et <strong>rejoindre le groupe privé</strong>, c'est très simple : 👇<br>
            Clique sur le bouton ci-dessous et envoie simplement <strong>"GO"</strong> par message.
          </p>
          <a href="${LINK_GROUPE}" style="display: inline-block; background-color: #D4AF37; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-bottom: 28px;">Commencer maintenant</a>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 28px 0;">
          <p style="font-size: 16px; font-weight: bold; margin-bottom: 12px;">👾 Tu veux d'abord découvrir par toi-même ?</p>
          <p style="font-size: 15px; margin-bottom: 12px;">
            Tu peux aussi <strong>rejoindre mon canal public</strong> pour voir le contenu, l'état d'esprit et la valeur que je partage chaque jour.
          </p>
          <a href="${LINK_CANAL_PUBLIC}" style="display: inline-block; background-color: #1a1a1a; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-bottom: 28px;">Rejoindre le canal public</a>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 28px 0;">
          <p style="font-size: 15px; margin-bottom: 8px;">À très vite dans la Army,<br><strong>Tradz Army</strong> 🙌📊</p>
          <p style="font-size: 14px; color: #666; font-style: italic; margin-bottom: 24px;">Discipline. Structure. Résultats.</p>
          
          <p style="text-align: center; margin-top: 24px;">
            <img src="${LOGO_URL}" alt="Tradz Army" width="80" height="80" style="display: block; margin: 0 auto;" />
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
        subject: TO_EMAIL ? `[Tradz Army] Nouveau lead : ${prenom}` : `Félicitations ${prenom} d'avoir débloqué la vidéo privée Tradz Army 🔐`,
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
