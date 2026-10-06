// rules.js
// Le tas est un tableau : la carte du dessus est la DERNIÈRE (index length - 1).

// Valeur numérique d'une carte pour les sommes (As = 1). Les figures n'en ont pas.
const VALUES = {
  A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
};

// true si les deux cartes ont chacune une valeur et que leur somme fait 10
function sumsToTen(a, b) {
  const va = VALUES[a.rank];
  const vb = VALUES[b.rank];
  return va !== undefined && vb !== undefined && va + vb === 10;
}

export function getSlapType(pile) {
  const n = pile.length;
  if (n === 0) return null;

  const top = pile[n - 1];

  // Un 10 posé : on tape
  if (top.rank === "10") return "dix";

  // Paire : les deux dernières cartes ont la même valeur
  if (n >= 2 && top.rank === pile[n - 2].rank) return "paire";

  // Sandwich : la 1re et la 3e carte en partant du dessus ont la même valeur
  if (n >= 3 && top.rank === pile[n - 3].rank) return "sandwich";

  // Somme de 10 : les deux dernières cartes (ex. As + 9, 4 + 6)
  if (n >= 2 && sumsToTen(top, pile[n - 2])) return "somme de 10";

  // Somme de 10 en sandwich : la 1re et la 3e carte (ex. 3, 4, 7)
  if (n >= 3 && sumsToTen(top, pile[n - 3])) return "sandwich de 10";

  return null; // rien à taper
}

// Coût en cartes pour se défendre face à une figure (pas d'as ici)
const FIGURE_COST = { J: 1, Q: 2, K: 3 };

export function figureCost(card) {
  return FIGURE_COST[card.rank] ?? 0; // 0 = pas une figure
}