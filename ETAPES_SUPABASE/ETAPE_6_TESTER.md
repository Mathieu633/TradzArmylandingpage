# Étape 6 : Tester que tout fonctionne

## Actions à faire

1. Ouvre ton site : **http://localhost:3000**
2. Clique sur **DÉBLOQUE LA VIDÉO**
3. Remplis le formulaire avec un prénom et un email (tu peux utiliser le tien pour tester)
4. Clique sur **ACCÉDER À LA VIDÉO**

## Vérification

1. **Sur le site** : la modal se ferme, la vidéo se débloque, le contenu s'affiche
2. **Dans Supabase** : va dans **Table Editor** → clique sur **quiz_responses**
3. Tu dois voir une nouvelle ligne avec ton prénom et ton email

## En cas de problème

| Problème | Solution |
|----------|----------|
| Erreur "Invalid supabaseUrl" | Vérifie que l'URL dans `.env.local` commence par `https://` et se termine par `.supabase.co` |
| Erreur "Failed to fetch" | Le projet Supabase est peut-être en pause (plan gratuit) → va sur le dashboard et clique sur "Restore" |
| Erreur "row-level security" | Réexécute le script SQL `supabase_create_table.sql` dans Supabase |
| Aucune erreur mais pas de données | Vérifie que tu es sur le bon projet Supabase (même URL que dans .env.local) |

## C'est terminé !

Tes leads (prénom + email) sont maintenant enregistrés dans Supabase à chaque déblocage de vidéo.
