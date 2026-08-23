import Link from "next/link";
import UserCard from "@/components/UserCard";
import { users } from "@/data/users";

export default function HomePage() {
  return (
    <main>
      <h1>Team Desk</h1>
      <p>A small application for managing tasks and team members.</p>

      <div className="actions">
        <Link className="button" href="/tasks">Manage tasks</Link>
        <Link className="button secondary" href="/contact">Contact the team</Link>
      </div>

      <h2>Team members</h2>
      <div className="grid">
        {/* Custom component + props example */}
        {users.map((user) => <UserCard user={user} key={user.id} />)}
      </div>
    </main>
  );
}
