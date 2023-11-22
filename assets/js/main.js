function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        taskAdd(task);
    }
    taskInput.value = '';
}
function taskAdd(task) {
    const contentBox = document.querySelector('.content'),
        tasks = document.createElement('div');
    tasks.className = 'list';
    tasks.innerHTML = ` <p>${task}</p>
        <div class="buttons">
        <i class="ri-edit-box-line"></i>
        <i class="ri-delete-bin-line"></i>
        <div id="pinned"><i class="ri-pushpin-line"></i></div>
        </div>`
    contentBox.appendChild(tasks);
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addTask);

const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keydown', handleKeyDown);

