# OpenSiS Quick Start Guide

Get up and running with OpenSiS in minutes!

## Prerequisites

- Node.js 18+ and npm 9+
- Basic knowledge of React
- A code editor (VS Code recommended)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/BlacklinkLLC/OpenSiS.git
cd OpenSiS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

## Project Structure

```
OpenSiS/
├── src/
│   ├── framework/
│   │   └── OpenSiS.js          # Core framework
│   ├── modules/
│   │   ├── Dashboard.jsx       # Dashboard module
│   │   ├── Grades.jsx          # Grades module
│   │   ├── Attendance.jsx      # Attendance module
│   │   ├── Schedule.jsx        # Schedule module
│   │   └── Assignments.jsx     # Assignments module
│   ├── styles/
│   │   └── global.css          # Global styles
│   ├── App.jsx                 # Main app component
│   └── index.js                # Entry point
├── config/
│   ├── firebase.example.js     # Firebase config template
│   └── firestore.example.js    # Firestore helpers template
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## Creating Your First Module

### Step 1: Create Module Component

Create a new file `src/modules/MyModule.jsx`:

```jsx
import React, { useState } from 'react';

export default function MyModule() {
  const [data, setData] = useState([]);

  return (
    <div className="nova-container">
      <h1 className="nova-title">My Custom Module</h1>
      <p className="nova-desc">This is my first OpenSiS module!</p>

      <div className="nova-card">
        <h3>Module Content</h3>
        <p>Add your custom functionality here.</p>
      </div>
    </div>
  );
}
```

### Step 2: Register the Module

Add your module to `src/App.jsx`:

```jsx
import MyModule from './modules/MyModule';

// Inside the App component, after other module registrations:
sis.registerModule('mymodule', {
  label: 'My Module',
  icon: '🚀',
  component: MyModule,
  type: 'custom',
  description: 'My first custom module'
});
```

### Step 3: Test Your Module

1. Save the files
2. The dev server will hot-reload
3. Click on your module in the sidebar
4. Your module should appear!

## Using the Framework API

### Get All Modules

```javascript
const modules = sis.getAllModules();
console.log(modules);
```

### Get Modules by Type

```javascript
const standardModules = sis.getModulesByType('standard');
const customModules = sis.getModulesByType('custom');
```

### Check if Module Exists

```javascript
if (sis.hasModule('grades')) {
  console.log('Grades module is registered');
}
```

### Listen to Events

```javascript
const unsubscribe = sis.hook('onModuleRegister', ({ key, module }) => {
  console.log(`New module registered: ${key}`);
});

// Later, unsubscribe:
unsubscribe();
```

### Get Framework Info

```javascript
const info = sis.getInfo();
console.log(`OpenSiS v${info.version} with ${info.moduleCount} modules`);
```

## Styling Your Module

### Using CSS Variables

OpenSiS provides a comprehensive design system through CSS variables:

```jsx
<div style={{
  color: 'var(--text)',
  backgroundColor: 'var(--card-bg)',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-sm)'
}}>
  Styled content
</div>
```

### Common CSS Classes

```jsx
// Card container
<div className="nova-card">
  Card content
</div>

// Section title
<h2 className="nova-section">Section Title</h2>

// Main container
<div className="nova-container">
  Module content
</div>
```

### Available CSS Variables

**Colors:**
- `--primary`, `--primary-light`, `--primary-dark`
- `--success`, `--warning`, `--error`, `--info`
- `--text`, `--text-secondary`, `--text-muted`
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- `--card-bg`, `--border`

**Spacing:**
- `--spacing-xs` (0.25rem)
- `--spacing-sm` (0.5rem)
- `--spacing-md` (1rem)
- `--spacing-lg` (1.5rem)
- `--spacing-xl` (2rem)

**Borders:**
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`

**Shadows:**
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

**Transitions:**
- `--transition`, `--transition-fast`, `--transition-slow`

## Dark Mode Support

Dark mode is automatically handled! Just use CSS variables and your module will support both themes.

Test dark mode by clicking the theme toggle button in the sidebar.

## Firebase Integration (Optional)

### 1. Set Up Firebase

Create a Firebase project at https://console.firebase.google.com

### 2. Configure Firebase

Copy the example config:

```bash
cp config/firebase.example.js config/firebase.js
```

Edit `config/firebase.js` with your Firebase credentials.

### 3. Use Firestore in Modules

```jsx
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function MyModule() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getDocs(collection(db, 'students'));
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchData();
  }, []);

  return (
    // Render data
  );
}
```

## Building for Production

### 1. Build the Project

```bash
npm run build
```

### 2. Preview Production Build

```bash
npm run preview
```

### 3. Deploy

The `dist/` folder contains your production build. Deploy it to:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- Any static hosting service

## Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## Tips & Best Practices

1. **Keep modules independent** - Each module should manage its own state
2. **Use the design system** - Stick to CSS variables for consistent theming
3. **Follow naming conventions** - Use clear, descriptive names
4. **Add JSDoc comments** - Document complex functions
5. **Test both themes** - Ensure your module works in light and dark mode
6. **Keep it responsive** - Test on mobile devices

## Getting Help

- Check the [README.md](README.md) for detailed API documentation
- Read [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Open an issue on GitHub
- Visit https://blacklink.net for more resources

## Next Steps

- Explore existing modules for examples
- Create custom modules for your use case
- Integrate with Firebase for real-time data
- Customize the design system to match your brand
- Share your modules with the community

---

Happy coding! 🎓
