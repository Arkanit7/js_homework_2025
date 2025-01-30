// Крок 0. Позначення величин
// drivingLicenseCategory - категорія водійського посвідчення : string

// Крок 1. Введення даних
const drivingLicenseCategory = prompt(
  'Введіть категорію водійського посвідчення. Доступні варіанти:\nA, B, C',
  'A',
).toUpperCase()

// Крок 2. Виконання операцій
// Продублюємо код для латинських та кириличних символів
switch (drivingLicenseCategory) {
  case 'A':
  case 'А':
    document.write('<p>Ви можете керувати мотоциклами.</p>')
    break
  case 'B':
  case 'В':
    document.write('<p>Ви можете керувати легковими автомобілями.</p>')
    break
  case 'C':
  case 'С':
    document.write('<p>Ви можете керувати вантажними автомобілями.</p>')
    break
  default:
    document.write('<p>Ви ввели невірну категорію водійського посвідчення!</p>')
    break
}
