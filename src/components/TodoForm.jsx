import React, { useEffect, useRef, useState } from "react";

const MAX_IMAGE_SIZE_MB = 4;

const emptyErrors = { title: "", description: "", image: "" };

function TodoForm({ editingTodo, onAddTodo, onUpdateTodo, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(emptyErrors);
  const fileInputRef = useRef(null);

  const isEditing = Boolean(editingTodo);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setImage(editingTodo.image);
    } else {
      setTitle("");
      setDescription("");
      setImage(null);
    }
    setErrors(emptyErrors);
  }, [editingTodo]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setErrors(emptyErrors);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please choose a valid image file.",
      }));
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: `Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`,
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setErrors((prev) => ({ ...prev, image: "" }));
    };
    reader.onerror = () => {
      setErrors((prev) => ({
        ...prev,
        image: "Could not read that image. Please try another file.",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const nextErrors = { ...emptyErrors };
    if (!title.trim()) nextErrors.title = "Task title is required.";
    if (!description.trim())
      nextErrors.description =
        "A short description helps you remember the task.";
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return !nextErrors.title && !nextErrors.description;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      image,
    };

    if (isEditing) {
      onUpdateTodo(editingTodo.id, payload);
    } else {
      onAddTodo(payload);
      resetForm();
    }
  };

  return (
    <section
      className="todo-form-card"
      aria-label={isEditing ? "Edit task" : "Add a new task"}
    >
      <div className="todo-form-header">
        <h2>{isEditing ? "Edit Task" : "Add a New Task"}</h2>
        <p>
          {isEditing
            ? "Update the details below and save your changes."
            : "What do you need to get done?"}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="todo-title">Task Title</label>
          <input
            id="todo-title"
            type="text"
            placeholder="e.g. Finish quarterly report"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? "input-error" : ""}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <span className="field-error" id="title-error" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="todo-description">Description</label>
          <textarea
            id="todo-description"
            placeholder="Add a few details about this task..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? "input-error" : ""}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
          {errors.description && (
            <span className="field-error" id="description-error" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="todo-image">Photo (optional)</label>
          <div className="image-upload">
            <input
              id="todo-image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="image-upload-input"
            />
            <label htmlFor="todo-image" className="image-upload-label">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path
                  d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{image ? "Change photo" : "Upload a photo"}</span>
            </label>

            {image && (
              <div className="image-preview">
                <img src={image} alt="Preview of the task attachment" />
                <button
                  type="button"
                  className="image-remove-btn"
                  onClick={handleRemoveImage}
                  aria-label="Remove uploaded photo"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          {errors.image && (
            <span className="field-error" role="alert">
              {errors.image}
            </span>
          )}
        </div>

        <div className="form-actions">
          {isEditing && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TodoForm;
