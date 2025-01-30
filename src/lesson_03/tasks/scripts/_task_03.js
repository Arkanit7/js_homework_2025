// Крок 0. Позначення величин
// randomNumber - випадкове число : number
// const firstGuess - перше припущення : number
// const secondGuess - друге припущення : number

// Крок 1. Введення величин
const randomNumber = Math.floor(Math.random() * 5) + 1
const firstGuess = parseInt(
  prompt('Спроба №1.\nВведіть число від 1 до 5:', '1'),
)

// Крок 2. Обчислення
if (firstGuess === randomNumber) document.write('<p>Ви вгадали число!</p>')
else {
  const secondGuess = parseInt(
    prompt('Спроба №2.\nВведіть число від 1 до 5:', '1'),
  )

  if (secondGuess == randomNumber) document.write('<p>Ви вгадали число!</p>')
  else document.write(`<p>Ви не вгадали число ${randomNumber}!</p>`)
}
