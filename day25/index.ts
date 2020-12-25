export {};
const cardKey = 9093927;
const doorKey = 11001876;

const transform = (subject: number, loopSize: number): number => {
  let value: number = 1;
  for (let i = 0; i < loopSize; i++) {
    value = value * subject;
    value = value % 20201227;
  }
  return value;
};

const part1 = (): number => {
  let value: number = 1;
  let loopSize: number = 1;
  let cardLoopSize: number = 0,
    doorLoopSize: number = 0;
  while (true) {
    value = (value * 7) % 20201227;
    if (value === cardKey) cardLoopSize = loopSize;
    if (value === doorKey) doorLoopSize = loopSize;
    if (cardLoopSize > 0 || doorLoopSize > 0) break;
    loopSize++;
  }

  return cardLoopSize > 0
    ? transform(doorKey, cardLoopSize)
    : transform(cardKey, doorLoopSize);
};

console.log(`[Part 1]`, part1()); // 12227206
