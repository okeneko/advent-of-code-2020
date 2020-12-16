import fs from 'fs';
import path from 'path';
const inputFile = path.join(__dirname, 'input.txt');
const inputArr = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n\n');

interface Input {
  rules: {
    field: string;
    range: number[][];
  }[];
  mine: number[];
  tickets: number[][];
}

const rules = inputArr[0].split('\n').map((x) => {
  const split = x.split(': ');
  const range = split[1].split(' or ').map((y) => y.split('-').map(Number));
  return {
    field: split[0],
    range,
  };
});

const input: Input = {
  rules,
  mine: inputArr[1].split('\n')[1].split(',').map(Number),
  tickets: inputArr[2]
    .split('\n')
    .map((x) => {
      if (!isNaN(+x[0])) return x.split(',').map(Number);
    })
    .slice(1),
};

const part1 = () => {
  const ranges = input.rules.map((x) => x.range);

  return input.tickets.reduce((a, v) => {
    let count = 0;
    v.forEach((x) => {
      let valid: boolean = false;
      ranges.forEach((r) => {
        if ((x >= r[0][0] && x <= r[0][1]) || (x >= r[1][0] && x <= r[1][1]))
          valid = true;
      });

      if (!valid) count += x;
    });
    return a + count;
  }, 0);
};

console.log(`[Part 1]`, part1()); // 32835

const part2 = () => {
  const ranges = input.rules.map((x) => x.range);
  const tickets = input.tickets.filter((x) => {
    let isValid: boolean = true;
    x.forEach((y) => {
      let validValue: boolean = false;
      ranges.forEach((r) => {
        if ((y >= r[0][0] && y <= r[0][1]) || (y >= r[1][0] && y <= r[1][1]))
          validValue = true;
      });

      if (!validValue) isValid = isValid && validValue;
    });
    return isValid;
  });

  let resultRules = [];
  for (let i = 0; i < tickets[0].length; i++) {
    let ruleSets = [];
    tickets.forEach((t) => {
      const validRules = input.rules
        .filter((rule) => {
          const r = rule.range;
          if (
            (t[i] >= r[0][0] && t[i] <= r[0][1]) ||
            (t[i] >= r[1][0] && t[i] <= r[1][1])
          )
            return true;
          else return false;
        })
        .map((x) => x.field);
      ruleSets = [...ruleSets, validRules];
    });
    const colRules = ruleSets.reduce((a, b) => a.filter((c) => b.includes(c)));
    resultRules = [...resultRules, colRules];
  }

  let rulePositions = {};
  while (Object.keys(rulePositions).length < input.rules.length) {
    let currentRules = resultRules.map((r, i) =>
      !Object.keys(rulePositions).includes(`${i}`) ? r : []
    );
    input.rules.map((r) => {
      let count = [];
      currentRules.forEach((x, i) => {
        if (x.includes(r.field)) count = [...count, i];
      });
      if (count.length === 1) rulePositions[count[0]] = r.field;
    });
  }

  return input.mine.reduce(
    (a, v, i) =>
      (<string>Object.values(rulePositions)[i]).includes('departure')
        ? a * v
        : a,
    1
  );
};

console.log(`[Part 2]`, part2()); // 514662805187
