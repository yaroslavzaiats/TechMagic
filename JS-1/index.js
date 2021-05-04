const taskInput = document.querySelector('.task');
const addBtn = document.querySelector('.add-task');
const deleteBtn = document.querySelector('.delete-task');
const tasksList = document.querySelector('.tasks');
const form = document.querySelector('form');

let tasks = [];

window.onload = () => {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    !tasks ? tasks = [] : null;
    tasks.forEach(task => createTask(task))
}

function addHandler() {
    if (validateInput(taskInput.value)) {
        if(tasks.length === 23) {
            alert('Maximum number of items reached')
            form.reset();
        } else {
            createTask(taskInput.value);
            tasks.push(taskInput.value);
            localStorage.clear();
            saveTasks();
            form.reset();
        }
    }
}

function deleteHandler() {
    if(tasks.length === 0) {
        alert('List is empty');
    } else {
        tasksList.removeChild(tasksList.lastElementChild);
        tasks.pop();
        localStorage.clear();
        saveTasks();
    }
}

function saveTasks() {
    const tasksJSON = JSON.stringify(tasks)
    localStorage.setItem('tasks', tasksJSON)
}

function createTask(taskText) {
    const newTask = document.createElement('li');
    newTask.innerHTML = taskText;
    tasksList.appendChild(newTask);
}

function validateInput(value) {
    if(value === '' || value.trim() === ''){
        form.reset();
        return false;
    } else return true;
}

addBtn.addEventListener('click', addHandler);

deleteBtn.addEventListener('click', deleteHandler);