import type { Task } from "@/types";

// Demo data lives in memory. Restarting the server resets it.
let tasks: Task[] = [
  { id: 1, title: "Learn Next.js routing", completed: true },
  { id: 2, title: "Practice Axios requests", completed: false },
];

// GET /backend/tasks -> rewritten to GET /api/tasks
export async function GET() {
  return Response.json(tasks);
}

// POST /backend/tasks with JSON body: { "title": "New task" }
export async function POST(request: Request) {
  const body = (await request.json()) as { title?: string };

  if (!body.title?.trim()) {
    return Response.json({ message: "Title is required" }, { status: 400 });
  }

  const task: Task = {
    id: Date.now(),
    title: body.title.trim(),
    completed: false,
  };

  tasks.push(task);
  return Response.json(task, { status: 201 });
}

// PATCH /backend/tasks with JSON body: { "id": 1, "completed": true }
export async function PATCH(request: Request) {
  const body = (await request.json()) as { id?: number; completed?: boolean };
  const task = tasks.find((item) => item.id === body.id);

  if (!task) {
    return Response.json({ message: "Task not found" }, { status: 404 });
  }

  task.completed = body.completed ?? task.completed;
  return Response.json(task);
}

// DELETE /backend/tasks?id=1
export async function DELETE(request: Request) {
  const id = Number(new URL(request.url).searchParams.get("id"));
  const exists = tasks.some((task) => task.id === id);

  if (!exists) {
    return Response.json({ message: "Task not found" }, { status: 404 });
  }

  tasks = tasks.filter((task) => task.id !== id);
  return Response.json({ message: "Task deleted" });
}
