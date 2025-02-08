const DEPOSIT = 18000
const INTEREST = 0.2
const TERM = 20
let totalMoney = DEPOSIT

for (let year = 1; year <= TERM; year++) {
  totalMoney *= 1 + INTEREST
}

document.write(
  `<b>Складні відсотки</b>: Вклавши ${DEPOSIT} грн., за ${TERM} років, під ${(INTEREST * 100).toFixed(2)}% річних, загалом ви отримаєте: ${totalMoney.toFixed(2)} грн.`,
)
