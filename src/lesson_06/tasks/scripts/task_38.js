const START_NUMBER = 35
const END_NUMBER = 87

for (let number = START_NUMBER; number <= END_NUMBER; number++) {
  switch (number % 7) {
    case 1:
    case 2:
    case 5:
      document.write(number + ' ')
  }
}
