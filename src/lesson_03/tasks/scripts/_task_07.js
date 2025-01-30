// Крок 0. Позначення величин
// monthNumber - номер місяця  : number
// seasonName - назва сезону  : string

// Крок 1. Введення даних
const monthNumber = parseInt(prompt('Введіть номер місяця (1-12): ', '12'))
let seasonName = ''

// Крок 2. Обчислення
switch (monthNumber) {
  case 12:
  case 1:
  case 2:
    seasonName = 'Зима'
    break
  case 3:
  case 4:
  case 5:
    seasonName = 'Весна'
    break
  case 6:
  case 7:
  case 8:
    seasonName = 'Літо'
    break
  case 9:
  case 10:
  case 11:
    seasonName = 'Осінь'
    break
  default:
    seasonName = 'невірний номер місяця'
    break
}

// seasonName = 'Зима'

// if (monthNumber < 1 || monthNumber > 12) seasonName = 'невірний номер місяця'
// else if (monthNumber < 3) seasonName = 'Зима'
// else if (monthNumber < 6) seasonName = 'Весна'
// else if (monthNumber < 9) seasonName = 'Літо'
// else if (monthNumber < 12) seasonName = 'Осінь'

// Крок 3. Виведення результату
document.write(`<p>Місяць за номером ${monthNumber} - це ${seasonName}.</p>`)
