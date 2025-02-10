const integer = parseInt(prompt('Введіть ціле число, більше одиниці', '22'))

const desiredNumber = Math.floor(integer / 3) + 1

document.write(`<p>K = ${desiredNumber}; N = ${integer};`)
document.write(`<p>3 * ${desiredNumber} > ${integer}`)
