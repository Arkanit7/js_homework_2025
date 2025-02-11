const COUPLES_AMOUNT = 10

if (confirm('Почати тестування?')) {
  for (let couple = 1; couple <= COUPLES_AMOUNT; couple++) {
    const biggestNumber = Math.max(
      parseFloat(prompt(`Перше число з пари №${couple}`, '')),
      parseFloat(prompt(`Друге число з пари №${couple}`, '')),
    )

    document.write(`${biggestNumber} `)
  }
}
