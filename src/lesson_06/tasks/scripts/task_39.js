const START_NUMBER = 1
const END_NUMBER = 50
let sum = 0

for (let number = START_NUMBER; number <= END_NUMBER; number++) {
  if (number % 5 === 0 || number % 7 === 0) sum += number
}

document.write(`Сума ${sum}`)
