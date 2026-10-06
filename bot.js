// bot.js
export const BOT = {
  playDelay: 1200,        // temps (ms) avant que le bot pose sa carte
  minReaction: 400,      // temps de réaction minimum (ms) face à une combinaison
  maxReaction: 1200,     // temps de réaction maximum (ms)
  mistakeChance: 0.05,   // probabilité de taper à tort après une carte sans combinaison
};

export function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}