import fs from 'fs';
import path from 'path';

const inputFile = path.join(__dirname, 'input.txt');
const input = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n')
  .map(Number);

const isValid = (index: number): boolean => {
  for (let i = index - 25; i < index; i++) {
    for (let j = index - 25; j < index; j++) {
      if (input[i] !== input[j]) {
        if (input[i] + input[j] === input[index]) return true;
      }
    }
  }
  return false;
};

const part1 = (): number => {
  let i: number = 25;
  while (i < input.length) {
    const current = input[i];

    if (!isValid(i)) return current;
    else i++;
  }

  return 0;
};

const part2 = (invalid: number): number => {
  let numbers: number[] = [];
  for (let i = 0; i < input.length; i++) {
    numbers = [input[i]];
    let count = input[i];
    let breakJ = false;
    for (let j = i + 1; j < input.length; j++) {
      if (count + input[j] === invalid) {
        breakJ = true;
        break;
      } else if (count + input[j] > invalid) break;
      else {
        numbers = [...numbers, input[j]];
        count += input[j];
      }
    }
    if (breakJ) break;
  }

  return Math.max(...numbers) + Math.min(...numbers);
};

const invalid = part1();
console.log(`[Part 1] What is the first number that is not valid?`, invalid); // 1639024365
console.log(`[Part 2] What is the encryption weakness?`, part2(invalid)); // 219202240
