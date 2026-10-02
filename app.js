// Select(Get it) Tag=rget Dom Element
const taskList = document.querySelector('#tasks-list');
const taskInput = document.querySelector('#tasks-input');
const addBtn = document.querySelector('#add-btn');
const clearCompBtn = document.querySelector('#clear-comp-btn');
const clearAll = document.querySelector('#clear-all-btn')


//Initialize state or load from LocalStorage
//Load saved tasks or default to an empty array(using JSON.perse to convert data stored in brower back to js array  )
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

const saveAndRender = () => {
    localStorage.setItem("mytasks", JSON.stringify(tasks));
    renderTasks();
};

// create a render Function
const renderTasks = () => {
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No Active Task Yet!</li>'
        return
    } 
    taskList.innerHTML = "" // clear existing ui list

   
    tasks.forEach((task, index) => {
        const li = document.createElement('li') 
        // li.textContent = task.text;
        
        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;
        

        if (task.completed) {
            textSpan.style.textDecoration = "line-through";
            textSpan.style.color = 'grey';  
        }

        textSpan.addEventListener('click', () => {
            task.completed = !task.completed;
            saveAndRender();          
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.style.background = "none"
        deleteBtn.classList = "delete-btn"

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveAndRender()
        });

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });   
};



// Add task handler
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = ""; //clear field
        saveAndRender();
    }
};

// Add Task via Button or Enter key
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter')  addTask(); });

clearCompBtn.addEventListener('click', () => {
    if (confirm("Clear all completed tasks?")) {
        tasks = tasks.filter( task => !task.completed);
        saveAndRender();
    }
});

clearAll.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
      tasks = []
    saveAndRender();  
    }
})

renderTasks();
