'use strict'

console.info(
  '%cЗадача №1',
  'font-size: 2rem; color: royalblue; font-weight: bolder;',
)

class NamedError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class NotFiniteError extends NamedError {
  constructor(name) {
    super(`"${name}" must be a finite number.`)
  }
}

class NegativeError extends NamedError {
  constructor(name) {
    super(`"${name}" must be a positive number.`)
  }
}

function validateNumber(value, title = value) {
  if (typeof value !== 'number' || !isFinite(value))
    throw new NotFiniteError(title)
  if (value < 0) throw new NegativeError(title)
}

class Client {
  id
  name
  #accountMoney

  /**
   * @param {number} id
   * @param {string} name
   * @param {number} accountMoney
   */
  constructor(id, name, accountMoney) {
    this.id = id
    this.name = name
    this.accountMoney = accountMoney
  }

  get accountMoney() {
    return this.#accountMoney
  }

  set accountMoney(amount) {
    validateNumber(amount)
    this.#accountMoney = amount
  }

  /**
   * @param {number} amount
   */
  topUpMoney(amount) {
    this.accountMoney += amount
  }

  /**
   * @param {number} amount
   */
  withdrawalMoney(amount) {
    this.accountMoney -= amount
  }

  toString() {
    return `ID: ${this.id}\nІм'я: ${this.name}\nГроші: ${this.accountMoney}`
  }
}

// ---

try {
  const c1 = new Client(228, 'Велика панда', 322)
  console.debug(String(c1))
  c1.topUpMoney(100)
  c1.withdrawalMoney(423)
  console.debug(String(c1))
} catch (error) {
  if (error instanceof NotFiniteError || error instanceof NegativeError)
    console.error(error)
  else throw error
}

// =============================================================================

class GoldenClient extends Client {
  #creditLimit
  #creditPercentage

  /**
   * @param {number} id
   * @param {string} name
   * @param {number} accountMoney
   * @param {number} creditLimit
   * @param {number} creditPercentage
   */
  constructor(id, name, accountMoney, creditLimit, creditPercentage) {
    super(id, name, accountMoney)
    this.creditLimit = creditLimit
    this.creditPercentage = creditPercentage
  }

  get creditLimit() {
    return this.#creditLimit
  }

  set creditLimit(amount) {
    validateNumber(amount)
    this.#creditLimit = amount
  }

  get creditPercentage() {
    return this.#creditPercentage
  }

  set creditPercentage(amount) {
    validateNumber(amount)
    this.#creditPercentage = amount
  }

  // /**
  //  * @param {number} amount
  //  */
  // withdrawalMoney(amount) {
  //   if (typeof amount !== 'number' || !isFinite(amount))
  //     throw new NotFiniteError(amount)

  //   if (this.accountMoney - amount < -this.creditLimit) {
  //     throw new NegativeError('Withdrawal exceeds credit limit.')
  //   }
  //   this.accountMoney -= amount
  // }

  /**
   * @param {number} money
   */
  calcCreditInterest(money) {
    validateNumber(money)

    return (money * this.creditPercentage) / 100
  }

  toString() {
    return `${super.toString()}\nВідсоток за використання кредитних коштів: ${this.creditPercentage}`
  }
}

// ---

try {
  const gc1 = new GoldenClient(214124, 'Кіт', 100, 50000, 3)
  console.debug(String(gc1))
  console.debug(gc1.calcCreditInterest(8234789))
  gc1.creditLimit = NaN
} catch (error) {
  if (error instanceof NotFiniteError || error instanceof NegativeError)
    console.error(error)
  else throw error
}
