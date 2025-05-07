'use strict'

class TaskManager {
  storageKey
  storage
  list
  timeoutId
  intervalS

  constructor(fallbackList, storageKey, intervalS = 1, storage = 'local') {
    this.storageKey = storageKey
    this.storage = this.#getStorage(storage)
    this.intervalS = intervalS
    this.list = this.#initList(fallbackList)
  }

  #getStorage(type) {
    switch (type) {
      case 'local':
        return localStorage
      case 'session':
        return sessionStorage
      default:
        throw new Error("Can't find the storage.")
    }
  }

  #getRandomInteger(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
  }

  getStorageList() {
    return JSON.parse(this.storage.getItem(this.storageKey))
  }

  setStorageList() {
    this.storage.setItem(this.storageKey, JSON.stringify(this.list))
  }

  #initList(fallbackList) {
    const savedList = this.getStorageList() ?? []

    if (savedList.length === 0) return fallbackList

    return savedList
  }

  #askUser(item) {
    return confirm(`${item}\n---\nСправу виконано?`)
  }

  removeTaskByIndex(index) {
    this.list.splice(index, 1)
    this.setStorageList()
  }

  #scheduleNextRun() {
    this.timeoutId = setTimeout(() => {
      this.#run()
    }, this.intervalS * 1e3)
  }

  #processUserResponse(index) {
    const removeIt = this.#askUser(this.list[index])

    if (removeIt) this.removeTaskByIndex(index)
  }

  #run() {
    const listLength = this.list.length

    if (listLength === 0) {
      this.stop()
      return
    }

    const randomIndex = this.#getRandomInteger(0, listLength - 1)
    this.#processUserResponse(randomIndex)
    this.#scheduleNextRun()
  }

  start() {
    if (this.timeoutId) return

    this.timeoutId = setTimeout(() => {
      this.#run()
    }, this.intervalS * 1e3)
  }

  stop() {
    if (!this.timeoutId) return

    this.timeoutId = clearTimeout(this.timeoutId)
  }
}

// =============================================================================

const key = 'toDoList'
const toDoList = [
  'Справедливий мир',
  'Подорож до Італії',
  'Вивчити JS фреймворк',
  'Новий ноутбук',
  'Власний будинок',
  'До кінця року, прочитати 10 книг',
  'Навчитися ефективно працювати',
  'Навчитися швидко навчатися',
]
const myToDo = new TaskManager(toDoList, key, 2)

if (confirm('Почати тестування?')) myToDo.start()
