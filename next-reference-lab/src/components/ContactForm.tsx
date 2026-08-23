"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type FormData = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // One change handler works for every input because each input has a name.
  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validate() {
    const newErrors: FormErrors = {};
    if (form.name.trim().length < 2) newErrors.name = "Name is too short";
    if (!form.email.includes("@")) newErrors.email = "Email is invalid";
    if (form.message.trim().length < 10) newErrors.message = "Write at least 10 characters";
    return newErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitted(true);
    setForm(emptyForm);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label>Name<input name="name" value={form.name} onChange={handleChange} /></label>
      {errors.name && <small className="error">{errors.name}</small>}

      <label>Email<input name="email" value={form.email} onChange={handleChange} /></label>
      {errors.email && <small className="error">{errors.email}</small>}

      <label>Message<textarea name="message" value={form.message} onChange={handleChange} /></label>
      {errors.message && <small className="error">{errors.message}</small>}

      <button type="submit">Send message</button>
      {submitted && <p className="success">Message submitted successfully.</p>}
    </form>
  );
}
