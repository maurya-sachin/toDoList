function handleTaskAction(taskElement, action, paragraph) {
    const taskInput = document.getElementById('taskInput');

    if (action === 'edit') {
        taskInput.value = paragraph.textContent;
    } else if (action === 'delete') {
        taskElement.remove();
    } else if (action === 'pin') {
        // Implement pin logic here
    }
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addTask);

const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keydown', handleKeyDown);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        taskAdd(task);
    }
    taskInput.value = '';
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function taskAdd(task) {
    const contentBox = document.querySelector('.content'),
        tasks = document.createElement('div');
    tasks.className = 'list';
    tasks.innerHTML = ` <p>${task}</p>
        <div class="buttons">
        <i class="ri-edit-box-line"></i>
        <i class="ri-delete-bin-line"></i>
        <i class="ri-pushpin-line"></i>
        </div>`;
    contentBox.appendChild(tasks);

    const paragraph = tasks.querySelector('p');

    const editButton = tasks.querySelector(".ri-edit-box-line");
    const delButton = tasks.querySelector(".ri-delete-bin-line");
    const pinButton = tasks.querySelector(".ri-pushpin-line");

    editButton.addEventListener('click', () => handleTaskAction(tasks, 'edit', paragraph));
    delButton.addEventListener('click', () => handleTaskAction(tasks, 'delete', paragraph));
    pinButton.addEventListener('click', () => handleTaskAction(tasks, 'pin', paragraph));
    taskInput.value = ''; // Clear input after adding a task
}
