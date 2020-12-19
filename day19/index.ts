import fs from 'fs';
import path from 'path';
const inputFile = path.join(__dirname, 'input.txt');
const inputArr = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n\n');

let rules = [];

inputArr[0].split('\n').forEach((x) => {
  const split = x.split(': ');
  if (split[1].includes('"')) rules[split[0]] = split[1].replaceAll('"', '');
  else {
    rules[split[0]] = split[1].split(' | ').map((y) => y.split(' '));
  }
});

const input = {
  rules,
  messages: inputArr[1].split('\n'),
};

let eightDepth = 0;
let elevenDepth = 0;

const generateRegex = (i: number) => {
  const rule = input.rules[i];
  // Limit the depths of the rules that are recursive with themselves so the loop doesn't go infinite...
  if (i === 8 && !!rule[1] && rule[1].includes(8)) {
    eightDepth++;
    if (eightDepth > 10) rules[8] = [[42]];
  }
  if (i === 11 && !!rule[1] && rule[1].includes(11)) {
    elevenDepth++;
    if (elevenDepth > 10) rules[11] = [[42, 31]];
  }
  if (!Array.isArray(rule)) return rule;
  else
    return `(${rule
      .map((x) => x.map((y) => generateRegex(parseInt(y))).join(''))
      .join('|')})`;
};

const regex = new RegExp(`\\b${generateRegex(0)}\\b`);

const part1 = () =>
  input.messages.reduce((count, x) => (regex.test(x) ? count + 1 : count), 0);

console.log(`[Part 1]`, part1()); // 182

// New Rules for part 2
// Changing the rules variable works because the reference remains on the const input

rules[8] = [[42], [42, 8]];
rules[11] = [
  [42, 31],
  [42, 11, 31],
];

const regex2 = new RegExp(`\\b${generateRegex(0)}\\b`);

const part2 = () =>
  input.messages.reduce((count, x) => (regex2.test(x) ? count + 1 : count), 0);

console.log(`[Part 2]`, part2()); // 334
