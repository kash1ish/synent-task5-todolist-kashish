let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let count = tasks.length + 1;


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTodo(){
    const todo = document.getElementById("input").value;
    console.log(todo);

    const task = {
        id: count++,
        text: todo,
        completed: false
    }
    tasks.push(task);
    saveTasks();
    render();
}

function render() {
    const todosDiv = document.getElementById("todos");
    todosDiv.innerHTML = "";
    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "todo-item";

        const text = document.createElement("span");
        text.innerText = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        deleteBtn.onclick = function () {
            deleteTask(task.id);
        };

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.onchange = function (){
            task.completed = !task.completed;
            saveTasks();
            render();
        }

        if (task.completed) {
            text.classList.add("completed");
        }
        
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(text);
        taskDiv.appendChild(deleteBtn);

        todosDiv.appendChild(taskDiv);
    });
}

function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);

    tasks.length = 0;
    tasks.push(...newTasks);
    saveTasks();
    render();
}

render();
