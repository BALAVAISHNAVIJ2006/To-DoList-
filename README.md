# TaskMaster Pro - To-Do List Application

A modern, feature-rich to-do list application built with HTML, CSS, and JavaScript.

---

## 📋 Project Overview

TaskMaster Pro is a powerful yet simple task management application that helps users organize their daily tasks with style and efficiency. Built with pure HTML, CSS, and JavaScript, it features a beautiful modern interface with advanced functionality including priority levels, categories, due dates, drag-and-drop reordering, and dark mode support.

The application is lightweight, fast, and requires no server or installation - just open and start organizing!

---

## ✨ Features

### Core Task Management
- **Add Tasks**: Quickly add new tasks with the input field and press Enter
- **Complete Tasks**: Mark tasks as done by clicking the checkbox
- **Edit Tasks**: Modify existing tasks with the edit button
- **Delete Tasks**: Remove individual tasks with confirmation
- **Drag & Drop**: Reorder tasks by dragging them into position

### Advanced Features
- **Priority Levels**: Mark tasks as High (red), Medium (orange), or Low (green) priority
- **Categories**: Organize tasks with Work, Personal, or Urgent tags
- **Due Dates & Times**: Set specific deadlines for tasks with overdue warnings
- **Search**: Real-time search to find tasks instantly
- **Filter Tasks**: View all, active, completed, or high-priority tasks
- **Dark Mode**: Toggle between light and dark themes
- **Statistics**: Real-time tracking with visual progress bar
- **Keyboard Shortcuts**: Speed up your workflow with hotkeys

### Technical Features
- **Persistent Storage**: Tasks saved locally using localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Engaging UI with delightful transitions
- **No Dependencies**: Pure vanilla JavaScript, no frameworks needed
- **Offline Support**: Works completely offline

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- A code editor (optional, for customization)

### Installation

1. **Create a new folder** for your project:
   ```
   mkdir taskmaster-pro
   cd taskmaster-pro
   ```

2. **Copy the files** into the folder:
   - `index.html` - Main HTML structure
   - `style.css` - All styling and animations
   - `script.js` - JavaScript logic and functionality

3. **Open `index.html`** in your web browser:
   - Double-click the file, OR
   - Right-click → Open with → Your preferred browser

**That's it!** No installation, no server, no build process required.

---

## 📖 User Guide

### Adding a Task

1. Type your task in the input field at the top
2. Select a **priority level** (Low/Medium/High)
3. Choose a **category** (Work/Personal/Urgent)
4. Optionally set a **due date** and **time**
5. Press **Enter** or click **"Add Task"**

**Tip**: You can quickly add tasks by just typing and pressing Enter - the default settings (Medium priority, Work category) will be used.

### Completing a Task

- Click the **checkbox** next to any task
- Completed tasks appear faded with strikethrough text
- Click the checkbox again to mark as incomplete

### Editing a Task

1. Click the **"Edit"** button on any task
2. Modify the text in the prompt dialog
3. Click OK to save changes

### Deleting a Task

1. Click the red **"Delete"** button
2. Confirm the deletion in the popup
3. Task is permanently removed

### Reordering Tasks

- **Drag** any task by clicking and holding
- **Move** it to the desired position
- **Drop** to set the new order
- Changes are saved automatically

### Filtering Tasks

Use the filter buttons to view different task sets:

- **All**: Shows all tasks (default)
- **Active**: Only shows incomplete tasks
- **Completed**: Only shows finished tasks
- **High Priority**: Only shows high-priority tasks

### Searching Tasks

- Type in the **search bar** to filter tasks by text
- Search works in real-time across all task content
- Combine with filters for powerful search capabilities

### Dark Mode

- Click the **"🌓 Theme"** button in the top-right
- Toggle between light and dark modes
- Your preference is saved automatically

### Keyboard Shortcuts

- `Enter` - Add task (when input field is focused)
- `Ctrl + F` or `Cmd + F` - Focus search bar
- `Ctrl + D` or `Cmd + D` - Toggle dark mode

### Statistics Dashboard

The statistics cards at the top show:

- **Total Tasks**: All tasks in your list
- **Completed**: Number of finished tasks
- **Active**: Number of pending tasks
- **Progress Bar**: Visual completion percentage

---

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Grid, Flexbox, animations, CSS variables
- **JavaScript (ES6+)**: Pure vanilla JavaScript, no frameworks
- **LocalStorage API**: Client-side data persistence

### Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |
| Opera   | 76+     | ✅ Full |

### File Structure

```
taskmaster-pro/
│
├── index.html          # Main HTML structure (3 KB)
├── style.css           # All styling and animations (15 KB)
├── script.js           # JavaScript logic and functionality (12 KB)
└── README.md           # This documentation file
```

### Data Storage

Tasks are stored in **localStorage** as JSON with this structure:

```javascript
{
  id: 1234567890,              // Unique timestamp ID
  text: "Task description",    // Task text
  completed: false,            // Completion status
  priority: "medium",          // Priority: low/medium/high
  category: "work",            // Category: work/personal/urgent
  dueDate: "2024-12-15",      // Optional due date
  dueTime: "14:30",           // Optional due time
  createdAt: "2024-12-06..."  // Creation timestamp
}
```

---

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `style.css` (lines 11-25):

```css
:root {
    --primary: #6366f1;      /* Main brand color (blue) */
    --secondary: #ec4899;    /* Accent color (pink) */
    --success: #10b981;      /* Success/low priority (green) */
    --warning: #f59e0b;      /* Warning/medium priority (orange) */
    --danger: #ef4444;       /* Danger/high priority (red) */
}
```

### Adding New Categories

1. In `index.html`, add a new option to the category select (line ~80):
   ```html
   <option value="yourcategory">Your Category</option>
   ```

2. In `style.css`, add styling for the category (around line 400):
   ```css
   .category-yourcategory {
       background: #e0f2fe;
       color: #075985;
   }
   ```

### Modifying Task List Height

Change the `max-height` in `style.css` (line 265):

```css
#taskList {
    max-height: 500px;  /* Change this value */
}
```

---

## 🐛 Troubleshooting

### Tasks Not Saving?

**Problem**: Tasks disappear when closing browser

**Solutions**:
- Ensure localStorage is enabled in browser settings
- Don't use Incognito/Private browsing mode
- Check browser storage quota and clear old data
- Try a different browser

### Drag and Drop Not Working?

**Problem**: Cannot reorder tasks by dragging

**Solutions**:
- Update browser to latest version
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Ensure JavaScript is enabled
- Check browser console for errors (F12)

### Styling Issues?

**Problem**: Layout looks broken or colors are wrong

**Solutions**:
- Hard refresh the page (Ctrl+Shift+R)
- Ensure all three files are in the same folder
- Clear browser cache completely
- Check that `style.css` is properly linked in HTML

### JavaScript Not Working?

**Problem**: Buttons don't respond, tasks don't add

**Solutions**:
- Check JavaScript is enabled in browser
- Open browser console (F12) and check for errors
- Ensure `script.js` is in the same folder
- Verify the script tag in HTML is correct

### Dark Mode Not Persisting?

**Problem**: Theme resets to light mode on reload

**Solutions**:
- Check localStorage is enabled
- Clear browser cache and try again
- Manually toggle theme once more

---

## 📝 Future Enhancements

Potential features for upcoming versions:

**Version 1.1**
- [ ] Task notes and descriptions
- [ ] Export tasks to JSON/CSV
- [ ] Import tasks from file
- [ ] Task attachments

**Version 1.2**
- [ ] Recurring tasks (daily, weekly, monthly)
- [ ] Sub-tasks and checklists
- [ ] Task templates
- [ ] Multiple task lists

**Version 2.0**
- [ ] Optional cloud sync
- [ ] Team collaboration features
- [ ] Mobile app (iOS/Android)
- [ ] Task sharing capabilities

---

## 👨‍💻 Development

### Code Structure

**HTML (`index.html`)**
- Semantic HTML5 structure
- Accessibility attributes (ARIA labels)
- Clean, minimal markup
- Well-organized sections

**CSS (`style.css`)**
- CSS Grid and Flexbox layouts
- CSS Variables for theming
- Mobile-first responsive design
- Smooth animations and transitions
- Custom scrollbar styling
- Dark mode support

**JavaScript (`script.js`)**
- Modular function design
- Event-driven architecture
- LocalStorage integration
- Drag and Drop API
- XSS prevention with HTML escaping
- Well-commented code

### Key Functions

- `addTask()` - Creates and adds new task
- `toggleTask(id)` - Toggles completion status
- `deleteTask(id)` - Removes task with confirmation
- `editTask(id)` - Modifies existing task
- `renderTasks()` - Updates UI display
- `saveTasks()` - Persists data to localStorage
- `setFilter(filter)` - Changes active filter
- `toggleTheme()` - Switches dark/light mode

---

## 📄 License

This project is **open source** and available for personal and commercial use.

**MIT License** - Feel free to use, modify, and distribute.

---

## 🤝 Contributing

Feel free to fork this project and add your own features! Some ideas:

- Add task priority sorting
- Implement task categories with custom colors
- Add task notes/descriptions
- Create task templates
- Add data export/import
- Implement task sharing

---

## 💡 Tips for Best Use

### Organization Tips
- **Be Specific**: Instead of "Work on project", write "Complete project introduction section"
- **Break Down Tasks**: Split large tasks into smaller, actionable items
- **Use Categories**: Separate work tasks from personal tasks
- **Set Priorities**: Not everything is high priority - be selective

### Productivity Tips
- **Start Small**: Begin with 3-5 tasks per day
- **Use Due Dates**: Deadlines help maintain focus
- **Review Daily**: Check your tasks every morning
- **Clear Completed**: Remove finished tasks regularly
- **Drag to Prioritize**: Put most important tasks at the top

### Workflow Tips
- **Keyboard Shortcuts**: Use Ctrl+F and Enter for faster workflow
- **Dark Mode**: Use dark mode in evening to reduce eye strain
- **Search Feature**: Use search to find old tasks quickly
- **Filter Views**: Switch between views to focus on what matters

---

## 📞 Support

### Getting Help

For issues or questions:

1. **Check this README** - Most answers are here
2. **Review Troubleshooting** - Common issues and solutions
3. **Check Browser Console** - Press F12 to see errors
4. **Try Different Browser** - Test in Chrome, Firefox, or Edge
5. **Clear Cache** - Often fixes display issues

### Useful Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference
- [LocalStorage Guide](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Understanding data storage
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - Layout help

---

## 🎓 Learning Resources

Want to understand how TaskMaster Pro works? Study these concepts:

- **JavaScript ES6+**: Arrow functions, template literals, destructuring
- **LocalStorage API**: Client-side data persistence
- **Drag and Drop API**: HTML5 drag and drop events
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Variables**: Dynamic theming
- **Responsive Design**: Mobile-first approach

---

## 📊 Project Statistics

- **Total Lines of Code**: ~2,000+
- **Files**: 3 (HTML, CSS, JS)
- **Dependencies**: 0 (pure vanilla)
- **File Size**: ~30 KB total
- **Load Time**: < 100ms
- **Performance**: 60fps animations

---

## 🌟 Acknowledgments

**Created with ❤️ for productivity enthusiasts**

Special thanks to:
- Modern web standards (HTML5, CSS3, ES6+)
- The developer community for inspiration
- Everyone who uses TaskMaster Pro

---

## 📝 Changelog

### Version 1.0.0 (Current - December 2024)

**Initial Release**
- ✅ Complete task management (add, edit, delete, complete)
- ✅ Priority levels (high, medium, low)
- ✅ Category system (work, personal, urgent)
- ✅ Due dates and times with overdue warnings
- ✅ Real-time search functionality
- ✅ Multiple filter options
- ✅ Drag and drop reordering
- ✅ Dark mode support
- ✅ Visual progress tracking
- ✅ Keyboard shortcuts
- ✅ Fully responsive design
- ✅ LocalStorage persistence
- ✅ Smooth animations

---

**Thank you for choosing TaskMaster Pro!**

Stay organized, stay productive! ✨📝✅

---

*Last Updated: December 2024*  
*Version: 1.0.0*  
*Status: Active*
