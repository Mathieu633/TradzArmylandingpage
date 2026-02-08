# Étape 5 : Installer Supabase et ajouter le code

## 5.1 Installer la dépendance

Dans le terminal, à la racine du projet :

```bash
npm install @supabase/supabase-js
```

## 5.2 Modifier script.js

Ouvre le fichier **script.js** et ajoute :

### En tout début de fichier (ligne 1)

```javascript
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key || !url.startsWith("http")) return null;
  try {
    return createClient(url, key);
  } catch {
    return null;
  }
}
```

### Dans la fonction unlockVideo

Trouve la ligne `if (!firstname || !email) return;` et **ajoute juste après** (avant "Sauvegarder et afficher") :

```javascript
  const supabaseClient = getSupabase();
  if (supabaseClient) {
    try {
      await supabaseClient
        .from("quiz_responses")
        .insert([{ firstname, email }])
        .select();
    } catch (err) {
      console.error("Erreur Supabase:", err.message);
    }
  }
```

## 5.3 Redémarrer le serveur

```bash
npm run dev
```

> ⚠️ Il faut redémarrer car le fichier `.env.local` est lu au démarrage.

---
➡️ **Suite :** [ETAPE_6_TESTER.md](ETAPE_6_TESTER.md)
