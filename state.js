// state.js
import { createDeck, shuffle, deal } from "./cards.js";
import { getSlapType, figureCost } from "./rules.js";

export function newGame() {
  const { player, computer } = deal(shuffle(createDeck()));
  return {
    hands: { player, computer },
    pile: [],
    turn: "player",     // "player", "computer", ou null pendant le ramassage du tas
    challenge: null,    // { challenger, remaining } : attaque en cours
    collecting: null,   // qui va ramasser le tas (après une défense ratée)
  };
}

export function playCard(state) {
  const who = state.turn;
  const other = who === "player" ? "computer" : "player";

  const card = state.hands[who].shift();
  if (!card) return null; // plus de cartes

  state.pile.push(card);
  const cost = figureCost(card);

  if (cost > 0) {
    // Une figure (attaque, ou contre-attaque) : l'autre doit se défendre
    state.challenge = { challenger: who, remaining: cost };
    state.turn = other;
  } else if (state.challenge) {
    // Défense en cours : une carte de moins à poser
    state.challenge.remaining--;
    if (state.challenge.remaining === 0) {
      // Défense ratée : l'attaquant va ramasser le tas
      state.collecting = state.challenge.challenger;
      state.challenge = null;
      state.turn = null; // personne ne pose pendant le délai
    }
    // sinon, le défenseur continue (state.turn ne change pas)
  } else {
    state.turn = other; // tour normal
  }

  return { who, card };
}

// Ramassage du tas par l'attaquant (appelé après le délai)
export function collectPile(state) {
  const winner = state.collecting;
  if (!winner) return null;

  const won = state.pile.length;
  state.hands[winner].push(...state.pile);
  state.pile = [];
  state.collecting = null;
  state.turn = winner;
  return { winner, won };
}

export function slap(state, who) {
  if (state.pile.length === 0) return null;

  const type = getSlapType(state.pile);

  if (type) {
    const won = state.pile.length;
    state.hands[who].push(...state.pile);
    state.pile = [];
    state.challenge = null;   // la frappe annule toute attaque en cours
    state.collecting = null;
    state.turn = who;
    return { who, ok: true, type, won };
  }

  const penalty = state.hands[who].shift();
  if (penalty) state.pile.unshift(penalty);
  return { who, ok: false, type: null, won: 0 };
}