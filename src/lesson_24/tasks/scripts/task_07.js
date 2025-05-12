'use strict'

class Course {
  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name
  }

  /** @param {'string'|'number'|'default'} hint */
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return this.name
    return NaN
  }
}

class Student {
  /**
   * @param {string} name
   * @param {Course} course
   * @param {string} faculty
   */
  constructor(name, course, faculty) {
    this.name = name
    this.course = course
    this.faculty = faculty
  }

  /** @param {'string'|'number'|'default'} hint */
  [Symbol.toPrimitive](hint) {
    if (hint === 'string')
      return `${this.name} – ${this.course} – ${this.faculty}`
    return NaN
  }
}

class StudentManager {
  /** @param {Student[]} studentList */
  constructor(studentList) {
    this.studentList = studentList
  }

  getFacultiesAmount() {
    const faculties = new Set()

    for (const {faculty} of this.studentList) {
      faculties.add(faculty)
    }

    return faculties.size
  }

  /** @return {Map<Course, number>} */
  getStudentsByCourse() {
    const courseToStudents = new Map()

    for (const {course} of this.studentList) {
      courseToStudents.set(course, (courseToStudents.get(course) ?? 0) + 1)
    }

    return courseToStudents
  }

  *[Symbol.iterator]() {
    for (const student of this.studentList) yield student
  }
}

// =============================================================================

const courses = {
  frontend: new Course('Frontend Development'),
  backend: new Course('Backend Development'),
  design: new Course('UI/UX Design'),
  qa: new Course('Quality Assurance'),
  devops: new Course('DevOps Engineering'),
}

const studentList = [
  new Student('Марія Коваль', courses.backend, 'ФКН'),
  new Student('Олена Литвин', courses.qa, 'ФКН'),
  new Student('Сергій Гордієнко', courses.devops, 'ФІТ'),
  new Student('Андрій Шевченко', courses.frontend, 'ФПМ'),
  new Student('Наталя Гуменюк', courses.backend, 'ФІТ'),
  new Student('Вікторія Остапчук', courses.design, 'ФАІ'),
  new Student('Ірина Сидоренко', courses.qa, 'ФПМ'),
  new Student('Юрій Вернидуб', courses.frontend, 'ФІТ'),
  new Student('Тетяна Овчаренко', courses.backend, 'ФКН'),
  new Student('Катерина Бондар', courses.design, 'ФПМ'),
  new Student('Денис Дяченко', courses.qa, 'ФКН'),
]

const studentManager = new StudentManager(studentList)

const facultiesAmount = studentManager.getFacultiesAmount()
console.log(`Кількість факультетів: ${facultiesAmount}`)

console.group('Кількість студентів по курсах')
const courseStudentsAmount = studentManager.getStudentsByCourse()
for (const [{name}, students] of courseStudentsAmount) {
  console.log(`${name} - ${students}`)
}
console.groupEnd()

console.group('Усі студенти')
for (const student of studentManager) {
  console.log(String(student))
}
console.groupEnd()
