function createPrimeNumbersList(length) {
  const primeNumbers = []

  for (let integer = 2; primeNumbers.length < length; integer++) {
    if (primeNumbers.every((prime) => integer % prime))
      primeNumbers.push(integer)
  }

  return primeNumbers
}

document.write(createPrimeNumbersList(14).join(', '))
