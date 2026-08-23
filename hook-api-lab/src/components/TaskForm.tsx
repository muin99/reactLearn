import { useState, type FormEvent } from 'react'

interface TaskFormProps {
  onAddTask: (title: string) => Promise<void>
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState<string>('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) return
    await onAddTask(cleanTitle)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label htmlFor="task-title">New task</label>
      <div className="input-row">
        <input
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Learn React props"
        />
        <button type="submit">Add with POST</button>
      </div>
    </form>
  )
}
