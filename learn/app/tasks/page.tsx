import TaskCard from "../components/TaskCard";

type task = {
  tid: string;
  name: string;
  priority: "high" | "medium" | "low";
};

export const tks: task[] = [
  {
    tid: "1",
    name: "task1",
    priority: "high",
  },
  {
    tid: "2",
    name: "task2",
    priority: "medium",
  },
  {
    tid: "3",
    name: "task3",
    priority: "low",
  },
];

export default function tasks() {
  return (
    <>
      <h1>These are the tasks we got</h1>
      {tks.map((t) => {
        return <TaskCard key={t.tid} {...t} />;
      })}
    </>
  );
}
