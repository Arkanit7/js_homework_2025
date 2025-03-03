function createArrayPositiveEqualNegative(length, minNumber, maxNumber) {
  const array = []
  let positiveCount = 0,
    negativeCount = 0,
    neutralCount = 0

  for (let counter = 0; counter < length; ) {
    // calc threshold for negative & positive numbers
    const threshold = Math.floor((length - neutralCount) / 2)

    let randomNumber =
      minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

    // handle edge cases
    if (positiveCount === threshold && negativeCount === threshold)
      randomNumber = 0
    else if (positiveCount === threshold) randomNumber = -Math.abs(randomNumber)
    else if (negativeCount === threshold) randomNumber = Math.abs(randomNumber)

    if (randomNumber > 0) positiveCount++
    else if (randomNumber < 0) negativeCount++
    // check if adding one more zero will break the task
    else if (Math.max(positiveCount, negativeCount) * 2 + neutralCount < length)
      neutralCount++
    else continue

    array.push(randomNumber)
    counter++
  }

  return array
}

document.write(createArrayPositiveEqualNegative(15, -9, 9).join(', '))
