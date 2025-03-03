function createOnesAndRemainderOf(length, remainder) {
  const resultingArray = []

  for (let i = 0, even = true; i < length; i++, even = !even) {
    resultingArray.push(even ? 1 : i % remainder)
  }

  return resultingArray
}

document.write(createOnesAndRemainderOf(14, 5).join(', '))
