"use client";

import axios from "axios";
import { useState, type FormEvent } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type UserForm = {
  name: string;
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof UserForm, string>>;

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function FormValidationPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");

  function validateForm(values: UserForm): FormErrors {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.password) {
      nextErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  }

  function validateField(field: keyof UserForm, value: string) {
    const fieldErrors = validateForm({ name, email, password, [field]: value });
    setErrors((oldErrors) => ({
      ...oldErrors,
      [field]: fieldErrors[field],
    }));
  }

  async function getUsers() {
    try {
      const response = await axios.get<User[]>(API_URL);
      setUsers(response.data);
      setMessage("Users loaded successfully!");
    } catch {
      setMessage("Could not load users.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const values = { name, email, password };
    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setMessage("Please fix the highlighted fields.");
      return;
    }

    try {
      const response = await axios.post<User>(API_URL, values);

      setUsers((oldUsers) => [response.data, ...oldUsers]);
      setName("");
      setEmail("");
      setPassword("");
      setErrors({});
      setMessage("Form submitted successfully!");
    } catch {
      setMessage("Could not add user.");
    }
  }

  async function deleteUser(id: number) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== id));
      setMessage("User deleted successfully!");
    } catch {
      setMessage("Could not delete user.");
    }
  }

  return (
    <main className="min-h-screen p-8">
      <form
        className="mx-auto flex max-w-sm flex-col gap-3"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">Axios Form Validation</h1>

        <label htmlFor="name">Name</label>
        <input
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={Boolean(errors.name)}
          className="border p-2"
          id="name"
          onBlur={(event) => validateField("name", event.target.value)}
          onChange={(event) => {
            setName(event.target.value);
            if (errors.name) validateField("name", event.target.value);
          }}
          type="text"
          value={name}
        />
        {errors.name && <p id="name-error">{errors.name}</p>}

        <label htmlFor="email">Email</label>
        <input
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={Boolean(errors.email)}
          className="border p-2"
          id="email"
          onBlur={(event) => validateField("email", event.target.value)}
          onChange={(event) => {
            setEmail(event.target.value);
            if (errors.email) validateField("email", event.target.value);
          }}
          type="email"
          value={email}
        />
        {errors.email && <p id="email-error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          aria-describedby={errors.password ? "password-error" : undefined}
          aria-invalid={Boolean(errors.password)}
          className="border p-2"
          id="password"
          onBlur={(event) => validateField("password", event.target.value)}
          onChange={(event) => {
            setPassword(event.target.value);
            if (errors.password) validateField("password", event.target.value);
          }}
          type="password"
          value={password}
        />
        {errors.password && <p id="password-error">{errors.password}</p>}

        <button className="bg-blue-600 p-2 text-white" type="submit">
          Submit
        </button>

        {message && <p>{message}</p>}
      </form>

      <section className="mx-auto mt-8 max-w-sm">
        <button
          className="bg-green-600 p-2 text-white"
          onClick={getUsers}
          type="button"
        >
          Get Users
        </button>

        <div className="mt-4 space-y-2">
          {users.map((user) => (
            <div
              className="flex items-center justify-between gap-3 border p-3"
              key={user.id}
            >
              <p>
                {user.name} - {user.email}
              </p>
              <button
                className="bg-red-600 p-2 text-white"
                onClick={() => deleteUser(user.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
