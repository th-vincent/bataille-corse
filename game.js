import { newGame, playCard, collectPile, slap } from "./state.js";
import { getSlapType } from "./rules.js";
import { BOT, randomBetween } from "./bot.js";
import { cardFaceHTML } from "./cardview.js";

const COLLECT_DELAY = 1500; // temps (ms) pour taper avant le ramassage du tas

const state = newGame();
let botPlayTimer = null;
let botSlapTimer = null;
let collectTimer = null;
let gameOver = false;

const $ = (id) => document.getElementById(id);
const nameOf = (who) => (who === "player" ? "Tu" : BOT.name);

$("bot-name").textContent = BOT.name;

// Gros message animé au centre de l'écran
function showToast(text, kind) {
  const el = $("toast");
  el.textContent = text;
  el.className = "";
  void el.offsetWidth; // force le navigateur à relancer l'animation
  el.className = `show ${kind}`;
}

// ---------- Affichage ----------



function challengeText() {
  if (state.collecting) {
    return `${nameOf(state.collecting)} ${state.collecting === "player" ? "vas ramasser" : "va ramasser"} le tas...`;
  }
  if (state.challenge) {
    const defender = state.challenge.challenger === "player" ? "computer" : "player";
    const n = state.challenge.remaining;
        return `${defender === "player" ? "Tu dois" : BOT.name + " doit"} poser encore ${n} carte${n > 1 ? "s" : ""}`;
  }
  return "";
}



function render() {
  $("player-count").textContent = state.hands.player.length;
  $("computer-count").textContent = state.hands.computer.length;

  // On prend les 4 dernières cartes : la plus ancienne est grisée (= "il y en a d'autres dessous")
  const shown = state.pile.slice(-4);
  const hasBehind = shown.length === 4;
  $("pile").innerHTML = shown
    .map((card, i) => cardFaceHTML(card, hasBehind ? i : i + 1, hasBehind && i === 0))
    .join("");
  $("pile-number").textContent = state.pile.length;

  $("challenge-info").textContent = gameOver ? "" : challengeText();
  $("play-btn").disabled = gameOver || state.turn !== "player";
  $("restart-btn").hidden = !gameOver;
}

function say(text) {
  $("message").textContent = text;
  console.log(text);
}

// ---------- Logique de partie ----------

function endGame(reason) {
  gameOver = true;
  clearTimeout(botPlayTimer);
  clearTimeout(botSlapTimer);
  clearTimeout(collectTimer);
  say(`Fin de partie : ${reason}`);
  render();
}

function scheduleBotTurn() {
  clearTimeout(botPlayTimer);
  if (gameOver || state.turn !== "computer") return;
  botPlayTimer = setTimeout(() => {
    const result = playCard(state);
        if (!result) return endGame(`${BOT.name} n'a plus de cartes, tu gagnes !`);
    say(`${BOT.name} pose ${result.card.rank}${result.card.suit}`);
    afterCardPlayed();
  }, BOT.playDelay);
}

// Si une défense a échoué, le tas est ramassé après un court délai
function scheduleCollect() {
  clearTimeout(collectTimer);
  if (gameOver || !state.collecting) return;
  collectTimer = setTimeout(() => {
    const result = collectPile(state);
    if (!result) return;
    say(`${nameOf(result.winner)} ramasse le tas (+${result.won} cartes)`);
    if (result.winner === "computer") showToast("Cheh", "cheh");
    render();
    scheduleBotTurn();
  }, COLLECT_DELAY);
}

function afterCardPlayed() {
  clearTimeout(botSlapTimer);

  if (getSlapType(state.pile) !== null) {
    botSlapTimer = setTimeout(() => {
      // Le bot ne tape que s'il y a toujours une combinaison à ce moment-là
      if (gameOver || getSlapType(state.pile) === null) return;
      handleSlap("computer");
    }, randomBetween(BOT.minReaction, BOT.maxReaction));
  }

  render();
  scheduleCollect();
  scheduleBotTurn();
}

function handleSlap(who) {
  if (gameOver) return;
  const result = slap(state, who);
  if (!result) return;

  clearTimeout(botSlapTimer);
  if (result.ok) {
    clearTimeout(collectTimer); // la frappe annule le ramassage prévu
    if (who === "computer") showToast("noob", "noob");
  } else if (who === "player") {
    showToast("Gros nullos", "nullos");
  }
  say(
    result.ok
      ? `${nameOf(who)} ${who === "player" ? "tapes" : "tape"} : ${result.type} ! +${result.won} cartes`
      : `${nameOf(who)} ${who === "player" ? "tapes" : "tape"} à tort : pénalité`
  );
  render();
  scheduleBotTurn();
}

function playerPlay() {
  if (gameOver || state.turn !== "player") return;
  const result = playCard(state);
  if (!result) return endGame("tu n'as plus de cartes, tu perds.");
  say(`Tu poses ${result.card.rank}${result.card.suit}`);
  afterCardPlayed();
}

// ---------- Commandes ----------

document.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    playerPlay();
  }
  if (e.code === "Space") {
    e.preventDefault();
    handleSlap("player");
  }
});

$("play-btn").addEventListener("click", (e) => {
  e.currentTarget.blur();
  playerPlay();
});

$("restart-btn").addEventListener("click", () => location.reload());

render();