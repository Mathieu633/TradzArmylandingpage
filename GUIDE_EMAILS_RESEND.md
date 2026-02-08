# Emails automatiques avec Resend + Supabase

Quand un visiteur remplit le formulaire (prénom + email) et débloque la vidéo, ses données sont enregistrées dans Supabase. Ce guide explique comment envoyer automatiquement un email à chaque nouveau lead.

## Architecture

```
Formulaire → Supabase (quiz_responses) → Database Webhook → Edge Function → Resend → Email
```

---

## Étape 1 : Créer un compte Resend

1. Va sur [resend.com](https://resend.com) et crée un compte
2. **API Keys** → Crée une clé API → Copie la clé (ex: `re_xxxxxxxx`)
3. **Domains** : Vérifie ton domaine (ex: `mathieub.com`) pour envoyer depuis `contact@mathieub.com`. Sinon, utilise `onboarding@resend.dev` pour les tests (limité à ton email).

---

## Étape 2 : Installer Supabase CLI

```bash
npm install -g supabase
```

Ou avec scoop (Windows) : `scoop install supabase`

---

## Étape 3 : Lier le projet Supabase

```bash
cd "c:\Users\inssa\Landingpage Mathieub"
supabase login
supabase link --project-ref zyzzfnfmvydcjswpdoav
```

---

## Étape 4 : Configurer les secrets

```bash
supabase secrets set RESEND_API_KEY=re_ta_cle_api_ici
supabase secrets set FROM_EMAIL="Tradz Army <contact@mathieub.com>"
supabase secrets set TO_EMAIL=mathieu2505@hotmail.com
```

- **RESEND_API_KEY** : ta clé Resend (obligatoire)
- **FROM_EMAIL** : l'expéditeur (doit être un domaine vérifié sur Resend)
- **TO_EMAIL** : où tu reçois les notifications (optionnel, sinon l'email est envoyé au lead)

---

## Étape 5 : Déployer l'Edge Function

```bash
supabase functions deploy send-welcome-email --no-verify-jwt
```

---

## Étape 6 : Créer le Database Webhook

1. Dans Supabase : **Database** → **Webhooks** (ou **Integrations** → **Webhooks**)
2. **Create a new webhook**
3. **Name** : `quiz_responses_send_email`
4. **Table** : `quiz_responses`
5. **Events** : coche **Insert**
6. **Type** : **Supabase Edge Function**
7. **Function** : `send-welcome-email`
8. **Save**

---

## Étape 7 : Tester

1. Ouvre ton site
2. En navigation privée, débloque la vidéo avec un nouveau prénom/email
3. Vérifie que tu reçois l'email (ou qu'il apparaît dans Resend → Logs)

---

## Personnaliser l'email

Le fichier à modifier : `supabase/functions/send-welcome-email/index.ts`

### 1. Changer le contenu de l'email (HTML)

Tu peux modifier les variables `emailHtml` et `subject` dans le fichier. Exemple :

```ts
// Email de bienvenue envoyé au lead (quand TO_EMAIL n'est pas défini)
const emailHtml = `<h1>Salut ${prenom} !</h1>
  <p>Merci d'avoir débloqué la vidéo.</p>
  <p>On a hâte de t'accompagner dans ton parcours trading.</p>
  <p>— L'équipe Tradz Army</p>`;

// Sujet de l'email
subject: `Bienvenue ${prenom} ! Ton accès est activé`
```

### 2. Modifier le sujet

Ligne ~51 : change `subject` selon le contexte (notification vs bienvenue).

### 3. Choisir qui reçoit l'email

- **TO_EMAIL défini** (secret) → l'email va à toi (notification de nouveau lead)
- **TO_EMAIL vide** → l'email va au lead (email de bienvenue personnalisé)

### 4. Utiliser les données du lead

Le webhook envoie : `firstname`, `email`, `phone`. Tu peux les utiliser dans le HTML :

```ts
const { firstname, email, phone } = payload.record || {};
const prenom = firstname || "là";
// Utilise prenom, email, phone dans ton HTML
```

### 5. Mettre en forme (couleurs, logo, etc.)

Tu peux utiliser du HTML/CSS inline (Resend supporte le HTML) :

```html
<div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #333;">Salut ${prenom} !</h1>
  <p>Ton message ici...</p>
</div>
```

### 6. Appliquer les changements

Après modification, redéploie :

```bash
supabase functions deploy send-welcome-email --no-verify-jwt
```

---

## Dépannage

- **Pas d'email reçu** : Vérifie Resend → Logs. Vérifie que le webhook est bien en **Insert** sur `quiz_responses`.
- **Erreur RESEND_API_KEY** : Vérifie `supabase secrets list` et que la clé est correcte.
- **Domaine non vérifié** : Utilise `onboarding@resend.dev` pour les tests (limité à 1 email/jour).
