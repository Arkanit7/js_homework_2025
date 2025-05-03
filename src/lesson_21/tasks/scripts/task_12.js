'use strict'

function parseDate(dateString) {
  const [day, month, year] = dateString.split('.').map(Number)

  return new Date(year, month - 1, day)
}

function findOldest(list) {
  return list.reduce((oldestPerson, person) =>
    parseDate(oldestPerson.birth) < parseDate(person.birth)
      ? oldestPerson
      : person,
  )
}

function renderStudentList(studentsList) {
  const $el = document.createElement('UL')

  for (const student of studentsList) {
    const liEl = document.createElement('LI')
    liEl.textContent = `${student.name} - ${student.birth}`

    $el.append(liEl)
  }

  return $el
}

const studentsList = [
  {name: 'Олена', birth: '14.03.2004'},
  {name: 'Ігор', birth: '02.12.2003'},
  {name: 'Cвітлана', birth: '27.06.2000'},
  {name: 'Марія', birth: '27.06.2005'},
  {name: 'Яків', birth: '27.06.1995'},
  {name: 'Андрій', birth: '19.08.2002'},
]
const oldestStudent = findOldest(studentsList)
document.querySelector('.js-app')?.append(renderStudentList(studentsList))
document
  .querySelector('.js-app')
  ?.append('Найстарший(а) - ' + oldestStudent.name)
