const inputBody = document.querySelector(".note-input input");
const btnTxt = document.querySelector(".note-input button");
const list = document.querySelector(".list");
const del = document.querySelector(".footer button");

inputBody.onkeyup = () => {
    let userInput = inputBody.value;
    if (userInput.trim() != 0) {
        btnTxt.classList.add("active");
    } else {
        btnTxt.classList.remove("active");
    }
}

showTasks();


btnTxt.onclick = () => {
    let userInput = inputBody.value;
    let localStrg = localStorage.getItem("New note!");
    if (localStrg == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(localStrg);
    }
    listArray.push(userInput);
    localStrg.setItem("New note!", JSON.stringify(listArray));
    showTasks();
    btnTxt.classList.remove("active");
}


function showTasks() {
    let localStrg = localStorage.getItem("New note!");
    if (localStrg == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(localStrg);
    }

    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length;
    if (listArray.length > 0) {
        del.classList.add("active");
    } else {
        del.classList.remove("active");
    }
    let newLi = "";
    listArray.forEach((element, index) => {
        newLi += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    list.innerHTML = newLi;
    inputBody.value = "";
}