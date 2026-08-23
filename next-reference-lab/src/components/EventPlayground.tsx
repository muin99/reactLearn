"use client";

import { useState, type FormEvent, type KeyboardEvent, type MouseEvent } from "react";

export default function EventPlayground() {
  const [message, setMessage] = useState("No event yet");
  const [text, setText] = useState("");

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setMessage(`Clicked: ${event.currentTarget.name}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    setMessage(`Key pressed: ${event.key}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(`Submitted: ${text}`);
  }

  return (
    <section className="event-box">
      <h2>{message}</h2>

      {/* Mouse events */}
      <button name="Save button" onClick={handleClick} onDoubleClick={() => setMessage("Double clicked")}>Click me</button>
      <div onMouseEnter={() => setMessage("Mouse entered box")} onMouseLeave={() => setMessage("Mouse left box")} className="mouse-box">Move the mouse here</div>

      {/* Input, focus, and keyboard events */}
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        onFocus={() => setMessage("Input focused")}
        onBlur={() => setMessage("Input blurred")}
        onKeyDown={handleKeyDown}
        placeholder="Type something"
      />

      {/* Form submit event */}
      <form onSubmit={handleSubmit}><button type="submit">Submit text</button></form>
    </section>
  );
}
