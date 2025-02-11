let startNumber = 10
const END_NUMBER = 99
const MULTIPLE = 4

if (startNumber % MULTIPLE !== 0)
  startNumber += MULTIPLE - (startNumber % MULTIPLE)

for (let number = startNumber; number <= END_NUMBER; number += MULTIPLE) {
  if (number % 6 === 0) continue

  document.write(number + ' ')
}
