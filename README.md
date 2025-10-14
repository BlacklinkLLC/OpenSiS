# OpenSiS

An open-source Student Information System framework built on React.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-GPL-green)
![React](https://img.shields.io/badge/react-18%2B-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)

## Overview

OpenSiS is a lightweight, plugin-based framework designed to help developers, schools, and educational institutions build their own custom student information systems. Unlike monolithic SiS solutions, OpenSiS provides the core infrastructure while allowing complete flexibility in module implementation and customization.

### Key Features

- **🧩 Plugin Architecture** — Register and manage modules dynamically at runtime
- **⚡ Lightweight & Fast** — Minimal dependencies, optimized for performance
- **🎨 Framework Agnostic Styling** — Build with your own design system
- **🔌 Hook System** — React to system events (module registration, data changes, etc.)
- **📦 Type-Safe** — Built with modular design principles
- **🚀 Production-Ready** — Used by Blacklink Education's official SiS client
- **🌐 Extensible** — Add custom modules without modifying core code

## Installation

### Via NPM (Coming Soon)

```bash
npm install openesis
```

### Manual Setup

1. Download the framework from the repository
2. Copy the `OpenSiS` class into your project
3. Initialize and register modules

```javascript
import { OpenSiS } from './openesis';

const sis = new OpenSiS();
```

## Quick Start

### 1. Initialize the Framework

```javascript
import OpenSiS from './openesis';

const sis = new OpenSiS();
```

### 2. Create a Module

```javascript
function GradesModule() {
  return (
    <div>
      <h2>📝 Grades</h2>
      <p>Student grades and performance tracking</p>
    </div>
  );
}
```

### 3. Register the Module

```javascript
sis.registerModule('grades', {
  label: 'Grades',
  icon: '📝',
  component: GradesModule,
  type: 'standard',
  description: 'Track student grades and performance'
});
```

### 4. Use in Your App

```javascript
const modules = sis.getAllModules();

modules.forEach(module => {
  console.log(`${module.icon} ${module.label}`);
  // Render module in your UI
});
```

## API Reference

### SiSFramework Class

#### `registerModule(key, config)`

Register a new module in the framework.

**Parameters:**
- `key` (string) — Unique identifier for the module
- `config` (object) — Module configuration
  - `label` (string) — Display name
  - `icon` (string) — Emoji or icon
  - `component` (React Component) — React component to render
  - `type` (string) — Module type: `'standard'`, `'analytics'`, `'admin'`, `'custom'`
  - `description` (string, optional) — Module description
  - `metadata` (object, optional) — Custom configuration

**Example:**

```javascript
sis.registerModule('attendance', {
  label: 'Attendance',
  icon: '📅',
  component: AttendanceModule,
  type: 'standard',
  description: 'Track attendance and participation',
  metadata: { color: '#667eea' }
});
```

#### `unregisterModule(key)`

Remove a module from the framework.

**Parameters:**
- `key` (string) — Module identifier

**Returns:** `boolean` — True if successful

**Example:**

```javascript
sis.unregisterModule('old-module');
```

#### `getModule(key)`

Retrieve a specific module.

**Parameters:**
- `key` (string) — Module identifier

**Returns:** `Module | undefined`

**Example:**

```javascript
const gradesModule = sis.getModule('grades');
```

#### `getAllModules()`

Get all registered modules.

**Returns:** `Module[]`

**Example:**

```javascript
const allModules = sis.getAllModules();
```

#### `getModulesByType(type)`

Filter modules by type.

**Parameters:**
- `type` (string) — Module type

**Returns:** `Module[]`

**Example:**

```javascript
const analyticsModules = sis.getModulesByType('analytics');
```

#### `hook(eventName, callback)`

Listen to framework events.

**Parameters:**
- `eventName` (string) — Event to listen for
- `callback` (function) — Callback function

**Available Events:**
- `onModuleRegister` — Fired when a module is registered
- `onModuleUnregister` — Fired when a module is unregistered
- `onDataChange` — Fired when data changes (reserved for future use)

**Example:**

```javascript
sis.hook('onModuleRegister', (moduleKey) => {
  console.log(`Module ${moduleKey} was registered`);
});
```

#### `triggerHook(eventName, data)`

Manually trigger a hook event.

**Parameters:**
- `eventName` (string) — Event name
- `data` (any) — Data to pass to callbacks

**Example:**

```javascript
sis.triggerHook('onDataChange', { userId: '123', action: 'grades-updated' });
```

## Module Structure

Each module is an object with the following properties:

```javascript
{
  key: 'unique-identifier',
  label: 'Display Name',
  icon: '📊',
  component: ReactComponent,
  type: 'standard' | 'analytics' | 'admin' | 'custom',
  description: 'Module description',
  metadata: { /* custom config */ }
}
```

### Module Types

- **standard** — Core functionality (Grades, Attendance, Assignments)
- **analytics** — Data analysis and reporting
- **admin** — Administrative tools
- **custom** — Custom implementations

## Building Your First SiS

### Example: Attendance System

```javascript
import React, { useState, useEffect } from 'react';
import OpenSiS from 'openesis';

const sis = new SiSFramework();

// Create Attendance Module
function AttendanceModule() {
  const [attendance, setAttendance] = useState([
    { date: '2025-10-14', status: 'Present' },
    { date: '2025-10-13', status: 'Present' },
    { date: '2025-10-12', status: 'Absent' },
  ]);

  return (
    <div>
      <h2>📅 Attendance</h2>
      <ul>
        {attendance.map((record, i) => (
          <li key={i}>
            {record.date} — <strong>{record.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Register the module
sis.registerModule('attendance', {
  label: 'Attendance',
  icon: '📅',
  component: AttendanceModule,
  type: 'standard',
  description: 'Track attendance and participation'
});

// Create Dashboard
function App() {
  const modules = sis.getAllModules();
  const [activeModule, setActiveModule] = useState('attendance');

  const currentModule = modules.find(m => m.key === activeModule);
  const CurrentComponent = currentModule?.component;

  return (
    <div>
      <header>
        <h1>My SiS</h1>
        <nav>
          {modules.map(module => (
            <button
              key={module.key}
              onClick={() => setActiveModule(module.key)}
            >
              {module.icon} {module.label}
            </button>
          ))}
        </nav>
      </header>
      <main>
        {CurrentComponent && <CurrentComponent />}
      </main>
    </div>
  );
}

export default App;
```

## Integration with Firebase/Firestore

The SiS Framework is designed to work seamlessly with Firebase and Firestore for real-time data management.

### Firestore Structure

```
students/
  └── studentID123/
      ├── name: "Jane Doe"
      ├── email: "jane@school.edu"
      ├── courses: ["math101", "phys201"]
      └── gpa: 3.8

assignments/
  └── assignmentID1/
      ├── course: "math101"
      ├── title: "Problem Set 7"
      ├── dueDate: "2025-10-18"
      └── progress: 60

modules/
  └── grades/
      ├── title: "Grades"
      ├── icon: "📝"
      └── type: "standard"
```

### Example: Fetching Data from Firestore

```javascript
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase-config';

function GradesModule() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'grades'),
      (snapshot) => {
        const gradeList = snapshot.docs.map(doc => doc.data());
        setGrades(gradeList);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div>
      <h2>📝 Grades</h2>
      {grades.map(grade => (
        <div key={grade.id}>{grade.course}: {grade.grade}</div>
      ))}
    </div>
  );
}

// Register with Firestore integration
sis.registerModule('grades', {
  label: 'Grades',
  icon: '📝',
  component: GradesModule,
  type: 'standard'
});
```

## Hook Events Example

```javascript
// Listen for new modules
sis.hook('onModuleRegister', (moduleKey) => {
  console.log(`✅ Module registered: ${moduleKey}`);
});

// Listen for removed modules
sis.hook('onModuleUnregister', (moduleKey) => {
  console.log(`❌ Module unregistered: ${moduleKey}`);
});

// Listen for data changes
sis.hook('onDataChange', (data) => {
  console.log('Data updated:', data);
  // Trigger UI updates, notifications, etc.
});
```

## Best Practices

### 1. Module Isolation

Keep modules self-contained and independent. Each module should manage its own state and data fetching.

```javascript
// ✅ Good - Module manages its own state
function GradesModule() {
  const [grades, setGrades] = useState([]);
  // ...
}

// ❌ Bad - Module depends on external state
function GradesModule({ grades }) { // Avoid prop drilling
  // ...
}
```

### 2. Consistent Module Config

Always provide `label`, `icon`, `component`, and `type` when registering modules.

```javascript
// ✅ Complete config
sis.registerModule('grades', {
  label: 'Grades',
  icon: '📝',
  component: GradesModule,
  type: 'standard',
  description: 'View and manage student grades'
});

// ❌ Incomplete config
sis.registerModule('grades', {
  component: GradesModule
});
```

### 3. Error Handling

Handle cases where modules might fail to load.

```javascript
const currentModule = modules.find(m => m.key === activeModule);
if (!currentModule) {
  return <div>Module not found</div>;
}

const CurrentComponent = currentModule.component;
return <CurrentComponent />;
```

### 4. Performance Optimization

Use React.memo for module components to prevent unnecessary re-renders.

```javascript
const GradesModule = React.memo(() => {
  // Component code
});
```

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

SiS Framework is licensed under the GPL License. See [License](https://www.gnu.org/licenses/gpl-3.0.en.html) for details.

## Support & Community

- **GitHub Issues** — Report bugs and request features
- **Discussions** — Share ideas and ask questions
- **Documentation** — Read the full docs at [docs.openesis.dev](https://docs.openesis.dev)
- **Blacklink Website** — [blacklink.net](https://blacklink.net)

## Built With

- **React** 18+
- **JavaScript** (ES6+)
- **Firebase** (optional)
- **Firestore** (optional)

## Changelog

### v1.0.0 (2025-10-14)

- Initial release
- Core framework with module registry
- Hook system for extensibility
- Documentation and examples
- GPL License

## Roadmap

- [ ] TypeScript support
- [ ] Module marketplace
- [ ] Advanced analytics
- [ ] Real-time collaboration
- [ ] Mobile app support
- [ ] API standardization

## Acknowledgments

OpenSiS is built and maintained by [Blacklink Education](https://blacklink.net) with contributions from the open-source community. We believe in transparent, flexible, and accessible educational technology for everyone.

---

**Made with ❤️ by Blacklink Education**

**GitHub:** [github.com/BlacklinkLLC/openesis](https://github.com/BlacklinkLLC/OpenSiS/)
**Website:** [blacklink.net](https://blacklink.net)  
**Documentation:** Coming soooon 
**Email:** [contact@blacklink.net](mailto:contact@blacklink.net)
