document.write('<pre>')

for (let row = 1; row <= 6; row++) {
  document.write(`${row} `)
  for (let col = 1; col <= row ** 2; col++) {
    document.write(`${col} `)
  }
  document.write('\n')
}

document.write('</pre>')
