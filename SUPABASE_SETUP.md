# Configuration Supabase - Guide d'installation

Ce guide t'explique comment configurer Supabase pour stocker les réponses du quiz et les coordonnées des utilisateurs.

## Étape 1 : Créer un compte Supabase

1. Va sur https://supabase.com
2. Clique sur "Start your project" et crée un compte (gratuit)
3. Crée un nouveau projet :
   - Choisis un nom (ex: "tradz-army-quiz")
   - Choisis une région proche de toi
   - Choisis un mot de passe pour la base de données
   - Attends 1-2 minutes que le projet soit créé

## Étape 2 : Créer la table dans Supabase

1. Dans ton projet Supabase, va dans l'onglet **"SQL Editor"** (dans le menu de gauche)
2. Clique sur **"New query"**
3. Ouvre le fichier `database-setup.sql` de ce projet
4. Copie tout le contenu du fichier
5. Colle-le dans l'éditeur SQL de Supabase
6. Clique sur **"Run"** (ou appuie sur Ctrl+Enter)
7. Tu devrais voir "Success. No rows returned"

## Étape 3 : Récupérer tes clés API

1. Dans ton projet Supabase, va dans **Settings** > **API**
2. Tu verras deux informations importantes :
   - **Project URL** : quelque chose comme `https://xxxxx.supabase.co`
   - **anon public** key : une longue clé commençant par `eyJ...`

## Étape 4 : Configurer le fichier config.js

1. Dans le dossier du projet, copie le fichier `config.example.js`
2. Renomme-le en `config.js`
3. Ouvre `config.js` et remplace :
   - `'https://ton-projet.supabase.co'` par ton **Project URL**
   - `'ta-cle-anon-ici'` par ta clé **anon public**

Exemple :
```javascript
const SUPABASE_CONFIG = {
  url: 'https://abcdefghijk.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

## Étape 5 : Vérifier que ça fonctionne

1. Ouvre ton site dans un navigateur
2. Passe le quiz et remplis le formulaire
3. Soumets le formulaire
4. Dans Supabase, va dans l'onglet **Table Editor** > **quiz_responses**
5. Tu devrais voir ta première entrée avec toutes les données !

## Consulter les données

Pour voir les réponses collectées :
1. Va dans Supabase > **Table Editor** > **quiz_responses**
2. Tu verras toutes les entrées avec :
   - Les informations personnelles (prénom, email, téléphone, Instagram)
   - Les réponses au quiz (indices et texte)
   - La date/heure de chaque soumission

## Export des données

Tu peux exporter les données en CSV :
1. Va dans **Table Editor** > **quiz_responses**
2. Clique sur le bouton "..." en haut à droite
3. Sélectionne "Export CSV"

## Sécurité

⚠️ **Important** : Le fichier `config.js` est dans `.gitignore` pour éviter de partager tes clés API. Ne le partage jamais publiquement !

## Besoin d'aide ?

- Documentation Supabase : https://supabase.com/docs
- Support : https://supabase.com/docs/support

