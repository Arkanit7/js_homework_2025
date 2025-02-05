/*
## Алгоритм
ввести суму до оплати CREDIT
ввести оплачені кошти debit
доки CREDIT > DEBIT
  - повідомити скільки ще коштів сплатити
  - ввести скільки користувач хоче сплатити userDeposit
  - збільшити debit на userDeposit

вивести загальну суму
якщо клієнт переплатив
  то
    - вивести решту
*/

if (confirm('Почати тестування?')) {
  const CREDIT = 29
  let debit = 0

  while (CREDIT > debit) {
    const userDeposit = parseFloat(
      prompt(`До сплати ${CREDIT - debit}\nСкільки грошей дати?`, '9'),
    )
    debit += userDeposit
  }

  document.write(`Ви сплатили ${CREDIT} за товари!`)

  if (debit > CREDIT) document.write(` Ось ваша решта: ${debit - CREDIT}.`)
}
