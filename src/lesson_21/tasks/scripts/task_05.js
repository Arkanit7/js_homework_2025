'use strict'

function getRandomInteger(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

// =======================================================================

class LimitedNumber {
  #number

  /**
   * @param {number} number
   * @param {number} minNumber
   * @param {number} maxNumber
   */
  constructor(number, minNumber, maxNumber) {
    if (minNumber >= maxNumber)
      throw new RangeError("Max can't be lesser or equal min.")

    this.minNumber = minNumber
    this.maxNumber = maxNumber
    this.offset = maxNumber - minNumber
    this.number = number
  }

  get number() {
    return this.#number
  }

  set number(newValue) {
    if (typeof newValue !== 'number' || Number.isNaN(newValue))
      throw new TypeError('Invalid number.')

    const wrapperValue =
      ((newValue - this.minNumber) % this.offset) + this.minNumber

    this.#number =
      wrapperValue < this.minNumber ? wrapperValue + this.offset : wrapperValue
  }

  toString() {
    return `Number ${this.number} ∈ [${this.minNumber}, ${this.maxNumber})`
  }
}

// ---

const n1 = new LimitedNumber(0, -10, 10)
n1.number = 10
console.debug(String(n1))

// =======================================================================

class Pair {
  limitHigh
  limitLow
  #high
  #low

  /**
   * @param {number} high
   * @param {number} low
   * @param {number} limitHigh
   * @param {number} limitLow
   */
  constructor(high, low, limitHigh, limitLow) {
    this.limitHigh = limitHigh
    this.limitLow = limitLow
    this.#high = new LimitedNumber(high, 0, limitHigh)
    this.#low = new LimitedNumber(low, 0, limitLow)
  }

  get low() {
    return this.#low.number
  }

  set low(v) {
    this.#low.number = v
  }

  get high() {
    return this.#high.number
  }

  set high(v) {
    this.#high.number = v
  }

  increase() {
    this.low++ //? can't use prefix increment for private fields

    if (this.low === 0) this.high++
  }

  decrease() {
    if (this.low-- === 0) this.high--
  }

  /**
   * @param {number} high
   * @param {number} low
   */
  add(high, low) {
    this.high += high
    this.low += low
  }

  toString() {
    return `${this.high} - ${this.low}`
  }

  valueOf() {
    return this.low + this.high * this.limitLow
  }
}

class Time extends Pair {
  /**
   * @param {number} h
   * @param {number} m
   */
  constructor(h, m) {
    super(h, m, 24, 60)
  }

  get h() {
    return this.high
  }
  set h(v) {
    this.high = v
  }

  get m() {
    return this.low
  }
  set m(v) {
    this.low = v
  }

  toString() {
    return `${String(this.high).padStart(2, '0')}:${String(this.low).padStart(2, '0')}`
  }
}

// ---

const t1 = new Time(23 + 24, 59 + 60)
console.debug(String(t1))
t1.increase()
console.debug(String(t1))
t1.decrease()
console.debug(String(t1))

// =======================================================================

class Money extends Pair {
  /**
   * @param {number} grn
   * @param {number} coins
   */
  constructor(grn, coins) {
    super(grn, coins, Infinity, 100)
  }

  get grn() {
    return this.high
  }

  set grn(v) {
    this.high = v
  }

  get coins() {
    return this.low
  }

  set coins(v) {
    this.low = v
  }

  decrease() {
    super.decrease()

    if (this.grn === Infinity) throw new Error("Money can't be negative.")
  }

  toString() {
    return `${this.high}.${String(this.low).padStart(2, '0')} UAH`
  }
}

// ---

const m1 = new Money(0, 99)
console.debug(String(m1))
m1.increase()
console.debug(String(m1))
m1.decrease()
console.debug(String(m1))
m1.add(2, 1)
console.debug(String(m1))

// =======================================================================

class Job {
  durationHours
  costPerMinute
  title

  /**
   * @param {number} hours
   * @param {number} minutes
   * @param {number} grn
   * @param {number} coins
   * @param {string} title
   */
  constructor(hours, minutes, grn, coins, title = '') {
    this.durationHours = new Time(hours, minutes)
    this.costPerMinute = new Money(grn, coins)
    this.title = title
  }

  get totalCost() {
    const totalCostInCoins =
      Number(this.durationHours) * Number(this.costPerMinute)
    const cost = new Money(
      Math.floor(totalCostInCoins / 100),
      totalCostInCoins % 100,
    )

    return cost
  }

  toString() {
    return `🧾 Робота ${this.title}\n⏱ Тривалість: ${this.durationHours}\n💰 Вартість за хвилину: ${this.costPerMinute}\n💯 Загальна вартість: ${this.totalCost}.`
  }
}

// ---

const w1 = new Job(1, 35, 10, 45, 'таксі')
console.debug(String(w1))

// =======================================================================

const jobList = Array.from(
  {length: 5},
  (_, i) =>
    new Job(
      getRandomInteger(0, 23),
      getRandomInteger(0, 59),
      getRandomInteger(0, 200),
      getRandomInteger(0, 99),
      `№${i + 1}`,
    ),
)

for (const job of jobList) {
  console.log(String(job))
}
