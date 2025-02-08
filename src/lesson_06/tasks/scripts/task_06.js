document.write('<pre>')

for (let branch = 1; branch <= 3; branch++) {
  for (let i = 1; i <= 5; i++) {
    document.write(`${'o'.repeat(i)}\n`)
  }
}

document.write('</pre>')
