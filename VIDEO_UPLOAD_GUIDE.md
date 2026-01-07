# Guide pour héberger la vidéo

La vidéo est trop volumineuse (718 MB) pour être sur GitHub/Netlify directement. Voici les solutions :

## 🎬 Option 1 : YouTube (Gratuit et Simple) - RECOMMANDÉ

### Étapes :
1. Va sur https://www.youtube.com
2. Clique sur **"Créer"** > **"Importer une vidéo"**
3. Upload ta vidéo `video.mp4.mp4`
4. Une fois uploadée, clique sur la vidéo pour la modifier
5. Dans les **paramètres**, mets-la en **"Non répertoriée"** (pas publique, mais accessible via lien)
6. Va dans **"Partager"** > **"Intégrer"**
7. Copie le code d'intégration (iframe)
8. L'URL ressemble à : `https://www.youtube.com/embed/VIDEO_ID`

### Modifier le code :
Je peux modifier ton code pour utiliser YouTube au lieu du fichier MP4 local.

---

## ☁️ Option 2 : Cloudinary (Gratuit jusqu'à 25 GB)

### Étapes :
1. Va sur https://cloudinary.com
2. Crée un compte gratuit
3. Va dans **"Media Library"** > **"Upload"**
4. Upload ta vidéo
5. Une fois uploadée, clique sur la vidéo
6. Copie l'URL qui ressemble à : `https://res.cloudinary.com/ton-compte/video/upload/v1234567890/video.mp4`

### Modifier le code :
Je peux modifier le code pour utiliser l'URL Cloudinary.

---

## 🚀 Option 3 : Upload direct sur Netlify (Temporaire)

### Étapes :
1. Dans Netlify, va dans **"Site settings"** > **"Deploy settings"**
2. Va dans **"Deploys"**
3. Cherche l'option **"Deploy manually"** ou **"File upload"**
4. Upload la vidéo dans le dossier `videos/`
5. Redéploie

⚠️ **Note** : Cette solution fonctionne mais la vidéo ne sera pas versionnée sur GitHub. Si tu récupères le projet depuis GitHub, la vidéo ne sera pas là.

---

## 📊 Comparaison des solutions

| Solution | Gratuit | Simple | Fiable | Recommandé |
|----------|---------|--------|--------|------------|
| YouTube | ✅ Oui | ✅ Très | ✅ Très | ⭐⭐⭐⭐⭐ |
| Cloudinary | ✅ Oui (25GB) | ✅ Oui | ✅ Très | ⭐⭐⭐⭐ |
| Netlify Direct | ✅ Oui | ⚠️ Moyen | ⚠️ Moyen | ⭐⭐⭐ |

---

## 🎯 Ma recommandation

**Utilise YouTube** car :
- ✅ Totalement gratuit
- ✅ Très simple à utiliser
- ✅ Optimisé pour la vidéo (chargement rapide)
- ✅ Compatible tous navigateurs
- ✅ Pas de limite de taille
- ✅ CDN global intégré

Dis-moi quelle option tu préfères et je modifie le code pour toi !

