const fs = require('fs')
const path = require('path')
const inputFile = path.join(__dirname, 'input.txt')
const input = fs
  .readFileSync(inputFile, 'utf8')
  .split('\n')
  .map((e) => parseInt(e))

function two2020() {
  let a, b

  input.forEach((x) => {
    if (!a && !b) {
      const rest = input.filter((item) => item !== x)
      rest.forEach((y) => {
        if (x + y === 2020) {
          a = x
          b = y
        }
      })
    }
  })

  return a * b
}

function three2020() {
  let a, b, c

  input.forEach((x) => {
    if (!a && !b && !c) {
      const restA = input.filter((item) => item !== x)
      restA.forEach((y) => {
        const restB = restA.filter((item) => item !== y)
        restB.forEach((z) => {
          if (x + y + z === 2020) {
            a = x
            b = y
            c = z
          }
        })
      })
    }
  })

  return a * b * c
}

// console.time();
console.log(`The two numbers that sum 2020 multiplied: ${two2020()}`)
console.log(`The three numbers that sum 2020 multiplied: ${three2020()}`)
// console.timeEnd();
