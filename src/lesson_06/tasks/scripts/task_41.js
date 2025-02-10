let startNumber = 13
const END_NUMBER = 99
let product = 1

if (startNumber % 13 !== 0) startNumber += 13 - (startNumber % 13)

for (let number = startNumber; number <= END_NUMBER; number += 13) {
  if (number % 2 !== 0) product *= number
}

document.write(product)
