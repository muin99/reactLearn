import axios from "axios";

import type { TaskFormValues } from "../schemas/taskSchema";

export type CreatedTask = TaskFormValues & {
  id: number;
};

export async function createTask(task: TaskFormValues): Promise<CreatedTask> {
  const response = await axios.post<CreatedTask>(
    "https://jsonplaceholder.typicode.com/posts",
    task,
  );

  return response.data;
}
