const height = parseInt(prompt('Введіть висоту трикутника', '5'))

document.write('<pre class="u-text-center">')

for (let row = 1; row <= height; row++) {
  document.write(`${'^'.repeat(row)}\n`)
}

document.write('</pre>')
