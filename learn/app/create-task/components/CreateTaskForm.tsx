"use client";

import axios from "axios";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  getTaskFormErrors,
  initialTaskValues,
  taskSchema,
} from "../schemas/taskSchema";
import type { FormErrors, TaskFormValues } from "../schemas/taskSchema";
import { createTask } from "../services/taskService";

export default function CreateTaskForm() {
  const [form, setForm] = useState<TaskFormValues>(initialTaskValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [requestError, setRequestError] = useState("");

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.currentTarget;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");
    setRequestError("");

    const validationResult = taskSchema.safeParse(form);

    if (!validationResult.success) {
      setErrors(getTaskFormErrors(validationResult.error));
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // The service hides Axios and endpoint details from this UI component.
      const createdTask = await createTask(validationResult.data);

      setSuccessMessage(
        `Task "${createdTask.title}" was created with ID ${createdTask.id}.`,
      );
      setForm(initialTaskValues);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setRequestError(error.message || "The task could not be created.");
      } else {
        setRequestError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setForm(initialTaskValues);
    setErrors({});
    setSuccessMessage("");
    setRequestError("");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1">
        <label className="block font-medium" htmlFor="title">
          Title
        </label>
        <input
          className="w-full rounded border p-2"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p className="text-sm text-red-600" id="title-error">
            {errors.title}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          className="min-h-28 w-full rounded border p-2"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
        />
        {errors.description && (
          <p className="text-sm text-red-600" id="description-error">
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block font-medium" htmlFor="priority">
          Priority
        </label>
        <select
          className="w-full rounded border p-2"
          id="priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.priority)}
          aria-describedby={errors.priority ? "priority-error" : undefined}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <p className="text-sm text-red-600" id="priority-error">
            {errors.priority}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating task..." : "Create task"}
        </button>

        <button
          className="rounded border px-4 py-2 disabled:opacity-50"
          type="button"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Reset
        </button>
      </div>

      {successMessage && (
        <p className="text-green-700" role="status">
          {successMessage}
        </p>
      )}

      {requestError && (
        <p className="text-red-600" role="alert">
          {requestError}
        </p>
      )}
    </form>
  );
}
