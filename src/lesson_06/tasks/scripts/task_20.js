const height = parseInt(prompt('Введіть висоту трикутника', '5'))

document.write('<pre class="u-text-center">')

for (let i = 1; i <= height; i++) {
  document.write(`${'^'.repeat(i)}\n`)
}

document.write('</pre>')
