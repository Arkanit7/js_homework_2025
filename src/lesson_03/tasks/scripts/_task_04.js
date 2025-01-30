// Крок 0. Позначення величин
// humanAge - вік людини : number
// kindergartenAge - вік для садочка : number
// schoolAge - вік для школи : number
// collegeAge - вік для ВНЗ : number
// workAge - вік для роботи : number
// retirementAge - пенсійний вік : number
// whoHeSheIs - хто ця людина : string

// Крок 1. Введення величин
const humanAge = parseInt(prompt('Введіть вік людини: ', '65'))
const kindergartenAge = 2
const schoolAge = 5
const collegeAge = 15
const workAge = 19
const retirementAge = 65
let whoHeSheIs = 'пенсіонер'

// Крок 2. Обчислення
if (humanAge < kindergartenAge) whoHeSheIs = 'немовля'
else if (humanAge < schoolAge) whoHeSheIs = 'дитина у садочку'
else if (humanAge < collegeAge) whoHeSheIs = 'школяр'
else if (humanAge < workAge) whoHeSheIs = 'студент'
else if (humanAge < retirementAge) whoHeSheIs = 'працівник'

// Крок 3. Виведення результату
document.write(`Це - ${whoHeSheIs}.`)
