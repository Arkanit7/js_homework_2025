'use strict'

class TBankomat {
  #bills

  /** @param {Object<string, number>} bills */
  constructor(bills = {}) {
    // store an array of bills by worth in descending order
    this.#bills = Object.entries(bills)
      .map(([worth, amount]) => [Number(worth), amount])
      .sort(([worthA], [worthB]) => worthB - worthA)
  }

  get bills() {
    return Object.fromEntries(this.#bills)
  }

  get minimalSum() {
    const minEntry = this.#bills.findLast(([, amount]) => amount > 0)

    if (minEntry) return minEntry[0]

    return 0
  }

  get maximalSum() {
    return this.#bills.reduce((sum, [worth, amount]) => sum + worth * amount, 0)
  }

  /**
   * @param {number} toWithdraw
   */
  withdrawal(toWithdraw) {
    if (toWithdraw <= 0)
      throw new Error('You can only withdraw positive amounts.')
    if (toWithdraw < this.minimalSum)
      throw new Error(`You can't withdraw less, than ${this.minimalSum}.`)
    if (toWithdraw > this.maximalSum)
      throw new Error(
        `There's not enough money. Maximal available sum: ${this.maximalSum}.`,
      )

    let leftToWithdraw = toWithdraw

    for (let i = 0; i < this.#bills.length && leftToWithdraw > 0; i++) {
      const [worth, amount] = this.#bills[i]

      if (amount === 0 || worth > leftToWithdraw) continue

      leftToWithdraw -= worth
      this.#bills[i][1]--
      i--
    }

    if (leftToWithdraw !== 0)
      throw new Error(
        `Can't withdraw ${toWithdraw}. Closest available sum ${toWithdraw - leftToWithdraw}`,
      )
  }

  toString() {
    return JSON.stringify(this.bills)
  }

  valueOf() {
    return this.maximalSum
  }
}

const privatBankATM = new TBankomat({
  5: 100,
  10: 100,
  20: 100,
  50: 100,
  100: 1000,
  200: 10000,
})

try {
  console.log(privatBankATM.minimalSum)
  console.log(privatBankATM.maximalSum)
  console.log(privatBankATM.bills)
  privatBankATM.withdrawal(947555)
  console.log(privatBankATM.maximalSum)
  console.log(privatBankATM.bills)
  privatBankATM.withdrawal(257555)
  console.log(privatBankATM.maximalSum)
  console.log(privatBankATM.bills)
} catch (error) {
  console.error('Caught', error)
}
