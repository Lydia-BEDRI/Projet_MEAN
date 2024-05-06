# Application de Location de Logements - Projet MEAN

Ce projet consiste en une application web de location de logements similaire à AirBnB, développée avec l'architecture MEAN (MongoDB, Express, Angular, Node.js).

## Schéma de la Base de Données

### Collections MongoDB

#### Collection `Utilisateurs`

- **mail**: email de l'utilisateur, clé primaire
- **prénom**: prénom de l'utilisateur
- **nom**: nom de l'utilisateur
- **téléphone**: numéro de téléphone de l'utilisateur

#### Collection `Biens`

- **idBien**: identifiant unique du bien, clé primaire
- **mailProprio**: email du propriétaire du bien, clé étrangère vers la collection Utilisateurs
- **commune**: nom de la commune où se situe le bien
- **rue**: nom de la rue où se situe le bien
- **cp** : code postal de la commune où se situe le bien
- **nbCouchages** : nombre total de couchages disponibles dans le bien
- **nbChambres** : nombre de chambres disponibles dans le bien
- **distance** : distance en mètres entre le bien et le centre-ville
- **prix** : prix de location par nuit du bien

#### Collection `Locations`
- **idLocation**: identifiant unique de la location, clé primaire
- **idBien**: identifiant du bien loué, clé étrangère vers la collection Biens
- **mailLoueur**: email de l'utilisateur louant le bien, clé étrangère vers la collection Utilisateurs
- **dateDébut**: date de début de la location au format AAAAMMJJ
- **dateFin**: date de fin de la location au format AAAAMMJJ
- **avis**: note laissé par le loueur après la location

## Fonctionnalités de l'Application

L'internaute pourra utiliser les fonctionnalités suivantes dans l'application web de location de logements :

### Recherche Multicritères

L'utilisateur pourra effectuer une recherche en utilisant jusqu'à 7 critères différents :
- **Date de début de location**
- **Date de fin de location**
- **Commune**
- **Prix maximum**
- **Nombre minimum de chambres**
- **Nombre minimum de couchages**
- **Distance maximum au centre-ville (exprimée en mètres)**

### Visualisation des Biens à Louer

Lors de l'utilisation de cette fonctionnalité, les utilisateurs pourront :

- Afficher une liste des biens disponibles à la location avec leurs caractéristiques principales.
- Voir l'avis associé à chaque bien, représentant la moyenne des notes laissées par les loueurs précédents.
- Sélectionner un bien pour procéder à sa réservation, ce qui entraînera la création d'un document dans la collection `Locations`.
- Laisser un avis (une note) après avoir loué un bien, contribuant ainsi à l'évaluation globale du bien.


## Composants Angular

- **appComponent** :
  Composant principal de l'application qui agit comme conteneur racine pour les autres composants.

- **connexion** :
  Gère le processus d'authentification et de connexion des utilisateurs.

- **dashboard** :
  Affiche le tableau de bord principal de l'application après la connexion de l'utilisateur.

- **form-search** :
  Représente le formulaire de recherche multicritères pour filtrer les biens à louer.

- **home** :
  Composant principal de la page d'accueil de l'application.

- **layout** :
  Gère la mise en page globale de l'application, y compris le header et le footer.

- **property-detail** :
  Affiche les détails complets d'un bien à louer, y compris les avis et les informations détaillées.

- **property-list** :
  Affiche une liste des biens disponibles à la location, avec leurs caractéristiques principales.

## Services Angular

- **authentification** :
  Gère l'authentification des utilisateurs en utilisant JSON Web Tokens (JWT) pour sécuriser les sessions utilisateur. Comprend des fonctionnalités de login, logout et de gestion des tokens d'authentification. Utilise des guards (protecteurs de routes) pour restreindre l'accès aux pages protégées aux utilisateurs connectés. Utilise également des interceptors pour ajouter automatiquement les tokens d'authentification aux requêtes HTTP sortantes.

- **biens** :
  Fournit des fonctionnalités liées aux biens à louer, telles que la récupération de la liste des biens, la recherche multicritères et l'affichage des détails d'un bien spécifique.

- **location** :
  Gère les opérations de location, y compris la création de nouvelles locations, la récupération des locations existantes et la gestion des avis associés.

## Fonctionnalités Avancées

### Utilisation de JSON Web Tokens (JWT) avec Guards et Interceptors :

Les tokens JWT sont utilisés pour sécuriser l'authentification et les sessions utilisateur. Les guards sont utilisés pour restreindre l'accès aux routes protégées uniquement aux utilisateurs authentifiés. Les interceptors sont utilisés pour ajouter automatiquement les tokens d'authentification aux requêtes HTTP sortantes, simplifiant ainsi la gestion de l'authentification dans l'application.

### Géolocalisation des biens sur une carte : 
Les biens à louer pourraient être affichés sur une carte interactive pour une meilleure visualisation et une navigation facilitée.

## Instructions de Lancement

Pour lancer l'application, suivez ces étapes :

1. Assurez-vous que MongoDB est démarré en exécutant la commande `mongod`.
2. Importez les données en exécutant le script `import_data.sh` pour pré-remplir la base de données avec des données d'exemple.
3. Lancez le backend en exécutant `node server.js`.
4. Lancez le frontend en exécutant `ng serve` pour démarrer le serveur de développement Angular.