function createPowerIndexes(length, power) {
  const squareIndexes = []

  for (let i = 0; i < length; i++) squareIndexes.push(i ** power)

  return squareIndexes
}

document.write(createPowerIndexes(14, 2).join(', '))
