const DEPOSIT = 18000
const INTEREST = 0.2
const TERM = 20

const SECOND_INTEREST = 0.27
const SECOND_TERM = 17

let totalMoney = DEPOSIT

for (let year = 1; year <= TERM; year++) {
  totalMoney *= 1 + INTEREST
}

for (let year = 1; year <= SECOND_TERM; year++) {
  totalMoney *= 1 + SECOND_INTEREST
}

document.write(
  `<b>Складні відсотки</b>: Вклавши ${DEPOSIT} грн., за ${TERM} років, під ${(INTEREST * 100).toFixed(2)}% річних, а опісля ще на ${SECOND_TERM} років, під ${(SECOND_INTEREST * 100).toFixed(2)}% річних загалом ви отримаєте: ${totalMoney.toFixed(2)} грн.`,
)
