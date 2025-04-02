'use strict'

class TMoney {
  #balanceUSD
  #USDtoUAH

  /**
   * @param {number} balanceUSD
   * @param {number} USDtoUAH
   */
  constructor(balanceUSD, USDtoUAH) {
    if (balanceUSD < 0) throw new Error("Balance can't be negative.")
    if (USDtoUAH < 0) throw new Error("Exchange rate can't be negative.")

    this.#balanceUSD = balanceUSD
    this.#USDtoUAH = USDtoUAH
  }

  get balanceUSD() {
    return this.#balanceUSD
  }

  get USDtoUAH() {
    return this.#USDtoUAH
  }

  /**
   * @param {number} amountUAH
   */
  refill(amountUAH) {
    if (amountUAH < 0) throw new Error("Can't refill a negative amount.")

    this.#balanceUSD += amountUAH / this.#USDtoUAH
  }

  /**
   * @param {number} amountUAH
   */
  withdrawal(amountUAH) {
    if (amountUAH < 0) throw new Error("Can't withdraw a negative amount.")

    const newBalanceUSD = this.balanceUSD - amountUAH / this.#USDtoUAH

    if (newBalanceUSD < 0) throw new Error('Not enough money.')

    this.#balanceUSD = newBalanceUSD
  }

  getUSDtoUAHBalanceChange(changeUAH = 100) {
    if (this.balanceUSD === 0) return 0

    const targetBalance = this.balanceUSD * this.#USDtoUAH + changeUAH

    return targetBalance / this.balanceUSD
  }

  toString() {
    return `Balance: $${this.balanceUSD.toFixed(2)}; Exchange rate: ${this.#USDtoUAH.toFixed(2)}`
  }
}

try {
  const myMoneyManager = new TMoney(100, 41.41)

  console.log(myMoneyManager.getUSDtoUAHBalanceChange(500))
  myMoneyManager.refill(500)
  myMoneyManager.withdrawal(2500)
  console.log(String(myMoneyManager))
} catch (error) {
  console.error('Caught', error)
}
