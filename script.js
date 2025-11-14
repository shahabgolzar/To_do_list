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
function createTask(value, tasks, id,done) {
    let task = document.createElement("div");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    let text = document.createElement("span");
    text.innerText = value;
    task.appendChild(text);
    task.appendChild(deleteBtn);
    container.appendChild(task);
    task.classList.add("task");
    if (done) {
        text.classList.add("done");
    }
    task.addEventListener("click", function (event) {
        if (event.target === deleteBtn) return;
        text.classList.toggle("done");
        const index = tasks.findIndex(t => t.id === task.dataset.id);
        if (index > -1) {
            tasks[index].done = !tasks[index].done;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    })
    
    task.dataset.id = id;
    deleteBtn.addEventListener("click", function () {
        task.remove();
        const index = tasks.findIndex(t => t.id === task.dataset.id);
        if (index > -1) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    })
    
}
function addTask() {
    let value = input.value;
    if (value) {
        const id = Date.now().toString();
        tasks.push({ id, text: value, done: false });
        createTask(value, tasks, id,false);
        input.value = "";
        localStorage.setItem("tasks", JSON.stringify(tasks));

    }
}
window.onload = function () {
    container.innerHTML = "";
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < tasks.length; i++) {
        let done =tasks[i].done
        let value = tasks[i].text;
        const id = tasks[i].id;
        createTask(value, tasks, id,done);

    }
}