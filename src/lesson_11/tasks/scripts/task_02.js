// # Задача. Дано інформацію про прибуток К магазинів протягом тижня. Знайти:
const storesProfitsByWeek = [
  //0    1    2    3    4    5    6
  [279, 948, 259, 978, 645, 459, 174], // 0
  [102, 144, 575, 249, 366, 504, 112], // 1
  [726, 409, 885, 694, 957, 24, 644], // 2
  [412, 33, 440, 690, 598, 444, 895], // 3
  [202, 290, 35, 782, 238, 264, 875], // 4
  [418, 876, 322, 388, 132, 885, 171], // 5
  [962, 870, 432, 213, 202, 110, 864], // 6
  [867, 740, 897, 26, 885, 144, 840], // 7
  [646, 795, 959, 285, 865, 869, 264], // 8
  [830, 76, 775, 598, 378, 725, 996], // 9
  [434, 817, 21, 676, 200, 603, 493], // 10
  [327, 394, 482, 177, 194, 589, 210], // 11
]

document.write('<p>Прибутки: ')
document.write(JSON.stringify(storesProfitsByWeek))
document.write('<ol>')

// 1. загальний прибуток кожного магазину за тиждень;
document.write('<li>Тижневий прибуток')

storesProfitsByWeek.forEach((storeProfits, storeIndex) => {
  const weeklyProfit = storeProfits.reduce((sum, dayProfit) => sum + dayProfit)

  document.write(`<p>Магазин №${storeIndex + 1}: $${weeklyProfit}.`)
})

// 2. загальний прибуток усіх магазинів по дням (загальний прибуток усіх магазинів за понеділок, за вівторок, і т.д.);
const ukDaysNames = [
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  "П'ятниця",
  'Субота',
  'Неділя',
]
const totalDaysProfit = new Array(7).fill(0)

storesProfitsByWeek.forEach((weekProfits) =>
  weekProfits.forEach(
    (dayProfit, dayIndex) => (totalDaysProfit[dayIndex] += dayProfit),
  ),
)

document.write('<li>По днях:')
totalDaysProfit.forEach((dayProfit, dayIndex) => {
  document.write(`<p>${ukDaysNames[dayIndex]}: $${dayProfit}.`)
})

// 3. загальний прибуток за робочі дні;
function calcProfitInDaysRange(profitsArray, fromDay, toDay) {
  let rangeProfit = 0

  profitsArray.forEach((week) => {
    for (let dayIndex = fromDay; dayIndex < toDay; dayIndex++)
      rangeProfit += week[dayIndex]
  })

  return rangeProfit
}

const weekdaysProfit = calcProfitInDaysRange(storesProfitsByWeek, 0, 5)

document.write(`<li>Будні дні: $${weekdaysProfit}`)

// 4. загальний прибуток за вихідні дні;
const weekendsProfit = calcProfitInDaysRange(storesProfitsByWeek, 5, 7)

document.write(`<li>Вихідні дні: $${weekendsProfit}`)

// 5. максимальний прибуток за середу;

const dayIndex = 2 // Wednesday
const maxWednesdayProfit = storesProfitsByWeek.reduce(
  (maxOnDay, week) => (week[dayIndex] > maxOnDay ? week[dayIndex] : maxOnDay),
  -Infinity,
)

document.write(`<li>Максимум за середу: $${maxWednesdayProfit}`)

// 6. сформувати загальний список (одновимірний масив) зі значенням, які що більші за 200;
const threshold = 200
const moreThan = storesProfitsByWeek
  .flat()
  .filter((dayProfit) => dayProfit > threshold)

document.write(`<li>Список > 200:<br>[${moreThan.join(', ')}]`)

// 7. відсортувати кожен тиждень за зростанням;
storesProfitsByWeek.forEach((week) => week.sort((dayA, dayB) => dayA - dayB))

document.write(
  `<li>Дні за зростанням: [${JSON.stringify(storesProfitsByWeek)}]`,
)

// 8. відсортувати тижні (рядки) за спаданням максимального елементи у цьому тижні (рядку), тобто при порівнянні рядків потрібно порівнювати максимальні елементи у кожному з цих рядків;
storesProfitsByWeek.sort(
  (weekA, weekB) => Math.max(...weekB) - Math.max(...weekA),
)

document.write(
  `<li>Тижні за максимальним днем: [${JSON.stringify(storesProfitsByWeek)}]`,
)

// 9. упорядкувати тижні (рядки) за спаданням суми елементів у рядку (тобто при порівнянні двох рядків треба знайти суму кожного з рядків і порівнювати ці суми, на основі цих сум буде зрозуміло, який з елементів повинен іти раніше).
storesProfitsByWeek.sort((weekA, weekB) => {
  const weekASum = weekA.reduce((sum, dayProfit) => sum + dayProfit)
  const weekBSum = weekB.reduce((sum, dayProfit) => sum + dayProfit)

  return weekBSum - weekASum
})

document.write(
  `<li>Тижні за максимальним прибутком: [${JSON.stringify(storesProfitsByWeek)}]`,
)
