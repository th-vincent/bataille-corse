import { newGame, playCard } from "./state.js";

const state = newGame();

for (let i = 0; i < 6; i++) {
  const result = playCard(state);
  console.log(`${result.who} pose ${result.card.rank}${result.card.suit}`);
}

console.log(
  "Tas :", state.pile.length,
  "| Joueur :", state.hands.player.length,
  "| Ordi :", state.hands.computer.length
);