const fs = require('fs')
const path = require('path')
const inputFile = path.join(__dirname, 'input.txt')
const input = fs
  .readFileSync(inputFile, 'utf8')
  .split('\n\n')
  .map((e) =>
    Object.fromEntries(
      e
        .split(/\s|\n/)
        .filter((r) => r !== '')
        .map((r) => r.split(':'))
    )
  )

const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']

function part1() {
  let count = 0

  input.forEach((e) => {
    const keys = Object.keys(e)
    let valid = true
    fields.forEach((f) => {
      if (!keys.includes(f) && f !== 'cid') valid = false
    })
    if (valid) count++
  })

  return count
}

function part2() {
  let count = 0

  input.forEach((e) => {
    const keys = Object.keys(e)
    let valid = true
    fields.forEach((f) => {
      if (valid) {
        if (!keys.includes(f) && f !== 'cid') valid = false
        else {
          const value = e[f]
          let year = 0
          switch (f) {
            case 'byr':
              year = parseInt(value)
              if (value.length !== 4 || year < 1920 || year > 2002)
                valid = false

              break
            case 'iyr':
              year = parseInt(value)
              if (value.length !== 4 || year < 2010 || year > 2020)
                valid = false
              break
            case 'eyr':
              year = parseInt(value)
              if (value.length !== 4 || year < 2020 || year > 2030)
                valid = false
              break
            case 'hgt':
              const number = parseInt(value)
              const unit = value.slice(-2)
              if (unit === 'cm') {
                if (number < 150 || number > 193) valid = false
              } else if (unit === 'in') {
                if (number < 59 || number > 76) valid = false
              } else valid = false
              break
            case 'hcl':
              if (!/^#[0-9a-f]{6}$/i.test(value)) valid = false
              break
            case 'ecl':
              const colours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
              if (!colours.includes(value)) valid = false
              break
            case 'pid':
              if (value.length !== 9 || isNaN(value)) valid = false
              break
            default:
              break
          }
        }
      }
    })
    if (valid) count++
  })

  return count
}

console.log(`[Part 1] How many passports are valid?`, part1()) // 210
console.log(`[Part 2] How many passports are present and valid?`, part2()) // 131
