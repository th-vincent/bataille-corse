// cardview.js
import { FACES } from "./faces.js";

// Positions des symboles dans la zone centrale (en %) : [x, y]
const L = 0, C = 50, R = 100;
const SIX = [[L, 0], [R, 0], [L, 50], [R, 50], [L, 100], [R, 100]];

const PIPS = {
  A: [[C, 50]],
  "2": [[C, 0], [C, 100]],
  "3": [[C, 0], [C, 50], [C, 100]],
  "4": [[L, 0], [R, 0], [L, 100], [R, 100]],
  "5": [[L, 0], [R, 0], [C, 50], [L, 100], [R, 100]],
  "6": SIX,
  "7": [...SIX, [C, 25]],
  "8": [...SIX, [C, 25], [C, 75]],
  "9": [[L, 0], [R, 0], [L, 33], [R, 33], [C, 50], [L, 67], [R, 67], [L, 100], [R, 100]],
  "10": [[L, 0], [R, 0], [L, 33], [R, 33], [C, 17], [C, 83], [L, 67], [R, 67], [L, 100], [R, 100]],
};

function cornerHTML(pos, rank, suit) {
  return `<div class="corner ${pos}"><span>${rank}</span><span>${suit}</span></div>`;
}

export function cardFaceHTML(card, slot, behind) {
  const { rank, suit } = card;
  const red = suit === "♥" || suit === "♦";

  let center;
  if (FACES[rank]) {
    const [emoji, name] = FACES[rank][suit];
    center = `<div class="face-art"><span class="face-emoji">${emoji}</span><span class="face-name">${name}</span></div>`;
  } else {
    const pips = PIPS[rank]
      .map(([x, y]) => {
        const cls = `pip${y > 50 ? " flip" : ""}${rank === "A" ? " ace" : ""}`;
        return `<span class="${cls}" style="left:${x}%;top:${y}%">${suit}</span>`;
      })
      .join("");
    center = `<div class="pips">${pips}</div>`;
  }

  return `<div class="card ${red ? "red" : ""} ${behind ? "behind" : ""}"
    style="left: calc(var(--step) * ${slot}); z-index: ${slot}">
    ${cornerHTML("tl", rank, suit)}${center}${cornerHTML("br", rank, suit)}
  </div>`;
}