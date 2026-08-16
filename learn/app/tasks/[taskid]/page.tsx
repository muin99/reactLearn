import TaskCard from "@/app/components/TaskCard";
import { tks } from "../page";

type taskprops = {
  params: Promise<{
    taskid: string;
  }>;
  searchParams: Promise<{
    name?: string;
    id?: string;
    page?: string;
  }>;
};

export default async function tasksBasedonId(props: taskprops) {
  const id = (await props.params).taskid;
  const name = (await props.searchParams).name;
  const page = (await props.searchParams).page;
  const idd = (await props.searchParams).id;
  const t = tks.find((f) => id == f.tid);
  return (
    <>
      <h1>This is the page of task id: {id}</h1>
      <div>{id && <p>The id: {id}</p>}</div>
      <div>{idd && <p>The idd: {idd}</p>}</div>
      <div>{page && <p>The page: {page}</p>}</div>
      <div>{name && <p>The name: {name}</p>}</div>
      <div>{t ? <TaskCard {...t}></TaskCard> : <p>Task not found</p>}</div>
    </>
  );
}
