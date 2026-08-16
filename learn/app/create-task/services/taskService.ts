import axios from "axios";

import type { TaskFormValues } from "../schemas/taskSchema";

export type CreatedTask = TaskFormValues & {
  id: number;
};

// This module owns knowledge of Axios and the API endpoint.
export async function createTask(
  task: TaskFormValues,
): Promise<CreatedTask> {
  const response = await axios.post<CreatedTask>(
    "https://jsonplaceholder.typicode.com/posts",
    task,
  );

  return response.data;
}
