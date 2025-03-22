'use strict'

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

const handleSidebar = (toggle, sidebar, overlay) => {
  toggle.classList.toggle('is-expanded')
  sidebar.classList.toggle('is-expanded')
  overlay.classList.toggle('is-visible')
}

const sidebarToggle = () => {
  const sidebar = document.querySelector('.js-sidebar')
  const toggleButton = document.querySelector('.js-sidebar-toggle')
  const overlay = document.querySelector('.js-overlay')

  if (!sidebar) return
  if (!toggleButton) return
  if (!overlay) return

  toggleButton.addEventListener('click', () => {
    handleSidebar(toggleButton, sidebar, overlay)
  })

  overlay.addEventListener('click', () => {
    handleSidebar(toggleButton, sidebar, overlay)
  })
}

sidebarToggle()

function handleToggle() {
  document.documentElement.classList.toggle('t-dark')

  const isDark = document.documentElement.classList.contains('t-dark')

  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

/** @type {HTMLInputElement | null} */
const themeCheckbox = document.querySelector('.js-theme-toggle')

if (themeCheckbox) {
  themeCheckbox.addEventListener('click', handleToggle)

  const isDark = document.documentElement.classList.contains('t-dark')

  if (isDark) themeCheckbox.checked = true
}
