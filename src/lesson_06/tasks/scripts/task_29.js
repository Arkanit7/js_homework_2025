const integer = parseInt(prompt('Введіть число', '27'))
let threeToPower = 1

for (let power = 1; threeToPower < integer; power++) {
  threeToPower = 3 ** power
}

if (threeToPower === integer)
  document.write(`Так, число ${integer} є степенем числа 3`)
else document.write(`Ні, число ${integer} не є степенем числа 3`)
