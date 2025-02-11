if (confirm('Почати тестування?')) {
  const MAX_NUMBER = 123
  alert(`Загадайте число від 1 до ${MAX_NUMBER}. Загадали?`)
  let maxNumber = MAX_NUMBER
  let minNumber = 1

  while (maxNumber !== minNumber) {
    const middle = Math.floor((maxNumber + minNumber) / 2)
    const isBigger = confirm(`Ваше число більше за ${middle}?`)

    if (isBigger) minNumber = middle + 1
    else maxNumber = middle
  }

  document.write(`Ваше число - це ${minNumber}!`)
}
