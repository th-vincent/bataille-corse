// rules.js
// Le tas est un tableau : la carte du dessus est la DERNIÈRE (index length - 1).

export function getSlapType(pile) {
  const n = pile.length;

  // Paire : les deux dernières cartes ont la même valeur
  if (n >= 2 && pile[n - 1].rank === pile[n - 2].rank) {
    return "paire";
  }

  // Sandwich : la 1re et la 3e carte en partant du dessus ont la même valeur
  if (n >= 3 && pile[n - 1].rank === pile[n - 3].rank) {
    return "sandwich";
  }

  return null; // rien à taper
}