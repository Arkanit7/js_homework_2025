const scrollToCurrentTask = () => {
  const currentTask = document.querySelector('.c-pill--current')

  if (currentTask) currentTask.scrollIntoView()
}

scrollToCurrentTask()
