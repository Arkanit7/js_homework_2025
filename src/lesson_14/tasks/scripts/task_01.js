/**
 * @typedef {Object} Sponsor
 * @property {string} lastName
 * @property {string} firstName
 * @property {number} investment
 */

/**
 * @typedef {Object} Website
 * @property {string} companyName
 * @property {string} owner
 * @property {Sponsor[]} sponsors
 * @property {number} releaseYear
 * @property {number} cost
 */

/**
 * @type {Website[]}
 */
const websitesList = [
  {
    companyName: 'ВебПростір',
    owner: 'Іван Петренко',
    sponsors: [
      { lastName: 'Сидоренко', firstName: 'Олена', investment: 50000 },
      { lastName: 'Коваленко', firstName: 'Андрій', investment: 75000 },
    ],
    releaseYear: 2005,
    cost: 120000,
  },
  {
    companyName: 'ІнтернетРішення',
    owner: 'Марія Іванова',
    sponsors: [
      { lastName: 'Павленко', firstName: 'Сергій', investment: 120000 },
    ],
    releaseYear: 2010,
    cost: 90000,
  },
  {
    companyName: 'ЦифроваЕра',
    owner: 'Олег Шевченко',
    sponsors: [
      { lastName: 'Лисенко', firstName: 'Наталія', investment: 60000 },
      { lastName: 'Мельник', firstName: 'Віктор', investment: 80000 },
    ],
    releaseYear: 2008,
    cost: 80000,
  },
  {
    companyName: 'ГлобалМережа',
    owner: 'Анна Бондаренко',
    sponsors: [{ lastName: 'Ткаченко', firstName: 'Юрій', investment: 150000 }],
    releaseYear: 2012,
    cost: 180000,
  },
  {
    companyName: 'ОнлайнСвіт',
    owner: 'Дмитро Кравченко',
    sponsors: [
      { lastName: 'Гончаренко', firstName: 'Ірина', investment: 90000 },
      { lastName: 'Романенко', firstName: 'Артем', investment: 110000 },
    ],
    releaseYear: 2003,
    cost: 9000,
  },
  {
    companyName: 'МережевіТехнології',
    owner: 'Юлія Семененко',
    sponsors: [{ lastName: 'Федоров', firstName: 'Максим', investment: 100 }],
    releaseYear: 2005,
    cost: 300,
  },
  {
    companyName: 'ВебМайстри',
    owner: 'Андрій Петров',
    sponsors: [
      { lastName: 'Васильєв', firstName: 'Олександр', investment: 130000 },
      { lastName: 'Соколова', firstName: 'Тетяна', investment: 85000 },
    ],
    releaseYear: 2007,
    cost: 180000,
  },
  {
    companyName: 'ІнтернетПроекти',
    owner: 'Катерина Коваль',
    sponsors: [{ lastName: 'Зайцев', firstName: 'Микола', investment: 1500 }],
    releaseYear: 2008,
    cost: 7500,
  },
  {
    companyName: 'ДіджиталСтудія',
    owner: 'Віталій Сидоров',
    sponsors: [
      { lastName: 'Кузнєцов', firstName: 'Ольга', investment: 105000 },
    ],
    releaseYear: 2011,
    cost: 13000,
  },
  {
    companyName: 'СайтБудівники',
    owner: 'Наталія Попова',
    sponsors: [{ lastName: 'Лебедєв', firstName: 'Павло', investment: 115000 }],
    releaseYear: 2008,
    cost: 85000,
  },
]

// =============================================================================

// ## Знайти:

// 1. загальну вартість усіх сайтів
const totalCost = websitesList.reduce(
  (totalCost, { cost }) => totalCost + cost,
  0,
)

console.log('Загальна вартість:', totalCost)

// 2. кількість сайтів, що було зроблено між 2000 та 2009 рр.
const websitesCountInYearsRange = websitesList.reduce(
  (count, { releaseYear }) =>
    releaseYear >= 2000 && releaseYear <= 2009 ? count + 1 : count,
  0,
)

console.log(
  'Кількість сайтів, що було зроблено між 2000 та 2009 рр.:',
  websitesCountInYearsRange,
)

// 3. кількість сайтів, де сума спонсорських вкладень була більшою за 100000
// Option 1
// const sponsorPreferredWebsitesCount = websitesList
//   .map(({ sponsors }) =>
//     sponsors.reduce((sum, { investment }) => sum + investment, 0),
//   )
//   .reduce((count, spending) => (spending > 1e5 ? count + 1 : count), 0)

// Option 2
const sponsorPreferredWebsitesCount = websitesList.reduce(
  (count, { sponsors }) =>
    sponsors.reduce((sum, { investment }) => sum + investment, 0) > 1e5
      ? count + 1
      : count,
  0,
)

console.log(
  'Кількість сайтів, де сума спонсорських вкладень була більшою за 100000:',
  sponsorPreferredWebsitesCount,
)

// 4. створити загальний список усіх спонсорів (поки можуть повторюватись, просто зібрати усі у масив)
const allSponsors = websitesList.flatMap(({ sponsors }) => sponsors)
// .map(({ firstName, lastName }) => ({ firstName, lastName }))

console.groupCollapsed('Загальний список усіх спонсорів:')
console.table(allSponsors)
console.groupEnd()

// 5. знайти рік, коли прибуток був найбільшим
const profitsByYear = websitesList.reduce(
  (/** @type {Record<number, number>} */ profits, { releaseYear, cost }) => {
    if (releaseYear in profits) profits[releaseYear] += cost
    else profits[releaseYear] = cost

    return profits
  },
  {},
)

// ---
/**
 * @param {Record<number, number>} profitsByYear
 * @returns {number}
 */
function getMaxYearlyProfit(profitsByYear) {
  let maxYearlyProfit = 0

  for (const year in profitsByYear) {
    if (profitsByYear[year] > maxYearlyProfit)
      maxYearlyProfit = profitsByYear[year]
  }

  return maxYearlyProfit
}

/**
 * @param {Record<number, number>} profitsByYear
 * @returns {string[]}
 */
function getTheMostProfitableYears(profitsByYear) {
  const maxYearlyProfit = getMaxYearlyProfit(profitsByYear)
  const theMostProfitableYears = []

  for (const year in profitsByYear) {
    if (profitsByYear[year] === maxYearlyProfit)
      theMostProfitableYears.push(year)
  }

  return theMostProfitableYears
}

const theMostProfitableYears = getTheMostProfitableYears(profitsByYear)

console.log('Роки, коли прибуток був найбільшим:', theMostProfitableYears)

// 6. упорядкувати список за спаданням прибутку
websitesList.sort(({ cost: costA }, { cost: costB }) => costB - costA)

console.groupCollapsed('Список за спаданням прибутку:')
console.table(websitesList)
console.groupEnd()

// 7. Створити 2 окремих списки з копіями об'єктів, що містять сайти з вартість до 10000 і більше 10000
// Option 1
// const inexpensiveWebsites = websitesList.filter(({ cost }) => cost < 1e4)
// const expensiveWebsites = websitesList.filter(({ cost }) => cost >= 1e4)

// Option 2
/** @type {Website[]} */
const inexpensiveWebsites = []
/** @type {Website[]} */
const expensiveWebsites = []

for (const website of websitesList) {
  website.cost < 1e4
    ? inexpensiveWebsites.push(website)
    : expensiveWebsites.push(website)
}

console.groupCollapsed('Сайти, вартість до 10000:')
console.table(inexpensiveWebsites)
console.groupEnd()

console.groupCollapsed('Сайти, вартість від 10000:')
console.table(expensiveWebsites)
console.groupEnd()
