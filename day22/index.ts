import fs from 'fs';
import path from 'path';
const inputFile = path.join(__dirname, 'input.txt');
const input = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n\n')
  .map((x) => x.split('\n').slice(1).map(Number));

const part1 = () => {
  const decks = JSON.parse(JSON.stringify(input));

  while (decks.every((x) => x.length > 0)) {
    if (decks[0][0] > decks[1][0]) {
      decks[0] = [...decks[0].slice(1), decks[0][0], decks[1][0]];
      decks[1] = decks[1].slice(1);
    } else if (decks[1][0] > decks[0][0]) {
      decks[1] = [...decks[1].slice(1), decks[1][0], decks[0][0]];
      decks[0] = decks[0].slice(1);
    }
  }

  return decks
    .find((x) => x.length > 0)
    .reverse()
    .reduce((count, v, i) => count + v * (i + 1), 0);
};

console.log(`[Part 1]`, part1()); // 34255

const recursiveCombat = (input) => {
  let [deck1, deck2] = JSON.parse(JSON.stringify(input));
  let state = new Set();

  while (deck1.length > 0 && deck2.length > 0) {
    const currentState = `${deck1.join(',')}:${deck2.join(',')}`;

    if (state.has(currentState))
      return {
        winner: 1,
        finalDecks: [deck1, deck2],
      };

    state.add(`${deck1.join(',')}:${deck2.join(',')}`);

    let winner;
    if (deck1.length - 1 >= deck1[0] && deck2.length - 1 >= deck2[0]) {
      winner = recursiveCombat([
        deck1.slice(1, 1 + deck1[0]),
        deck2.slice(1, 1 + deck2[0]),
      ]).winner;
    } else {
      if (deck1[0] > deck2[0]) winner = 1;
      else if (deck2[0] > deck1[0]) winner = 2;
    }

    if (winner === 1) {
      deck1 = [...deck1.slice(1), deck1[0], deck2[0]];
      deck2 = deck2.slice(1);
    } else if (winner === 2) {
      deck2 = [...deck2.slice(1), deck2[0], deck1[0]];
      deck1 = deck1.slice(1);
    }
  }

  let finalWinner = deck1.length > 0 ? 1 : 2;

  return {
    winner: finalWinner,
    finalDecks: [deck1, deck2],
  };
};

const part2 = () => {
  const decks = JSON.parse(JSON.stringify(input));

  const { winner, finalDecks } = recursiveCombat(decks);

  return finalDecks[winner - 1]
    .reverse()
    .reduce((count, v, i) => count + v * (i + 1), 0);
};

console.log(`[Part 2]`, part2()); // 33369
