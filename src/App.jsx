import React, { useState } from 'react';
import { SiSFramework } from './framework/OpenSiS';
import Dashboard from './modules/Dashboard';
import Grades from './modules/Grades';
import Attendance from './modules/Attendance';
import Schedule from './modules/Schedule';
import Assignments from './modules/Assignments';

// Initialize the OpenSiS Framework
const sis = new SiSFramework();

// Register all modules
sis.registerModule('dashboard', {
  label: 'Dashboard',
  icon: '📊',
  component: Dashboard,
  type: 'standard',
  description: 'Overview of student information and statistics',
});

sis.registerModule('grades', {
  label: 'Grades',
  icon: '📝',
  component: Grades,
  type: 'standard',
  description: 'View and manage student grades',
});

sis.registerModule('attendance', {
  label: 'Attendance',
  icon: '📅',
  component: Attendance,
  type: 'standard',
  description: 'Track student attendance records',
});

sis.registerModule('schedule', {
  label: 'Schedule',
  icon: '🕐',
  component: Schedule,
  type: 'standard',
  description: 'View class schedules and timetables',
});

sis.registerModule('assignments', {
  label: 'Assignments',
  icon: '📚',
  component: Assignments,
  type: 'standard',
  description: 'Manage coursework and assignments',
});

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const modules = sis.getAllModules();
  const currentModule = sis.getModule(activeModule);
  const CurrentComponent = currentModule?.component;

  // Toggle dark mode
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🎓</span>
            {!sidebarCollapsed && <span className="logo-text">OpenSiS</span>}
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {modules.map(module => (
            <button
              key={module.key}
              onClick={() => setActiveModule(module.key)}
              className={`nav-item ${activeModule === module.key ? 'active' : ''}`}
              title={sidebarCollapsed ? module.label : ''}
            >
              <span className="nav-icon">{module.icon}</span>
              {!sidebarCollapsed && <span className="nav-label">{module.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
            {!sidebarCollapsed && <span>{darkMode ? 'Light' : 'Dark'}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="header-info">
            <h1 className="page-title">{currentModule?.label}</h1>
            {currentModule?.description && (
              <p className="page-description">{currentModule.description}</p>
            )}
          </div>
          <div className="header-actions">
            <div className="user-info">
              <span className="user-name">Student Portal</span>
              <div className="user-avatar">👤</div>
            </div>
          </div>
        </header>

        <div className="content-body">
          {CurrentComponent ? (
            <CurrentComponent />
          ) : (
            <div className="error-state">
              <h2>Module not found</h2>
              <p>The requested module could not be loaded.</p>
            </div>
          )}
        </div>

        <footer className="content-footer">
          <p>OpenSiS Framework v1.0.0 - Built with ❤️ by Blacklink Education</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
