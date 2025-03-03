function createArrayWithMoreOnes(length) {
  let zeroesThreshold

  // Set the threshold to ensure that zeros take up less than half of the array
  if (length % 2) zeroesThreshold = Math.floor(length / 2)
  else zeroesThreshold = length / 2 - 1

  let zeroesCount = 0
  const array = []

  while (length--) {
    let randomNumber

    if (zeroesCount < zeroesThreshold) {
      randomNumber = Math.floor(Math.random() * 2)

      if (randomNumber === 0) zeroesCount++
    } else randomNumber = 1

    array.push(randomNumber)
  }

  return array
}

document.write(createArrayWithMoreOnes(14).join(', '))
