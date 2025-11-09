# Prima Dash

A user management dashboard built with React and TypeScript.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Lint the code

## Tech Stack

### Core

- **React 19** - Latest version with improved performance
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server

### Styling

- **CSS Modules** - Scoped styling without conflicts
- No external UI library - keeps bundle size small and gives full control

### Testing

- **Vitest** - Fast unit testing that works nicely with Vite
- **React Testing Library** - Testing components the way users interact with them

### Code Quality

- **Prettier** - Consistent code formatting
- **Husky + lint-staged** - Runs checks before commits

## Why These Choices?

**React 19** - Staying current with the latest features and improvements.

**TypeScript** - Catches bugs early and makes refactoring easier. The type safety is especially helpful when working with API data.

**CSS Modules** - Simple, performant, and no extra dependencies. Works great for component-scoped styles.

**Custom hooks (useQuery, useDebounce, usePagination)** - Reusable logic without pulling in heavy libraries. Keeps the bundle small and code easier to understand.

**Feature-based folder structure** - Groups related files together (components, hooks, types, tests). Makes it easier to find things as the app grows.

## Features

- Search and filter users
- Pagination with responsive controls
- User detail modal with keyboard navigation
- Mobile-responsive design
- Basic error handling and loading states

## TODOs

- Simple small caching so we're not refetching same user data unnecessarily
- Accessibility for the user modal
- Light/Dark theme toggle
