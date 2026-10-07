# Bataille corse

Un jeu de bataille corse jouable dans le navigateur, en solo contre l'ordinateur (Theotime). Aucune installation : il suffit d'ouvrir le lien.

**Jouer : https://TON-PSEUDO.github.io/NOM-DU-DEPOT/**

## Commandes

- **Cliquer sur ton paquet** (ou touche `Entrée`) : poser une carte sur le tas.
- **Barre espace** : taper sur le tas.

## Règles

Le paquet de 52 cartes est partagé en deux. À tour de rôle, chacun pose la carte du dessus de son paquet sur le tas central.

### Quand taper

On tape sur le tas quand l'une de ces combinaisons apparaît :

- **Paire** : les deux dernières cartes ont la même valeur.
- **Sandwich** : la dernière carte et celle d'avant l'avant-dernière ont la même valeur (ex. 7, K, 7).
- **Dix** : un 10 vient d'être posé.
- **Somme de 10** : les deux dernières cartes font 10 (l'As vaut 1, ex. As + 9, 4 + 6).
- **Sandwich de 10** : la dernière carte et celle d'avant l'avant-dernière font 10 (ex. 3, 4, 7).
- **3 mêmes symboles** (mode optionnel, désactivé par défaut) : les trois dernières cartes ont le même symbole (♠, ♥, ♦ ou ♣).

Celui qui tape sur une vraie combinaison **ramasse tout le tas** et rejoue. Celui qui tape à tort **perd sa carte du dessus**, qui part au fond du tas.

### Les figures

Poser une figure oblige l'adversaire à se défendre en posant des cartes :

| Figure | Cartes à poser |
|--------|----------------|
| Valet  | 1              |
| Dame   | 2              |
| Roi    | 3              |

- Si l'adversaire pose une autre figure pendant sa défense, c'est à son tour d'attaquer.
- S'il n'en pose aucune, l'attaquant **ramasse le tas**.
- Une frappe réussie annule l'attaque en cours. L'As ne compte pas comme une figure.

### Fin de partie

Celui qui n'a plus de cartes à poser perd.

## Options

- **Mode (en haut à gauche)** : règle la vitesse de frappe de Theotime, de *Facile* (il met 1 à 2 secondes à réagir) à *Impossible* (il tape quasi instantanément).
- **3 symboles (en haut à droite)** : active ou désactive la règle des trois mêmes symboles d'affilée.

## Lancer le projet en local

Le jeu utilise des modules JavaScript, qui ne fonctionnent pas en ouvrant `index.html` par double-clic. Il faut passer par un petit serveur local, par exemple l'extension **Live Server** de VS Code (clic droit sur `index.html` > *Open with Live Server*).

## Structure du projet

```
index.html   page du jeu
style.css    mise en page, cartes, animations
game.js      boucle de partie, bot, commandes, affichage
state.js     état de la partie (mains, tas, tours, figures)
rules.js     règles de frappe
cards.js     création, mélange et distribution du paquet
cardview.js  dessin des cartes
faces.js     personnages des figures
bot.js       réglages et niveaux de difficulté du bot
settings.js  options modifiables en cours de partie
```

## Publication

Le site est hébergé gratuitement avec **GitHub Pages** (*Settings > Pages*, branche `main`, dossier racine).

## Limites connues

- Le jeu se joue au clavier (la frappe se fait à la barre espace) : il n'est pas adapté aux téléphones et tablettes.
- La fin de partie est simplifiée : un joueur sans carte perd tout de suite, sans pouvoir revenir en gagnant une frappe.