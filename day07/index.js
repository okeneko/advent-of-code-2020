const fs = require('fs');
const path = require('path');
const inputFile = path.join(__dirname, 'input.txt');
const input = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n')
  .map((x) => {
    const asArray = x.split('bags contain').map((y) => y.trim());
    let contains = x.includes('no other bags')
      ? []
      : asArray[1].split(',').map((y) => {
          const [number, ...bag] = y.split('bag')[0].trim().split(' ');
          return {
            name: bag.join(' '),
            quantity: parseInt(number),
          };
        });

    return {
      name: asArray[0],
      contains,
    };
  });

const hasShinyGold = (current) => {
  if (current.contains.length === 0) {
    return false;
  } else if (
    current.contains.filter((x) => x.name === 'shiny gold').length > 0
  ) {
    // Don't count shiny gold!!!
    return true;
  } else {
    let result = false;
    current.contains.forEach((x) => {
      const bag = input.filter((y) => y.name === x.name)[0];
      if (hasShinyGold(bag)) result = true;
    });
    return result;
  }
};

const part1 = () => {
  let count = 0;
  input.forEach((x) => {
    if (hasShinyGold(x)) count++;
  });
  return count;
};

console.log(
  `[Part 1] How many bags contain at least 1 shiny gold bag?`,
  part1()
); // 370

const howManyBags = (current) => {
  if (current.contains.length === 0) {
    return 0;
  } else {
    let count = 0;
    current.contains.forEach((x) => {
      const bag = input.filter((y) => y.name === x.name)[0];
      count += x.quantity * (1 + howManyBags(bag));
    });
    return count;
  }
};

const part2 = () => {
  const shinyGold = input.filter((x) => x.name === 'shiny gold')[0];
  return howManyBags(shinyGold);
};

console.log(`[Part 2] How many bags does my shiny gold contain?`, part2()); // 29547
