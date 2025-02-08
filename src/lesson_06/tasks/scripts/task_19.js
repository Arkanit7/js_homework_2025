if (confirm('Почати тестування?')) {
  const startNum = parseInt(prompt('Введіть початкове число', '2'))
  const endNum = parseInt(prompt('Введіть кінцеве число', '10'))
  let oddNumbersSum = 0

  for (
    let number = startNum + 1 - Math.abs(startNum % 2);
    number <= endNum;
    number += 2
  )
    oddNumbersSum += number

  document.write(
    `Для діапазону [${startNum}, ${endNum}] сума всіх непарних чисел = ${oddNumbersSum}.`,
  )
}
