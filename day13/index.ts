import fs from 'fs';
import path from 'path';

const inputFile = path.join(__dirname, 'input.txt');
const inputArr = fs.readFileSync(inputFile, 'utf8').split('\n');

const input = {
  time: parseInt(inputArr[0]),
  buses: inputArr[1].split(','),
};

const part1 = (): number => {
  const buses = input.buses.filter((x) => !isNaN(+x)).map(Number);
  let earliest = [];
  buses.forEach((x) => {
    let i = 0;
    while (i < input.time) i += x;
    earliest = [...earliest, { id: x, time: i }];
  });

  const bus = earliest.reduce((prev, current) =>
    prev.time < current.time ? prev : current
  );

  return bus.id * (bus.time - input.time);
};

console.log(`[Part 1] Earliest bus ID * minutes to wait:`, part1()); // 2995

const part2 = (): number => {
  const buses = input.buses.map((x) => (!isNaN(+x) ? parseInt(x) : x));
  let lastMatched: number = 0;
  let loopby = <number>buses[lastMatched];

  let i = 0;
  while (true) {
    let match: boolean = true;
    buses.forEach((x, id) => {
      if (!isNaN(+x) && match) {
        let remainder = (i + id) % <number>x;
        if (remainder === 0) {
          match = true;
          if (id > lastMatched) {
            lastMatched = id;
            let mult = 1;
            buses.forEach((y, iy) => {
              if (!isNaN(+y) && iy <= lastMatched) mult *= <number>y;
            });
            loopby = mult;
          }
        } else match = false;
      }
    });

    if (match) break;
    i += loopby;
  }

  return i;
};

console.log(`[Part 2] What is the earliest timestamp?`, part2()); // 1012171816131114
