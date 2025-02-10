for (let number = 100; number <= 9999; number++) {
  // розбити число на цифри
  const lastDigit = number % 10
  const secondToLastDigit = Math.floor(number / 10) % 10
  const thirdToLastDigit = Math.floor(number / 100) % 10
  const forthToLastDigit = Math.floor(number / 1000)

  // якщо число чотирьохцифрове, піднімати до 4-го степеня
  const power = forthToLastDigit ? 4 : 3

  if (
    lastDigit ** power +
      secondToLastDigit ** power +
      thirdToLastDigit ** power +
      forthToLastDigit ** power ===
    number
  )
    document.write(`<p>${number}`)
}
