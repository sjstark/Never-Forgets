export const updateTaskSummary = (tasks) => {
  //create and append element for tasks field
  const taskCountContainer = document.querySelector(".task-num");

  let completedTasks = tasks.filter((task) => {
    return task.isComplete;
  });
  let incompleteTasks = tasks.length - completedTasks.length;
  taskCountContainer.innerHTML = incompleteTasks;

  //create and append element for completed field
  const tasksCompletedContainer = document.querySelector(".task-num-completed");

  tasksCompletedContainer.innerHTML = completedTasks.length;

  //create and append element for estimated field
  const estimatedTimeContainer = document.querySelector(".task-time");

  let estimatedTime = 0;
  tasks.forEach((task) => {
    estimatedTime += task.estimate;
  });

  estimatedTimeContainer.innerHTML = estimatedTime + "min";
};