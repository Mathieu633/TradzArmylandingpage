# Résoudre le problème "Non sécurisé" (SSL)

## 🔒 Pourquoi "Non sécurisé" apparaît ?

Le message "Non sécurisé" apparaît parce que :
1. Le certificat SSL n'est pas encore actif (en cours de provisionnement)
2. Tu accèdes au site en HTTP au lieu de HTTPS
3. La propagation DNS n'est pas terminée

---

## ✅ Solutions

### Solution 1 : Utiliser HTTPS au lieu de HTTP

**Important** : Assure-toi d'accéder au site avec `https://` et non `http://`

1. Va sur **`https://mathieub.com`** (avec le S)
2. Pas sur `http://mathieub.com` (sans le S)

### Solution 2 : Vérifier le certificat SSL dans Netlify

1. Va sur Netlify > Ton site **mathieub**
2. Va dans **"Site settings"** > **"Domain management"**
3. Regarde la section **"HTTPS"**
4. Le certificat devrait être en cours de provisionnement

### Solution 3 : Forcer le provisionnement du certificat

1. Dans Netlify > **"Domain management"**
2. Clique sur **"Options"** à côté de `mathieub.com`
3. Clique sur **"Verify DNS configuration"**
4. Netlify va vérifier et provisionner le certificat

### Solution 4 : Vérifier que les DNS pointent bien vers Netlify

Si tu as acheté le domaine sur Netlify, les DNS sont automatiquement configurés. Mais vérifie :

1. Va dans Netlify > **"Domain management"**
2. Clique sur **"Options"** à côté de `mathieub.com`
3. Vérifie que les serveurs DNS sont bien ceux de Netlify

### Solution 5 : Attendre la propagation complète

- La propagation DNS peut prendre **24-48h**
- Le certificat SSL sera automatiquement provisionné après la propagation
- Netlify configure automatiquement le HTTPS gratuitement

---

## 🔍 Vérifier le statut

1. Va sur Netlify > **"Domain management"**
2. Regarde le statut de `mathieub.com` :
   - ✅ **"Active"** = Tout est bon
   - ⏳ **"DNS propagating"** = En cours, attends encore
   - ❌ **"Error"** = Il y a un problème

---

## ⚠️ Important

- **Toujours utiliser HTTPS** : `https://mathieub.com`
- Netlify redirige automatiquement HTTP vers HTTPS (mais ça peut prendre du temps)
- Le certificat SSL est **gratuit** et se configure automatiquement

---

## 🆘 Si ça ne fonctionne toujours pas après 48h

1. Contacte le support Netlify via le bouton **"Soutien"** en haut à droite
2. Netlify peut provisionner manuellement le certificat
3. Vérifie qu'il n'y a pas de restrictions sur le domaine

---

## ✅ Une fois le SSL actif

Tu verras :
- ✅ Un **cadenas vert** dans la barre d'adresse
- ✅ L'URL commence par **`https://`**
- ✅ Plus de message "Non sécurisé"

---

**En résumé : Utilise `https://mathieub.com` et attends que le certificat SSL soit provisionné (24-48h).**


