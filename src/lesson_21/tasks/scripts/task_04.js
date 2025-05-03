'use strict'

class NamedError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class NotFiniteError extends NamedError {
  constructor(number) {
    super(`The value "${number}" isn't a valid number.`)
  }
}

class NotValidMonthError extends NamedError {
  constructor() {
    super('A month must be in between 1 and 12.')
  }
}

class NotValidGradeError extends NamedError {
  constructor() {
    super('A grade must be from 1 to 100.')
  }
}

class HolidaysError extends NamedError {
  constructor() {
    super("It's a holidays season.")
  }
}

class ValidationError extends NamedError {
  constructor(name, cause) {
    super(name)
    this.cause = cause
  }
}

function isHolidaysMonth(month) {
  let answer

  switch (month) {
    case 6:
    case 7:
    case 8:
      answer = true
      break
    default:
      answer = false
      break
  }

  return answer
}

function validateGrade(grade) {
  try {
    if (!isFinite(grade)) throw new NotFiniteError(grade)
    if (grade < 1 || grade > 100) throw new NotValidGradeError()
  } catch (error) {
    if (error instanceof NotValidGradeError || error instanceof NotFiniteError)
      throw new ValidationError('Invalid grade.', error)
    else throw error
  }
}

function validateMonth(month) {
  try {
    if (!isFinite(month)) throw new NotFiniteError(month)
    if (month < 1 || month > 12) throw new NotValidMonthError()
    if (isHolidaysMonth(month)) throw new HolidaysError()
  } catch (error) {
    if (
      error instanceof NotValidMonthError ||
      error instanceof NotFiniteError ||
      error instanceof HolidaysError
    )
      throw new ValidationError('Invalid month.', error)
    else throw error
  }
}

function isGradeCorrectable(grade, month) {
  return grade >= 60 || (month !== 5 && month !== 12)
}

/** @param {SubmitEvent} e */
function handleBetterGradePossibility(e) {
  e.preventDefault()

  let hasError = false

  /** @type {HTMLFormElement} */
  const formEl = e.currentTarget
  if (!(formEl instanceof HTMLFormElement))
    throw TypeError('e.currentTarget must be an instance of a <form> element.')

  /** @type {HTMLInputElement} */
  const gradeInputEl = formEl.elements.grade
  const grade = parseFloat(gradeInputEl.value)
  gradeInputEl.classList.remove('has-error')

  try {
    validateGrade(grade)
  } catch (error) {
    if (error instanceof ValidationError) {
      hasError = true

      gradeInputEl.value = ''
      gradeInputEl.placeholder = error.cause.message
      gradeInputEl.classList.add('has-error')
    } else throw error
  }

  /** @type {HTMLInputElement} */
  const monthInputEl = formEl.elements.month
  const month = parseInt(monthInputEl.value)
  monthInputEl.classList.remove('has-error')

  try {
    validateMonth(month)
  } catch (error) {
    if (error instanceof ValidationError) {
      hasError = true

      monthInputEl.value = ''
      monthInputEl.placeholder = error.cause.message
      monthInputEl.classList.add('has-error')
    } else throw error
  }

  /** @type {HTMLOutputElement} */
  const outputEl = formEl.elements.canBeCorrected

  outputEl.textContent = hasError
    ? ''
    : isGradeCorrectable(grade, month)
      ? 'Так, може 🤩'
      : 'Ні, не може 🥺'
}

const formEl = document.querySelector('.js-form')

formEl?.addEventListener('submit', handleBetterGradePossibility)
