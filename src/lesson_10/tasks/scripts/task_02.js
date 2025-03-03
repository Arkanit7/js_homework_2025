const ARRAY_LENGTH = 10
const zeroOneArray = []

for (let i = 0, isZero = true; i < ARRAY_LENGTH; i++, isZero = !isZero)
  zeroOneArray.push(isZero ? 0 : 1)

document.write(zeroOneArray.join(', '))
