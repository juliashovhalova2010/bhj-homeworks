'use strict';
const taskInput = document.getElementById('task__input'); 
const buttonAddTask = document.getElementById('tasks__add'); 
const taskList = document.getElementById('tasks__list'); 


const setStorage = function (itemsTask) {

    return localStorage.setItem('items', JSON.stringify(itemsTask));
}

const getStorage = function (){
         let itemsTask = localStorage.getItem('items');
    itemsTask = itemsTask ? JSON.parse(itemsTask) : [];
    return itemsTask;
}

const templateTask = function (task) {
    return ` <div class="task">
              <div class="task__title">
                ${task}
              </div>
              <a href="#" class="task__remove">&times;</a>
            </div>`
}

const onload = function (element){
let itemsTask = getStorage();
    itemsTask.forEach(element => {
        const template = templateTask(element);
        taskList.insertAdjacentHTML('afterbegin', template);
        taskInput.value = '';
    });
}

const addTask = function () {
    const task = taskInput.value.trim();
    if (task) {
         const template = templateTask(task);
        taskList.insertAdjacentHTML('afterbegin', template);
        taskInput.value = '';
        addStorageTask(task);
    }
}

const addStorageTask = function (task){
     let itemsTask = getStorage();
    
    itemsTask.push(task);
  setStorage(itemsTask);
}

const removeStorage = function (index){
    let itemsTask = getStorage();
     itemsTask.splice(index, 1);
     setStorage(itemsTask);
    
}

document.addEventListener('DOMContentLoaded', onload);

taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

buttonAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

taskList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('task__remove')) {
        return;
    }
    let itemsTask = getStorage();
    let index = itemsTask.findIndex(item =>
        item == e.target.parentElement.querySelector('.task__title').textContent.trim());
    removeStorage(index);
    e.target.closest('.task').remove();
 
});