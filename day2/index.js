const fs = require('fs')
const path = require('path')
const inputFile = path.join(__dirname, 'input.txt')
const input = fs
  .readFileSync(inputFile, 'utf8')
  .split('\n')
  .filter((e) => e !== '')
  .map((e) => {
    const arr = e.split(/:| /)
    return {
      range: arr[0].split('-').map(Number),
      letter: arr[1],
      password: arr[3],
    }
  })

function validPasswords1() {
  let i = 0
  input.forEach((x) => {
    // console.dir(x);
    const times = (x.password.match(new RegExp(x.letter, 'g')) || []).length
    if (times >= x.range[0] && times <= x.range[1]) i++
  })
  return i
}

function validPasswords2() {
  let i = 0
  input.forEach((x) => {
    // console.dir(x);
    const firstPosition = x.password[x.range[0] - 1] === x.letter
    const secondPosition = x.password[x.range[1] - 1] === x.letter
    if (
      (firstPosition && !secondPosition) ||
      (!firstPosition && secondPosition)
    )
      i++
  })
  return i
}

console.log('[Part 1] The number of valid passwords is:', validPasswords1()) // 458
console.log('[Part 2] The number of valid passwords is:', validPasswords2()) // 342
