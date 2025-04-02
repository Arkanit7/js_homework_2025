'use strict'

class Bill {
  #worth = 0

  get worth() {
    return this.#worth
  }

  set worth(newWorth) {
    if (newWorth <= 0) throw new Error("A bill can't be worthless.")

    this.#worth = newWorth
  }

  #amount = 0

  get amount() {
    return this.#amount
  }

  set amount(newAmount) {
    if (newAmount < 0) throw new Error("Amount of bills can't be negative.")

    this.#amount = newAmount
  }

  /**
   * @param {number} worth
   * @param {number} amount
   */
  constructor(worth, amount) {
    this.worth = worth
    this.amount = amount
  }

  toString() {
    return `${this.worth}: ${this.amount}`
  }

  valueOf() {
    return this.worth * this.amount
  }
}

class TBankomat {
  /** @type {Bill[]} newBills */
  #bills = []

  get bills() {
    return this.#bills
  }

  /** @param {Bill[]} newBills */
  set bills(newBills) {
    if (!newBills.every((bill) => bill instanceof Bill))
      throw new Error('A bill must be an instance of the Bill class.')

    this.#bills = newBills
  }

  /** @param {Bill[]} bills */
  constructor(bills = []) {
    // store an array of bills by worth in descending order
    this.bills = bills.sort((billA, billB) => billB.worth - billA.worth)
  }

  get minimalSum() {
    const minBill = this.bills.findLast(({ amount }) => amount > 0)

    if (minBill) return minBill.worth

    return 0
  }

  get maximalSum() {
    return this.bills.reduce((sum, bill) => sum + Number(bill), 0)
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

    for (let i = 0; i < this.bills.length && leftToWithdraw > 0; i++) {
      const { worth, amount } = this.bills[i]

      if (amount === 0 || worth > leftToWithdraw) continue

      leftToWithdraw -= worth
      this.#bills[i].amount--
      i--
    }

    if (leftToWithdraw !== 0)
      throw new Error(
        `Can't withdraw ${toWithdraw}. Closest available sum ${toWithdraw - leftToWithdraw}`,
      )
  }

  toString() {
    return this.bills.reduce((group, bill) => group + String(bill) + '; ', '')
  }

  valueOf() {
    return this.maximalSum
  }
}

const billsList = [
  new Bill(5, 100),
  new Bill(10, 100),
  new Bill(20, 100),
  new Bill(50, 100),
  new Bill(100, 1000),
  new Bill(200, 10000),
]

const privatBankATM = new TBankomat(billsList)

try {
  console.log(privatBankATM.minimalSum)
  console.log(privatBankATM.maximalSum)
  console.log(String(privatBankATM))
  privatBankATM.withdrawal(947555)
  console.log(privatBankATM.maximalSum)
  console.log(String(privatBankATM))
  privatBankATM.withdrawal(257555)
  console.log(privatBankATM.maximalSum)
  console.log(String(privatBankATM))
} catch (error) {
  console.error('Caught', error)
}
