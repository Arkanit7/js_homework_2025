'use strict'

class Bill {
  #worth = 1

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
  getRequiredBills(toWithdraw) {
    const bills = []

    for (const bill of this.bills) {
      if (toWithdraw === 0) break

      const { worth, amount } = bill
      const possibleAmount = Math.min(Math.floor(toWithdraw / worth), amount)

      if (possibleAmount) {
        bills.push({ bill, possibleAmount })
        toWithdraw -= worth * possibleAmount
      }
    }

    return toWithdraw === 0 ? bills : []
  }

  /**
   * @param {number} toWithdraw
   */
  withdrawal(toWithdraw) {
    if (toWithdraw <= 0)
      throw new Error('You can only withdraw positive amounts.')
    if (toWithdraw < this.minimalSum)
      throw new Error(`Minimum withdrawal amount is: $${this.minimalSum}.`)
    if (toWithdraw > this.maximalSum)
      throw new Error(
        `Insufficient funds. Maximum available: $${this.maximalSum}.`,
      )

    const billsToWithdraw = this.getRequiredBills(toWithdraw)

    if (billsToWithdraw.length === 0)
      throw new Error(`Cannot dispense ${toWithdraw}. Try a different amount.`)

    let log = ''

    for (const { bill, possibleAmount } of billsToWithdraw) {
      bill.amount -= possibleAmount
      log += `Withdrawn ${possibleAmount} x 💲${bill.worth}\n`
    }

    return log
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
  new Bill(50, 1000),
  new Bill(100, 1000),
  new Bill(200, 10000),
]

const personalBankATM = new TBankomat(billsList)

if (confirm('Почати тестування?')) {
  while (personalBankATM.minimalSum) {
    const userWants = prompt(
      `🏧 Personal Bank ATM 🏧\nAvailable sum: 💲${personalBankATM.maximalSum}\nEnter money amount:`,
      '0',
    )

    if (userWants === null) break

    const userWantAmount = parseInt(userWants)

    if (!isFinite(userWantAmount)) {
      alert('⚠️ Incorrect input. Please, enter a valid number.')
      continue
    }

    try {
      const log = personalBankATM.withdrawal(userWantAmount)
      alert(log)
    } catch (error) {
      alert('⚠️ ' + error)
    }
  }
}
