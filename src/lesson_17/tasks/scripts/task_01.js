'use strict'

/** A utility class for performing various operations on arrays of numbers. */
class NumberUtils {
  /**
   * @param {number[]} list
   * @returns {number}
   */
  static positiveCount(list) {
    return list.reduce((count, value) => (value > 0 ? count + 1 : count), 0)
  }

  /**
   * @param {number[]} list
   * @returns {number}
   */
  static negativeCount(list) {
    return list.reduce((count, value) => (value < 0 ? count + 1 : count), 0)
  }

  /**
   * @param {number} entry
   * @param {number[]} list
   * @returns {number}
   */
  static entriesCount(entry, list) {
    return list.reduce(
      (count, value) => (value === entry ? count + 1 : count),
      0,
    )
  }
}

// ---

const list = [
  0, 1, -1, 2, 3, 5, 8, 13, 21, -34, 55, 89, 144, -233, 377, 610, -987, 1597,
  -2584, 4181, -34,
]

console.log(list)
console.log(NumberUtils.positiveCount(list))
console.log(NumberUtils.negativeCount(list))
console.log(NumberUtils.entriesCount(-34, list))
