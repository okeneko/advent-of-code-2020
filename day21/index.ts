import fs from 'fs';
import path from 'path';
const inputFile = path.join(__dirname, 'input.txt');
const input = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n')
  .map((x) => {
    const dataTuple = x.split(/\(contains|\)/).slice(0, -1);
    return {
      ingredients: dataTuple[0].split(' ').slice(0, -1),
      allergens: dataTuple[1].split(',').map((x) => x.trim()),
    };
  });

let allergens = {};

const part1 = () => {
  input.forEach((x) => {
    x.allergens.forEach((y) => {
      if (!allergens[y]) allergens[y] = '';
    });
  });

  for (const allergen in allergens) {
    let ingredients = [];
    input.forEach((x) => {
      if (x.allergens.includes(allergen)) {
        ingredients = [...ingredients, x.ingredients];
      }
    });
    allergens[allergen] = ingredients.reduce((a, b) =>
      b.filter(Set.prototype.has, new Set(a))
    );
  }

  let uniqueIngredients;
  while (true) {
    uniqueIngredients = Object.values(allergens).reduce(
      (a: string[], b: string[]) => (b.length === 1 ? [...a, b[0]] : a),
      []
    );

    for (const allergen in allergens)
      if (allergens[allergen].length !== 1)
        uniqueIngredients.forEach((x) => {
          if (allergens[allergen].includes(x))
            allergens[allergen] = allergens[allergen].filter((y) => x !== y);
        });

    if (Object.values(allergens).every((x: string[]) => x.length === 1)) break;
  }

  for (const allergen in allergens)
    allergens[allergen] = allergens[allergen].join('');

  return input.reduce(
    (a, b) =>
      a +
      b.ingredients.reduce(
        (c, d) => (Object.values(allergens).includes(d) ? c : c + 1),
        0
      ),
    0
  );
};

console.log(`[Part 1]`, part1()); // 2428

const part2 = Object.keys(allergens)
  .sort()
  .map((x) => allergens[x])
  .join(',');

console.log(`[Part 2]`, part2); // bjq,jznhvh,klplr,dtvhzt,sbzd,tlgjzx,ctmbr,kqms
