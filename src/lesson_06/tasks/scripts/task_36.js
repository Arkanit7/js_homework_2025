if (confirm('Почати тестування?')) {
  for (let couple = 1; couple <= 10; couple++) {
    const biggestNumber = Math.max(
      parseFloat(prompt(`Перше число з пари №${couple}`, '')),
      parseFloat(prompt(`Друге число з пари №${couple}`, '')),
    )
    document.write(`${biggestNumber} `)
  }
}
