import fs from 'fs';
import path from 'path';
const inputFile = path.join(__dirname, 'input.txt');
const input = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n')
  .map((x) => x.split('').filter((y) => y !== ' '));

const findClosing = (a) => {
  let depth = 0;
  let i = 1; // because a[i] === '('
  while (i < a.length) {
    if (a[i] === '(') depth++;
    else if (a[i] === ')')
      if (depth > 0) depth--;
      else return i;
    i++;
  }
};

const parse = (a) => {
  let result = [];
  let i = 0;

  while (i < a.length) {
    if (!isNaN(+a[i]) || a[i] === '+' || a[i] === '*') {
      result = [...result, a[i]];
      i++;
    } else if (a[i] === '(') {
      const closing = findClosing(a.slice(i));
      result = [...result, parse(a.slice(i + 1, i + closing))];
      i += closing + 1;
    }
  }

  return result;
};

const evaluate = (a: Array<any> | number) => {
  if (!Array.isArray(a) && !isNaN(+a)) return +a;
  else if (Array.isArray(a)) {
    let result = undefined;
    let operation = undefined;

    a.forEach((x) => {
      if (!result && !operation) result = evaluate(x);
      else if (!!result && !operation && (x === '+' || x === '*'))
        operation = x;
      else if (!!result && !!operation) {
        if (operation === '+') result += evaluate(x);
        if (operation === '*') result *= evaluate(x);
        operation = undefined;
      }
    });
    return result;
  }
};

const part1 = () => input.reduce((a, v) => a + evaluate(parse(v)), 0);

console.log(`[Part 1]`, part1()); // 510009915468

const isolatePlus = (a) => {
  let result = [...a];

  result = result.map((x) => (Array.isArray(x) ? isolatePlus(x) : x));

  while (result.includes('+')) {
    const i = result.indexOf('+');
    const left = result.slice(0, i - 1);
    const right = result.slice(i + 2);
    if (!!left.length || !!right.length)
      result = [...left, [result[i - 1], result[i], result[i + 1]], ...right];
    else break;
  }

  return result;
};

const parseFirstAdd = (a) => {
  let result = parse(a);
  return isolatePlus(result);
};

const part2 = () => input.reduce((a, v) => a + evaluate(parseFirstAdd(v)), 0);

console.log(`[Part 2]`, part2()); //
