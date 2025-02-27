if (confirm('Почати тестування?')) {
  try {
    const userLength = parseInt(prompt('Довжина масиву:', '5'))
    const halfUserLength = Math.floor(userLength / 2)
    const filledArray = new Array(userLength)
      .fill(1, 0, halfUserLength)
      .fill(7, halfUserLength)

    document.write(filledArray)
  } catch (error) {
    console.log(error)
    document.write('На жаль, трапилася помилка.')
  }
}
