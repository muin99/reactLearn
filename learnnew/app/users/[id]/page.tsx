type paramsProp <{}>

export default function UsersSpecificPage({ params }: paramsProp) {
  return (
    <>
      <h1>User id: {params.id}</h1>
    </>
  );
}
