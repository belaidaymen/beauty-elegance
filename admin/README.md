# Beaute & Elegance - Admin Dashboard

Un tableau de bord administrateur complet et professionnel pour la gestion de votre boutique de beauté en ligne.

## 🎨 Caractéristiques

### 📊 Tableau de Bord Principal
- **Statistiques en Temps Réel**: Affichage des KPIs clés (revenus, commandes, clients, conversion)
- **Graphiques de Ventes**: Visualisation mensuelle des ventes avec détails
- **Répartition par Catégorie**: Diagramme camembert interactif
- **Commandes Récentes**: Liste des dernières commandes avec statuts

### 📦 Gestion des Commandes
- Liste complète de toutes les commandes
- Recherche et filtrage avancés (statut, paiement)
- Vue détaillée de chaque commande avec client et articles
- Mise à jour du statut de commande en temps réel
- Informations de paiement et adresse de livraison

### 🛍️ Gestion des Produits
- Catalogue de produits avec vue en grille
- Créer, modifier, supprimer des produits
- Organisation par catégories
- Gestion des prix et SKU
- Affichage du stock disponible
- Activation/désactivation rapide des produits

### 📈 Gestion de l'Inventaire
- Suivi des niveaux de stock en temps réel
- Alertes automatiques (stock faible, rupture de stock)
- Barre de progression du stock
- Ajout/modification du stock facilement
- Historique des réapprovisionnements

### 🎉 Gestion des Promotions
- Création de codes promotionnels
- Promotions par pourcentage ou montant fixe
- Gestion des dates de validité
- Limite d'utilisation par code
- Application par catégories ou produits spécifiques
- Suivi des utilisations et économies accordées

### 👤 Gestion du Profil
- Édition des informations personnelles
- Gestion des paramètres et préférences
- Système de permissions par rôle
- Sécurité: changement de mot de passe
- Informations de sécurité (2FA, sessions actives)

## 🎨 Design & UX

- **Palette de Couleurs**: Teals, bourgognes, et crème inspirée de la marque Beaute & Elegance
- **Typographie**: Serif (Andada Pro) et Sans-serif (Open Sans)
- **Composants**: Cards, badges, modales, notifications
- **Responsive**: Complètement optimisé pour mobile, tablette et desktop
- **Animations**: Transitions fluides et interactions élégantes

## 🚀 Installation & Configuration

### Prérequis
- Node.js 16+ installé
- npm, yarn ou pnpm

### Étapes d'Installation

```bash
# 1. Accédez au dossier admin
cd admin

# 2. Installez les dépendances
npm install
# ou
yarn install
# ou
pnpm install

# 3. Démarrez le serveur de développement
npm run dev
# ou
yarn dev
# ou
pnpm dev

# 4. Ouvrez votre navigateur
# Le dashboard sera accessible sur http://localhost:5173
```

## 📁 Structure du Projet

```
admin/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte        # Layout principal
│   │   ├── +page.svelte          # Tableau de bord
│   │   ├── orders/
│   │   │   └── +page.svelte      # Gestion des commandes
│   │   ├── products/
│   │   │   └── +page.svelte      # Gestion des produits
│   │   ├── stock/
│   │   │   └── +page.svelte      # Gestion de l'inventaire
│   │   ├── promotions/
│   │   │   └── +page.svelte      # Gestion des promotions
│   │   └── profile/
│   │       └── +page.svelte      # Profil et paramètres
│   ├── lib/
│   │   ├── components/           # Composants réutilisables
│   │   │   ├── Sidebar.svelte
│   │   │   ├── TopNav.svelte
│   │   │   ├── Orders/           # Composants commandes
│   │   │   ├── Products/         # Composants produits
│   │   │   ├── Stock/            # Composants inventaire
│   │   │   ├── Promotions/       # Composants promotions
│   │   │   └── Profile/          # Composants profil
│   │   ├── stores/               # Gestion d'état Svelte
│   │   │   ├── auth_store.ts
│   │   │   ├── orders_store.ts
│   │   │   ├── products_store.ts
│   │   │   ├── stock_store.ts
│   │   │   ├── promotions_store.ts
│   │   │   └── ui_store.ts
│   │   └── assets/               # Logos et icônes
│   ├── app.css                   # Styles globaux et design system
│   ├── app.html                  # HTML principal
│   └── app.d.ts                  # Types TypeScript
├── svelte.config.js              # Configuration Svelte
├── vite.config.ts                # Configuration Vite
├── tsconfig.json                 # Configuration TypeScript
├── package.json                  # Dépendances du projet
└── README.md                     # Ce fichier
```

## 🔧 Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Vérifier les types TypeScript
npm run check

# Vérifier les types en mode watch
npm run check:watch

# Lint et format du code
npm run lint
npm run format
```

## 📊 Gestion d'État (Stores)

Le projet utilise les stores Svelte pour la gestion d'état:

- **authStore**: Gestion de l'authentification et utilisateur actuel
- **ordersStore**: Gestion des commandes
- **productsStore**: Gestion des produits
- **stockStore**: Gestion de l'inventaire
- **promotionsStore**: Gestion des promotions
- **uiStore**: Gestion de l'état UI (modales, notifications, sidebar)

## 🎯 Fonctionnalités Principales

### Dashboard
- Vue d'ensemble des performances
- Graphiques interactifs
- Statistiques en temps réel
- Accès rapide aux modules

### Commandes
- Liste avec recherche et filtres
- Vue détaillée de chaque commande
- Mise à jour du statut
- Informations client complètes

### Produits
- Grille de produits interactive
- Édition en ligne
- Gestion des catégories
- Activation/désactivation rapide

### Inventaire
- Suivi du stock avec graphique
- Alertes automatiques
- Historique des modifications
- Gestion des réapprovisionnements

### Promotions
- Création de codes promos
- Gestion des réductions
- Suivi des utilisations
- Analyse des économies accordées

### Profil
- Modification des informations personnelles
- Paramètres de notification et préférences
- Gestion de la sécurité
- Affichage des permissions par rôle

## 🎨 Design System

### Couleurs Principales
- **Teal**: `#2b8a8a` (primaire)
- **Bourgogne**: `#b37777` (accentuation)
- **Violet**: `#8b4e6f` (secondaire)
- **Orange**: `#e89565` (accentuation secondaire)
- **Beige**: `#f5f1eb` (arrière-plan)

### Typographie
- **Serif Display**: Playfair Display (titres)
- **Serif Body**: Andada Pro (corps)
- **Sans-serif**: Open Sans (UI)

### Composants
- Cartes avec ombre
- Badges avec variantes
- Modales et notifications
- Tableaux avec tri/filtrage
- Formulaires avec validation

## 📱 Responsive Design

- **Desktop**: Affichage complet avec tous les détails
- **Tablet**: Mise en page adaptée, colonnes réduites
- **Mobile**: Single column, navigation optimisée
- Sidebar collapsible sur mobile
- Tous les formulaires sont mobiles-friendly

## 🔐 Authentification & Autorisations

Le système supporte 3 rôles:
- **Administrateur**: Accès complet
- **Gestionnaire**: Gestion des commandes et inventaire
- **Éditeur**: Édition limitée du contenu

## 🚀 Déploiement

### Préparer la Production

```bash
# Vérifier les types
npm run check

# Construire l'application
npm run build

# Tester la build
npm run preview
```

### Options de Déploiement

Le projet utilise `@sveltejs/adapter-auto`, qui sélectionne automatiquement l'adaptateur approprié:
- **Vercel**: Déploiement automatique
- **Netlify**: Déploiement continu
- **Node.js**: Serveur personnalisé

### Variables d'Environnement

À définir dans un fichier `.env`:
```
VITE_API_URL=votre_api_url
VITE_APP_NAME=Beaute & Elegance Admin
```

## 📝 Notes de Développement

- Les données de démonstration sont intégrées dans les stores
- L'authentification est simulée (à connecter avec un vrai backend)
- Les notifications disparaissent après 4 secondes
- Le sidebar est responsive (collapse sur mobile)
- Tous les formulaires ont validation de base

## 🐛 Dépannage

### Port déjà en utilisation
```bash
# Démarrer sur un port différent
npm run dev -- --port 5174
```

### Problèmes de compilation
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Hot Module Replacement (HMR) non fonctionnel
```bash
# Redémarrer le serveur
npm run dev
```

## 📖 Ressources

- [Documentation Svelte](https://svelte.dev)
- [Documentation SvelteKit](https://kit.svelte.dev)
- [Documentation Vite](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 Licence

Propriétaire - Beaute & Elegance

## 🤝 Support

Pour toute question ou problème avec le dashboard admin, veuillez contacter l'équipe de développement.

---

**Version**: 1.0.0  
**Dernière mise à jour**: Décembre 2024
