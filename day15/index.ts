export {};
const input: number[] = [0, 1, 4, 13, 15, 12, 16];

const part1 = () => {
  let i: number = 0;
  let a: number[] = [...input];
  while (i < 2020) {
    if (!a[i]) {
      const last = a[a.length - 1];
      if (!a.slice(0, -1).includes(last)) a[i] = 0;
      else
        a[i] =
          a.lastIndexOf(last) -
          a.slice(0, a.lastIndexOf(last)).lastIndexOf(last);
    }

    i++;
  }

  return a[i - 1];
};

console.log(`[Part 1] What will be the 2020th number spoken?`, part1()); // 1665

const part2 = (max: number) => {
  let mem: number[] = Array.from({ length: max }, (_) => 0);
  input.slice(0, -1).forEach((x, i) => (mem[x] = i + 1)); // { mem[0] = 1 and mem[3] = 2 } 6 skipped because it's 'last'

  let last = input[input.length - 1]; // 6
  let i = input.length;
  while (i < max) {
    const memPos = mem[last];
    mem[last] = i;
    last = memPos > 0 ? i - memPos : 0;

    i++;
  }

  return last;
};

console.log(
  `[Part 2] What will be the 30000000th number spoken?`,
  part2(30000000)
); // 16439
