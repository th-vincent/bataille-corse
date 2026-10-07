// bot.js
export const BOT = {
  name: "Theotime",
  playDelay: 1200,        // temps (ms) avant que le bot pose sa carte
  minReaction: 400,      // temps de réaction minimum (ms) face à une combinaison
  maxReaction: 1200,     // temps de réaction maximum (ms)
};

export function randomBetween(min, max) {
  return min + Math.random() * (max - min);
};

// Temps de réaction du bot pour taper (en ms), selon le mode
export const DIFFICULTIES = {
  facile:     { label: "Facile",     min: 1500, max: 2500 },
  moyen:      { label: "Moyen",      min: 800,  max: 1400 },
  difficile:  { label: "Difficile",  min: 400,  max: 700 },
  impossible: { label: "Impossible", min: 0,    max: 40 },
};
export const DEFAULT_DIFFICULTY = "moyen";

export function setDifficulty(key) {
  const d = DIFFICULTIES[key] ?? DIFFICULTIES[DEFAULT_DIFFICULTY];
  BOT.minReaction = d.min;
  BOT.maxReaction = d.max;
}