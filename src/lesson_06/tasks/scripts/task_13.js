for (let firstDigit = 1; firstDigit <= 9; firstDigit++) {
  document.write('<p>')

  for (let secondDigit = 0; secondDigit <= firstDigit; secondDigit++) {
    document.write(' ' + firstDigit + secondDigit)
  }
}
