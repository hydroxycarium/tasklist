// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load all event listeners

loadEventListeners();

function loadEventListeners(){
    // Add task event
    form.addEventListener('submit', addTask);
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
    // Clear input value
    taskInput.value = '';

    // Prevent link from opening url
    e.preventDefault();
}

// Troubleshooting UI variables

// console.log(form);
// console.log(taskList);
// console.log(taskInput);
// console.log(clearBtn);
// console.log(filter);