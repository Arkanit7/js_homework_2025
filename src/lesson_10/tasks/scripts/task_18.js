/**
 * @param {number} length
 * @param {number} firstNumber
 * @param {number} commonRatio
 * @returns {number[]}
 */
function createGeometricProgression(length, firstNumber, commonRatio) {
  const progression = [firstNumber]

  for (let i = 1; i < length; i++) {
    progression[i] = progression[i - 1] * commonRatio
  }

  return progression
}

/**
 * @param {number[]} array
 * @returns {boolean}
 */
function isGeometricProgression(array) {
  if (array.length < 3)
    throw new Error('Array must include more than two elements.')

  const commonRatio = array[0] === 0 ? 0 : array[1] / array[0]

  return array.every((item, i, arr) => {
    // commonRatio === (arr[i - 1] === 0 ? 0 : item / arr[i - 1]) || i === 0
    let result

    if (i === 0) result = true
    else if (arr[i - 1 === 0]) result = commonRatio === 0
    else result = commonRatio === item / arr[i - 1]

    return result
  })
}

/**
 * @param {any[]} array
 * @param {(array: any[]) => boolean} testFn
 */
function prettyPrintTest(array, testFn) {
  document.write(`<p>Масив: [${array.join(', ')}];`)
  document.write(
    `<p>Чи це геометрична прогресія – ${testFn(array) ? 'так' : 'ні'}.`,
  )
}

const geometricProgression = createGeometricProgression(14, 3, 2)
prettyPrintTest(geometricProgression, isGeometricProgression)

const testArray = [3, 6, 9, 12, 15, 18, 21, 24]

prettyPrintTest(testArray, isGeometricProgression)
