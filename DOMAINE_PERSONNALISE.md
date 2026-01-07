# Guide : Ajouter un nom de domaine personnalisé sur Netlify

## 🌐 Option 1 : Utiliser un sous-domaine Netlify gratuit

Netlify te permet de changer le nom de ton site gratuitement :

1. Va sur Netlify > Ton site **mathieub**
2. Va dans **"Site settings"** > **"Domain management"**
3. Clique sur **"Options"** à côté de `mathieub.netlify.app`
4. Clique sur **"Change site name"**
5. Entre un nouveau nom (ex: `tradzarmy`, `methode-trading`, etc.)
6. Clique sur **"Save"**
7. Ton nouveau nom sera : `ton-nouveau-nom.netlify.app`

**Exemple :** Si tu choisis `tradzarmy`, ton site sera `tradzarmy.netlify.app`

---

## 🎯 Option 2 : Utiliser ton propre nom de domaine (ex: tradzarmy.com)

Si tu as déjà un nom de domaine ou si tu veux en acheter un :

### Étape 1 : Acheter un nom de domaine (si tu n'en as pas)

Sites recommandés :
- **Namecheap** : https://www.namecheap.com (environ 10-15€/an)
- **Google Domains** : https://domains.google (environ 12€/an)
- **OVH** : https://www.ovh.com (environ 10€/an)

### Étape 2 : Ajouter le domaine sur Netlify

1. Va sur Netlify > Ton site **mathieub**
2. Va dans **"Site settings"** > **"Domain management"**
3. Clique sur **"Add custom domain"**
4. Entre ton nom de domaine (ex: `tradzarmy.com`)
5. Netlify va te donner des instructions pour configurer les DNS

### Étape 3 : Configurer les DNS

Netlify va te donner des valeurs à configurer chez ton registrar de domaine :

**Option A : Utiliser les serveurs DNS de Netlify (Recommandé)**

1. Netlify te donnera des serveurs DNS comme :
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - etc.

2. Va sur le site où tu as acheté ton domaine (Namecheap, Google, etc.)
3. Trouve la section **"DNS"** ou **"Nameservers"**
4. Remplace les serveurs DNS par ceux de Netlify
5. Attends 24-48h pour la propagation

**Option B : Utiliser des enregistrements DNS (Plus technique)**

1. Netlify te donnera des enregistrements à ajouter :
   - Type A : `@` → `75.2.60.5`
   - Type CNAME : `www` → `mathieub.netlify.app`

2. Va sur le site où tu as acheté ton domaine
3. Trouve la section **"DNS Records"** ou **"Zone DNS"**
4. Ajoute les enregistrements donnés par Netlify
5. Attends 24-48h pour la propagation

### Étape 4 : Vérifier la configuration

1. Netlify vérifiera automatiquement la configuration
2. Quand c'est bon, tu verras un cadenas vert ✅
3. Ton site sera accessible sur `ton-domaine.com` et `www.ton-domaine.com`

---

## 🔒 HTTPS automatique

Netlify configure automatiquement le HTTPS (SSL) pour ton domaine personnalisé, gratuitement !

---

## 📝 Mettre à jour les références dans le code

Si tu changes de nom de domaine, il faudra peut-être mettre à jour :

1. **Dans index.html** : L'URL `origin` dans l'iframe YouTube
2. **Dans les paramètres Supabase** : Si tu as des restrictions de domaine

Je peux t'aider à faire ces modifications si besoin.

---

## ⚡ Résumé rapide

**Pour changer juste le nom Netlify :**
- Site settings > Domain management > Change site name
- Nouveau nom : `ton-nouveau-nom.netlify.app`

**Pour utiliser ton propre domaine :**
1. Acheter un domaine (10-15€/an)
2. Netlify > Domain management > Add custom domain
3. Configurer les DNS chez ton registrar
4. Attendre 24-48h

---

## 🆘 Besoin d'aide ?

Dis-moi :
- Quel nom de domaine tu veux utiliser
- Si tu as déjà un domaine ou si tu veux en acheter un
- Je t'aiderai à configurer tout ça !

