import Link from "next/link";
import { users } from "@/data/users";
import UserCard from "@/components/UserCard";

type PageProps = { searchParams: Promise<{ term?: string }> };

// Query reference: /search?term=react gives searchParams.term === "react".
export default async function SearchPage({ searchParams }: PageProps) {
  const { term = "" } = await searchParams;
  const results = users.filter((user) => user.name.toLowerCase().includes(term.toLowerCase()));

  return (
    <main>
      <h1>Search Users</h1>
      <p>Current query: <b>{term || "none"}</b></p>
      <div className="actions">
        <Link href="/search?term=ra">Search “ra”</Link>
        <Link href="/search?term=nadia">Search “nadia”</Link>
        <Link href="/search">Clear</Link>
      </div>
      <div className="grid">{results.map((user) => <UserCard user={user} key={user.id} />)}</div>
    </main>
  );
}
