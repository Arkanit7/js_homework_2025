// За умовою (лічильник циклу від 1 до 10)
for (let amount = 1; amount <= 10; amount++) {
  document.write(`<p>${amount} сажень - це ${(amount * 2.1366).toFixed(2)} м`)
  document.write(`<p>${amount} дюйм - це ${(amount * 2.5).toFixed(2)} см`)
  document.write(`<p>${amount} фут - це ${(amount * 0.3048).toFixed(2)} м`)
  document.write(`<p>${amount} драхм - це ${(amount * 3.7325).toFixed(2)} г`)
  document.write(`<p>${amount} унція - це ${(amount * 29.86).toFixed(2)} г`)
  document.write(`<p>${amount} фунт - це ${(amount * 0.40951).toFixed(2)} кг`)
  document.write(`<p>${amount} аршин - це ${(amount * 0.7112).toFixed(2)} м`)
  document.write(`<p>${amount} золотник - це ${(amount * 4.2657).toFixed(2)} г`)
  document.write(`<p>${amount} дюйм - це ${(amount * 25.3995).toFixed(2)} мм`)
  document.write('<hr>')
}
