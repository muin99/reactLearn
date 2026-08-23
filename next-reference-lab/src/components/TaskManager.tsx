"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Task } from "@/types";
import { createTask, deleteTask, getTasks, updateTask } from "@/lib/taskApi";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect reference: load tasks once after the component mounts.
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Could not load tasks"))
      .finally(() => setLoading(false));
  }, []);

  // Form handling + POST request.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title");
      return;
    }

    try {
      const newTask = await createTask(title);
      setTasks((current) => [...current, newTask]);
      setTitle("");
      setError("");
    } catch {
      setError("Could not create task");
    }
  }

  // PATCH request.
  async function handleToggle(task: Task) {
    const updated = await updateTask(task.id, !task.completed);
    setTasks((current) => current.map((item) => item.id === updated.id ? updated : item));
  }

  // DELETE request.
  async function handleDelete(id: number) {
    await deleteTask(id);
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  if (loading) return <p>Loading tasks...</p>;

  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add task</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
              />
              <span className={task.completed ? "done" : ""}>{task.title}</span>
            </label>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
