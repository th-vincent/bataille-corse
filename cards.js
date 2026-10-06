// cards.js
export const SUITS = ["♠", "♥", "♦", "♣"];
export const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Crée les 52 cartes
export function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

// Mélange de Fisher-Yates (le "bon" mélange, sans biais)
export function shuffle(deck) {
  const a = [...deck];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Distribue en deux moitiés égales
export function deal(deck) {
  const half = deck.length / 2;
  return {
    player: deck.slice(0, half),
    computer: deck.slice(half),
  };
}