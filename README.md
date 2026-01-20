# DA COLLECTION - Site Web pour Tailleur

Site web complet permettant au tailleur DA COLLECTION de poster ses modèles et aux visiteurs de passer des commandes.

## Fonctionnalités

### Interface Publique
- **Page d'accueil** : Galerie des modèles avec photos, descriptions et prix
- **Formulaire de commande** : Les visiteurs peuvent commander un modèle en remplissant leurs informations

### Interface d'Administration
- **Gestion des modèles** : Ajouter, supprimer des modèles avec nom, description, prix et image
- **Gestion des commandes** : Voir toutes les commandes, mettre à jour leur statut (En attente, Confirmée, Terminée, Annulée)

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :

**Option 1 : Utiliser le script de démarrage (recommandé)**
```bash
./start-server.sh
```

**Option 2 : Utiliser npm directement**
```bash
npm run dev
```

**Important** : 
- ⏱️ **Le serveur prend 30-40 secondes à compiler la première fois**
- Même si vous voyez "✓ Starting..." et que le terminal semble inactif, **laissez-le tourner**
- Après 30-40 secondes, le serveur affichera "✓ Ready" ou "○ Compiling"
- Vous pouvez alors accéder à http://localhost:3000 dans votre navigateur
- **Ne fermez PAS le terminal** - le serveur doit continuer à tourner

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

**Note** : Si le serveur s'arrête immédiatement, consultez le fichier `TROUBLESHOOTING.md` pour les solutions.

## Structure du Projet

- `/app` : Pages et routes Next.js
  - `/page.tsx` : Page d'accueil avec galerie de modèles
  - `/admin/page.tsx` : Interface d'administration
  - `/commande/[id]/page.tsx` : Page de commande pour un modèle spécifique
  - `/api` : Routes API pour modèles et commandes

- `/lib/data.ts` : Fonctions de gestion des données (stockage en JSON)

- `/data` : Fichiers JSON pour le stockage des modèles et commandes (créé automatiquement)

## Utilisation

### Pour le Tailleur (Administrateur)

1. Accéder à la page de connexion : `/admin/login`
2. Entrer le mot de passe administrateur (par défaut : `admin123`)
   - ⚠️ **Important** : Changez le mot de passe en production en créant un fichier `.env.local` avec `ADMIN_PASSWORD=votre_mot_de_passe`
3. Une fois connecté, vous accédez à l'interface d'administration
4. Ajouter des modèles en cliquant sur "Ajouter un modèle"
5. Remplir les informations : nom, description, prix, et optionnellement une URL d'image
6. Consulter les commandes dans l'onglet "Commandes"
7. Mettre à jour le statut des commandes (Confirmer, Terminer, Annuler)
8. Cliquer sur "Déconnexion" pour quitter la session

### Pour les Visiteurs

1. Parcourir les modèles sur la page d'accueil
2. Cliquer sur "Commander" pour un modèle
3. Remplir le formulaire avec vos informations
4. Soumettre la commande

## Technologies Utilisées

- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling moderne et responsive
- **JSON** : Stockage des données (peut être remplacé par une base de données)

## Note

Les données sont stockées localement dans des fichiers JSON. Pour une utilisation en production, il est recommandé d'utiliser une vraie base de données.

## Dépannage

Si vous rencontrez des problèmes :

1. **Le serveur s'arrête après "Starting..."** : Consultez `SOLUTION.md` pour des solutions détaillées
2. **Autres problèmes** : Consultez `TROUBLESHOOTING.md`

**Solution rapide** : Si le serveur semble s'arrêter, vérifiez qu'il fonctionne vraiment :
```bash
# Dans un autre terminal
curl http://localhost:3000
```
Si vous obtenez du HTML, le serveur fonctionne ! Le problème est juste l'affichage dans le terminal.
