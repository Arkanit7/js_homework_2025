if (confirm('Почати тестування?')) {
  try {
    const userLength = parseInt(prompt('Довжина масиву:', '5'))
    const filledArray = new Array(userLength).fill(1, 0, 5).fill(7, 5)

    document.write(filledArray)
  } catch (error) {
    console.log(error)
    document.write('На жаль, трапилася помилка.')
  }
}
