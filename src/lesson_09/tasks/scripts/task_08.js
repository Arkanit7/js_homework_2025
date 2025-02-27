const carPlates = [
  'A123BC',
  'B456AB',
  'C789CA',
  'A555AA',
  'X1X',
  'AA999AB',
  'M1234M',
  'A77A',
]
const carPlatesStartsWithA = carPlates.filter((plate) => plate[0] === 'A')

document.write(`<p>Номерні знаки: ${carPlates};`)
document.write(`<p>Номерні знаки у яких перша "A": ${carPlatesStartsWithA}.`)
