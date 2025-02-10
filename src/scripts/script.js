const scrollIntoView = () => {
  const currentTask = document.querySelector('.js-scroll-into-view')

  if (currentTask) currentTask.scrollIntoView({ behavior: 'instant' })
}

scrollIntoView()
