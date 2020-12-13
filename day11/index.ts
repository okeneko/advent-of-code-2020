import fs from 'fs';
import path from 'path';

const inputFile = path.join(__dirname, 'input.txt');
const input: string[][] = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n')
  .map((x: string) => {
    return x.split('');
  });

const adjacents = (a: string[][], i: number, j: number): number => {
  let count = 0;
  if (!!a[i - 1] && !!a[i - 1][j - 1] && a[i - 1][j - 1] === '#') count++;
  if (!!a[i - 1] && !!a[i - 1][j] && a[i - 1][j] === '#') count++;
  if (!!a[i + 1] && !!a[i + 1][j + 1] && a[i + 1][j + 1] === '#') count++;
  if (!!a[i] && !!a[i][j + 1] && a[i][j + 1] === '#') count++;
  if (!!a[i + 1] && !!a[i + 1][j - 1] && a[i + 1][j - 1] === '#') count++;
  if (!!a[i + 1] && !!a[i + 1][j] && a[i + 1][j] === '#') count++;
  if (!!a[i - 1] && !!a[i - 1][j + 1] && a[i - 1][j + 1] === '#') count++;
  if (!!a[i] && !!a[i][j - 1] && a[i][j - 1] === '#') count++;
  return count;
};

const part1 = (): number => {
  let seats = input.map((x) => x.slice(0));
  let changes: boolean = true;

  while (changes) {
    changes = false;
    let copy = seats.map((x) => x.slice(0));

    seats.forEach((x, i) => {
      x.forEach((y, j) => {
        if (y === 'L' && adjacents(seats, i, j) === 0) {
          copy[i][j] = '#';
          changes = true;
        } else if (y === '#' && adjacents(seats, i, j) >= 4) {
          copy[i][j] = 'L';
          changes = true;
        }
      });
    });

    if (changes) seats = copy.map((x) => x.slice(0));
  }

  let occupied: number = 0;

  seats.forEach((x) => {
    x.forEach((y) => {
      if (y === '#') occupied++;
    });
  });
  return occupied;
};

console.log(`[Part 1] How many seats end up occupied?`, part1()); // 2483

const viewable = (a: string[][], i: number, j: number): number => {
  let count = 0;
  let r = 1,
    c = 1;

  // diagonal up left (-,-)
  while (true) {
    if (!!a[i - r] && !!a[i - r][j - c])
      if (a[i - r][j - c] === '#') {
        count++;
        break;
      } else if (a[i - r][j - c] === 'L') break;
      else {
        r++;
        c++;
      }
    else break;
  }

  r = 1;
  c = 1;
  // vertical up (-,j)
  while (true) {
    if (!!a[i - r] && !!a[i - r][j])
      if (a[i - r][j] === '#') {
        count++;
        break;
      } else if (a[i - r][j] === 'L') break;
      else r++;
    else break;
  }

  r = 1;
  c = 1;
  // diagonal up right (-,+)
  while (true) {
    if (!!a[i - r] && !!a[i - r][j + c])
      if (a[i - r][j + c] === '#') {
        count++;
        break;
      } else if (a[i - r][j + c] === 'L') break;
      else {
        r++;
        c++;
      }
    else break;
  }

  r = 1;
  c = 1;
  // horizontal right (i,+)
  while (true) {
    if (!!a[i] && !!a[i][j + c])
      if (a[i][j + c] === '#') {
        count++;
        break;
      } else if (a[i][j + c] === 'L') break;
      else c++;
    else break;
  }

  r = 1;
  c = 1;
  // diagonal down right (+,+)
  while (true) {
    if (!!a[i + r] && !!a[i + r][j + c])
      if (a[i + r][j + c] === '#') {
        count++;
        break;
      } else if (a[i + r][j + c] === 'L') break;
      else {
        r++;
        c++;
      }
    else break;
  }

  r = 1;
  c = 1;
  // vertical down (+,j)
  while (true) {
    if (!!a[i + r] && !!a[i + r][j])
      if (a[i + r][j] === '#') {
        count++;
        break;
      } else if (a[i + r][j] === 'L') break;
      else r++;
    else break;
  }

  r = 1;
  c = 1;
  // diagonal down left (+,-)
  while (true) {
    if (!!a[i + r] && !!a[i + r][j - c])
      if (a[i + r][j - c] === '#') {
        count++;
        break;
      } else if (a[i + r][j - c] === 'L') break;
      else {
        r++;
        c++;
      }
    else break;
  }

  r = 1;
  c = 1;
  // horizontal left (i,-)
  while (true) {
    if (!!a[i] && !!a[i][j - c])
      if (a[i][j - c] === '#') {
        count++;
        break;
      } else if (a[i][j - c] === 'L') break;
      else c++;
    else break;
  }

  return count;
};

const part2 = (): number => {
  let seats = input.map((x) => x.slice(0));
  let changes: boolean = true;

  while (changes) {
    changes = false;
    let copy = seats.map((x) => x.slice(0));

    seats.forEach((x, i) => {
      x.forEach((y, j) => {
        if (y === 'L' && viewable(seats, i, j) === 0) {
          copy[i][j] = '#';
          changes = true;
        } else if (y === '#' && viewable(seats, i, j) >= 5) {
          copy[i][j] = 'L';
          changes = true;
        }
      });
    });

    if (changes) seats = copy.map((x) => x.slice(0));
  }

  let occupied: number = 0;

  seats.forEach((x) => {
    x.forEach((y) => {
      if (y === '#') occupied++;
    });
  });
  return occupied;
};

console.log(`[Part 2] How many seats end up occupied?`, part2()); // 2285
