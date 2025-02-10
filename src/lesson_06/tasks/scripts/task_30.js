const BOOK_AMOUNT = 5
let factorial = 1

for (let number = BOOK_AMOUNT; number > 1; number--) {
  factorial *= number
}

document.write(
  `Є ${factorial} різних способів розмістити ${BOOK_AMOUNT}  книг різних авторів на полиці.`,
)
