// Крок 0. Позначення величин
// firstChildName - ім'я першої дитини : string
// secondChildName - ім'я другої дитини : string
// firstChildCandies - кількість цукерок першої дитини : number
// secondChildCandies - кількість цукерок другої дитини : number

// Крок 1. Введення даних
const firstChildName = prompt("Введіть ім'я першої дитини", 'Перша')
const secondChildName = prompt("Введіть ім'я другої дитини", 'Друга')
const firstChildCandies = parseInt(
  prompt(`Скільки цукерок у ${firstChildName}?`, '15'),
)
const secondChildCandies = parseInt(
  prompt(`Скільки цукерок у ${secondChildName}?`, '25'),
)

// Крок 2. Обчислення
let whoHasTheMostCandies = ''

if (firstChildCandies > secondChildCandies)
  whoHasTheMostCandies = firstChildName
else if (firstChildCandies < secondChildCandies)
  whoHasTheMostCandies = secondChildName
else whoHasTheMostCandies = 'Кількість цукерок однакова'

// Тернарний оператор (складно читати)
// whoHasTheMostCandies =
//   firstChildCandies > secondChildCandies
//     ? firstChildName
//     : firstChildCandies < secondChildCandies
//       ? secondChildName
//       : 'Кількість цукерок однакова'

// Крок 3. Виведення результату
document.write(`<p>${whoHasTheMostCandies}</p>`)
