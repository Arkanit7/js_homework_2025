if (confirm('Почати тестування?')) {
  /**
   * Returns an array filled with random numbers
   *
   * @param {number} length
   * @param {number} [minNumber=1]
   * @param {number} [maxNumber=5]
   * @returns {number[]}
   */
  function getRandomNumbersArray(length, minNumber = 1, maxNumber = 5) {
    const gradesArray = []

    for (let i = 0; i < length; i++) {
      const grade =
        minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

      gradesArray.push(grade)
    }

    return gradesArray
  }

  /**
   * Simulates a game where the user selects cells to reveal prize amounts.
   * The user is prompted to choose a cell number to calculate prize amount.
   * The game continues until the user cancels the prompt.
   * The total prize amount is accumulated and returned at the end of the game.
   *
   * @param {number[]} prizeMoneyList An array of prize amounts.
   * @returns {number} The total prize amount accumulated by the user.
   */
  function playPrizeGame(prizeMoneyList) {
    const size = prizeMoneyList.length
    let prizeAmount = 0

    alert(
      'Вітаємо у грі! Вибирайте номери елементів, щоб дізнатися свій виграш.',
    )

    while (true) {
      const userChoice = prompt(
        `Котру комірку відчинити? (1-${size})\nЩоб вийти з гри та переглянути виграш, натисніть "Cancel".`,
        '5',
      )

      if (userChoice === null) break

      const parsedUserChoice = parseInt(userChoice) - 1

      if (
        !isFinite(parsedUserChoice) ||
        parsedUserChoice < 0 ||
        parsedUserChoice >= size
      )
        throw new Error("Invalid user's input.")

      alert('Виграш перераховано!')
      prizeAmount += prizeMoneyList[parsedUserChoice]
    }

    return prizeAmount
  }

  try {
    const prizeMoneyList = getRandomNumbersArray(10, -500, 500)
    const prizeAmount = playPrizeGame(prizeMoneyList)

    if (prizeAmount <= 0) document.write('На жаль, ви нічого не виграли.')
    else document.write(`Ваш виграш: ${prizeAmount} грн.!`)
  } catch (error) {
    console.log(error)
    document.write('На жаль, трапилася помилка!')
  }
}
