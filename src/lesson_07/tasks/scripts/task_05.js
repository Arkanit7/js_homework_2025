/**
 * Convert centimeters to inches
 *
 * @param {number} numberCm centimeters
 * @returns {number} inches
 */
function convertCmToIn(numberCm) {
  const conversionRate = 0.393701

  return numberCm * conversionRate
}

/**
 * Convert kilograms to pounds
 *
 * @param {number} numberKg kilograms
 * @returns {number} pounds
 */
function convertKgToLbs(numberKg) {
  const conversionRate = 2.20462

  return numberKg * conversionRate
}

/**
 * Convert kilometers to miles
 *
 * @param {number} numberKm kilometers
 * @returns {number} miles
 */
function convertKmToMi(numberKm) {
  const conversionRate = 0.621371

  return numberKm * conversionRate
}

// ---

const centimeters = 234
const kilograms = 123
const kilometers = 354

document.write(
  `<p>${centimeters} сантиметри у дюйми = ${convertCmToIn(centimeters).toFixed(2)}</p>`,
)
document.write(
  `<p>${kilograms} кілограми у фунти = ${convertKgToLbs(kilograms).toFixed(2)}</p>`,
)
document.write(
  `<p>${kilometers} кілометри у милі = ${convertKmToMi(kilometers).toFixed(2)}</p>`,
)
