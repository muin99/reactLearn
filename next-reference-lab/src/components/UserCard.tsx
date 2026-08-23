import type { User } from "@/types";

type UserCardProps = {
  user: User;
  showId?: boolean;
};

// Props reference: the parent passes user and showId to this component.
export default function UserCard({ user, showId = false }: UserCardProps) {
  return (
    <article className="card">
      <h2>{user.name}</h2>
      <p>{user.job}</p>
      {showId && <small>User ID: {user.id}</small>}
    </article>
  );
}
