# OpenSiS Examples

This directory contains example modules demonstrating various features of the OpenSiS framework.

## Available Examples

### 1. Simple Module (`simple-module.jsx`)

A basic example showing:
- State management with React hooks
- User input handling
- List rendering and manipulation
- Styling with CSS variables
- Event handling

**How to use:**

1. Import the module in your `src/App.jsx`:
```jsx
import SimpleModule from '../examples/simple-module';
```

2. Register it with the framework:
```jsx
sis.registerModule('simple', {
  label: 'Simple Example',
  icon: '📝',
  component: SimpleModule,
  type: 'custom',
  description: 'A simple example module'
});
```

3. The module will appear in your sidebar navigation

## Creating Your Own Examples

Feel free to add your own example modules to this directory! Follow these guidelines:

1. **Keep it focused** - Each example should demonstrate specific features
2. **Add comments** - Explain what the code does
3. **Use best practices** - Follow React and OpenSiS conventions
4. **Document it** - Update this README with your example

## Example Template

```jsx
import React from 'react';

export default function MyExample() {
  return (
    <div className="nova-container">
      <h1 className="nova-title">My Example</h1>
      <p className="nova-desc">Description of what this example demonstrates</p>

      <div className="nova-card">
        {/* Your content here */}
      </div>
    </div>
  );
}
```

## Common Patterns

### State Management
```jsx
const [data, setData] = useState([]);
```

### Effect Hooks
```jsx
useEffect(() => {
  // Load data, subscribe to events, etc.
  return () => {
    // Cleanup
  };
}, []);
```

### Event Handling
```jsx
const handleClick = () => {
  // Handle event
};
```

### Styling
```jsx
<div style={{
  color: 'var(--text)',
  backgroundColor: 'var(--card-bg)',
  padding: 'var(--spacing-md)'
}}>
  Content
</div>
```

## Contributing Examples

If you've created a useful example module:

1. Add it to this directory
2. Update this README
3. Submit a pull request
4. Share with the community!

---

For more information, see the main [README](../README.md) and [QUICKSTART](../QUICKSTART.md) guides.
