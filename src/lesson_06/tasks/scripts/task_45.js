const integer = parseInt(prompt('Введіть натуральне число', '28'))
let specificNumbersCount = 0

for (let number = 1; number < integer; number++) {
  if (number % 2 && number % 3 && number % 5) {
    specificNumbersCount++
    document.write(number + ' ')
  }
}

document.write('<p>Кількість: ' + specificNumbersCount)
