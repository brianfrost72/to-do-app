const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const deleteAll = document.getElementById("deleteAll");
const todoContainer = document.getElementById("todoContainer");
const doneContainer = document.getElementById("doneContainer");
const prioritySelect = document.getElementById("priority");

function updateTime() {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  document.getElementById("time").innerText = now.toLocaleDateString("en-ID", options);
}
setInterval(updateTime, 1000);
updateTime();

addTask.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (taskText === "") return alert("write the assignment first!");

  const task = document.createElement("div");
  task.classList.add("task", priority.toLowerCase());

  const span = document.createElement("span");
  span.textContent = `[${priority}] ${taskText}`;

  const actions = document.createElement("div");
  const check = document.createElement("input");
  check.type = "checkbox";

  const delBtn = document.createElement("button");
  delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';


  check.addEventListener("change", () => {
    if (check.checked) {
      task.classList.add("done");
      doneContainer.appendChild(task);
    } else {
      task.classList.remove("done");
      todoContainer.appendChild(task);
    }
  });

  delBtn.addEventListener("click", () => task.remove());

  actions.appendChild(check);
  actions.appendChild(delBtn);
  task.appendChild(span);
  task.appendChild(actions);

  todoContainer.appendChild(task);
  taskInput.value = "";
});

deleteAll.addEventListener("click", () => {
  if (confirm("Delete all lists?")) {
    todoContainer.innerHTML = "";
    doneContainer.innerHTML = "";
  }
});
