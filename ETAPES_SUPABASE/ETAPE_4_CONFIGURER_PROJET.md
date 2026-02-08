# Étape 4 : Configurer le projet avec les clés

## Actions à faire

1. À la racine de ton projet, copie le fichier **`.env.local.example`**
2. Renomme la copie en **`.env.local`**
3. Ouvre `.env.local` et remplace les valeurs :

```
VITE_SUPABASE_URL=https://ton-projet.supabase.co
VITE_SUPABASE_ANON_KEY=ta_cle_anon_ici
```

Remplace :
- `https://ton-projet.supabase.co` → par ton **Project URL** (étape 2)
- `ta_cle_anon_ici` → par ta **clé anon** (étape 2)

### Exemple

```
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
```

## Vérification

- Le fichier `.env.local` existe à la racine du projet
- Les 2 lignes sont remplies (sans espaces en trop)
- Le fichier est dans `.gitignore` (ne sera pas envoyé sur GitHub)

---
➡️ **Suite :** [ETAPE_5_AJOUTER_CODE.md](ETAPE_5_AJOUTER_CODE.md)
