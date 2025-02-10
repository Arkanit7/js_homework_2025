let startNumber = 10
const END_NUMBER = 99

if (startNumber % 4 !== 0) startNumber += 4 - (startNumber % 4)

for (let number = startNumber; number <= END_NUMBER; number += 4) {
  if (number % 6 === 0) continue

  document.write(number + ' ')
}
