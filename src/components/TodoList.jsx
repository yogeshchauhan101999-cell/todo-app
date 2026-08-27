import React from "react";
import TodoItem from "./TodoItem.jsx";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "az", label: "A → Z" },
  { value: "za", label: "Z → A" },
  { value: "completed-first", label: "Completed First" },
  { value: "pending-first", label: "Pending First" },
];

function sortTodos(todos, sortBy) {
  const list = [...todos];
  switch (sortBy) {
    case "oldest":
      return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case "az":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return list.sort((a, b) => b.title.localeCompare(a.title));
    case "completed-first":
      return list.sort((a, b) => Number(b.completed) - Number(a.completed));
    case "pending-first":
      return list.sort((a, b) => Number(a.completed) - Number(b.completed));
    case "newest":
    default:
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

function TodoList({
  todos,
  sortBy,
  onSortChange,
  onToggleComplete,
  onEdit,
  onDelete,
  onResetAll,
}) {
  const sortedTodos = sortTodos(todos, sortBy);

  return (
    <section className="todo-list-section" aria-label="Your tasks">
      <div className="todo-list-header">
        <h2>Your Tasks</h2>

        {todos.length > 0 && (
          <div className="todo-list-controls">
            <label htmlFor="sort-select" className="sr-only">
              Sort tasks
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              className="btn btn-sm btn-danger-outline"
              onClick={onResetAll}
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {sortedTodos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none">
              <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8 8h8M8 12h8M8 16h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3>No Tasks Yet</h3>
          <p>Create your first task and start organizing your day.</p>
        </div>
      ) : (
        <div className="todo-grid">
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TodoList;
