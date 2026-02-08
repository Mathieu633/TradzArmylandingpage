# Étape 3 : Créer la table dans Supabase

## Actions à faire

1. Dans Supabase, clique sur **SQL Editor** dans le menu de gauche
2. Clique sur **New query** (Nouvelle requête)
3. Ouvre le fichier **`supabase_create_table.sql`** à la racine de ton projet
4. Sélectionne tout le contenu (Ctrl+A) et copie (Ctrl+C)
5. Colle dans l'éditeur SQL de Supabase (Ctrl+V)
6. Clique sur **Run** (ou Ctrl+Enter)

## Ce que fait ce script

- Crée la table `quiz_responses` avec les colonnes : id, firstname, email, phone, created_at
- Active la sécurité (RLS)
- Autorise les inserts depuis le site (rôle anon)
- Donne les permissions nécessaires

## Vérification

- Tu dois voir un message de succès (vert) en bas
- Va dans **Table Editor** → tu dois voir la table **quiz_responses** dans la liste

## En cas d'erreur

Si tu as une erreur de syntaxe :
- Vérifie que tu as bien copié depuis le fichier `.sql` (pas depuis un document Word ou un PDF)
- Les guillemets doivent être droits `"` et pas typographiques `"`

---
➡️ **Suite :** [ETAPE_4_CONFIGURER_PROJET.md](ETAPE_4_CONFIGURER_PROJET.md)
