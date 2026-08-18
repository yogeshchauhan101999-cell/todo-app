import React, { useState } from "react";

/**
 * Sticky responsive navbar with brand, nav links, and dark/light toggle.
 */
function Header({ theme, onToggleTheme, activeView, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (view) => {
    onNavigate(view);
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path
                d="M9 12.5l2 2 4-4.5M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="brand-text">
            <span className="brand-name">Todo App</span>
            <span className="brand-subtitle">Todo Manager</span>
          </div>
        </div>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          <button
            className={`nav-link ${activeView === "tasks" ? "nav-link-active" : ""}`}
            onClick={() => handleNavigate("tasks")}
          >
            Tasks
          </button>
          <button
            className={`nav-link ${activeView === "about" ? "nav-link-active" : ""}`}
            onClick={() => handleNavigate("about")}
          >
            About
          </button>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="4.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path
                  d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
