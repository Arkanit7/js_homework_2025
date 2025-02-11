let sum = 0
const SUM_LIMIT = 20

do {
  sum += parseFloat(prompt('Скільки додати?', '9'))
} while (sum <= SUM_LIMIT)

document.write(`Сума: ${sum}`)
