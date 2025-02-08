const integer = parseInt(prompt('Введіть число', '67'))

document.write(`<p>Ваше число: ${integer}<p>`)

for (let number = 1; number ** 2 <= integer; number++) {
  document.write(`${number} `)
}
