if (confirm('Почати тестування?')) {
  /**
   * Returns an array filed with random numbers
   *
   * @param {number} length
   * @param {number} [minNumber=1]
   * @param {number} [maxNumber=5]
   * @returns {number[]}
   */
  function getRandomNumbersArray(length, minNumber = 1, maxNumber = 5) {
    const randomNumbersArray = []

    for (let i = 0; i < length; i++) {
      const randomNumber =
        minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

      randomNumbersArray.push(randomNumber)
    }

    return randomNumbersArray
  }

  /**
   * @param {number[]} gradesArray
   * @returns {number}
   */
  function getAverage(gradesArray) {
    let sum = 0

    for (let i = 0; i < gradesArray.length; i++) {
      sum += gradesArray[i]
    }

    return sum / gradesArray.length
  }

  /**
   * Evaluate grades (1-5)
   *
   * @param {number[]} gradesArray
   * @returns {string}
   * @throws Will throw an error if a grade is not valid.
   */
  function getLearnerType(gradesArray) {
    let minGrade = Infinity

    for (let i = 0; i < gradesArray.length; i++) {
      minGrade = Math.min(minGrade, gradesArray[i])
    }

    let learnerType

    switch (minGrade) {
      case 1:
      case 2:
        learnerType = 'двієчник'
        break
      case 3:
        learnerType = 'трієчник'
        break
      case 4:
        learnerType = 'четвірочник'
        break
      case 5:
        learnerType = 'відмінник'
        break
      default:
        throw new Error('Wrong grade.')
    }

    return learnerType
  }

  try {
    const subjectsAmount = parseInt(prompt('Кількість предметів:', '3'))

    if (!isFinite(subjectsAmount) || subjectsAmount < 1)
      throw new Error('Subject amount must be a natural number')

    const learnerGrades = getRandomNumbersArray(subjectsAmount, 1, 5)
    const average = getAverage(learnerGrades)
    const learnerType = getLearnerType(learnerGrades)

    document.write(`<p>Кількість предметів: ${subjectsAmount}.`)
    document.write(`<p>Оцінки: ${learnerGrades}.`)
    document.write(`<p>Середнє значення: ${average.toFixed(1)}.`)
    document.write(`<p>Учень ${learnerType}.`)
  } catch (error) {
    console.log(error)
    document.write('На жаль, трапилася помилка!')
  }
}
