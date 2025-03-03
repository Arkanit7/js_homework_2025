function createRepeatedGroups(
  groupsAmount,
  groupLength,
  minNumber = 0,
  maxNumber = 99,
) {
  const tripletsArray = []

  for (let i = 0; i < groupsAmount; i++) {
    const element =
      minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

    tripletsArray.push(...Array(groupLength).fill(element))
  }

  return tripletsArray
}

document.write(createRepeatedGroups(5, 3).join(', '))
