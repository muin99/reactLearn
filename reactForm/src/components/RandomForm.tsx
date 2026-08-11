import axios from "axios";
import { useEffect, useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function RandomForm() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts",
          { signal: controller.signal },
        );
        setPosts(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError("Could not load the posts. Please try again.");
          console.error(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="flex w-full h-[100vh] justify-center items-center">
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <fieldset className="fieldset">
            <label className="label">Full Name</label>
            <input
              type="text"
              className="input validator"
              placeholder="Muinul Islam"
              required
            />
            <p className="validator-hint hidden">Required</p>
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Age</label>
            <input
              type="number"
              className="input validator"
              placeholder="30"
              required
            />
            <p className="validator-hint hidden">Required</p>
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input validator"
              placeholder="Email"
              required
            />
            <p className="validator-hint hidden">Required</p>
          </fieldset>

          <label className="fieldset">
            <span className="label">Password</span>
            <input
              type="password"
              className="input validator"
              placeholder="Password"
              required
            />
            <span className="validator-hint hidden">Required</span>
          </label>

          <button className="btn btn-neutral mt-4" type="submit">
            Register
          </button>
          <button className="btn btn-ghost mt-1" type="reset">
            Reset
          </button>
        </form>
      </div>
      <div className="mx-auto max-w-3xl space-y-3 p-4">
        <h2 className="text-2xl font-bold">Posts</h2>

        {isLoading && <p>Loading posts...</p>}
        {error && <p className="text-error">{error}</p>}

        {!isLoading && !error &&
          posts.map((post) => (
            <article className="rounded-box border p-4" key={post.id}>
              <h3 className="font-semibold">{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))}
      </div>
    </>
  );
}
