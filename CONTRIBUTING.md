# Contributing to OpenSiS

Thank you for your interest in contributing to OpenSiS! This document provides guidelines for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and professional in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/OpenSiS.git
   cd OpenSiS
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards

3. Run linting and formatting:
   ```bash
   npm run lint:fix
   npm run format
   ```

4. Test your changes thoroughly

5. Commit your changes:
   ```bash
   git commit -m "feat: add new feature description"
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add dark mode support to dashboard
fix: resolve module registration bug
docs: update API reference for hooks
```

## Code Standards

### JavaScript/React

- Use ES6+ syntax
- Follow React best practices and hooks guidelines
- Keep components small and focused
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Styling

- Use CSS variables defined in `global.css`
- Follow the existing design system
- Ensure responsive design works on mobile devices
- Test both light and dark modes

### File Organization

```
src/
├── framework/      # Core framework code
├── modules/        # Module components
├── styles/         # Global styles
└── utils/          # Utility functions
```

## Pull Request Process

1. **Update documentation** if you've made changes to the API
2. **Ensure all checks pass** (linting, formatting)
3. **Write a clear PR description** explaining:
   - What changes you made
   - Why you made them
   - How to test them
4. **Reference any related issues** using `#issue-number`
5. **Request review** from maintainers

### PR Title Format

Use the same format as commit messages:
```
feat: add dark mode toggle to settings
fix: resolve hook unsubscribe memory leak
```

## Creating New Modules

When creating a new module for OpenSiS:

1. Create a new file in `src/modules/YourModule.jsx`
2. Export a React component
3. Use the existing design system (CSS variables)
4. Register the module in `src/App.jsx`

Example:
```jsx
import React from 'react';

export default function YourModule() {
  return (
    <div className="nova-container">
      <h1 className="nova-title">Your Module</h1>
      <p className="nova-desc">Module description</p>
      {/* Module content */}
    </div>
  );
}
```

## Testing

While we don't currently have automated tests, please manually test:

- Module registration and unregistration
- Hook system functionality
- Dark mode compatibility
- Responsive design on different screen sizes
- Error handling

## Documentation

When adding new features:

1. Update the README.md if needed
2. Add JSDoc comments to new functions
3. Create examples in the `examples/` directory if applicable
4. Update API documentation

## Questions?

If you have questions or need help:

- Open an issue on GitHub
- Check existing issues and discussions
- Contact the maintainers at contact@blacklink.net

## License

By contributing to OpenSiS, you agree that your contributions will be licensed under the GPL-3.0 License.

---

Thank you for contributing to OpenSiS!
