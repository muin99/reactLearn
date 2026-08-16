"use client";
import { useState } from "react";

export default function counter() {
  const [count, setCount] = useState(0);
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.target as HTMLButtonElement;
    if (btn.id == "increase") {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  }

  return (
    <>
      <button id="increase" onClick={handleClick}>
        Click me {count}
      </button>
      <button id="decrease" onClick={handleClick}>
        Decrese {count}
      </button>
    </>
  );
}
