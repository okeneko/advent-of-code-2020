import fs from 'fs';
import path from 'path';

type Instruction = {
  operation: string;
  argument: number;
  executed: boolean;
};

const inputFile = path.join(__dirname, 'input.txt');
const input: Instruction[] = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n')
  .map((x: string) => {
    const [operation, argument] = x.split(' ');
    return {
      operation,
      argument: parseInt(argument),
      executed: false,
    };
  });

const part1 = (): number => {
  let program: Instruction[] = JSON.parse(JSON.stringify(input));
  let accumulator: number = 0;
  let i: number = 0;
  while (i < program.length) {
    if (program[i].executed) break;
    else {
      switch (program[i].operation) {
        case 'jmp':
          i += program[i].argument;
          break;
        case 'acc':
          accumulator += program[i].argument;
          program[i].executed = true;
          i++;
          break;
        default:
          program[i].executed = true;
          i++;
          break;
      }
    }
  }
  return accumulator;
};

console.log(`[Part 1] What is the value of the accumulator?`, part1()); // 2034

const part2 = (): number => {
  let accumulator: number = 0;
  for (const id in input) {
    let program: Instruction[] = JSON.parse(JSON.stringify(input));
    if (program[id].operation === 'jmp') program[id].operation = 'nop';
    else if (program[id].operation === 'nop') program[id].operation = 'jmp';
    else continue;

    accumulator = 0;
    let i: number = 0;
    let infiniteLoop: boolean = false;
    while (i < program.length) {
      if (program[i].executed) {
        infiniteLoop = true;
        break;
      } else {
        switch (program[i].operation) {
          case 'jmp':
            i += program[i].argument;
            break;
          case 'acc':
            accumulator += program[i].argument;
            program[i].executed = true;
            i++;
            break;
          default:
            program[i].executed = true;
            i++;
            break;
        }
      }
    }
    if (infiniteLoop) continue;
    else break;
  }
  return accumulator;
};

console.log(`[Part 2] What is the value of the accumulator?`, part2()); // 672

// Array of objects: if you use [...arr] the objects are not cloned!!!
// They keep the references and are MUTATED
// That's why I've used JSON.parse(JSON.stringify), it deep copies it...
