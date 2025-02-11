let startNumber = 20
const END_NUMBER = 50
const MULTIPLE = 3

if (startNumber % MULTIPLE !== 0)
  startNumber += MULTIPLE - (startNumber % MULTIPLE)

for (let number = startNumber; number <= END_NUMBER; number += MULTIPLE) {
  if (number % 5 === 0) continue

  document.write(number + ' ')
}
