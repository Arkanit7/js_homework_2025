'use strict'

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

// class NotEmptyStringError extends NamedError {
//   constructor(name) {
//     super(`"${name}" must be a non-empty string`)
//   }
// }

function validateNumber(value, title = value) {
  if (typeof value !== 'number' || !isFinite(value))
    throw new NotFiniteError(title)
  if (value < 0) throw new NegativeError(title)
}

class TPerson {
  name
  #age
  address

  /**
   * @param {string} name
   * @param {number} age
   * @param {string} address
   */
  constructor(name, age, address) {
    this.name = name
    this.age = age
    this.address = address
  }

  get age() {
    return this.#age
  }

  set age(newAge) {
    validateNumber(newAge)

    this.#age = newAge
  }

  get birthYear() {
    return new Date().getFullYear() - this.age
  }

  set birthYear(year) {
    validateNumber(year)

    this.age = new Date().getFullYear() - year
  }

  toString() {
    return `Name: ${this.name}\nAge: ${this.age}\nAddress: ${this.address}`
  }
}

// ---

const p1 = new TPerson('Tyrion', 125, 'Lotern, Ulthuan')

console.debug(String(p1))
console.debug(p1.birthYear)
p1.birthYear = 2000
console.debug(p1.birthYear)
console.debug(String(p1))

// =============================================================================

/**
 * @alias Worker is already a global variable
 */
class TWorker extends TPerson {
  position
  #monthlySalary
  #taxPercent

  /**
   * @param {string} name
   * @param {number} age
   * @param {string} address
   * @param {string} position
   * @param {number} monthlySalary
   * @param {number} taxPercent
   */
  constructor(name, age, address, position, monthlySalary, taxPercent) {
    super(name, age, address)
    this.position = position
    this.monthlySalary = monthlySalary
    this.taxPercent = taxPercent
  }

  get monthlySalary() {
    return this.#monthlySalary
  }

  set monthlySalary(newSalary) {
    validateNumber(newSalary)

    this.#monthlySalary = newSalary
  }

  get taxPercent() {
    return this.#taxPercent
  }

  set taxPercent(newTaxPercent) {
    validateNumber(newTaxPercent)

    this.#taxPercent = newTaxPercent
  }

  /**
   * @param {number} salary
   */
  calculateTax(salary) {
    validateNumber(salary)

    return (salary * this.taxPercent) / 100
  }

  yearlyGain(years = 1) {
    validateNumber(years)

    const months = years * 12

    return (this.monthlySalary - this.calculateTax(this.monthlySalary)) * months
  }

  toString() {
    return `${super.toString()}\nPosition: ${this.position}\nGross Salary: ${this.monthlySalary}\nTax: ${this.taxPercent}%`
  }
}

// ---

try {
  const w1 = new TWorker(
    'Felix',
    30,
    'Reikland, Old World',
    'Adventurer',
    1000,
    10,
  )

  console.debug(String(w1))
  console.debug(w1.calculateTax(1234567))
  console.debug(w1.yearlyGain(2))
  console.debug(w1.calculateTax('hello')) // error
  console.debug(w1.yearlyGain(-2))
} catch (error) {
  if (error instanceof NotFiniteError || error instanceof NegativeError)
    console.error(error)
  else throw error
}
