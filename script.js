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
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click",function(){
             task.remove();
        })
        let text = document.createElement("span");
        text.innerText = value;
        task.appendChild(text);
        task.appendChild(deleteBtn);
        container.appendChild(task);
        task.classList.add("task");
        input.value = "";
        task.addEventListener("click", function(){
            if(event.target === deleteBtn) return;
            text.classList.toggle("done");
        })
    }  
}
