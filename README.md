# To-Do List Application

A modern, feature-rich to-do list application built with HTML, CSS, and JavaScript.

## 📋 Project Overview

This is a simple yet powerful task management application that allows users to create, track, and manage their daily tasks. The application features a clean, modern interface with smooth animations and persistent data storage.

## ✨ Features

- **Add Tasks**: Quickly add new tasks using the input field
- **Complete Tasks**: Mark tasks as completed by clicking the checkbox
- **Delete Tasks**: Remove individual tasks with the delete button
- **Filter Tasks**: View all, active, or completed tasks
- **Clear Completed**: Remove all completed tasks at once
- **Statistics**: Real-time tracking of total, active, and completed tasks
- **Persistent Storage**: Tasks are saved locally and persist after page refresh
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging UI with hover effects and transitions

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, Atom, etc.)

### Installation

1. Create a new folder for your project
2. Copy the three files (index.html, style.css, script.js) into the folder
3. Open `index.html` in your web browser

**OR**

Simply open the `index.html` file directly in any web browser - no server required!

## 📖 User Guide

### Adding a Task
1. Type your task in the input field that says "What needs to be done?"
2. Click the "Add" button or press Enter on your keyboard
3. Your task will appear in the list below

### Completing a Task
1. Click the checkbox next to any task to mark it as completed
2. Completed tasks will appear with a strikethrough and faded appearance
3. Click the checkbox again to mark it as incomplete

### Deleting a Task
1. Click the red "Delete" button next to any task
2. The task will be permanently removed from your list

### Filtering Tasks
- Click "All" to view all tasks
- Click "Active" to view only incomplete tasks
- Click "Completed" to view only completed tasks

### Clearing Completed Tasks
1. Complete one or more tasks
2. A "Clear Completed" button will appear at the bottom
3. Click it to remove all completed tasks at once

### Statistics
The top of the application displays:
- **Total**: Total number of tasks
- **Active**: Number of incomplete tasks
- **Completed**: Number of completed tasks

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Application logic and interactivit

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

### File Structure
```
todo-list-app/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # JavaScript logic and functionality
└── README.md           # Documentation
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
- Primary gradient: Lines 9-10 (body background)
- Button colors: Lines 57-58 (#addBtn)
- Accent colors: Throughout the file

### Modifying Task Limit
The task list has a max-height of 400px with scroll. Change this in `style.css` line 106.

## 🐛 Troubleshooting

**Tasks not saving?**
- Ensure your browser allows localStorage
- Check browser console for errors (F12)

**Styling issues?**
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Ensure all three files are in the same folder

**JavaScript not working?**
- Check that JavaScript is enabled in your browser
- Ensure all files are properly linked in index.html

## 📝 Future Enhancements

Potential features to add:
- Task editing capability
- Due dates and reminders
- Task categories/tags
- Priority levels
- Search functionality
- Export/import tasks
- Dark mode toggle
- Drag and drop reordering

## 👨‍💻 Development

### Code Structure

**HTML (index.html)**
- Semantic HTML5 structure
- Clean, minimal markup
- Accessibility considerations

**CSS (style.css)**
- Mobile-first responsive design
- CSS3 animations and transitions
- Custom scrollbar styling
- Flexbox layout

**JavaScript (script.js)**
- Modular function design
- Event-driven architecture
- LocalStorage integration
- XSS prevention with HTML escaping

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Feel free to fork this project and add your own features! Some ideas:
- Add task editing
- Implement drag-and-drop
- Add task categories


## 💡 Tips for Best Use

1. **Keep tasks specific**: Instead of "Work on project", try "Complete project introduction section"
2. **Break down large tasks**: Split big tasks into smaller, actionable items
3. **Review regularly**: Use the filter to review completed tasks and celebrate progress
4. **Clean up weekly**: Use "Clear Completed" to keep your list fresh

## 📞 Support

For issues or questions:
- Check the Troubleshooting section
- Review the code comments in each file
- Test in a different browser

