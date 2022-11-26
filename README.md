# JobaJobi_API
Le framework utilisé pour l'API de JobaJobi est express. Nous l'avons choisi car il est simple d'utilisation et simple à mettre en place.
Cette API permet de stocker les utilisateurs et les offres d'emplois sous le format .json.

Pour chaque requête nécéssitant une vérification d'authentification, nous faisons une vérification du token généré lors de l'inscription ou de la connexion.

# Type d'architecture
Nous avons implémenté un serveur REST Client. Ce choix a été fait afin que la mise en place du backend soit la plus simple possible,
pour que l'on puisse se concentrer sur le frontend.

Nous avons utilisé le Client Side Rendering.

# Comment installer JobaJobi_API?

### Installation

```sh
npm install
```

### Démarrer le backend

```sh
npm start
```
