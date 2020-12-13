import fs from 'fs';
import path from 'path';

const inputFile = path.join(__dirname, 'input.txt');
const input: number[] = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n')
  .map(Number);

const part1 = (): number => {
  const adapters = [
    0,
    ...input.sort((a, b) => a - b),
    input[input.length - 1] + 3,
  ];

  let count1 = 0;
  let count3 = 0;

  adapters.forEach((x: number, i: number, arr: number[]) => {
    if (i < adapters.length - 1) {
      if (arr[i + 1] - x === 1) count1++;
      else if (arr[i + 1] - x === 3) count3++;
      else if (arr[i + 1] - x !== 2)
        console.error('No 1-jolt or 3-jolt difference found!');
    }
  });

  return count1 * count3;
};

// console.log(`[Part 1] 1-jolt differences * 3-jolt differences`, part1());

type Cache = {
  array: number[];
  count: number;
};
const cache: Cache[] = [];

const howManyArrangements = (adapters: number[]): number => {
  let exists: boolean = false;
  let existsCount: number = 0;
  cache.forEach((x: Cache) => {
    if (JSON.stringify(x.array) === JSON.stringify(adapters)) {
      exists = true;
      existsCount = x.count;
    }
  });

  if (exists) return existsCount;
  else {
    if (adapters.length <= 2) {
      cache.push({ array: adapters, count: 1 });
      return 1;
    } else {
      const one =
        adapters[1] - adapters[0] <= 3
          ? howManyArrangements(adapters.slice(1))
          : 0;
      const two =
        !!adapters[2] && adapters[2] - adapters[0] <= 3
          ? howManyArrangements(adapters.slice(2))
          : 0;
      const three =
        !!adapters[3] && adapters[3] - adapters[0] <= 3
          ? howManyArrangements(adapters.slice(3))
          : 0;
      const result = one + two + three;
      cache.push({ array: adapters, count: result });
      return result;
    }
  }
};

const part2 = (): number => {
  const adapters = [
    0,
    ...input.sort((a, b) => a - b),
    input[input.length - 1] + 3,
  ];

  return howManyArrangements(adapters);
};

console.log(`[Part 2] How many arrangements are there?`, part2()); // 1157018619904
