const DAILY_INCREASE = 0.1
let distance = 0
let milestoneOne = 0,
  milestoneTwo = 0

for (
  let day = 1, dailyRange = 10;
  day <= 7;
  day++, dailyRange *= 1 + DAILY_INCREASE
) {
  distance += dailyRange

  if (!milestoneOne && distance >= 20) milestoneOne = day
  if (!milestoneTwo && distance >= 60) milestoneTwo = day
}

document.write(`<p>Спортсмен пробіг ${distance.toFixed(2)} км. за 7 діб.`)
document.write(`<p>20 км. було подолано на ${milestoneOne} день`)
document.write(`<p>60 км. було подолано на ${milestoneTwo} день`)
