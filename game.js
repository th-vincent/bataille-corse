import { newGame, playCard, slap } from "./state.js";
import { getSlapType } from "./rules.js";
import { BOT, randomBetween } from "./bot.js";

const state = newGame();
let botPlayTimer = null;
let botSlapTimer = null;
let gameOver = false;

function logState() {
  console.log(
    `Joueur : ${state.hands.player.length} | Ordi : ${state.hands.computer.length} | Tas : ${state.pile.length} | Tour : ${state.turn}`
  );
}

function endGame(reason) {
  gameOver = true;
  clearTimeout(botPlayTimer);
  clearTimeout(botSlapTimer);
  console.log(`FIN DE PARTIE : ${reason}`);
}

// Le bot pose sa carte quand c'est son tour
function scheduleBotTurn() {
  clearTimeout(botPlayTimer);
  if (gameOver || state.turn !== "computer") return;
  botPlayTimer = setTimeout(() => {
    const result = playCard(state);
    if (!result) return endGame("l'ordinateur n'a plus de cartes");
    console.log(`Ordi pose ${result.card.rank}${result.card.suit}`);
    afterCardPlayed();
  }, BOT.playDelay);
}

// Après chaque carte posée : le bot décide s'il va taper (à raison ou à tort)
function afterCardPlayed() {
  clearTimeout(botSlapTimer);
  const hasCombo = getSlapType(state.pile) !== null;

  if (hasCombo || Math.random() < BOT.mistakeChance) {
    const pileSize = state.pile.length; // photo du tas au moment de la décision
    botSlapTimer = setTimeout(() => {
      // Si le tas a changé entre-temps (nouvelle carte, frappe), le bot annule
      if (gameOver || state.pile.length !== pileSize) return;
      handleSlap("computer");
    }, randomBetween(BOT.minReaction, BOT.maxReaction));
  }

  logState();
  scheduleBotTurn();
}

function handleSlap(who) {
  if (gameOver) return;
  const result = slap(state, who);
  if (!result) return; // tas vide : rien à faire

  clearTimeout(botSlapTimer); // dès qu'on tape, la frappe en attente du bot saute
  const name = who === "player" ? "Joueur" : "Ordi";
  console.log(
    result.ok
      ? `${name} tape : ${result.type.toUpperCase()} ! Il ramasse ${result.won} cartes`
      : `${name} tape À TORT : pénalité`
  );
  logState();
  scheduleBotTurn();
}

// Commandes du joueur
document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  if (e.code === "Enter" && state.turn === "player") {
    const result = playCard(state);
    if (!result) return endGame("tu n'as plus de cartes");
    console.log(`Joueur pose ${result.card.rank}${result.card.suit}`);
    afterCardPlayed();
  }

  if (e.code === "Space") {
    e.preventDefault(); // évite que la page défile
    handleSlap("player");
  }
});

console.log("Partie lancée : clique sur la page, puis Entrée pour poser une carte, Espace pour taper.");
logState();