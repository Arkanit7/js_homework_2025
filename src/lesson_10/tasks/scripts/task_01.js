const ARRAY_LENGTH = 10
const zeroFiledArray = new Array(ARRAY_LENGTH)
  .fill(1, 0, 1)
  .fill(0, 1, -1)
  .fill(1, -1)

document.write(zeroFiledArray.join(', '))
