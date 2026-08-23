import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must contain at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),
  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters.")
    .max(500, "Description cannot exceed 500 characters."),
  priority: z.enum(["low", "medium", "high"]),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

export type FormErrors = {
  title?: string;
  description?: string;
  priority?: string;
};

export const initialTaskValues: TaskFormValues = {
  title: "",
  description: "",
  priority: "medium",
};

export function getTaskFormErrors(
  error: z.ZodError<TaskFormValues>,
): FormErrors {
  const flattened = z.flattenError(error);

  return {
    title: flattened.fieldErrors.title?.[0],
    description: flattened.fieldErrors.description?.[0],
    priority: flattened.fieldErrors.priority?.[0],
  };
}
