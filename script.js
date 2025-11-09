// ===================================
// DOM ELEMENT REFERENCES
// ===================================

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearSection = document.getElementById('clearSection');

// ===================================
// APPLICATION STATE
// ===================================

let tasks = [];
let currentFilter = 'all';

// ===================================
// INITIALIZATION
// ===================================

// Load tasks from localStorage on page load
function initApp() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
}

// ===================================
// TASK MANAGEMENT FUNCTIONS
// ===================================

/**
 * Add a new task to the list
 */
function addTask() {
    const text = taskInput.value.trim();
    
    // Validate input
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    // Create new task object
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    // Add to tasks array
    tasks.push(task);
    
    // Save and render
    saveTasks();
    renderTasks();
    
    // Clear input and refocus
    taskInput.value = '';
    taskInput.focus();
}

/**
 * Delete a task by ID
 * @param {number} id - The task ID to delete
 */
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

/**
 * Toggle task completion status
 * @param {number} id - The task ID to toggle
 */
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

/**
 * Clear all completed tasks
 */
function clearCompleted() {
    const hasCompleted = tasks.some(task => task.completed);
    
    if (hasCompleted) {
        if (confirm('Are you sure you want to clear all completed tasks?')) {
            tasks = tasks.filter(task => !task.completed);
            saveTasks();
            renderTasks();
        }
    }
}

// ===================================
// DATA PERSISTENCE
// ===================================

/**
 * Save tasks to localStorage
 */
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ===================================
// UI UPDATE FUNCTIONS
// ===================================

/**
 * Update task statistics display
 */
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('activeTasks').textContent = active;
    document.getElementById('completedTasks').textContent = completed;

    // Show/hide clear completed button
    clearSection.style.display = completed > 0 ? 'block' : 'none';
}

/**
 * Render all tasks based on current filter
 */
function renderTasks() {
    // Clear existing tasks
    taskList.innerHTML = '';

    // Filter tasks based on current filter
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all' filter
    });

    // Display empty state if no tasks
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                </svg>
                <p>${getEmptyStateMessage()}</p>
            </div>
        `;
    } else {
        // Render each task
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="toggleTask(${task.id})"
                     role="checkbox"
                     aria-checked="${task.completed}"
                     tabindex="0">
                </div>
                <span class="task-text">${escapeHtml(task.text)}</span>
                <button class="delete-btn" 
                        onclick="deleteTask(${task.id})"
                        aria-label="Delete task">
                    Delete
                </button>
            `;
            taskList.appendChild(li);
        });
    }

    // Update statistics
    updateStats();
}

/**
 * Get appropriate empty state message based on filter
 * @returns {string} The empty state message
 */
function getEmptyStateMessage() {
    switch(currentFilter) {
        case 'active':
            return 'No active tasks. Great job!';
        case 'completed':
            return 'No completed tasks yet';
        default:
            return 'No tasks yet. Add one above!';
    }
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} The escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Change the current filter
 * @param {string} filter - The filter to apply ('all', 'active', or 'completed')
 */
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderTasks();
}

// ===================================
// EVENT LISTENERS
// ===================================

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Filter button clicks
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// Clear completed button click
clearCompletedBtn.addEventListener('click', clearCompleted);

// ===================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// (Required for inline onclick handlers)
// ===================================

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

// ===================================
// START APPLICATION
// ===================================

initApp();