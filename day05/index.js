const fs = require('fs')
const path = require('path')
const inputFile = path.join(__dirname, 'input.txt')
const input = fs
  .readFileSync(inputFile, 'utf8')
  .split('\n')
  .filter((e) => e !== '')
  .map((e) => {
    return {
      row: e.slice(0, 7),
      column: e.slice(7),
    }
  })

const getSeatID = (seat) => {
  let rows = Array.from({ length: 128 }, (_, i) => i) // [0,...,127]
  let columns = Array.from({ length: 8 }, (_, i) => i) // [0,...,7]
  seat.row.split('').forEach((x) => {
    const half = Math.floor(rows.length / 2)
    if (x === 'F') {
      rows = rows.slice(0, half)
    } else if (x === 'B') {
      rows = rows.slice(half)
    }
  })
  seat.column.split('').forEach((x) => {
    const half = Math.floor(columns.length / 2)
    if (x === 'L') {
      columns = columns.slice(0, half)
    } else if (x === 'R') {
      columns = columns.slice(half)
    }
  })
  return rows[0] * 8 + columns[0]
}

const getSeats = () => {
  return input.map((e) => getSeatID(e))
}

const part1 = () => {
  const seats = getSeats()
  return Math.max(...seats)
}

const part2 = () => {
  const seats = getSeats()
  const firstSeat = getSeatID({ row: 'FFFFFFF', column: 'LLL' })
  const lastSeat = getSeatID({ row: 'BBBBBBB', column: 'RRR' })
  for (let i = firstSeat; i <= lastSeat; i++) {
    if (!seats.includes(i) && seats.includes(i - 1) && seats.includes(i + 1))
      return i
  }
  return 0
}

console.log(`[Part 1] The hightest seat ID:`, part1()) // 959
console.log(`[Part 2] The missing seat ID:`, part2()) // 527
