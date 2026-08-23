import TaskManager from "@/components/TaskManager";

export default function TasksPage() {
  return (
    <main>
      <h1>Tasks</h1>
      <p>Add, complete, and delete tasks.</p>
      <TaskManager />
    </main>
  );
}
