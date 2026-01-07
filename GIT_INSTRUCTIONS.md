# Instructions pour pousser le projet sur GitHub/GitLab

## ✅ Étape 1 : Dépôt Git local créé
Le dépôt Git local a été initialisé avec succès et tous les fichiers ont été commités.

## 📤 Étape 2 : Créer un dépôt distant

### Option A : GitHub
1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur le bouton "+" en haut à droite
3. Sélectionnez "New repository"
4. Donnez un nom à votre dépôt (ex: "landing-page-trading")
5. Ne cochez PAS "Initialize with README" (on a déjà un README)
6. Cliquez sur "Create repository"

### Option B : GitLab
1. Allez sur [GitLab.com](https://gitlab.com)
2. Cliquez sur "New project"
3. Choisissez "Create blank project"
4. Donnez un nom à votre projet
5. Cliquez sur "Create project"

## 🔗 Étape 3 : Connecter le dépôt local au dépôt distant

Une fois le dépôt distant créé, exécutez ces commandes dans votre terminal :

```bash
# Pour GitHub (remplacez USERNAME et REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# OU pour GitLab (remplacez USERNAME et REPO_NAME)
git remote add origin https://gitlab.com/USERNAME/REPO_NAME.git
```

## 🚀 Étape 4 : Pousser le code

```bash
# Pousser vers la branche principale
git push -u origin master

# OU si votre dépôt utilise "main" au lieu de "master"
git branch -M main
git push -u origin main
```

## 📝 Résumé des fichiers sauvegardés

- ✅ `index.html` - Page principale
- ✅ `style.css` - Styles
- ✅ `script.js` - Logique JavaScript
- ✅ `images/` - Images et logos
- ✅ `.gitignore` - Fichiers à ignorer
- ✅ `README.md` - Documentation

## 🔒 Note de sécurité

Le fichier `.gitignore` exclut `node_modules/` pour éviter de pousser des dépendances volumineuses.




