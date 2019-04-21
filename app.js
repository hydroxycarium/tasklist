// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load all event listeners

loadEventListeners();

function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task
    clearBtn.addEventListener('click', clearTasks);
    // Filter task event
    filter.addEventListener('keyup', filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // Create li
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        // Create delete link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);

        // Add li to ul
        taskList.appendChild(li);
    })
}

function addTask(e){
    if(taskInput.value === ''){
        console.log('Add a task');
    }

    // Create li
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // Create delete link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(link);

    // Add li to ul
    taskList.appendChild(li);
    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);
    // Clear input value
    taskInput.value = '';

    // Prevent link from opening url
    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    // Find a with class = delete-item
    if(e.target.parentElement.classList.contains('delete-item')){
        // Remove li from ul (parent of a)
        e.target.parentElement.parentElement.remove();
        // Remove from LocalStorage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove task from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
    // Find first task and remove - querySelector selects first item only
    while(taskList.firstChild){
        taskList.firstChild.remove();
    }
    clearTasksFromLocalStorage();
}

// Clear tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    // Get text value
    const text = e.target.value;
    // Iterate through items and display (block) or hide (none)
    document.querySelectorAll('.collection-item').forEach(function(task)
        {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}

// Troubleshooting UI variables

// console.log(form);
// console.log(taskList);
// console.log(taskInput);
// console.log(clearBtn);
// console.log(filter);