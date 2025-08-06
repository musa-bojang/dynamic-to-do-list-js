document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to display a task
    function displayTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            tasks = tasks.filter(task => task !== taskText); // remove from array
            saveTasks(); // update localStorage
        });

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);
    }

    // Display all saved tasks on page load
    tasks.forEach(displayTask);

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);         // add to array
            saveTasks();                  // save to localStorage
            displayTask(taskText);        // show in UI
            taskInput.value = '';         // clear input
        } else {
            alert('Please enter a task.');
        }
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
