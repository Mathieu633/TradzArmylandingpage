# Étapes après le déploiement sur Netlify

## ✅ 1. Vérifier que le site fonctionne

- Va sur : **https://mathieub.netlify.app**
- Vérifie que la page s'affiche correctement

## 🔧 2. Ajouter config.js sur Netlify (IMPORTANT)

Le fichier `config.js` n'est pas sur GitHub (il est dans `.gitignore`). Tu dois l'ajouter sur Netlify.

### Méthode 1 : Via les variables d'environnement (RECOMMANDÉ)

1. Dans Netlify, va dans **"Site settings"** > **"Environment variables"**
2. Ajoute deux variables :
   - **Key** : `SUPABASE_URL` | **Value** : `https://husvknpjlwicjoaxrudl.supabase.co`
   - **Key** : `SUPABASE_ANON_KEY` | **Value** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1c3ZrbnBqbHdpY2pvYXhydWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3Mzg0NTAsImV4cCI6MjA4MzMxNDQ1MH0.9jG3M-sJ7lQV-YOUylspNmdFHLtHCzkB5dJr1P_BX4U`
3. Clique sur **"Save"**
4. **Redéploie** : Va dans "Deploys" > "Trigger deploy" > "Clear cache and deploy site"

### Méthode 2 : Modifier config.js pour utiliser les variables d'environnement

Si tu choisis la méthode 1, je peux modifier `config.js` pour lire les variables d'environnement au lieu d'un fichier statique.

### Méthode 3 : Upload direct (plus simple mais moins propre)

1. Dans Netlify, va dans **"Deploy settings"** > **"Deploys"**
2. Clique sur **"Publish directory"**
3. Upload ton fichier `config.js` dans le dossier racine

## 🧪 3. Tester le site

1. **Test général** :
   - Vérifie que la page d'accueil s'affiche
   - Vérifie que la vidéo floutée s'affiche
   - Vérifie que le quiz fonctionne

2. **Test du formulaire et de la base de données** :
   - Passe le quiz complet
   - Remplis le formulaire avec des données de test
   - Soumets le formulaire
   - Va dans Supabase > **Table Editor** > **quiz_responses**
   - Vérifie qu'une nouvelle ligne apparaît avec tes données

3. **Test du bouton Telegram** :
   - Clique sur "COMMENCER MAINTENANT"
   - Vérifie que tu es redirigé vers Telegram

## 📊 4. Accéder à tes données

Pour voir les réponses collectées :

1. Va sur https://supabase.com
2. Connecte-toi à ton projet
3. Va dans **"Table Editor"** > **"quiz_responses"**
4. Tu verras toutes les soumissions avec :
   - Informations personnelles (prénom, email, téléphone, Instagram)
   - Réponses au quiz (6 réponses)
   - Date/heure de chaque soumission

## 📥 5. Exporter les données (optionnel)

Pour télécharger les données en CSV :

1. Dans Supabase > **Table Editor** > **quiz_responses**
2. Clique sur le bouton **"..."** en haut à droite
3. Sélectionne **"Export CSV"**
4. Télécharge le fichier

## 🔐 6. Sécurité

- Ta clé `anonKey` est visible côté client (c'est normal pour Supabase)
- Les Row Level Security (RLS) protègent tes données
- Assure-toi que les politiques RLS sont bien configurées dans Supabase

## 🎯 Résumé

✅ Site en ligne : https://mathieub.netlify.app  
✅ Base de données configurée : Supabase  
⏳ À faire : Ajouter config.js via variables d'environnement ou upload direct  

---

## 🆘 Besoin d'aide ?

Si quelque chose ne fonctionne pas :
1. Vérifie la console du navigateur (F12) pour voir les erreurs
2. Vérifie les logs dans Netlify (Deploys > ton déploiement > voir les logs)
3. Vérifie les logs dans Supabase (Logs & metrics)

