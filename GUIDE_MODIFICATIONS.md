# Guide : Modifications et Gestion du Domaine

## ✅ Oui, tu peux faire des modifications plus tard !

Ton site est versionné avec Git, donc tu peux modifier n'importe quoi à tout moment.

### Comment faire des modifications :

#### Méthode 1 : Modifier directement dans ton éditeur

1. **Ouvre les fichiers** dans ton éditeur (index.html, style.css, script.js, etc.)
2. **Fais tes modifications**
3. **Sauvegarde** les fichiers
4. **Dans le terminal**, exécute :
   ```bash
   git add .
   git commit -m "Description de tes modifications"
   git push
   ```
5. **Netlify va automatiquement redéployer** ton site (1-2 minutes)

#### Méthode 2 : Utiliser GitHub directement

1. Va sur https://github.com/Mathieu633/TradzArmylandingpage
2. Clique sur le fichier que tu veux modifier
3. Clique sur l'icône crayon (Edit)
4. Fais tes modifications
5. Clique sur "Commit changes"
6. Netlify va automatiquement redéployer

#### Méthode 3 : Me demander de l'aide

- Tu peux toujours revenir me demander de faire des modifications
- Je peux modifier le code pour toi
- Je peux ajouter de nouvelles fonctionnalités

---

## 🌐 Oui, tu peux utiliser le même domaine pour un autre site !

Tu peux changer le domaine associé à n'importe quel moment.

### Comment transférer le domaine vers un autre site Netlify :

#### Option 1 : Changer le domaine d'un site existant

1. Va sur Netlify > Ton **nouveau site**
2. Va dans **"Site settings"** > **"Domain management"**
3. Clique sur **"Add custom domain"**
4. Entre `mathieub.com`
5. Netlify va te dire que le domaine est déjà utilisé
6. Va sur l'**ancien site** (celui qui utilise actuellement mathieub.com)
7. Va dans **"Domain management"**
8. Clique sur **"Options"** à côté de `mathieub.com`
9. Clique sur **"Remove domain"** ou **"Change primary domain"**
10. Retourne sur le nouveau site et ajoute le domaine

#### Option 2 : Supprimer le domaine de l'ancien site

1. Va sur Netlify > Ton **ancien site**
2. Va dans **"Site settings"** > **"Domain management"**
3. Clique sur **"Options"** à côté de `mathieub.com`
4. Clique sur **"Remove domain"**
5. Confirme la suppression
6. Va sur ton **nouveau site**
7. Ajoute le domaine `mathieub.com`

#### Option 3 : Garder les deux sites actifs

- Tu peux avoir plusieurs sites Netlify
- Chaque site peut avoir son propre domaine
- Le domaine `mathieub.com` peut être transféré d'un site à l'autre

---

## 📝 Ce que tu peux modifier facilement :

### Textes et contenu :
- ✅ Tous les textes dans `index.html`
- ✅ Les questions du quiz dans `script.js`
- ✅ Les couleurs dans `style.css`
- ✅ Les images dans le dossier `images/`

### Fonctionnalités :
- ✅ Ajouter de nouvelles questions au quiz
- ✅ Modifier le design
- ✅ Changer les couleurs
- ✅ Ajouter de nouveaux éléments
- ✅ Modifier les liens (Telegram, etc.)

### Configuration :
- ✅ Changer l'URL de la vidéo YouTube
- ✅ Modifier les paramètres Supabase
- ✅ Ajouter de nouveaux champs au formulaire

---

## 🔄 Workflow de modification typique :

1. **Modifier** les fichiers localement
2. **Tester** en local (ouvre index.html dans le navigateur)
3. **Sauvegarder** avec Git :
   ```bash
   git add .
   git commit -m "Description"
   git push
   ```
4. **Attendre** le déploiement Netlify (1-2 min)
5. **Vérifier** sur https://mathieub.com

---

## 💡 Conseils :

- **Fais des sauvegardes régulières** avec Git
- **Teste en local** avant de pousser sur GitHub
- **Utilise des messages de commit clairs** pour savoir ce qui a changé
- **Netlify redéploie automatiquement** à chaque push

---

## 🆘 Besoin d'aide pour modifier ?

Tu peux toujours :
- Me demander de faire les modifications
- Me donner les changements que tu veux
- Me montrer ce que tu veux modifier

---

## ✅ Résumé

- ✅ **Modifications** : Oui, à tout moment, facilement
- ✅ **Changer de site** : Oui, tu peux transférer le domaine
- ✅ **Tout est sauvegardé** : Git garde l'historique de toutes les modifications

**Ton site est flexible et modifiable à l'infini !** 🎉


