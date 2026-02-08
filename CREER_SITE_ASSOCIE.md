# Guide : Créer le même site pour ton associé

## 🎯 Ce qui sera différent :

- ✅ Nom de l'associé (au lieu de "Tradz Army")
- ✅ Vidéo YouTube (nouvelle VSL)
- ✅ Lien Telegram (nouveau lien)
- ✅ Tout le reste reste identique (quiz, design, etc.)

---

## 📋 Étapes pour créer le nouveau site :

### Option 1 : Dupliquer le projet (Recommandé)

#### Étape 1 : Créer un nouveau dossier

1. Crée un nouveau dossier sur ton PC (ex: `Landingpage-Associe`)
2. Copie tous les fichiers du projet actuel dans ce nouveau dossier
3. **Sauf** le dossier `videos/` (pas nécessaire car on utilise YouTube)

#### Étape 2 : Modifier les fichiers

Je vais te créer un guide avec les modifications à faire, ou tu peux me donner :
- Le nom de l'associé
- L'URL de la nouvelle vidéo YouTube
- Le nouveau lien Telegram

Et je ferai les modifications pour toi !

#### Étape 3 : Créer un nouveau dépôt GitHub

1. Va sur https://github.com
2. Clique sur **"New repository"**
3. Donne un nom (ex: `Landingpage-Associe`)
4. **Ne coche pas** "Initialize with README"
5. Clique sur **"Create repository"**

#### Étape 4 : Connecter le nouveau dossier à GitHub

Dans le nouveau dossier, ouvre un terminal et exécute :
```bash
git init
git add .
git commit -m "Initial commit - Site pour associé"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/Landingpage-Associe.git
git push -u origin main
```

#### Étape 5 : Déployer sur Netlify

1. Va sur https://www.netlify.com
2. Clique sur **"Add new site"** > **"Import an existing project"**
3. Sélectionne **GitHub**
4. Choisis le nouveau dépôt `Landingpage-Associe`
5. Clique sur **"Deploy site"**
6. Netlify va créer un nouveau site avec un nom automatique (ex: `landingpage-associe-123.netlify.app`)

#### Étape 6 : Configurer le domaine (optionnel)

Si tu veux un domaine personnalisé pour l'associé :
1. Achete un nouveau domaine sur Netlify
2. Ou transfère un domaine existant
3. Configure-le comme pour le premier site

---

### Option 2 : Utiliser le même dépôt avec une branche (Avancé)

Tu peux créer une branche Git séparée, mais c'est plus complexe. L'Option 1 est plus simple.

---

## 🔧 Modifications à faire dans les fichiers :

### 1. index.html - Changer le nom

Cherche et remplace :
- "Tradz Army" → "Nom de l'associé"
- "Méthode Trading - Tradz Army" → "Méthode Trading - Nom Associé"

### 2. index.html - Changer la vidéo YouTube

Remplace l'ID de la vidéo YouTube :
- `vxUEtYmB6og` → `NOUVEL_ID_VIDEO`

Dans deux endroits :
- Ligne ~41 : Vidéo floutée sur la page d'accueil
- Ligne ~219 : Vidéo débloquée après le quiz

### 3. index.html - Changer le lien Telegram

Remplace :
- `https://t.me/mathieubsupport` → `https://t.me/NOUVEAU_LIEN_TELEGRAM`

Ligne ~228

### 4. config.js - Nouvelle base de données (optionnel)

Si tu veux une base de données séparée pour l'associé :
- Crée un nouveau projet Supabase
- Remplace les clés dans `config.js`

---

## 📝 Checklist pour le nouveau site :

- [ ] Nouveau dossier créé
- [ ] Fichiers copiés
- [ ] Nom modifié
- [ ] Vidéo YouTube changée
- [ ] Lien Telegram changé
- [ ] Nouveau dépôt GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Site déployé sur Netlify
- [ ] Domaine configuré (optionnel)
- [ ] Base de données Supabase configurée (optionnel)

---

## 🎯 Ce que je peux faire pour toi :

Donne-moi ces informations et je créerai le nouveau site pour toi :

1. **Nom de l'associé** : ?
2. **URL de la nouvelle vidéo YouTube** : ? (ex: https://youtu.be/abc123)
3. **Nouveau lien Telegram** : ? (ex: https://t.me/associe-support)

Je vais :
- ✅ Créer tous les fichiers modifiés
- ✅ Changer le nom partout
- ✅ Mettre la nouvelle vidéo YouTube
- ✅ Mettre le nouveau lien Telegram
- ✅ Te donner les instructions pour déployer

---

## 💡 Astuce

Tu peux aussi me demander de créer le nouveau site directement dans un nouveau dossier, et je ferai toutes les modifications automatiquement !

---

**Dis-moi les informations et je crée le nouveau site pour toi !** 🚀

