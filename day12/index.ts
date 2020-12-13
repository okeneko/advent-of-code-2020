import fs from 'fs';
import path from 'path';

type Action = 'N' | 'S' | 'E' | 'W' | 'L' | 'R' | 'F';

interface Instruction {
  action: Action;
  value: number;
}

const inputFile = path.join(__dirname, 'input.txt');
const input: Instruction[] = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n')
  .map((x: string) => {
    return <Instruction>{
      action: x.slice(0, 1),
      value: parseInt(x.slice(1)),
    };
  });

const part1 = (): number => {
  let x: number = 0;
  let y: number = 0;
  const directions: Action[] = ['N', 'E', 'S', 'W'];
  let direction: Action = directions[1];

  input.forEach((a: Instruction) => {
    let newDirection = 0;
    switch (a.action) {
      case 'F':
        switch (direction) {
          case 'N':
            y += a.value;
            break;
          case 'S':
            y -= a.value;
            break;
          case 'E':
            x += a.value;
            break;
          case 'W':
            x -= a.value;
            break;
        }
        break;
      case 'N':
        y += a.value;
        break;
      case 'S':
        y -= a.value;
        break;
      case 'E':
        x += a.value;
        break;
      case 'W':
        x -= a.value;
        break;
      case 'L':
        newDirection =
          (directions.indexOf(direction) - a.value / 90 + directions.length) %
          directions.length;
        direction = directions[newDirection];
        break;
      case 'R':
        newDirection =
          (directions.indexOf(direction) + a.value / 90) % directions.length;
        direction = directions[newDirection];
        break;
    }
    // console.log(x.action, x.value, [i, j], direction);
  });

  return Math.abs(x) + Math.abs(y);
};

console.log(`[Part 1] What is the Manhattan distance?`, part1()); // 1152

const part2 = (): number => {
  let x: number = 0;
  let y: number = 0;
  let wx: number = 10;
  let wy: number = 1;

  input.forEach((a: Instruction) => {
    switch (a.action) {
      case 'F':
        x += wx * a.value;
        y += wy * a.value;
        break;
      case 'N':
        wy += a.value;
        break;
      case 'S':
        wy -= a.value;
        break;
      case 'E':
        wx += a.value;
        break;
      case 'W':
        wx -= a.value;
        break;
      case 'L':
      case 'R':
        if (
          (a.action === 'L' && a.value === 90) ||
          (a.action === 'R' && a.value === 270)
        )
          [wx, wy] = [-wy, wx];
        else if (a.value === 180) [wx, wy] = [-wx, -wy];
        else if (
          (a.action === 'L' && a.value === 270) ||
          (a.action === 'R' && a.value === 90)
        )
          [wx, wy] = [wy, -wx];

        break;
    }
    // console.log(a.action, a.value, [x, y], [wx, wy]);
  });

  return Math.abs(y) + Math.abs(x);
};

console.log(`[Part 2] What is the Manhattan distance?`, part2()); // 58637
