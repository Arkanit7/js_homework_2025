const currentGroup = taskGroups.find((group) =>
  group.tasks.find((task) => task.id === $1),
)

const currentTask = currentGroup.tasks.find((task) => task.id === $1)
