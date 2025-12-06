// ===================================
// APPLICATION STATE
// ===================================

let tasks = [];
let currentFilter = 'all';
let searchQuery = '';
let draggedElement = null;

// ===================================
// DOM ELEMENT REFERENCES
// ===================================

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const prioritySelect = document.getElementById('prioritySelect');
const categorySelect = document.getElementById('categorySelect');
const dueDateInput = document.getElementById('dueDateInput');
const dueTimeInput = document.getElementById('dueTimeInput');

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize the application
 * Load saved tasks and theme from localStorage
 */
function init() {
    // Load saved tasks
    const savedTasks = localStorage.getItem('tasksPro');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    
    // Load and apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Render initial tasks
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
    if (!text) {
        taskInput.classList.add('shake');
        setTimeout(() => taskInput.classList.remove('shake'), 500);
        return;
    }

    // Create new task object
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        priority: prioritySelect.value,
        category: categorySelect.value,
        dueDate: dueDateInput.value,
        dueTime: dueTimeInput.value,
        createdAt: new Date().toISOString()
    };

    // Add to beginning of tasks array
    tasks.unshift(task);
    
    // Save and render
    saveTasks();
    renderTasks();
    
    // Clear inputs and refocus
    taskInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
    taskInput.focus();
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
 * Delete a task by ID
 * @param {number} id - The task ID to delete
 */
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

/**
 * Edit a task's text
 * @param {number} id - The task ID to edit
 */
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt('Edit task:', task.text);
    if (newText && newText.trim()) {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// ===================================
// DATA PERSISTENCE
// ===================================

/**
 * Save tasks to localStorage
 */
function saveTasks() {
    localStorage.setItem('tasksPro', JSON.stringify(tasks));
}

// ===================================
// RENDERING FUNCTIONS
// ===================================

/**
 * Render all tasks based on current filter and search
 */
function renderTasks() {
    // Filter tasks based on current filter and search query
    const filteredTasks = tasks.filter(task => {
        // Apply filter
        const matchesFilter = 
            currentFilter === 'all' ? true :
            currentFilter === 'active' ? !task.completed :
            currentFilter === 'completed' ? task.completed :
            currentFilter === 'high' ? task.priority === 'high' : true;
        
        // Apply search
        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });

    // Clear existing tasks
    taskList.innerHTML = '';

    // Display empty state if no tasks
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                </svg>
                <h3>No tasks found</h3>
                <p>${getEmptyMessage()}</p>
            </div>
        `;
    } else {
        // Render each task
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.draggable = true;
            li.dataset.id = task.id;

            const dueInfo = getDueInfo(task);
            
            li.innerHTML = `
                <div class="priority-indicator priority-${task.priority}"></div>
                <div class="checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="toggleTask(${task.id})"
                     role="checkbox"
                     aria-checked="${task.completed}"
                     tabindex="0"></div>
                <div class="task-content">
                    <div class="task-text">${escapeHtml(task.text)}</div>
                    <div class="task-meta">
                        <span class="category-tag category-${task.category}">${task.category}</span>
                        ${dueInfo ? `<span class="due-date ${dueInfo.overdue ? 'overdue' : ''}">📅 ${dueInfo.text}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="action-btn edit-btn" 
                            onclick="editTask(${task.id})"
                            aria-label="Edit task">Edit</button>
                    <button class="action-btn delete-btn" 
                            onclick="deleteTask(${task.id})"
                            aria-label="Delete task">Delete</button>
                </div>
            `;

            // Add drag and drop event listeners
            li.addEventListener('dragstart', handleDragStart);
            li.addEventListener('dragover', handleDragOver);
            li.addEventListener('drop', handleDrop);
            li.addEventListener('dragend', handleDragEnd);

            taskList.appendChild(li);
        });
    }

    // Update statistics
    updateStats();
}

/**
 * Get appropriate empty state message based on current filter
 * @returns {string} The empty state message
 */
function getEmptyMessage() {
    if (searchQuery) return 'No tasks match your search';
    if (currentFilter === 'completed') return 'No completed tasks yet';
    if (currentFilter === 'active') return 'All tasks completed! 🎉';
    if (currentFilter === 'high') return 'No high priority tasks';
    return 'Add your first task to get started';
}

/**
 * Get due date information for a task
 * @param {Object} task - The task object
 * @returns {Object|null} Due date info or null
 */
function getDueInfo(task) {
    if (!task.dueDate) return null;

    const now = new Date();
    const due = new Date(task.dueDate + (task.dueTime ? 'T' + task.dueTime : ''));
    const diff = due - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    let text = '';
    if (days < 0) {
        text = `Overdue by ${Math.abs(days)}d`;
    } else if (days === 0) {
        text = 'Due today';
    } else if (days === 1) {
        text = 'Due tomorrow';
    } else {
        text = `Due in ${days}d`;
    }

    return { text, overdue: diff < 0 };
}

/**
 * Update statistics display
 */
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const progress = total > 0 ? (completed / total) * 100 : 0;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('activeTasks').textContent = active;
    document.getElementById('progressFill').style.width = progress + '%';
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

// ===================================
// DRAG AND DROP FUNCTIONS
// ===================================

/**
 * Handle drag start event
 * @param {DragEvent} e - The drag event
 */
function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

/**
 * Handle drag over event
 * @param {DragEvent} e - The drag event
 */
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) {
        taskList.appendChild(draggedElement);
    } else {
        taskList.insertBefore(draggedElement, afterElement);
    }
}

/**
 * Handle drop event
 * @param {DragEvent} e - The drag event
 */
function handleDrop(e) {
    e.stopPropagation();
    reorderTasks();
}

/**
 * Handle drag end event
 * @param {DragEvent} e - The drag event
 */
function handleDragEnd(e) {
    this.classList.remove('dragging');
}

/**
 * Get the element after which the dragged element should be placed
 * @param {HTMLElement} container - The container element
 * @param {number} y - The Y coordinate
 * @returns {HTMLElement|null} The element to insert before
 */
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

/**
 * Reorder tasks array based on current DOM order
 */
function reorderTasks() {
    const newOrder = [...taskList.children].map(li => 
        parseInt(li.dataset.id)
    );
    
    tasks = newOrder.map(id => tasks.find(t => t.id === id)).filter(Boolean);
    saveTasks();
}

// ===================================
// FILTER AND SEARCH FUNCTIONS
// ===================================

/**
 * Set the current filter
 * @param {string} filter - The filter to apply
 */
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    renderTasks();
}

/**
 * Handle search input
 * @param {string} query - The search query
 */
function handleSearch(query) {
    searchQuery = query;
    renderTasks();
}

// ===================================
// THEME FUNCTIONS
// ===================================

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

/**
 * Toggle keyboard shortcuts help display
 */
function toggleKeyboardHelp() {
    const helpElement = document.getElementById('keyboardHelp');
    helpElement.style.display = helpElement.style.display === 'none' ? 'block' : 'none';
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

// Search input listener
searchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
});

// Filter button listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Ctrl/Cmd + D to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
});

// ===================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// (Required for inline onclick handlers)
// ===================================

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.editTask = editTask;
window.toggleTheme = toggleTheme;
window.toggleKeyboardHelp = toggleKeyboardHelp;

// ===================================
// START APPLICATION
// ===================================

init();
