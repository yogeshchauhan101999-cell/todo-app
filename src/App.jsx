import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Stats from "./components/Stats.jsx";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";

const TODO_STORAGE_KEY = "todo-app.todos";
const TODO_THEME_STORAGE_KEY = "todo-app.theme";

function loadTodosFromStorage() {
  try {
    const raw = localStorage.getItem(TODO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read todos from localStorage:", error);
    return [];
  }
}

function loadThemeFromStorage() {
  try {
    const stored = localStorage.getItem(TODO_THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch (error) {
    return "light";
  }
}

function createId() {
  return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function App() {
  const [todos, setTodos] = useState(loadTodosFromStorage);
  const [theme, setTheme] = useState(loadThemeFromStorage);
  const [sortBy, setSortBy] = useState("newest");
  const [editingTodo, setEditingTodo] = useState(null);
  const [activeView, setActiveView] = useState("tasks");

  useEffect(() => {
    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  useEffect(() => {
    try {
      localStorage.setItem(TODO_THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleAddTodo = ({ title, description, image }) => {
    const newTodo = {
      id: createId(),
      title,
      description,
      image,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleUpdateTodo = (id, updates) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
    );
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id) => {
    const confirmed = window.confirm(
      "Delete this task? This action cannot be undone.",
    );
    if (!confirmed) return;
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editingTodo?.id === id) setEditingTodo(null);
  };

  const handleToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleResetAll = () => {
    const confirmed = window.confirm(
      "Reset all tasks? This will permanently remove every task.",
    );
    if (!confirmed) return;
    setTodos([]);
    setEditingTodo(null);
  };

  const handleEditRequest = (todo) => {
    setEditingTodo(todo);
    document
      .getElementById("todo-form-anchor")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCancelEdit = () => setEditingTodo(null);

  const handleToggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const heroStats = useMemo(() => {
    const completed = todos.filter((t) => t.completed).length;
    return { total: todos.length, completed };
  }, [todos]);

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        activeView={activeView}
        onNavigate={setActiveView}
      />

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">Smart Todo Manager</span>
            <h1 className="hero-heading">Organize your daily tasks.</h1>
            <p className="hero-description">
              Todo app helps you capture what matters, attach a photo for
              context, and track progress without the clutter — so your day
              stays focused, not overwhelming.
            </p>
            <div className="hero-actions">
              <a href="#todo-form-anchor" className="btn btn-primary btn-lg">
                Start a New Task
              </a>
              {heroStats.total > 0 && (
                <span className="hero-progress">
                  {heroStats.completed} of {heroStats.total} tasks done
                </span>
              )}
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-glow" />
            <svg viewBox="0 0 200 200" width="180" height="180">
              <circle cx="100" cy="100" r="88" fill="rgba(255,255,255,0.14)" />
              <rect
                x="52"
                y="46"
                width="96"
                height="108"
                rx="14"
                fill="rgba(255,255,255,0.92)"
              />
              <rect x="68" y="68" width="64" height="8" rx="4" fill="#a5b4fc" />
              <rect x="68" y="86" width="46" height="8" rx="4" fill="#e0e7ff" />
              <circle cx="76" cy="112" r="9" fill="#6366f1" />
              <path
                d="M72 112l3 3 6-7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="92"
                y="108"
                width="40"
                height="8"
                rx="4"
                fill="#e0e7ff"
              />
              <circle cx="76" cy="134" r="9" fill="#c7d2fe" />
              <rect
                x="92"
                y="130"
                width="40"
                height="8"
                rx="4"
                fill="#e0e7ff"
              />
            </svg>
          </div>
        </section>

        <Stats todos={todos} />

        {activeView === "tasks" ? (
          <div className="content-grid" id="todo-form-anchor">
            <TodoForm
              editingTodo={editingTodo}
              onAddTodo={handleAddTodo}
              onUpdateTodo={handleUpdateTodo}
              onCancelEdit={handleCancelEdit}
            />
            <TodoList
              todos={todos}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditRequest}
              onDelete={handleDeleteTodo}
              onResetAll={handleResetAll}
            />
          </div>
        ) : (
          <section className="about-section" aria-label="About Taskly">
            <h2>About Todo</h2>
            <p>
              Todo app is a lightweight todo manager built with React and plain
              CSS. Every task you create lives in your browser's local storage,
              so your list is right where you left it the next time you open the
              app — no account, no sign-in, no server required.
            </p>
            <ul className="about-list">
              <li>
                Add tasks with a title, description, and an optional photo.
              </li>
              <li>
                Mark tasks complete, edit them, or remove them individually.
              </li>
              <li>Sort your list by date, title, or completion status.</li>
              <li>
                Switch between light and dark mode any time — your choice is
                remembered.
              </li>
            </ul>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React · Your tasks are stored only on this device.</p>
      </footer>
    </div>
  );
}

export default App;
