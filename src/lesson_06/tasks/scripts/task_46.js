for (let i = 10; i <= 99; i++) {
  for (let j = 10; j <= 99; j++) {
    const gluedNumber = Number('' + i + j)

    if (gluedNumber % (i * j) === 0) document.write(`<p>` + gluedNumber)
  }
}
