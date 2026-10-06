// state.js
import { createDeck, shuffle, deal } from "./cards.js";

// Crée une nouvelle partie
export function newGame() {
  const { player, computer } = deal(shuffle(createDeck()));
  return {
    hands: { player, computer }, // les mains (la carte du dessus est en index 0)
    pile: [],                    // le tas central (la carte du dessus est la dernière)
    turn: "player",              // à qui le tour
  };
}

// Le joueur dont c'est le tour pose sa carte du dessus sur le tas
export function playCard(state) {
  const who = state.turn;
  const card = state.hands[who].shift(); // retire la 1re carte de la main

  if (!card) return null; // plus de cartes : on gérera la fin de partie plus tard

  state.pile.push(card);
  state.turn = who === "player" ? "computer" : "player";
  return { who, card };
}