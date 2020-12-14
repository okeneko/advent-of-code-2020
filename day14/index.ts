import fs from 'fs';
import path from 'path';

type Instruction = {
  type: 'mask' | 'mem';
  mask?: string;
  address?: number;
  value?: number;
};

const inputFile = path.join(__dirname, 'input.txt');
const input: Instruction[] = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n')
  .map((x) => {
    if (x.slice(0, 4).includes('mask'))
      return {
        type: 'mask',
        mask: x.slice(7),
      };
    else
      return {
        type: 'mem',
        address: parseInt(x.slice(x.indexOf('[') + 1, x.indexOf(']'))),
        value: parseInt(x.slice(x.indexOf('=') + 2)),
      };
  });

const part1 = (): number => {
  let mask: string = '';
  let memory: number[] = [];

  input.forEach((x) => {
    if (x.type === 'mask') {
      mask = x.mask;
    } else {
      let value = x.value.toString(2).padStart(mask.length, '0').split('');
      value = value.map((y, i) =>
        mask[i] === '0' ? '0' : mask[i] === '1' ? '1' : y
      );

      memory[x.address] = parseInt(value.join(''), 2);
    }
  });
  return memory.reduce((a, v) => a + v);
};

console.log(
  `[Part 1] What is the sum of all the values left in memory?`,
  part1()
); // 11327140210986

const part2 = () => {
  let mask: string = '';
  let memory: { [key: number]: number } = {};
  let combinations = [];

  input.forEach((x) => {
    if (x.type === 'mask') {
      mask = x.mask;
    } else {
      let address = x.address.toString(2).padStart(mask.length, '0').split('');
      address = address.map((y, i) =>
        mask[i] === 'X' ? 'X' : mask[i] === '1' ? '1' : y
      );

      const floating = address.reduce((a, v) => (v === 'X' ? a + 1 : a), 0);
      let binaryCombinations = [];

      if (!!combinations[floating]) binaryCombinations = combinations[floating];
      else
        binaryCombinations = Array.from(
          { length: 2 ** floating },
          (_, i) => i
        ).map((b) => b.toString(2).padStart(floating, '0').split(''));

      binaryCombinations.forEach((y) => {
        let i = 0;
        let maskedAddress: string[] = address.map((z) => {
          if (z === 'X') {
            const result = y[i];
            i++;
            return result;
          } else return z;
        });

        const newAddress: number = parseInt(maskedAddress.join(''), 2);
        memory[newAddress] = x.value;
      });
    }
  });
  return Object.values(memory).reduce((a, v) => a + v);
};

console.log(
  `[Part 2] What is the sum of all the values left in memory?`,
  part2()
); // 2308180581795
