# Configurer Supabase sur Netlify (mathieub.com)

**Si les données ne s’enregistrent pas dans Supabase**, c’est très probablement parce que les variables d’environnement ne sont pas configurées sur Netlify.

## Étapes à suivre

### 1. Ouvre Netlify
Va sur [app.netlify.com](https://app.netlify.com) et connecte-toi.

### 2. Ouvre ton site
Clique sur **mathieub.com** (ou le nom de ton site).

### 3. Configuration des variables
- Menu gauche : **Site configuration**
- Puis : **Environment variables**
- Clique sur **Add a variable** → **Add a single variable**

### 4. Ajoute ces 2 variables

**Variable 1 :**
- **Key :** `VITE_SUPABASE_URL`
- **Value :** `https://zyzzfnfmvydcjswpdoav.supabase.co`
- **Scopes :** All (ou Production)

**Variable 2 :**
- **Key :** `VITE_SUPABASE_ANON_KEY`
- **Value :** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5enpmbmZtdnlkY2pzd3Bkb2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzI2MzYsImV4cCI6MjA4NjE0ODYzNn0.A80jysL0Yh4A7r3CL3njHc9fZDRkwVz2FiakrN99Zc0`
- **Scopes :** All (ou Production)

### 5. Redéploie
Les variables ne sont prises en compte qu’au prochain build.

- Va dans **Deploys**
- Clique sur **Trigger deploy** → **Deploy site**
- Attends la fin du déploiement (quelques minutes)

### 6. Teste
1. Ouvre mathieub.com (idéalement en navigation privée pour éviter le cache)
2. Clique sur la vidéo
3. Remplis prénom + email
4. Clique sur « ACCÉDER À LA VIDÉO »
5. Vérifie dans Supabase : Table Editor → quiz_responses → rafraîchis la page

---

## Si tu vois une notification orange

Si une notification orange apparaît en bas de la page après avoir cliqué sur « ACCÉDER À LA VIDÉO », cela signifie que Supabase n’est pas configuré (variables manquantes sur Netlify). Suis les étapes ci-dessus.
