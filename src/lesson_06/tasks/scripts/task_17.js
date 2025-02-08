// Алгоритм працює лише для чисел з двома сімками
const originalNumber = parseInt(
  prompt('Введіть число з двома сімками', '2679328712'),
)
let number = originalNumber
let digitSum = 0
let inside = false

do {
  const digit = number % 10

  // видалити крайню цифру для наступної ітерації
  number = Math.floor(number / 10)

  // зупинити додавання, при останній сімці
  if (inside && digit === 7) break

  // почати додавати при першій сімці
  if (digit === 7) {
    inside = true
    continue
  }

  if (inside) digitSum += digit
} while (number) // повторювати доки number не 0 (доки він ще є)

document.write(
  `Сума чисел між двома 7 для числа ${originalNumber} = ${digitSum}`,
)
