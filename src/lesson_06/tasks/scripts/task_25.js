const integer = parseInt(prompt('Введіть натуральне число', '74'))
let factorial
let number = 0

do {
  number++
  factorial = 1

  for (let i = 1; i <= number; i++) {
    factorial *= i
  }
} while (factorial < integer)

document.write(
  `<p>Найменше число <i>k = ${number}</i>, яке задовольняє нерівність <i>k! >= ${integer}</i>.`,
)
