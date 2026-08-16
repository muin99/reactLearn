import CreateTaskForm from "./components/CreateTaskForm";

export default function CreateTaskPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Create a task</h1>
      <CreateTaskForm />
    </main>
  );
}
