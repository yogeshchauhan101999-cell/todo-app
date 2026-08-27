import React from "react";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  return (
    <article
      className={`todo-card ${todo.completed ? "todo-card-completed" : ""}`}
    >
      {todo.image ? (
        <div className="todo-image-wrap">
          <img
            src={todo.image}
            alt={`Attachment for task: ${todo.title}`}
            className="todo-image"
          />
        </div>
      ) : (
        <div
          className="todo-image-wrap todo-image-placeholder"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle
              cx="8.5"
              cy="10"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M21 15l-5-4-4 3-3-2-6 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <div className="todo-content">
        <div className="todo-top-row">
          <span
            className={`status-badge ${todo.completed ? "status-completed" : "status-pending"}`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
          <span className="todo-date">{formatDate(todo.createdAt)}</span>
        </div>

        <h3 className={`todo-title ${todo.completed ? "todo-title-done" : ""}`}>
          {todo.title}
        </h3>
        <p className="todo-description">{todo.description}</p>

        <div className="todo-actions">
          <button
            className={`btn btn-sm ${todo.completed ? "btn-outline" : "btn-success"}`}
            onClick={() => onToggleComplete(todo.id)}
          >
            {todo.completed ? "Undo" : "Complete"}
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => onEdit(todo)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TodoItem;
