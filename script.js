 document.addEventListener('DOMContentLoaded', function () {
      const addButton = document.getElementById('add-task-btn');
      const taskInput = document.getElementById('task-input');
      const taskList = document.getElementById('task-list');

      // Load tasks from localStorage
      function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
          addTask(taskText, false); // false = don't save again to localStorage
        });
      }

      // Save tasks to localStorage
      function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      // Add a new task (to DOM and optionally to localStorage)
      function addTask(taskText, save = true) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.addEventListener('click', function () {
          taskList.removeChild(taskItem);
          removeFromStorage(taskText);
        });

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        if (save) {
          const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
          tasks.push(taskText);
          saveTasks(tasks);
        }
      }

      // Remove a task from localStorage
      function removeFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        saveTasks(tasks);
      }

      // Event handlers
      function handleAddTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
          addTask(taskText);
          taskInput.value = '';
        } else {
          alert('Please enter a task.');
        }
      }

      addButton.addEventListener('click', handleAddTask);
      taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          handleAddTask();
        }
      });

      loadTasks(); // Load on page load
    });