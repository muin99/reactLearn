import "tailwindcss";

type task = {
  tid: string;
  name: string;
  priority: "high" | "medium" | "low";
};
export default function TaskCard(props: task) {
  return (
    <div className="m-2 p-2 h-20 bg-yellow">
      <h1>Task id: {props.tid}</h1>
      <p>Task name: {props.name}</p>
      <p>Task priority: {props.priority}</p>
    </div>
  );
}
