'use strict'
class TDate {
  #year
  #month
  #day

  /**
   * Creates an instance of a date object.
   * @param {number} day - The day of the month.
   * @param {number} month - The month of the year.
   * @param {number} year - The year.
   */
  constructor(day, month, year) {
    this.year = year
    this.month = month
    this.day = day
  }

  #adjustDays() {
    if (this.day > this.getDaysInThisMonth())
      this.day = this.getDaysInThisMonth()
  }

  isThisLeapYear() {
    return (
      this.year % 400 === 0 || (this.year % 100 !== 0 && this.year % 4 === 0)
    )
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

    // if jump from leap year on February 29th
    this.#adjustDays()
  }

  decreaseYear(decrease = 1) {
    if (decrease < 0)
      throw new Error("Can't decrease the year by a negative amount.")

    this.year -= decrease

    // if jump from leap year on February 29th
    this.#adjustDays()
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

    this.#adjustDays()
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

    this.#adjustDays()
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

// =============================================================================

/**
 * @template T
 * @param {T} actual
 * @param {T} expected
 * @param {string} [message]
 */
function assertEqual(actual, expected, message = 'Values do not match') {
  if (actual !== expected) {
    console.error(
      `❌ ${message}\n   Expected: ${expected}\n   Actual:   ${actual}`,
    )
  } else {
    console.log(`✅ ${message}`)
  }
}

/**
 * @param {Function} fn
 * @param {string} [message]
 */
function assertThrows(fn, message = 'Expected function to throw') {
  try {
    fn()
    console.error(`❌ ${message}\n   But it did not throw.`)
  } catch {
    console.log(`✅ ${message}`)
  }
}

// =============================================================================
// ## 🧪 Tests

console.log(
  `%c🧪 ${TDate.prototype.constructor.name} Tests 🧪`,
  'font-size: 1.5rem; font-weight: bolder;',
)

// ✅ Constructor + Getters
{
  const date = new TDate(15, 3, 2024)
  assertEqual(date.day, 15, 'Day should be set correctly')
  assertEqual(date.month, 3, 'Month should be set correctly')
  assertEqual(date.year, 2024, 'Year should be set correctly')
}

// ✅ Leap Year
{
  assertEqual(
    new TDate(1, 1, 2020).isThisLeapYear(),
    true,
    '2020 is a leap year',
  )
  assertEqual(
    new TDate(1, 1, 1900).isThisLeapYear(),
    false,
    '1900 is not a leap year',
  )
  assertEqual(
    new TDate(1, 1, 2000).isThisLeapYear(),
    true,
    '2000 is a leap year',
  )
}

// ✅ Days in Month
{
  assertEqual(
    new TDate(1, 2, 2020).getDaysInThisMonth(),
    29,
    'Feb 2020 has 29 days',
  )
  assertEqual(
    new TDate(1, 2, 2021).getDaysInThisMonth(),
    28,
    'Feb 2021 has 28 days',
  )
  assertEqual(
    new TDate(1, 4, 2024).getDaysInThisMonth(),
    30,
    'April has 30 days',
  )
  assertEqual(
    new TDate(1, 12, 2024).getDaysInThisMonth(),
    31,
    'December has 31 days',
  )
}

// ✅ Validation
{
  assertThrows(() => new TDate(32, 1, 2023), 'Day out of range should throw')
  assertThrows(() => new TDate(10, 13, 2023), 'Month > 12 should throw')
  assertThrows(() => new TDate(10, 0, 2023), 'Month < 1 should throw')
  assertThrows(() => new TDate(10, 1, 0), 'Year < 1 should throw')
}

// ✅ Increase/decrease Year
{
  const date = new TDate(29, 2, 2024)
  date.increaseYear()
  assertEqual(date.year, 2025, 'Year should increase')
  assertEqual(date.day, 28, 'Days should decrease')
  date.decreaseYear(2)
  assertEqual(date.year, 2023, 'Year should decrease')
  assertThrows(
    () => date.decreaseYear(-1),
    'Negative year decrease should throw',
  )
}

// ✅ Increase/decrease Month with overflow
{
  const date = new TDate(10, 12, 2023)
  date.increaseMonth()
  assertEqual(date.month, 1, 'Month should roll over to Jan')
  assertEqual(date.year, 2024, 'Year should increase on month rollover')

  date.decreaseMonth(2)
  assertEqual(date.month, 11, 'Month should roll back')
  assertEqual(date.year, 2023, 'Year should decrease on month rollback')
}

// ✅ Increase/decrease Day with overflow
{
  const date = new TDate(31, 1, 2024)
  date.increaseDay()
  assertEqual(date.day, 1, 'Day should roll over to 1')
  assertEqual(date.month, 2, 'Month should be Feb after Jan 31')

  const febDate = new TDate(28, 2, 2021)
  febDate.increaseDay()
  assertEqual(febDate.day, 1, 'Day should roll over after Feb')
  assertEqual(febDate.month, 3, 'Month should increase after Feb')

  const backDate = new TDate(1, 1, 2023)
  backDate.decreaseDay()
  assertEqual(backDate.day, 31, 'Should go back to Dec 31')
  assertEqual(backDate.month, 12, 'Should go back to December')
  assertEqual(backDate.year, 2022, 'Year should decrease after Jan 1')
}

// ✅ String formatting
{
  const date = new TDate(5, 9, 2023)
  assertEqual(date.toString(), '05.09.2023', 'Date should format as DD.MM.YYYY')

  const d2 = new TDate(1, 1, 1)
  assertEqual(d2.toString(), '01.01.1', 'Edge case: Year 1 formatting')
}
