'use strict'

/** @type {(a: number, b: number) => number} */
function addTwoNumbers(a, b) {
  return a + b
}

const objectOne = {
  numbersList: [234, 3, -55, 45, 33, 2, 99, 294, -77],

  calcSum() {
    return this.numbersList.reduce(addTwoNumbers, 0)
  },
}

const objectTwo = {
  numbersList: [55, -23, 55, 45, 343, 52, -99, 24, -17],

  calcProductInRange(min = -Infinity, max = Infinity) {
    return this.numbersList.reduce(
      (product, number) =>
        min <= number && number <= max ? product * number : product,
      1,
    )
  },
}

const productInRangeObjOne = objectTwo.calcProductInRange.call(
  objectOne,
  -50,
  50,
)
console.log(
  '🎯 Добуток чисел з objectOne у діапазоні [-50, 50]:',
  productInRangeObjOne,
)

const productInRangeObjTwo = objectTwo.calcProductInRange(-50, 50)
console.log(
  '🎯 Добуток чисел з objectTwo у діапазоні [-50, 50]:',
  productInRangeObjTwo,
)

const sumObjOne = objectOne.calcSum()
console.log('➕ Сума чисел з objectOne:', sumObjOne)

const sumObjTwo = objectOne.calcSum.apply(objectTwo)
console.log('➕ Сума чисел з objectTwo:', sumObjTwo)
