let startNumber = 13
const END_NUMBER = 99
const MULTIPLE = 13
let product = 1

if (startNumber % MULTIPLE !== 0)
  startNumber += MULTIPLE - (startNumber % MULTIPLE)

for (let number = startNumber; number <= END_NUMBER; number += MULTIPLE) {
  if (number % 2 !== 0) product *= number
}

document.write(product)
