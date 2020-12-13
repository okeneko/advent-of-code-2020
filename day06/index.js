const fs = require('fs')
const path = require('path')
const inputFile = path.join(__dirname, 'input.txt')
const input = fs
  .readFileSync(inputFile, 'utf8')
  .replace(/\n$/, '')
  .split('\n\n')

const part1 = () => {
  let count = 0
  input.map((e) => {
    const questions = new Set(e.split('').filter((x) => x !== '\n'))
    count += questions.size
  })
  return count
}

function intersection() {
  let result = []
  let lists = Array.from(arguments)

  lists.forEach((x) => {
    x.forEach((y) => {
      if (!result.includes(y))
        if (lists.filter((l) => !l.includes(y)).length === 0)
          result = [...result, y]
    })
  })

  return result
}

const part2 = () => {
  let count = 0
  input.forEach((x) => {
    const questions = x.split('\n').map((y) => {
      return y.split('')
    })
    count += intersection(...questions).length
  })
  return count
}

console.log(`[Part 1] Questions to which anyone answered yes:`, part1()) // 7110
console.log(`[Part 1] Questions to which everyone answered yes:`, part2()) // 3628
