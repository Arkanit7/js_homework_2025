function createArithmeticProgression(length, firstElement, difference) {
  const arithmeticProgression = []

  for (let i = 0; i < length; i++)
    arithmeticProgression.push(firstElement + i * difference)

  return arithmeticProgression
}

document.write(createArithmeticProgression(14, 7, 4).join(', '))
