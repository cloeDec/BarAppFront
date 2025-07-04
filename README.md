# Barapp - Frontend (Vue.js)

## Prérequis

- Java 17 ou supérieur
- Maven 3.6+ (ou utiliser le wrapper fourni : `mvnw`/`mvnw.cmd`)
- PostgreSQL

## Installation

1. **Cloner le projet**
   ```sh
   git clone <https://github.com/cloeDec/BarAppFront.git>
   cd barapp-frontend
   ```
2. **Installer les dépendances**
   ```sh
   npm install
   ```

## Démarrage de l'application

```sh
npm run serve
```

L'application sera accessible par défaut sur :

```
http://localhost:8081
```

## Configuration

- Par défaut, le frontend attend le backend sur `http://localhost:8080`.

## Structure du projet

- `src/components` : composants Vue.js (ex : CocktailList, Login, Panier...)
- `src/router` : configuration du routage


## Conseils

- Démarrez le backend avant le frontend pour que les appels API fonctionnent.
- Vérifiez que le port du backend (`8080`) correspond à celui attendu dans le frontend.

---
