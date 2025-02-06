/*
## Алгоритм
ввести кількість парних чисел evenAmount = 0
ввести кількість непарних чисел oddAmount = 0
ввести кількість повторень GENERATE_AMOUNT

повторювати GENERATE_AMOUNT разів
  - згенерувати випадкове число randomNumber від 1 до 1000 
  - якщо число randomNumber парне
    то
      - збільшити кількість парних чисел evenAmount
    інакше
      -збільшити кількість непарних чисел oddAmount

вивести evenAmount: кількість парних; та oddAmount: непарних чисел
*/

const GENERATE_AMOUNT = 100
const FROM_NUMBER = 1
const TO_NUMBER = 1000
let evenAmount = 0
let oddAmount = 0

for (let i = 0; i < GENERATE_AMOUNT; i++) {
  const randomNumber =
    FROM_NUMBER + Math.floor(Math.random() * (TO_NUMBER - FROM_NUMBER + 1))

  if (randomNumber % 2 === 0) evenAmount++
  else oddAmount++
}

document.write(`<p>Парних чисел : ${evenAmount}</p>`)
document.write(`<p>Непарних чисел : ${oddAmount}</p>`)
