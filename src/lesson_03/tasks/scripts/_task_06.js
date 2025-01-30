// Крок 0. Позначення величин
// dayNumber - номер дня тижня  : number
// dayName - назва дня тижня  : string

// Крок 1. Введення даних
const dayNumber = parseInt(prompt('Введіть номер дня тижня (1-7): ', '7'))
let dayName = ''

// Крок 2. Обчислення
switch (dayNumber) {
  case 1:
    dayName = 'Понеділок'
    break
  case 2:
    dayName = 'Вівторок'
    break
  case 3:
    dayName = 'Середа'
    break
  case 4:
    dayName = 'Четвер'
    break
  case 5:
    dayName = "П'ятниця"
    break
  case 6:
    dayName = 'Субота'
    break
  case 7:
    dayName = 'Неділя'
    break

  default:
    dayName = 'невірний номер дня'
    break
}

// Крок 3. Виведення результату
document.writeln(`<p>День тижня за номером ${dayNumber} - це ${dayName}.</p>`)
