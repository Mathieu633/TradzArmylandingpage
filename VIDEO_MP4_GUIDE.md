# Utiliser une vidéo MP4 sur la landing page

Ta vidéo (~718 Mo) est trop volumineuse pour GitHub. Il faut l’héberger sur un service externe, puis récupérer son URL.

## 1. Héberger la vidéo

⚠️ **GitHub Releases ne marche pas** : l’URL lance un téléchargement, pas un streaming. La vidéo ne se lit pas.

### Internet Archive (100 % gratuit, recommandé pour MP4)
1. Va sur [archive.org](https://archive.org) et crée un compte
2. **Upload** → **Upload files** → sélectionne ton `video.mp4`
3. Une fois en ligne, récupère l’URL : `https://archive.org/download/ton-item/video.mp4`
4. Mets cette URL dans `VITE_VIDEO_MP4_URL`

### Cloudinary (gratuit)
1. Crée un compte sur [cloudinary.com](https://cloudinary.com)
2. Va dans **Media Library** → **Upload**
3. Upload ton fichier `video.mp4`
4. Clique sur la vidéo uploadée → **Copy URL** (ou **Delivery URL**)
5. L’URL ressemble à : `https://res.cloudinary.com/ton-compte/video/upload/v1234567890/xyz.mp4`

### Autres options
- **Bunny.net** : [bunny.net](https://bunny.net) → Video Library
- **Vimeo** : upload puis récupère le lien direct

---

## 2. Mettre l’URL dans le projet

### Option A : Variable d’environnement (recommandé)

**En local** – à la racine du projet, dans `.env.local` :
```
VITE_VIDEO_MP4_URL=https://res.cloudinary.com/ton-compte/video/upload/v123/ta-video.mp4
```

**Sur Netlify** :
1. Netlify → ton site → **Site configuration** → **Environment variables**
2. Ajoute : `VITE_VIDEO_MP4_URL` = ton URL Cloudinary
3. Redéploie le site

### Option B : Directement dans le code

Dans `script.js`, ligne 4, remplace la chaîne vide :
```javascript
const VIDEO_MP4_URL = "https://res.cloudinary.com/ton-compte/video/upload/v123/ta-video.mp4";
```

---

## 3. Comportement

- Si `VITE_VIDEO_MP4_URL` ou `VIDEO_MP4_URL` est défini → la vidéo MP4 est utilisée.
- Sinon → la vidéo YouTube est utilisée (ID dans `YOUTUBE_VIDEO_ID`).
