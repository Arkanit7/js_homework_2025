'use strict'

class NamedError extends Error {
  /** @param {string} [message] */
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class NaNError extends NamedError {
  constructor(value) {
    super(`"${value}" must be a number.`)
  }
}

class NotPositiveError extends NamedError {
  constructor(value) {
    super(`"${value}" must be a positive number.`)
  }
}

class NotSafeError extends NamedError {
  constructor(value) {
    super(
      `"${value}" must be in between ${Number.MIN_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}.`,
    )
  }
}

class NotValidError extends NamedError {
  /** @param {Error} cause */
  constructor(cause) {
    super("Number isn't valid.")
    this.cause = cause
  }
}

/**
 * Number validation function that check for multiple errors,
 * effectively wrapping them in to universal "NotValidError" error.
 *
 * @see {NotValidError}
 * @param {any} value
 */
function validateNumber(value) {
  try {
    if (typeof value !== 'number' || Number.isNaN(value))
      throw new NaNError(value)
    if (value <= 0) throw new NotPositiveError(value)
    if (value > Number.MAX_SAFE_INTEGER) throw new NotSafeError(value)
  } catch (error) {
    if (
      error instanceof NaNError ||
      error instanceof NotPositiveError ||
      error instanceof NotSafeError
    )
      throw new NotValidError(error)
    else throw error
  }
}

class Product {
  name
  #price
  #amount

  /**
   * @param {string} name
   * @param {number} price
   * @param {number} amount
   */
  constructor(name, price, amount) {
    this.name = name
    this.price = price
    this.amount = amount
  }

  get price() {
    return this.#price
  }

  set price(newPrice) {
    validateNumber(newPrice)
    this.#price = newPrice
  }

  get amount() {
    return this.#amount
  }

  set amount(newAmount) {
    validateNumber(newAmount)
    this.#amount = newAmount
  }

  get totalPrice() {
    return this.price * this.amount
  }

  set totalPrice(newTotalPrice) {
    this.price = newTotalPrice / this.amount
  }

  /** @param {'string'|'number'|'default'} hint */
  [Symbol.toPrimitive](hint) {
    return hint === 'string'
      ? `${this.name} - ${this.totalPrice}`
      : this.totalPrice
  }
}

class Shop {
  #productList
  $el

  /** @param {Product[]} productList */
  constructor(productList) {
    this.productList = productList
  }

  get productList() {
    return this.#productList
  }

  set productList(newProductList) {
    if (!Array.isArray(newProductList))
      throw new TypeError('Product list must be an array.')

    if (!newProductList.every((product) => product instanceof Product))
      throw new TypeError(
        'All products must be instances of the Product class.',
      )

    this.#productList = newProductList
  }

  /** @param {string} cssSelector */
  render(cssSelector) {
    this.$el = document.createElement('UL')

    for (const number of this) {
      const liEl = document.createElement('li')
      liEl.textContent = number

      this.$el.append(liEl)
    }

    if (cssSelector) document.querySelector(cssSelector).append(this.$el)

    return this.$el
  }

  *[Symbol.iterator]() {
    //? метод toString() не працює
    for (const product of this.#productList) yield String(product)
  }
}

// =============================================================================

try {
  const productList = [
    new Product('Яблука', 25, 10),
    new Product('Банани', 30, 5),
    new Product('Молоко', 40, 15),
    new Product('Хліб', 18, 20),
    new Product('Сир', 120, 3),
    new Product('Масло', 70, 8),
    new Product('Яйця', 35, 2),
    new Product('Апельсини', 45, 7),
    new Product('Картопля', 12, 25),
    new Product('Цибуля', 15, 12),
    new Product('Морква', 10, 18),
    new Product('Капуста', 20, 10),
    new Product('Огірки', 30, 6),
    new Product('Помідори', 35, 9),
    new Product('Перець', 50, 4),
    new Product('Гречка', 55, 11),
    new Product('Рис', 48, 16),
    new Product('Макарони', 22, 22),
    new Product('Цукор', 38, 14),
    new Product('Сіль', 8, 30),
    new Product('Чай', 60, 7),
    new Product('Кава', 150, 2),
  ]

  const auchan = new Shop(productList)
  auchan.render('.js-app')
} catch (error) {
  if (error instanceof NotValidError) console.error(error.cause)
  else throw error
}

// =============================================================================
// ## Tests
// Total price changes price
try {
  const p1 = new Product('Перець', 400, 2)
  console.log(p1.price)
  p1.totalPrice = 100
  console.log(p1.price)
} catch (error) {
  if (error instanceof NotValidError) console.error(error.cause)
  else throw error
}

try {
  const p1 = new Product('Перець', 400, 2)
  p1.price = Number.MAX_SAFE_INTEGER + 1
  console.dir(p1)
} catch (error) {
  if (error instanceof NotValidError) console.error(error.cause)
  else throw error
}

try {
  const p1 = new Product('Перець', 400, 2)
  p1.amount = '22'
  console.dir(p1)
} catch (error) {
  if (error instanceof NotValidError) console.error(error.cause)
  else throw error
}

try {
  const p1 = new Product('Перець', 400, 1)
  p1.totalPrice = -22
  console.dir(p1)
} catch (error) {
  if (error instanceof NotValidError) console.error(error.cause)
  else throw error
}

try {
  const p1 = new Product('Перець', 400, 1)
  const s1 = new Shop([p1, 'apple'])
} catch (error) {
  console.error(error)
}
