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
    let userInput = inputBody.value;
    if (userInput.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

showTasks();

addBtn.onclick = () => {
    let userInput = inputBody.value;
    let LocalStrg = localStorage.getItem("Notes");
    if (LocalStrg == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(LocalStrg);
    }
    listArray.push(userInput);
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



//Notes set

class Note {

    constructor({ title, body }, noteManager) {
        this.el = null;
        this.title = title;
        this.body = body;
        this.noteManager = noteManager;
    }

    static getNoteTpl() {
        return `
          <div class="tc-note">
              <div class="tc-note-header">
                  <span class="tc-note-close">
                      <i class="fas fa-times"></i>
                  </span>
              </div>
              <div class="tc-note-title" contenteditable="">
                  {{title}}
              </div>
              <div class="tc-note-body" contenteditable="">
                  {{body}}
              </div>
          </div>`;
    }

    createNoteEl() {
        let tpl = Note.getNoteTpl();
        tpl = tpl
            .replace('{{title}}', this.title)
            .replace('{{body}}', this.body)
            ;
        const div = document.createElement('div');
        div.innerHTML = tpl;
        this.el = div.children[0];
        this.attachEventListeners();
        return this.el;
    }

    attachEventListeners() {
        const btnClose = this.el.querySelector('.tc-note-close');
        btnClose.onclick = () => {
            this.noteManager.removeNote(this);
        };
        const title = this.el.querySelector('.tc-note-title');
        title.oninput = (ev) => {
            this.title = ev.target.innerText;
            this.noteManager.onNoteChange(this);
        };
        const body = this.el.querySelector('.tc-note-body');
        body.oninput = (ev) => {
            this.body = ev.target.innerText;
            this.noteManager.onNoteChange(this);
        }
    }
}





class NoteManager {
    constructor({ el, notes }) {
        this.el = el;
        this.el.className = 'tc-notes-wrapper';
        this.notesEl = null;
        this.notes = notes.map(note => new Note(note, this));

        this.onNoteChange = () => {
        };
        this.createNewNoteButton();
        this.createNotesWrapper();
        this.renderNotes();
    }

    addNote(note) {
        this.notes.push(new Note(note, this));
        this.renderNotes();
    }

    prependNote(note) {
        this.notes.unshift(new Note(note, this));
        this.renderNotes();
    }

    removeNote(note) {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.renderNotes();
    }

    createNewNoteButton() {

    }

    createNotesWrapper() {
        this.notesEl = document.createElement('div');
        this.notesEl.className = 'tc-notes';
        this.el.appendChild(this.notesEl);
    }

    renderNotes() {
        this.notesEl.innerHTML = '';
        this.notes.forEach(note => this.renderNote(note));
    }

    renderNote(note) {
        this.notesEl.appendChild(note.createNoteEl())
    }
}





const noteManager = new NoteManager({
    el: document.getElementById('notesWrapper'),
    notes: [
    ]
});





noteManager.onNoteAdd = (note) => {
    console.log("Note added ", note);
};
noteManager.onNoteChange = (note) => {
    console.log("Note changed ", note);
};
noteManager.onNoteRemove = (note) => {
    console.log("Note removed ", note);
};

const newNoteBtn = document.querySelector('.new-note-btn');
newNoteBtn.onclick = () => {
    noteManager.prependNote({
        title: '',
        body: ''
    })
};