# Hook + API Lab

A tiny sequential React project covering `useState`, `useEffect`, props, and Axios GET/POST/DELETE.

## Run it

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Five-minute reading order

1. `src/App.tsx`: find the three typed `useState` calls.
2. In the same file, find `useEffect` and the Axios GET request.
3. Open `TaskForm.tsx`: its typed `onAddTask` prop calls the parent's POST function.
4. Open `TaskList.tsx`: its typed props display tasks and call the parent's DELETE function.
5. Change the code and watch Vite refresh the browser.

JSONPlaceholder is a practice API. POST and DELETE return successful responses but do not permanently change its server, so this project also updates React state to reflect each action immediately.
