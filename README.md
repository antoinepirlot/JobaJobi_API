# JobaJobi_API
Le framework utilisé pour l'API de JobaJobi est express. Nous l'avons choisi car il est simple d'utilisation et à mettre en place.
Cette API permet de stocker les données des différents utilisateurs sous le format .json.
Un utilisateur peut notamment: 
* aimer une offre d'emploi  s'il est autorisé
* ajouter une offre d'emploi s'il est autorié

Chaque requête nécéssitant une vérification d'authentification, nous vérifierons le token généré lors de l'inscription ou de la connexion.

# Type d'architecture
Nous avons implémenté un serveur REST Client. Ce choix a été fait afin que la mise en place du backend soit le plus simple,
pour que l'on puisse se concentrer sur le frontend.

Nous avons utilisé le Client Side Rendering afin de permettre à plusieurs utilisateurs de se connecter en même sans surcharger le server.

# Comment installer JobaJobi_API?

### Installation

```sh
npm install
```

### Démarrer le backend

```sh
npm start
```
