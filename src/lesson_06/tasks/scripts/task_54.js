let integer = parseInt(prompt('Введіть число', '40'))
let length = 0
let digitsSum = 0

document.write(`<p>число: ${integer}`)

while (integer) {
  const lastDigit = integer % 10
  length++
  digitsSum += lastDigit

  // видалити останню цифру для наступної ітерації
  integer = Math.floor(integer / 10)
}

document.write(`<p>довжина: ${length}`)
document.write(`<p>сума цифр: ${digitsSum}`)
