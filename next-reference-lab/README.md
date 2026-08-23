# Next React Reference Project

This is a small **Team Desk** application. The website is only the working example. The source files are the reference.

## Run the project

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Where to find each reference

| Concept | Source file |
| --- | --- |
| Next.js routing with `Link` | `src/components/Navigation.tsx` |
| Dynamic route `[id]` | `src/app/users/[id]/page.tsx` |
| Query passing with `?term=` | `src/app/search/page.tsx` |
| Props passing | `src/components/UserCard.tsx` |
| Custom/reusable component | `src/components/UserCard.tsx` |
| `useState` | `src/components/TaskManager.tsx` |
| `useEffect` | `src/components/TaskManager.tsx` |
| Axios GET, POST, PATCH, DELETE | `src/lib/taskApi.ts` |
| Next.js proxy/rewrite | `next.config.ts` |
| API route GET, POST, PATCH, DELETE | `src/app/api/tasks/route.ts` |
| Form state and validation | `src/components/ContactForm.tsx` |
| Form submit handling | `src/components/ContactForm.tsx` |
| Click, double-click and mouse events | `src/components/EventPlayground.tsx` |
| Change, focus, blur and keyboard events | `src/components/EventPlayground.tsx` |
| TypeScript models | `src/types/index.ts` |

## Axios requests through the proxy

The browser calls `/backend/tasks`. The rewrite in `next.config.ts` sends that request internally to `/api/tasks`.

```ts
axios.get("/backend/tasks");
axios.post("/backend/tasks", { title: "New task" });
axios.patch("/backend/tasks", { id: 1, completed: true });
axios.delete("/backend/tasks", { params: { id: 1 } });
```

The matching server handlers are in `src/app/api/tasks/route.ts`.
