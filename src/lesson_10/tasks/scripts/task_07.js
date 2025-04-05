// ## Option 1

function createFibArray(length) {
  const fibArray = Array.from({length})

  fibArray.forEach(
    (_, i, arr) => (arr[i] = i < 2 ? 1 : arr[i - 1] + arr[i - 2]),
  )

  return fibArray
}

document.write(createFibArray(14).join(', '))

// ## Option 2
// Creates Fibonacci sequence array by the given length
// const ARRAY_LENGTH = 15
// const fibArray = []

// for (let i = 0; i < ARRAY_LENGTH; i++) {
//   const fibNumber = i < 2 ? 1 : fibArray[i - 1] + fibArray[i - 2]

//   fibArray.push(fibNumber)
// }

// document.write(fibArray.join(', '))
