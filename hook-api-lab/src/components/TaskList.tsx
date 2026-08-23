import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  onDeleteTask: (id: number) => Promise<void>
}

export default function TaskList({ tasks, loading, onDeleteTask }: TaskListProps) {
  if (loading) return <p className="status">Loading with GET…</p>
  if (tasks.length === 0) return <p className="status">No tasks left. Add one!</p>

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => onDeleteTask(task.id)} aria-label={`Delete ${task.title}`}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
