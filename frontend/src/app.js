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
showTasks();


btn.onclick = () => {
    let userInput = input.value;
    let localStrg = localStorage.getItem("New note!");
    if (localStrg == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(localStrg);
    }
    listArray.push(userInput);
    localStrg.setItem("New note", JSON.stringify(listArray));
    showTasks();
    btn.classList.remove("active");
}


function showTasks() {
    let localStrg = localStorage.getItem("New note!");
    if (localStrg == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(localStrg)
    }

    const pendingTasksNumb = document.querySelector(".your-tasks");
    pendingTasksNumb.textContent = listArray.length;
    if (listArray.length > 0) {
        del.classList.add("active");
    } else {
        del.classList.remove("active");
    }
    let newLi = "";
    listArray.forEach((el, index) => {
        newLi += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    });
    list.innerHTML = newLi;
    input.value = "";
}