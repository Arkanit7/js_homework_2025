const scrollIntoView = () => {
  const currentTask = document.querySelector('.js-scroll-into-view')

  if (currentTask) currentTask.scrollIntoView({ behavior: 'instant' })
}

scrollIntoView()

/**
 * @param {InputEvent} e
 * @param {HTMLAllCollection} tasks
 */
const handleSearch = (e, tasks) => {
  const query = e.currentTarget.value.trim().toLowerCase()

  console.log(query)

  tasks.forEach((task) => {
    if (task.innerText.toLowerCase().includes(query)) task.style.display = ''
    else task.style.display = 'none'
  })
}

const search = () => {
  const searchInput = document.querySelector('.js-search-input')
  const allTasks = document.querySelectorAll('.js-search-task')

  if (!searchInput) return
  if (!allTasks) return

  searchInput.addEventListener('input', (e) => {
    handleSearch(e, allTasks)
  })
}

search()
