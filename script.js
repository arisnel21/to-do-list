document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const filterButtons = document.querySelectorAll("#filters button");

  // Cargar tareas desde localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Mostrar tareas al iniciar
  renderTasks();

  // Agregar nueva tarea
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
      tasks.push({ text, completed: false });
      input.value = "";
      saveTasks();
      renderTasks();
    }
  });

  // Guardar en localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Mostrar tareas en la lista
  function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      if (
        filter === "completed" && !task.completed ||
        filter === "pending" && task.completed
      ) {
        return;
      }

      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");
      li.textContent = task.text;

      // Marcar como completado
      li.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks(filter); // Actualiza vista con el mismo filtro
      });

      // Botón eliminar
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(filter);
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  // Filtros
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      renderTasks(filter);
    });
  });
});
