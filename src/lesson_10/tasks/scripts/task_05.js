function createFactorArray(length, factor) {
  const resultingArray = []

  for (let i = 0; i < length; i++) resultingArray.push(i * factor)

  return resultingArray
}

document.write(createFactorArray(10, 2).join(', '))
