let btn = document.getElementById("add-task-button");
let input = document.getElementById("task-input");
let container = document.getElementById("task-container");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

btn.addEventListener("click", function () {
    addTask();
});

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function createTask(value, tasks, id, done) {
    let task = document.createElement("div");
    let deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    let text = document.createElement("span");
    const btnDiv = document.createElement("div");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");
    checkBox.checked = done;
    task.appendChild(checkBox);
    text.innerText = value;
    task.appendChild(text);
    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);
    btnDiv.classList.add("button");
    task.appendChild(btnDiv);
    container.appendChild(task);
    task.classList.add("task");
    task.dataset.id = id;

    deleteBtn.addEventListener("click", function () {
        task.remove();
        const index = tasks.findIndex((t) => t.id === task.dataset.id);
        if (index > -1) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    });

    editBtn.addEventListener("click", function () {
        const newInput = document.createElement("input");
        newInput.classList.add("edit-input");
        newInput.value = text.innerText;
        task.replaceChild(newInput, text);
        editBtn.innerText = "Save";
        function editTask() {
            text.innerText = newInput.value;
            task.replaceChild(text, newInput);
            editBtn.innerText = "Edit";
            const index = tasks.findIndex((t) => t.id === task.dataset.id);
            if (index > -1) {
                tasks[index].text = newInput.value;
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        }

        editBtn.addEventListener("click", editTask, {once: true}); // Save دکمه
        newInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") editTask();
        });
    });
    checkBox.addEventListener("change", function () {
        const index = tasks.findIndex((t) => t.id === task.dataset.id);
        if (index > -1) {
            tasks[index].done = checkBox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    });
}

function addTask() {
    let value = input.value.trim();
    if (value) {
        const id = Date.now().toString();
        tasks.push({ id, text: value, done: false });
        createTask(value, tasks, id, false);
        input.value = "";
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
window.onload = function () {
    container.innerHTML = "";
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < tasks.length; i++) {
		const done = tasks[i].done;
        let value = tasks[i].text;
        const id = tasks[i].id;
        createTask(value, tasks, id, done);
    }
};