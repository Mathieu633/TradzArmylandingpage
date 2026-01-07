# Guide de Publication du Site Web

Ce guide t'explique comment publier ton site gratuitement sur internet.

## ⚡ Option 1 : Netlify (Recommandé - Le plus simple)

### Étape 1 : Créer un compte
1. Va sur https://www.netlify.com
2. Clique sur "Sign up" et connecte-toi avec ton compte **GitHub**
3. Autorise Netlify à accéder à ton compte GitHub

### Étape 2 : Déployer le site
1. Dans Netlify, clique sur **"Add new site"** > **"Import an existing project"**
2. Sélectionne **GitHub** comme fournisseur
3. Autorise Netlify si demandé
4. Choisis ton dépôt **TradzArmylandingpage**
5. Configure le déploiement :
   - **Branch to deploy** : `main`
   - **Build command** : *(laisse vide, pas besoin pour un site statique)*
   - **Publish directory** : `/` (ou `./`)

### Étape 3 : Déployer
1. Clique sur **"Deploy site"**
2. Attends 1-2 minutes
3. Netlify va te donner une URL automatique comme : `https://random-name-123.netlify.app`

### Étape 4 : Configurer un nom de domaine personnalisé (optionnel)
1. Dans Netlify, va dans **Site settings** > **Domain management**
2. Clique sur **"Add custom domain"**
3. Entre ton nom de domaine (ex: `tradzarmy.com`)
4. Suis les instructions pour configurer les DNS

**✅ Avantages de Netlify :**
- Gratuit et illimité
- Déploiement automatique à chaque push Git
- HTTPS automatique
- CDN global (site rapide partout)
- Gestion des formulaires (si besoin plus tard)

---

## 🚀 Option 2 : Vercel (Alternative simple)

### Étape 1 : Créer un compte
1. Va sur https://vercel.com
2. Clique sur "Sign up" et connecte-toi avec ton compte **GitHub**

### Étape 2 : Déployer
1. Clique sur **"Add New Project"**
2. Sélectionne ton dépôt **TradzArmylandingpage**
3. Configure :
   - **Framework Preset** : "Other" ou "Vite" (peu importe pour un site statique)
   - **Root Directory** : `./`
4. Clique sur **"Deploy"**

**✅ Avantages de Vercel :**
- Gratuit et rapide
- Déploiement automatique
- HTTPS automatique
- Bon pour les sites statiques

---

## 📄 Option 3 : GitHub Pages (Intégré à GitHub)

### Étape 1 : Activer GitHub Pages
1. Va sur ton dépôt GitHub : https://github.com/Mathieu633/TradzArmylandingpage
2. Clique sur **Settings** (en haut à droite)
3. Dans le menu de gauche, clique sur **Pages**
4. Sous **Source**, sélectionne :
   - **Branch** : `main`
   - **Folder** : `/ (root)`
5. Clique sur **Save**

### Étape 2 : Accéder à ton site
- Ton site sera disponible à : `https://mathieu633.github.io/TradzArmylandingpage/`
- Attends 1-2 minutes pour le premier déploiement

**⚠️ Note** : GitHub Pages est un peu plus lent que Netlify/Vercel, mais c'est intégré à GitHub.

---

## ⚙️ Configuration importante après déploiement

### 1. Vérifier que config.js est bien présent
- Le fichier `config.js` doit être sur ton serveur (Netlify/Vercel/GitHub Pages)
- Mais il NE sera PAS sur GitHub (car dans .gitignore)
- **Solution** : Tu dois uploader `config.js` directement via :
  - **Netlify** : Va dans le dossier du site et ajoute le fichier
  - **Vercel** : Même chose
  - **GitHub Pages** : Tu peux ajouter config.js directement via l'interface GitHub

### 2. Alternative : Variables d'environnement
Au lieu de `config.js`, tu peux utiliser les variables d'environnement :

**Sur Netlify :**
1. Va dans **Site settings** > **Environment variables**
2. Ajoute :
   - `SUPABASE_URL` = `https://husvknpjlwicjoaxrudl.supabase.co`
   - `SUPABASE_ANON_KEY` = `ta-cle-ici`
3. Modifie `config.js` pour lire ces variables (je peux t'aider si besoin)

---

## 🔒 Sécurité

⚠️ **Important** : Ta clé `anonKey` de Supabase est publique et visible dans le code côté client. C'est normal pour une clé "anon", mais assure-toi que les Row Level Security (RLS) sont bien configurées dans Supabase pour protéger tes données.

---

## 🎯 Recommandation

Je recommande **Netlify** car :
- C'est le plus simple
- Déploiement automatique à chaque push
- Interface claire
- Support excellent

---

## ✅ Checklist après déploiement

- [ ] Site accessible via l'URL fournie
- [ ] La vidéo se charge correctement (si hébergée ailleurs)
- [ ] Le formulaire fonctionne
- [ ] Les données arrivent bien dans Supabase
- [ ] Le bouton Telegram fonctionne
- [ ] Le site est en HTTPS (automatique sur Netlify/Vercel)

---

## 🆘 Besoin d'aide ?

Si tu rencontres des problèmes, dis-moi et je t'aiderai !

