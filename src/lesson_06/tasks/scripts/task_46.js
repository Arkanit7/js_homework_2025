for (
  let firstCoupleOfDigits = 10;
  firstCoupleOfDigits <= 99;
  firstCoupleOfDigits++
) {
  for (
    let lastCoupleOfDigits = 10;
    lastCoupleOfDigits <= 99;
    lastCoupleOfDigits++
  ) {
    const gluedNumber = Number('' + firstCoupleOfDigits + lastCoupleOfDigits)

    if (gluedNumber % (firstCoupleOfDigits * lastCoupleOfDigits) === 0)
      document.write(`<p>` + gluedNumber)
  }
}
