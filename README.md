
# ChefBoard-back

ChefBoard-back est une API RESTful développée en Node.js avec Express, servant de backend pour l'application ChefBoard. Elle permet de gérer les utilisateurs, les restaurants, les avis, les catégories, et les interactions sur la carte.

## 🚀 Fonctionnalités

- **Authentification JWT** : Inscription, connexion et gestion des sessions utilisateur.
- **Gestion des restaurants** : Ajout, modification, suppression et consultation des restaurants.
- **Gestion des avis** : Publication, modification et suppression des avis des utilisateurs.
- **Catégorisation** : Attribution de catégories aux restaurants pour faciliter la recherche.
- **Filtrage dynamique** : Recherche de restaurants par catégorie, localisation, et autres critères.

## 🛠️ Prérequis

- Node.js (version recommandée : 18.x)
- MongoDB (local ou via MongoDB Atlas)
- Outils de développement : Postman, Insomnia ou tout autre client HTTP

## ⚙️ Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/theoUniv/ChefBoard-back.git
   cd ChefBoard-back
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Configurer les variables d'environnement :
   Créer un fichier `.env` à la racine avec les variables nécessaires (exemple) :
   ```
   PORT=3000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Lancer le serveur en mode développement :
   ```bash
   npm run dev
   ```

## 📦 Utilisation

L'API sera accessible sur `http://localhost:3000` (ou le port configuré).

Endpoints principaux :
- `/auth/register` : inscription
- `/auth/login` : connexion
- `/restaurants` : gestion des restaurants
- `/reviews` : gestion des avis
- `/categories` : gestion des catégories

Consultez la documentation Swagger (si disponible) ou les fichiers sources pour plus de détails.

## 📝 Contribution

Les contributions sont les bienvenues !  
Forkez le projet, créez une branche dédiée, puis envoyez une pull request.

## ⚠️ Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.
