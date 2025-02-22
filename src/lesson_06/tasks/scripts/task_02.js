const TIMES = 7

document.write('<pre>')

for (let row = 1; row <= TIMES; row++) {
  for (let col = 1; col <= row; col++) {
    document.write('o')
  }

  document.write('\n')
}

document.write('</pre>')
