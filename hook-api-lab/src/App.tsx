import { useEffect, useState } from 'react'
import axios from 'axios'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import type { Task } from './types'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await axios.get<Task[]>(`${API_URL}?_limit=5`)
        setTasks(response.data)
      } catch {
        setError('Could not load tasks. Check your internet connection.')
      } finally {
        setLoading(false)
      }
    }
    getTasks()
  }, [])

  async function addTask(title: string): Promise<void> {
    try {
      setError('')
      const response = await axios.post<Task>(API_URL, {
        title,
        completed: false,
        userId: 1,
      })
      setTasks((currentTasks) => [
        { ...response.data, id: Date.now() },
        ...currentTasks,
      ])
    } catch {
      setError('Could not add the task.')
    }
  }

  async function deleteTask(id: number): Promise<void> {
    try {
      setError('')
      await axios.delete(`${API_URL}/${id}`)
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
    } catch {
      setError('Could not delete the task.')
    }
  }

  return (
    <main className="page-shell">
      <section className="lesson-card">
        <p className="eyebrow">5-minute React + TypeScript lesson</p>
        <h1>Hook + API Lab</h1>
        <p className="intro">
          Add a task, load API data, and delete an item. This journey uses state,
          effects, Axios, typed props, and typed API responses.
        </p>
        <div className="steps" aria-label="Lesson sequence">
          <span><b>1</b> State</span>
          <span><b>2</b> Effect + GET</span>
          <span><b>3</b> Props + POST</span>
          <span><b>4</b> DELETE</span>
        </div>
        <TaskForm onAddTask={addTask} />
        {error && <p className="error" role="alert">{error}</p>}
        <TaskList tasks={tasks} loading={loading} onDeleteTask={deleteTask} />
        <aside className="cheat-sheet">
          <h2>Remember</h2>
          <p><code>useState</code> = remember changing UI data.</p>
          <p><code>useEffect</code> = synchronize with the outside world.</p>
          <p><code>props</code> = parent sends typed data/functions to a child.</p>
          <p><code>axios</code> = send HTTP requests and read <code>response.data</code>.</p>
        </aside>
      </section>
    </main>
  )
}
