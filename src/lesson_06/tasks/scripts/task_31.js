// # Теорема Ферма? Складно! Йдемо напролом :D
const integer = parseInt(prompt('Введіть натуральне число', '13'))
let possible = false
let firstNumber, secondNumber
const limit = Math.floor(Math.sqrt(integer))

outer: for (firstNumber = 0; firstNumber <= limit; firstNumber++) {
  const square = firstNumber ** 2

  for (secondNumber = limit; secondNumber >= 0; secondNumber--) {
    if (square + secondNumber ** 2 === integer) {
      possible = true
      break outer
    }
  }
}

if (possible)
  document.write(
    `Так, число ${integer} можна представити у вигляді суми квадратів двох чисел ${firstNumber} та ${secondNumber}.`,
  )
else
  document.write(
    `Ні, число ${integer} не можна представити у вигляді суми квадратів двох чисел`,
  )
