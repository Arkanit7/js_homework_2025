let integer = parseInt(prompt('Введіть натуральне число', '40'))
let containsTwo = false

while (integer) {
  const lastDigit = integer % 10

  if (lastDigit === 2) {
    containsTwo = true
    break
  }
  // видалити останню цифру для наступної ітерації
  integer = Math.floor(integer / 10)
}

if (containsTwo) document.write('True')
else document.write('False')
