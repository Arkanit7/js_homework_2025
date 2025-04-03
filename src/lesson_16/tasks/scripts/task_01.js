'use strict'

class TDate {
  #year
  #month
  #day

  /**
   * Creates an instance of a date object.
   * @constructor
   * @param {number} day - The day of the month.
   * @param {number} month - The month of the year.
   * @param {number} year - The year.
   */
  constructor(day, month, year) {
    this.year = year
    this.month = month
    this.day = day
  }

  isThisLeapYear() {
    let isLeap

    if (this.year % 400 === 0) isLeap = true
    else if (this.year % 100 === 0) isLeap = false
    else isLeap = this.year % 4 === 0

    return isLeap
  }

  getDaysInThisMonth() {
    let daysAmount

    switch (this.month) {
      case 4:
      case 6:
      case 9:
      case 11:
        daysAmount = 30
        break
      case 2:
        daysAmount = this.isThisLeapYear() ? 29 : 28
        break
      default:
        daysAmount = 31
        break
    }

    return daysAmount
  }

  // ===========================================================================
  // Year

  get year() {
    return this.#year
  }

  set year(newYear) {
    if (newYear < 1) throw new Error("The year can't be lesser than 1.")

    this.#year = newYear
  }

  increaseYear(increase = 1) {
    if (increase < 0)
      throw new Error("Can't increase the year by a negative amount.")

    this.year += increase
  }

  decreaseYear(decrease = 1) {
    if (decrease < 0)
      throw new Error("Can't decrease the year by a negative amount.")

    this.year -= decrease
  }

  // ===========================================================================
  // Month

  get month() {
    return this.#month
  }

  set month(newMonth) {
    if (newMonth < 1) throw new Error("The month can't be lesser than 1.")
    if (newMonth > 12) throw new Error("The month can't be more than 12.")

    this.#month = newMonth
  }

  increaseMonth(increase = 1) {
    if (increase < 0)
      throw new Error("Can't increase the month by a negative amount.")

    let newMonth = this.month + increase

    while (newMonth > 12) {
      this.increaseYear()
      newMonth -= 12
    }

    this.month = newMonth

    // account for months that have less days
    if (this.day > this.getDaysInThisMonth())
      this.day = this.getDaysInThisMonth()
  }

  decreaseMonth(decrease = 1) {
    if (decrease < 0)
      throw new Error("Can't decrease the month by a negative amount.")

    let newMonth = this.month - decrease

    while (newMonth <= 0) {
      this.decreaseYear(1)
      newMonth += 12
    }

    this.month = newMonth

    // account for months that have less days
    if (this.day > this.getDaysInThisMonth())
      this.day = this.getDaysInThisMonth()
  }

  // ===========================================================================
  // Day

  get day() {
    return this.#day
  }

  set day(newDay) {
    if (newDay < 1) throw new Error("A day can't be lesser than 1.")
    if (newDay > this.getDaysInThisMonth())
      throw new Error("The month doesn't have that many days.")

    this.#day = newDay
  }

  increaseDay(increase = 1) {
    if (increase < 0)
      throw new Error("Can't increase the day by a negative amount.")

    let newDay = this.day + increase

    while (newDay > this.getDaysInThisMonth()) {
      newDay -= this.getDaysInThisMonth()
      this.increaseMonth()
    }

    this.day = newDay
  }

  decreaseDay(decrease = 1) {
    if (decrease < 0)
      throw new Error("Can't decrease the day by a negative amount.")

    let newDay = this.day - decrease

    while (newDay < 1) {
      this.decreaseMonth(1)
      newDay += this.getDaysInThisMonth()
    }

    this.day = newDay
  }

  // ===========================================================================
  // toPrimitive

  toString() {
    return (
      String(this.day).padStart(2, '0') +
      '.' +
      String(this.month).padStart(2, '0') +
      '.' +
      this.year
    )
  }
}

try {
  const someDate = new TDate(31, 1, 1997)

  console.log(someDate.month)
  someDate.month = 1
  console.log(someDate.month)
  someDate.decreaseMonth(13)
  console.log(someDate.month)
  console.log(someDate.year)
  someDate.increaseMonth(4)
  console.log(String(someDate))
} catch (error) {
  console.error(error)
}
