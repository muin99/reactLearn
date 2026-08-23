import axios from "axios";
import type { Task } from "@/types";

// Axios + proxy reference:
// The browser calls /backend/tasks.
// next.config.ts silently rewrites it to /api/tasks.
const TASKS_URL = "/backend/tasks";

export async function getTasks() {
  const response = await axios.get<Task[]>(TASKS_URL);
  return response.data;
}

export async function createTask(title: string) {
  const response = await axios.post<Task>(TASKS_URL, { title });
  return response.data;
}

export async function updateTask(id: number, completed: boolean) {
  const response = await axios.patch<Task>(TASKS_URL, { id, completed });
  return response.data;
}

export async function deleteTask(id: number) {
  await axios.delete(TASKS_URL, { params: { id } });
}
