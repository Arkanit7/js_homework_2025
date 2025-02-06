/*
## Алгоритм
ввести кількість котушок REELS
ввести кількість зображень SYMBOLS
ввести результат result = 0
ввести призові гроші prizeAmount = 0

повторювати REELS разів
  - згенерувати випадковий номер зображення pictureNumber від 1 до SYMBOLS
  - конкатенувати pictureNumber з результатом result
  - оголосити url зображення url
  - проаналізувати номер зображення pictureNumber
    * випадок 1 - url зображення 1
    * випадок 2 - url зображення 2
    * випадок 3 - url зображення 3
    * випадок 4 - url зображення 4
  - вивести зображення з url

проаналізувати result
  * випадок 111 - виграш 100 грн
  * випадок 222 - виграш 200 грн
  * випадок 333 - виграш 500 грн
  * випадок 444 - виграш 1000 грн

вивести скільки виграв гравець prizeAmount
*/

const REELS = 3
const SYMBOLS = 4
let result = ''
let prizeAmount = 0

for (let i = 0; i < REELS; i++) {
  const pictureNumber = 1 + Math.floor(Math.random() * SYMBOLS)
  result += pictureNumber
  let url = ''

  switch (pictureNumber) {
    case 1:
      url = './images/cherry_symbol.png'
      break
    case 2:
      url = './images/bell_symbol.png'
      break
    case 3:
      url = './images/diamond_symbol.png'
      break
    case 4:
      url = './images/clover_symbol.png'
      break
  }

  document.write(
    `<img src="${url}" style="display: inline" width="100" height="100">`,
  )
}

switch (result) {
  case '111':
    prizeAmount = 100
    break
  case '222':
    prizeAmount = 200
    break
  case '333':
    prizeAmount = 500
    break
  case '444':
    prizeAmount = 1000
    break
}

document.write(`<p>Призові гроші : ${prizeAmount}</p>`)
