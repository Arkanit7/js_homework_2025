let startNumber = 20
const END_NUMBER = 50

if (startNumber % 3 !== 0) startNumber += 3 - (startNumber % 3)

for (let number = startNumber; number <= END_NUMBER; number += 3) {
  if (number % 5 === 0) continue

  document.write(number + ' ')
}
