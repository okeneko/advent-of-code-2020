const fs = require('fs')
const path = require('path')
const inputFile = path.join(__dirname, 'input.txt')
const input = fs
  .readFileSync(inputFile, 'utf8')
  .split('\n')
  .filter((e) => e !== '')
  .map((e) => e.split(''))

function part1() {
  let count = 0
  for (let i = 0, j = 0; i < input.length; i = i + 1, j = j + 3) {
    if (j >= input[i].length) j = j - input[i].length
    if (input[i][j] === '#') count++
  }
  return count
}

function part2() {
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ]

  let result = 1
  slopes.forEach((slope) => {
    let count = 0
    for (
      let i = 0, j = 0;
      i < input.length;
      i = i + slope.down, j = j + slope.right
    ) {
      if (j >= input[i].length) j = j - input[i].length
      if (input[i][j] === '#') count++
    }
    result *= count
  })

  return result
}

console.log('[Part 1] How many trees would you encounter?', part1()) // 250
console.log(
  '[Part 2] Multiplication of the number of trees on each slope:',
  part2()
) // 1592662500
