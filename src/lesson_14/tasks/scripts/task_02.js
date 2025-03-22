/**
 * @typedef {Object} ShortDate
 * @property {number} day
 * @property {number} month
 * @property {number} year
 */

/**
 * @param {Pick<ShortDate, 'month' | 'year'>} date
 * @param {number} monthsPassed
 * @returns {number}
 */
function calcYearAfterMonths({ month, year }, monthsPassed) {
  const yearsPassed = Math.floor((month + monthsPassed - 1) / 12)

  return year + yearsPassed
}

/** @type {ShortDate} */
const jsCourseStart = {
  day: 21,
  month: 2,
  year: 2025,
}

const yearAfterMonths = calcYearAfterMonths(jsCourseStart, 10)
console.log(yearAfterMonths)
