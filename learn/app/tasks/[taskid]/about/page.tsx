type propofbefore = {
  params: Promise<{
    taskid: string;
  }>;
};

export default async function aboutTask(prop: propofbefore) {
  const id = (await prop.params).taskid;
  return (
    <>
      <p>about of id: {id}</p>
    </>
  );
}
