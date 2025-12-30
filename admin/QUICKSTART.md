# 🚀 Guide de Démarrage Rapide - Admin Dashboard

## ⚡ Démarrage en 30 Secondes

```bash
# 1. Accédez au dossier admin
cd admin

# 2. Installez les dépendances
npm install

# 3. Lancez le serveur
npm run dev

# 4. Ouvrez http://localhost:5173
# ✅ C'est prêt!
```

## 🎯 Accès Initial

**URL**: http://localhost:5173  
**Utilisateur**: Automatiquement connecté avec un compte demo  
**Mot de passe**: Aucun requis pour la démo

## 📋 Modules Disponibles

Cliquez sur les éléments dans la barre latérale:

| Module | Icon | Description |
|--------|------|-------------|
| **Tableau de Bord** | 📊 | Vue d'ensemble des statistiques |
| **Commandes** | 📦 | Gestion de toutes les commandes |
| **Produits** | 🛍️ | Gestion du catalogue |
| **Inventaire** | 📈 | Suivi du stock |
| **Promotions** | 🎉 | Codes promos et campagnes |
| **Profil** | 👤 | Paramètres et sécurité |

## 🎨 Première Exploration

### 1. Tableau de Bord
- Voir les KPIs principaux
- Graphiques de ventes
- Commandes récentes
- Produits les plus vendus

### 2. Commandes
- **Voir les commandes**: Cliquez sur un numéro de commande
- **Changer le statut**: Ouvrez les détails → Sélecteur de statut
- **Filtrer**: Utilisez les champs de recherche et sélecteurs

### 3. Produits
- **Ajouter**: Cliquez "+ Nouveau Produit"
- **Modifier**: Cliquez sur le crayon dans une carte
- **Activer/Désactiver**: Cliquez l'œil
- **Supprimer**: Cliquez la corbeille

### 4. Inventaire
- **Voir les alertes**: En haut de la page
- **Modifier le stock**: Cliquez le crayon dans le tableau
- **Ajouter du stock**: Cliquez "+ Ajouter Stock"

### 5. Promotions
- **Créer une promo**: Cliquez "+ Nouvelle Promotion"
- **Copier le code**: Cliquez sur le code promo
- **Gérer les dates**: Les promos affichent les jours restants

### 6. Profil
- **Modifier vos infos**: Onglet "Profil"
- **Changer les paramètres**: Onglet "Paramètres"
- **Voir les permissions**: Onglet "Permissions"

## 🎨 Personnalisation

### Changer les Couleurs

Modifiez `admin/src/app.css`:

```css
:root {
	--color-accent-teal: #2b8a8a; /* Changez cette couleur */
	--color-accent-burgundy: #b37777; /* Et celle-ci */
	/* ... etc */
}
```

### Changer les Données

Les données de démonstration sont dans:
- `src/routes/orders/+page.svelte`
- `src/routes/products/+page.svelte`
- `src/routes/stock/+page.svelte`
- `src/routes/promotions/+page.svelte`

Modifiez les tableaux `demoOrders`, `demoProducts`, etc.

### Ajouter un Nouveau Module

1. Créez `src/routes/monmodule/+page.svelte`
2. Créez un store dans `src/lib/stores/`
3. Ajoutez une entrée dans `Sidebar.svelte` -> `menuItems`
4. Créez les composants dans `src/lib/components/MonModule/`

## 🔧 Commandes Utiles

```bash
# Démarrer le serveur
npm run dev

# Vérifier les types TypeScript
npm run check

# Construire pour la production
npm run build

# Prévisualiser la build
npm run preview

# Formater le code
npm run format

# Linter le code
npm run lint
```

## 📱 Tester sur Mobile

```bash
# Le serveur écoute déjà 0.0.0.0
# Depuis votre téléphone, accédez à:
# http://<votre-ip>:5173

# Ou utilisez ngrok:
npx ngrok http 5173
```

## 🐛 Dépannage Rapide

### Le port 5173 est occupé?
```bash
npm run dev -- --port 5174
```

### Node modules corrompus?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Les changements ne s'affichent pas?
```bash
# Rafraîchissez simplement la page
# HMR devrait fonctionner automatiquement
```

### Erreurs TypeScript?
```bash
npm run check
```

## 💡 Astuces

1. **Recherche Rapide**: Utilisez Ctrl+F dans n'importe quel tableau
2. **Copier le Code Promo**: Cliquez sur le code promo pour le copier
3. **Édition en Ligne**: Cliquez le crayon pour éditer directement
4. **Vue Détaillée**: Cliquez sur un élément pour voir les détails
5. **Notifications**: Voir en bas à droite après chaque action

## 📊 Données de Démonstration

Le dashboard est pré-peuplé avec:
- ✓ 5 commandes (différents statuts)
- ✓ 5 produits (différentes catégories)
- ✓ 6 articles d'inventaire (avec alertes)
- ✓ 5 codes promotionnels
- ✓ Statistiques mensuelles

## 🚀 Prêt pour Production?

Avant de déployer:

1. **Remplacer les données**:
   - Connectez votre API réelle
   - Remplacez les données de démo

2. **Ajouter l'authentification**:
   - Implémentez la vraie connexion
   - Sauvegardez les tokens

3. **Configurer l'environnement**:
   - Créez un `.env.production`
   - Définissez les variables

4. **Builder**:
```bash
npm run build
npm run preview
```

## 📚 Documentation Complète

- Voir `README.md` pour la documentation complète
- Voir `IMPLEMENTATION.md` pour les détails techniques

## 🎉 Vous Êtes Prêt!

Le dashboard est 100% fonctionnel avec:
- ✅ Tous les modules implémentés
- ✅ Design responsive et professionnel
- ✅ Données de démonstration réalistes
- ✅ Animations et transitions fluides
- ✅ Code bien organisé et maintenable

Amusez-vous à explorer! 🚀

---

**Besoin d'aide?**  
Consultez la [documentation complète](./README.md) ou l'[implémentation détaillée](./IMPLEMENTATION.md).
