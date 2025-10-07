const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const deleteAll = document.getElementById("deleteAll");
const todoContainer = document.getElementById("todoContainer");
const doneContainer = document.getElementById("doneContainer");
const prioritySelect = document.getElementById("priority");

// -------------------
// Menampilkan waktu real-time
// -------------------
function updateTime() {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  document.getElementById("time").innerText = now.toLocaleDateString("en-ID", options);
}
setInterval(updateTime, 1000);
updateTime();

// -------------------
// Fungsi Simpan & Muat dari localStorage
// -------------------
function saveTasks() {
  const tasks = {
    todo: todoContainer.innerHTML,
    done: doneContainer.innerHTML,
  };
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks"));
  if (saved) {
    todoContainer.innerHTML = saved.todo;
    doneContainer.innerHTML = saved.done;
    restoreEventListeners();
  }
}

// -------------------
// Mengembalikan event listener setelah load
// -------------------
function restoreEventListeners() {
  document.querySelectorAll(".task input[type='checkbox']").forEach((check) => {
    check.addEventListener("change", () => {
      const task = check.closest(".task");
      if (check.checked) {
        task.classList.add("done");
        doneContainer.appendChild(task);
      } else {
        task.classList.remove("done");
        todoContainer.appendChild(task);
      }
      saveTasks();
    });
  });

  document.querySelectorAll(".task button").forEach((delBtn) => {
    delBtn.addEventListener("click", (e) => {
      e.target.closest(".task").remove();
      saveTasks();
    });
  });
}

// -------------------
// Tambah Task
// -------------------
addTask.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (taskText === "") return alert("Write the task first!");

  const task = document.createElement("div");
  task.classList.add("task", priority.toLowerCase());

  const span = document.createElement("span");
  span.textContent = `[${priority}] ${taskText}`;

  const actions = document.createElement("div");
  const check = document.createElement("input");
  check.type = "checkbox";
  const delBtn = document.createElement("button");
  delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  // event listener
  check.addEventListener("change", () => {
    if (check.checked) {
      task.classList.add("done");
      doneContainer.appendChild(task);
    } else {
      task.classList.remove("done");
      todoContainer.appendChild(task);
    }
    saveTasks();
  });

  delBtn.addEventListener("click", () => {
    task.remove();
    saveTasks();
  });

  actions.appendChild(check);
  actions.appendChild(delBtn);
  task.appendChild(span);
  task.appendChild(actions);

  todoContainer.appendChild(task);
  taskInput.value = "";

  saveTasks(); // simpan setelah menambah
});

// -------------------
// Hapus Semua
// -------------------
deleteAll.addEventListener("click", () => {
  if (confirm("Delete all list(s)?")) {
    todoContainer.innerHTML = "";
    doneContainer.innerHTML = "";
    localStorage.removeItem("tasks");
  }
});

// -------------------
// Jalankan saat pertama kali
// -------------------
loadTasks();


// Preloader //

document.addEventListener('DOMContentLoaded', function() {
            const preloader = document.getElementById('preloader');
            const content = document.querySelector('.content');
            const progress = document.getElementById('progress');
            const loadingText = document.querySelector('.loading-text');
            
            // Simulate loading progress
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    loadingText.textContent = "READY";
                    
                    setTimeout(() => {
                        // Hide preloader with transform
                        preloader.classList.add('preloader-done');
                        
                        // Show content
                        content.style.display = 'block';
                        
                        // Trigger reflow
                        void content.offsetWidth;
                        
                        // Fade in content
                        content.style.opacity = '1';
                        
                        // Remove preloader after animation
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 800);
                    }, 600);
                } else {
                    width += Math.floor(Math.random() * 5) + 1;
                    width = Math.min(width, 100);
                    progress.style.width = width + '%';
                    
                    if (width > 80) {
                        loadingText.textContent = "ALMOST THERE";
                    } else if (width > 50) {
                        loadingText.textContent = "LOADING TASKS";
                    }
                }
            }, 100);
        });
        
        // Alternative: use load event for real loading progress
        window.addEventListener('load', function() {
            // This will trigger when all resources are actually loaded
            // You could remove the interval above and just use this
        });
        