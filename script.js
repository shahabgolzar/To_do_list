let btn = document.getElementById("add-task-button");
let input = document.getElementById("task-input");
let container = document.getElementById("task-container");
btn.addEventListener("click", function(){
    addTask();  
});
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
}); 
function addTask() {
    let value = input.value;
    if (value) {
        let task = document.createElement("div");
        task.innerText = value;
        container.appendChild(task);
        input.value = "";
    }  
}
