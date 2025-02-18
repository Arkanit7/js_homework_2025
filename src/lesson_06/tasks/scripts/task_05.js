const TIMES = 12

for (let row = 1; row <= TIMES; row++) {
  for (let col = 1; col <= TIMES; col++) {
    if (row >= col) document.write(`&nbsp;`)
    else document.write(`o`)
  }

  document.write(`<br>`)
}
