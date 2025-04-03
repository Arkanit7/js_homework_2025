'use strict'

/**
 * @param {number} value
 * @param {string} errorLabel
 */
function ensurePositive(value, errorLabel = '') {
  if (value < 0) throw new Error(errorLabel)
}

class TMoney {
  #USDToUAHRate
  #balanceUSD

  /**
   * @param {number} balanceUAH
   * @param {number} USDToUAHRate
   */
  constructor(balanceUAH, USDToUAHRate) {
    this.USDToUAHRate = USDToUAHRate // must be set before the balance
    this.balanceUAH = balanceUAH
  }

  // ===========================================================================
  // Exchange rate

  get USDToUAHRate() {
    return this.#USDToUAHRate
  }

  set USDToUAHRate(newUSDToUAHRate) {
    ensurePositive(newUSDToUAHRate, "Exchange rate can't be negative.")

    this.#USDToUAHRate = newUSDToUAHRate
  }

  // ===========================================================================
  // Balance

  get balanceUAH() {
    return this.#balanceUSD * this.USDToUAHRate
  }

  set balanceUAH(newUAHBalance) {
    ensurePositive(newUAHBalance, "Balance can't be negative.")

    this.#balanceUSD = newUAHBalance / this.USDToUAHRate
  }

  // ===========================================================================

  /**
   * @param {number} amountUAH
   */
  refill(amountUAH) {
    ensurePositive(amountUAH, "Can't refill a negative amount.")

    this.balanceUAH += amountUAH
  }

  /**
   * @param {number} amountUAH
   */
  withdrawal(amountUAH) {
    ensurePositive(amountUAH, "Can't withdraw a negative amount.")

    this.balanceUAH -= amountUAH
  }

  getUSDToUAHRateForBallanceChange(changeUAH = 100) {
    if (this.#balanceUSD === 0)
      throw new Error("Can't predict the exchange rate for an empty balance!")

    return (this.balanceUAH + changeUAH) / this.#balanceUSD
  }

  toString() {
    return `Balance: ${this.balanceUAH.toFixed(2)} UAH; Exchange rate: ${this.USDToUAHRate.toFixed(2)}`
  }
}

try {
  const exchanger = new TMoney(50000, 41.41)
  console.log(String(exchanger))
  exchanger.refill(2500)
  console.log(String(exchanger))
  exchanger.withdrawal(51500)
  console.log(String(exchanger))

  const goodUSDToUAHRate = exchanger.getUSDToUAHRateForBallanceChange(100)

  exchanger.USDToUAHRate = goodUSDToUAHRate
  console.log(String(exchanger))
} catch (error) {
  console.error('Caught', error)
}
