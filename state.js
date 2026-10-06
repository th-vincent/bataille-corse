// state.js
import { createDeck, shuffle, deal } from "./cards.js";
import { getSlapType } from "./rules.js";

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

// `who` ("player" ou "computer") tape sur le tas
export function slap(state, who) {
  if (state.pile.length === 0) return null; // rien sur la table, on ignore

  const type = getSlapType(state.pile);

  if (type) {
    // Bonne frappe : on ramasse le tas, et on rejoue
    const won = state.pile.length;
    state.hands[who].push(...state.pile); // sous la main (le dessus est en index 0)
    state.pile = [];
    state.turn = who;
    return { who, ok: true, type, won };
  }

  // Fausse frappe : pénalité, une carte du dessus de la main part au fond du tas
  const penalty = state.hands[who].shift();
  if (penalty) state.pile.unshift(penalty); // unshift = fond du tas (le dessus est le dernier)
  return { who, ok: false, type: null, won: 0 };
}