let tasksArray = [];

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    const storedTasks = localStorage.getItem('tasksArray');
    if (storedTasks) {
        tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach(task => {
            taskAdd(task.id, task.task, task.completed);
        });
    }
});

function handleTaskAction(taskElement, action, paragraph, checkbox) {
    const taskId = taskElement.dataset.id;
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');

    if (action === 'edit') {
        taskInput.value = paragraph.textContent;
        addButton.textContent = 'Update';
        addButton.dataset.taskId = taskId;
        addButton.removeEventListener('click', addTask);
        addButton.addEventListener('click', updateTask);
    } else if (action === 'delete') {
        deleteTask(taskId);
        taskElement.remove();
    } else if (action === 'complete') {
        toggleComplete(taskElement, checkbox);
    }
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addTask);

const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function taskAdd(taskId, task, completed) {
    const contentBox = document.querySelector('.content');

    // Check if the task with the same ID already exists
    if (document.querySelector(`.list[data-id="${taskId}"]`)) {
        return;
    }

    const tasks = document.createElement('div');
    tasks.className = 'list';
    tasks.dataset.id = taskId;
    tasks.innerHTML = `<p>${task}</p>
                              <div class="buttons">
                              <div class="checkbox-wrapper">
                                <label for="${taskId}-checkbox" class="rocker rocker-small">
                                <input type="checkbox" id="${taskId}-checkbox" ${completed ? 'checked' : ''}>
                                <span class="switch-left">Done</span>
                                <span class="switch-right">ToDo</span>
                              </label></div>
                                <i class="ri-edit-box-line"></i>
                                <i class="ri-delete-bin-line"></i>
                              </div>`;
    contentBox.appendChild(tasks);

    const paragraph = tasks.querySelector('p');
    const checkbox = tasks.querySelector('input[type="checkbox"]');
    const editButton = tasks.querySelector(".ri-edit-box-line");
    const delButton = tasks.querySelector(".ri-delete-bin-line");

    checkbox.addEventListener('change', () => handleTaskAction(tasks, 'complete', paragraph, checkbox));
    editButton.addEventListener('click', () => handleTaskAction(tasks, 'edit', paragraph, checkbox));
    delButton.addEventListener('click', () => handleTaskAction(tasks, 'delete', paragraph, checkbox));

    tasksArray.push({ id: taskId, task: task, completed: completed });
    updateLocalStorage();
}

function updateLocalStorage() {
    // Save tasksArray to local storage
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
}

function updateTask() {
    const taskId = addButton.dataset.taskId;
    const taskInput = document.getElementById('taskInput');
    const editedTask = taskInput.value.trim();

    if (editedTask !== '') {
        const taskToUpdate = tasksArray.find(task => task.id === taskId);
        if (taskToUpdate) {
            taskToUpdate.task = editedTask;
            const taskElement = document.querySelector(`.list[data-id="${taskId}"] p`);
            if (taskElement) {
                taskElement.textContent = editedTask;
            }
        }

        taskInput.value = '';
        addButton.textContent = 'Add';
        addButton.removeEventListener('click', updateTask);
        addButton.addEventListener('click', addTask);
        updateLocalStorage();
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (addButton.textContent === 'Update') {
        updateTask();
    } else {
        if (task) {
            const taskId = Date.now().toString();
            taskAdd(taskId, task, false);
            taskInput.value = '';
        }
    }
}

function deleteTask(taskId) {
    tasksArray = tasksArray.filter(task => task.id !== taskId);
    updateLocalStorage();
}

function toggleComplete(taskElement, checkbox) {
    const taskId = taskElement.dataset.id;
    const taskToUpdate = tasksArray.find(task => task.id === taskId);
    if (taskToUpdate) {
        taskToUpdate.completed = checkbox.checked;
        const taskText = taskElement.querySelector('p');
        taskText.style.textDecoration = taskToUpdate.completed ? 'line-through' : 'none';
        updateLocalStorage();
    }
}