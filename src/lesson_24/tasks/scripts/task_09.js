'use strict'

const mathClub = [
  'Іваненко',
  'Петренко',
  'Коваль',
  'Сидоренко',
  'Мельник',
  'Шевченко',
]

const historyClub = [
  'Шевченко',
  'Ткаченко',
  'Петренко',
  'Коваленко',
  'Мороз',
  'Литвин',
]

const physicsClub = [
  'Іваненко',
  'Литвин',
  'Гончар',
  'Коваль',
  'Мороз',
  'Ткаченко',
  'Шевченко',
]

const mathClubSet = new Set(mathClub)
const historyClubSet = new Set(historyClub)
const physicsClubSet = new Set(physicsClub)

// =============================================================================

console.log('Математики:', mathClub)
console.log('Історики:', historyClub)
console.log('Фізики:', physicsClub)

// Підрахувати скільки студентів з гуртка з історії також відвідують гурток з математики
//? A∩B
console.log(
  'Студенти, які відвідують гуртки історії та математики',
  mathClubSet.intersection(historyClubSet).size,
)

// Також підрахувати скільки всього студентів відвідують хоча б один гурток
//? A∪B
const allStudentsSet = mathClubSet.union(historyClubSet)
console.log('Усі студенти', allStudentsSet.size)

//## Додатково
console.log('%cДодатково', 'font-size: 1.25rem;')
// Підрахувати скільки студентів відвідують усі три гуртки
//? A∩B∩C
const studentsVisitAllWorkshops = mathClubSet
  .intersection(historyClubSet)
  .intersection(physicsClubSet)
console.log('Відвідують усі три гуртки', studentsVisitAllWorkshops.size)

// Підрахувати скільки студентів відвідують лише історію та фізику, але не математику
//? B∩C\A
const historyAndPhysicsStudentsSize = historyClubSet
  .intersection(physicsClubSet)
  .difference(mathClubSet).size
console.log(
  'Студенти, які відвідують гуртки історії та фізики, але не математики',
  historyAndPhysicsStudentsSize,
)

// Підрахувати скільки студентів відвідують лише математику
//? A\B\C
const onlyMathSet = mathClubSet
  .difference(historyClubSet)
  .difference(physicsClubSet)
console.log('Лише математику', onlyMathSet.size)

// Підрахувати скільки студентів відвідують лише історію
//? B\A\C
const onlyHistorySet = historyClubSet
  .difference(mathClubSet)
  .difference(physicsClubSet)
console.log('Лише історію', onlyHistorySet.size)

// Підрахувати скільки студентів відвідують лише фізику
//? C\A\B
const onlyPhysicsSet = physicsClubSet
  .difference(mathClubSet)
  .difference(historyClubSet)
console.log('Лише фізику', onlyPhysicsSet.size)

// Підрахувати скільки студентів відвідують лише один гурток
//? (A\B\C)∪(B\A\C)∪(C\A\B)
const onlyOneSet = onlyMathSet.union(onlyHistorySet).union(onlyPhysicsSet)
console.log('Лише 1 гурток', onlyOneSet.size)

// Визначити чи хтось з математики або історії відвідує історію або математику, відповідно.
//? A∩B≠∅
console.log(
  'Чи хтось з математики або історії відвідує історію або математику, відповідно',
  !mathClubSet.isDisjointFrom(historyClubSet),
)
