export default function () {
  return (
    <>
      <div className="flex items-center justify-center">
        <form className="flex flex-col p-10 border-2 m-10 w-[50%]">
          <div>
            <label htmlFor="name">Name</label>
            <input name="name" type="text" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" />
          </div>

          <div>
            <label htmlFor="pass">Password</label>
            <input name="pass" type="password" />
          </div>
        </form>
      </div>
    </>
  );
}
