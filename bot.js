// bot.js
export const BOT = {
  name: "Theotime",
  playDelay: 1200,        // temps (ms) avant que le bot pose sa carte
  minReaction: 400,      // temps de réaction minimum (ms) face à une combinaison
  maxReaction: 1200,     // temps de réaction maximum (ms)
};

export function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}