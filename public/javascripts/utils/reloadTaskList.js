import { showTaskDetails } from "./showTaskDetails.js";
import { updateTaskSummary } from "./updateTaskSummary.js";

/******************************************************************************/
/************************* BUILD TASK HTML ELEMENT ****************************/
/******************************************************************************/

export const reloadTaskList = async () => {
  const taskList = document.querySelector(".task-list__tasks");

  let listId = localStorage.getItem("never-forget-currentList")
    ? localStorage.getItem("never-forget-currentList")
    : null;
  if (listId === "null") listId = null;

  let route = "/tasks";
  if (listId) {
    if (listId.startsWith('search:')){
      let searchInput = listId.slice(7)
      route = `/tasks/search?includes=${encodeURI(searchInput)}`
    } else {
      route = `/lists/${listId}`
    }
  }

  let res = await fetch(route);
  let body = await res.json();

  let tasks = body.allTasks;

  //update task summary
  updateTaskSummary(tasks);


  let viewIncomplete = parseInt(
    localStorage.getItem("never-forget-viewIncomplete"),
    10
  );

  if (viewIncomplete) {

    tasks = tasks.filter((task) => {
      if (!task.isComplete) return true;
      else return false;
    });
  } else {

    tasks = tasks.filter((task) => {
      if (task.isComplete) return true;
      else return false;
    });
  }



  taskList.innerHTML = "";
  // getTotalEstimate(tasks)

  tasks.forEach((task) => {
    taskList.appendChild(createTaskItem(task));
  });
};

const createTaskItem = (task) => {
  let taskItem = document.createElement("div");
  taskItem.classList.add("task-list__task-item");
  taskItem.id = `Task-${task.id}`;
  taskItem.innerHTML = `
  <div class="task-list__task-bar"></div>
  <input type="checkbox" name="item check="checked">
  <span class="task-list__task-title">${task.title}</span>`;

  taskItem.addEventListener('click', (e) => {

    e.stopPropagation();

    let taskDiv
    if (e.target.className !== 'task-list__task-item') {
      taskDiv = e.target.parentElement
    } else {
      taskDiv = e.target
    }

    let taskId = taskDiv.id.slice(5)

    showTaskDetails(taskId)
  })
  return taskItem
}
