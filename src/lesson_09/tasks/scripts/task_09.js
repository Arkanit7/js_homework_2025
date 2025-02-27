const names = [
  'Іван',
  'Галина',
  'Богдан',
  'Світлана',
  'Тетяна',
  'Іван',
  'Анжела',
  'Петро',
  'Христина',
  'Іван',
  'Злата',
]
const firstNameLetters = names.map((name) => name[0])

document.write(`<p>Імена: ${names};`)
document.write(`<p>Ініціали: ${firstNameLetters}.`)
