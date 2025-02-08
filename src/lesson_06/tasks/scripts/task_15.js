// Великі літери
for (
  let charCode = 'A'.charCodeAt(0);
  charCode <= 'Z'.charCodeAt(0);
  charCode++
) {
  let precedingChar = String.fromCharCode(charCode - 1)
  const currentChar = String.fromCharCode(charCode)
  let followingChar = String.fromCharCode(charCode + 1)

  // Якщо це крайній символ, то замінюємо його літерою
  if (charCode - 1 < 'A'.charCodeAt(0)) precedingChar = 'Z'
  if (charCode + 1 > 'Z'.charCodeAt(0)) followingChar = 'A'

  document.write(
    ' ' + precedingChar + '<b>' + currentChar + '</b>' + followingChar,
  )
}

document.write('<br>')

// Малі літери
for (
  let charCode = 'a'.charCodeAt(0);
  charCode <= 'z'.charCodeAt(0);
  charCode++
) {
  let precedingChar = String.fromCharCode(charCode - 1)
  const currentChar = String.fromCharCode(charCode)
  let followingChar = String.fromCharCode(charCode + 1)

  // Якщо це крайній символ, то замінюємо його літерою
  if (charCode - 1 < 'a'.charCodeAt(0)) precedingChar = 'z'
  if (charCode + 1 > 'z'.charCodeAt(0)) followingChar = 'a'

  document.write(
    ' ' + precedingChar + '<b>' + currentChar + '</b>' + followingChar,
  )
}
