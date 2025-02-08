for (let firstDigit = 1; firstDigit <= 9; firstDigit++) {
  document.write('<p>')

  for (let secondDigit = 0; secondDigit <= firstDigit; secondDigit++) {
    for (let thirdDigit = 0; thirdDigit <= firstDigit; thirdDigit++) {
      if (firstDigit < secondDigit + thirdDigit) break

      document.write(' ' + firstDigit + secondDigit + thirdDigit)
    }
  }
}
