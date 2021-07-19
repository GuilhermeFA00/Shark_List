//Mode dark/light choice
const sun_or_moon = document.querySelector(".toggle-ball");
const itms = document.querySelectorAll("body,.first-container header,.second-container,.fourth-container");

sun_or_moon.addEventListener("click", () => {
    itms.forEach((item) => {
        item.classList.toggle("active");
    }
    );
    sun_or_moon.classList.toggle("active")
});


//TO do list
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


//Arrows action

const arws = document.querySelectorAll(".arrow");
const apr_list = document.querySelectorAll(".apr-list");

//Scrools of arrows
arws.forEach(
    (arrow, index) => {
        //Return the number of nodes "img" 
        const index_num = apr_list[index].querySelectorAll("img").length;
        var click_counter = 0;
        //The event i'll to occur with click from user
        arrow.addEventListener("click", () => {
            //The ratio for each click : Math.floor(window.innerWidth / 270);
            const ratio = Math.floor(window.innerWidth / 270);
            //Incrementing to click counter
            click_counter++;
            //Conditional structure for change the style according to event 
            if (index_num - (4 + click_counter) + (4 - ratio) >= 0) {
                //acessing CSS methods with template strings
                apr_list[index].style.transform = `translateX(${apr_list[index].computedStyleMap().get("transform")[0].x.value - 300
                    }px)`;
            } else {
                apr_list[index].style.transform = "translateX(0)";
                //The counter back to zero
                click_counter = 0;
            }
        });
    }
);
