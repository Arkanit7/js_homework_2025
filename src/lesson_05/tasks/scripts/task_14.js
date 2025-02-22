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
  let credit = 2000

  do {
    credit -= parseFloat(prompt(`Сплатіть ${credit}\nСкільки грошей дати?`, ''))
  } while (credit > 0)

  document.write('<p>Ви оплатили товар.')

  if (credit < 0) document.write(`<p>Ось ваша решта ${-credit}`)
}
