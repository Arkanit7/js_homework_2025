let integer = parseInt(prompt('Введіть натуральне число', '40'))
let hasOddDigits = false

while (integer) {
  const lastDigit = integer % 10

  if (lastDigit % 2) {
    hasOddDigits = true
    break
  }
  // видалити останню цифру для наступної ітерації
  integer = Math.floor(integer / 10)
}

if (hasOddDigits) document.write('True')
else document.write('False')
