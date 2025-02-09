const integer = parseInt(prompt('Введіть число', '27'))
let isPower = false

for (let i = 0; i <= integer; i++) {
  if (3 ** i === integer) {
    isPower = true
    break
  }
}

if (isPower) document.write(`Так, число ${integer} є степенем числа 3`)
else document.write(`Ні, число ${integer} не є степенем числа 3`)
