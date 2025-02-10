const integer = parseInt(prompt('Введіть натуральне число', '97'))
let isPrime = true

for (let number = 2; number ** 2 <= integer; number++) {
  if (integer % number === 0) {
    isPrime = false
    break
  }
}

document.write(
  `Число ${integer} <b>${isPrime ? 'є' : 'не є'}</b> простим числом.`,
)
