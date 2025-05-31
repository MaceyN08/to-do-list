let tasks = [];

        function addTask() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();

            if (taskText === '') return;

            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            };

            tasks.push(newTask);
            input.value = '';
            renderTasks();
        }

        function toggleTask(taskId) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
            }
        }

        function removeTask(taskId) {
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks();
        }

        function renderTasks() {
            const taskList = document.getElementById('taskList');

            if (tasks.length === 0) {
                taskList.innerHTML = '<div class="empty-message">No tasks yet. Add one above!</div>';
                return;
            }

            taskList.innerHTML = tasks.map(task => `
                <div class="task-item">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="toggleTask(${task.id})">
                    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                    <button class="remove-btn" onclick="removeTask(${task.id})">Remove</button>
                </div>
            `).join('');
        }

        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });