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

    const emailHtml = TO_EMAIL
      ? `<h2>Nouveau lead : ${prenom}</h2><p><strong>Email :</strong> ${email}</p><p><strong>Prénom :</strong> ${prenom}</p><p>Ce lead a débloqué la vidéo sur le site.</p>`
      : `<h2>Salut ${prenom} !</h2><p>Merci d'avoir débloqué la vidéo. On a hâte de t'accompagner.</p><p>— L'équipe Tradz Army</p>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL ? [TO_EMAIL] : [email],
        subject: TO_EMAIL ? `[Tradz Army] Nouveau lead : ${prenom}` : `Bienvenue ${prenom} !`,
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
