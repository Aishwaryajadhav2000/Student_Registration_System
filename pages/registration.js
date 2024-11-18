
const textArea = document.querySelector(".textarea");
console.log(textArea);

const button = document.querySelector(".button");
console.log(button);

const todoList = document.querySelector(".todolist");

button.addEventListener("click", addToDoListItem);

function addToDoListItem() {
    console.log("clicking");
    console.log(textArea.value);

    const toDoDiv = document.createElement("div");
    const item = document.createElement("p");
    item.innerHTML = textArea.value;

    toDoDiv.appendChild(item);

    todoList.appendChild(toDoDiv);

    console.log(toDoDiv);










}











