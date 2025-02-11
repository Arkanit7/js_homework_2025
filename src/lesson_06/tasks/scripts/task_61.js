if (confirm('Почати тестування?')) {
  const TARGET_SUM = 100
  let sum = parseFloat(prompt('Введіть суму', '20'))

  while (sum < TARGET_SUM) {
    sum += parseFloat(prompt('Скільки додати?', '70'))
  }

  document.write(
    `Число ${sum} більше або рівне за ${TARGET_SUM}, тож зупиняємо програму.`,
  )
}
