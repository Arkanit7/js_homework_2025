let startNumber = 100
const END_NUMBER = 200
const MULTIPLE = 17
let sum = 0

if (startNumber % MULTIPLE !== 0)
  startNumber += MULTIPLE - (startNumber % MULTIPLE)

for (let number = startNumber; number <= END_NUMBER; number += MULTIPLE) {
  sum += number

  document.write(number + ' ')
}

document.write(`<p>Сума: ${sum}`)
