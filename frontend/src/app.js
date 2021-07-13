const input = document.querySelector(".note-input input");
const btn = document.querySelector(".note-input button");
const list = document.querySelector(".list");
const del = document.querySelector(".footer button");

btn.onkeyup = () => {
    let userInput = input.value;
    if (userInput.trim() != 0) {
        btn.classList.add("active");
    } else {
        btn.classList.remove("active");
    }
}


function showTasks() {
    let localStrg = localStorage.getItem("New note!");

}