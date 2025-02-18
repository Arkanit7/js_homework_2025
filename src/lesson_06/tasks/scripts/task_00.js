const START_CHAR = 'A'
const SIZE = 5
const startCharCode = START_CHAR.charCodeAt(0)

for (let row = 0; row < SIZE; row++) {
  for (
    let charCode = startCharCode + row;
    charCode < startCharCode + row + SIZE;
    charCode++
  ) {
    const character = String.fromCharCode(charCode)

    document.write(character + ' ')
  }
  document.write('<br>')
}
