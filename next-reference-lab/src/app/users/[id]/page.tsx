import Link from "next/link";
import { notFound } from "next/navigation";
import UserCard from "@/components/UserCard";
import { users } from "@/data/users";

type PageProps = { params: Promise<{ id: string }> };

// Dynamic routing reference: [id] changes based on the URL.
export default async function UserPage({ params }: PageProps) {
  const { id } = await params;
  const user = users.find((item) => item.id === id);

  if (!user) notFound();

  return (
    <main>
      <h1>User Details</h1>
      <UserCard user={user} showId />
      <div className="actions">
        {users.map((item) => <Link key={item.id} href={`/users/${item.id}`}>{item.name}</Link>)}
      </div>
    </main>
  );
}
