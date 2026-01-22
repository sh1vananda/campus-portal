# University Campus Portal - Developer Documentation

A high-performance, minimalist boilerplate built with React, Vite, and Tailwind CSS.

---

## Quick Start

1.  **Install Dependencies**: `npm install`
2.  **Run Dev Server**: `npm run dev`
3.  **Open Browser**: Visit `http://localhost:5173`

---

## Codebase Architecture

The project follows a modular structure to ensure isolated development environments for multiple contributors.

```text
src/
├── components/          # UI Components
│   ├── common/          # Global elements (Header, Sidebar, Footer)
│   └── layout/          # Structural parts (AppLayout, PageHeader)
├── context/             # Authentication & Global State
│   └── AuthContext.jsx  # Role-based identity management
├── pages/               # Feature-specific pages
│   ├── Login.jsx        # Unified login gateway
│   ├── Home.jsx         # Student perspective
│   ├── FacultyHome.jsx  # Teacher perspective
│   └── ... (modules)
├── routes/              # Routing configuration
│   └── AppRoutes.jsx    # Protected paths & role checks
├── App.jsx              # Context Provider & Router Root
└── index.css            # Tailwind V4 entry and custom scrollbars
```

---

## Auth & Role Integration

The system includes a placeholder **Authentication System** to support future Student and Faculty portals.

### 1. Unified Login (Login.jsx)
A centralized login page that allows toggling between Student and Faculty roles. The login logic currently resides in `AuthContext.jsx` as a mock implementation.

### 2. Protected Routes
The application uses a `ProtectedRoute` wrapper in `AppRoutes.jsx`. If a user is not authenticated, they are automatically redirected to the `/login` page.

### 3. Role-Based Views
- **Student View**: When logged in as a student, the index route (`/`) loads `Home.jsx`.
- **Faculty View**: When logged in as faculty, the index route (`/`) loads `FacultyHome.jsx`.
- **Context Access**: Use the `useAuth()` hook to access `user.name`, `user.role`, and the `logout` function anywhere in the app.

---

## Detailed Component Breakdown

### 1. Global Shell (AppLayout.jsx)
The `AppLayout` is the parent wrapper. It orchestrates the positioning of the Header, Sidebar, and Footer. 
- **Header**: Fixed at the top (`z-50`). Shows user initials and handles sign-out.
- **Sidebar**: A pop-up overlay (`z-40`) controlled by the hamburger menu.

### 2. Header and Sidebar Navigation
- **Header**: Responds to `AuthContext`. It displays the current user's initials and provides a logout action.
- **Sidebar Items**: Defined in `Sidebar.jsx`. Currently universal, but can be filtered by `user.role` in the future.

### 3. Footer (Global Sitemap)
Positioned at the absolute bottom. Outside the main scroll container to ensure it stays below all page content.

---

## Step-by-Step Guide: Building and Integrating Modules

Follow these steps to add a new feature:

### 1. Create the Page component
Create a new file in `src/pages/`. Use `<PageHeader />` for consistency.

### 2. Register the Route
Add the route to `src/routes/AppRoutes.jsx`. Wrap it in the `AppLayout` route group to inherit the shell.

### 3. Update Sidebar Navigation
Add the item to the `sidebarItems` array in `Sidebar.jsx`.

---

## Collaboration Guidelines

1.  **Minimalism**: Avoid shadows or rounded corners beyond `rounded-xl`.
2.  **Indigo/Slate Palette**: Use `indigo-600` for primary actions and `slate-900` for structure. 
3.  **Role Awareness**: When building components, consider if they should look different for students vs. faculty. Access roles via `useAuth()`.
4.  **No Direct CSS**: Use Tailwind classes for all styling.

---

## Design System Reference

- **Header/Footer/Sidebar BG**: `bg-slate-900` / `bg-white`
- **Primary Accent**: `indigo-600`
- **Standard Border**: `border-slate-100`
- **Custom Scrollbar**: Pre-configured in `index.css`.
