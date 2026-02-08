# Étape 2 : Récupérer l'URL et la clé API

## Actions à faire

1. Dans le tableau de bord Supabase, clique sur l'icône **engrenage** en bas à gauche
2. Clique sur **Project Settings** (Paramètres du projet)
3. Dans le menu de gauche, clique sur **API**
4. Sur la page qui s'affiche, tu vas copier **2 informations** :

### A) Project URL

- Repère la section **Project URL**
- Clique sur l'icône **copier** à côté de l'URL
- L'URL ressemble à : `https://abcdefghijk.supabase.co`
- **Garde-la** : tu en auras besoin à l'étape 4

### B) Clé anon (anon public)

- Repère la section **Project API keys**
- Tu verras soit **anon public** (clé JWT qui commence par `eyJ...`), soit **Publishable key** (qui commence par `sb_publishable_...`)
- Copie la clé **anon public** OU **Publishable key**
- **Garde-la** : tu en auras besoin à l'étape 4

> ⚠️ Ne copie **jamais** la clé **service_role** ou **Secret key** — elle ne doit pas être utilisée côté site.

## Vérification

Tu dois avoir copié :
- 1 URL (ex. `https://xxx.supabase.co`)
- 1 clé (ex. `eyJhbGciOiJIUzI1NiIs...` ou `sb_publishable_...`)

---
➡️ **Suite :** [ETAPE_3_CREER_TABLE.md](ETAPE_3_CREER_TABLE.md)
