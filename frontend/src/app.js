const inputBody = document.querySelector(".noteInput input");
const addBtn = document.querySelector(".noteInput button");
const list = document.querySelector(".list");
const del = document.querySelector(".footer button");


inputBody.onkeyup = () => {
    let userEnteredValue = inputBody.value;
    if (userEnteredValue.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

showTasks();

addBtn.onclick = () => {
    let userEnteredValue = inputBody.value;
    let LocalStrg = localStorage.getItem("Notes");
    if (LocalStrg == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(LocalStrg);
    }
    listArray.push(userEnteredValue);
    localStorage.setItem("Notes", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
}


function showTasks() {
    let LocalStrg = localStorage.getItem("Notes");
    if (LocalStrg == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(LocalStrg);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length;
    if (listArray.length > 0) {
        del.classList.add("active");
    } else {
        del.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    list.innerHTML = newLiTag;
    inputBody.value = "";
}


function deleteTask(index) {
    let LocalStrg = localStorage.getItem("Notes");
    listArray = JSON.parse(LocalStrg);
    listArray.splice(index, 1);
    localStorage.setItem("Notes", JSON.stringify(listArray));
    showTasks();
}

del.onclick = () => {
    listArray = [];
    localStorage.setItem("Notes", JSON.stringify(listArray));
    showTasks();
}