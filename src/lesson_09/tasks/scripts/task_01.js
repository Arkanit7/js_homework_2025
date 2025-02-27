if (confirm('Почати тестування?')) {
  try {
    const userLength = parseInt(prompt('Довжина масиву:', '5'))
    const zeroFilledArray = new Array(userLength).fill(0)

    document.write(zeroFilledArray)
  } catch (error) {
    console.log(error)
    document.write('На жаль, трапилася помилка.')
  }
}
