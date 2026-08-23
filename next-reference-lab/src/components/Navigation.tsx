import Link from "next/link";

// Routing reference: use Link for navigation between Next.js pages.
export default function Navigation() {
  return (
    <nav>
      <Link href="/tasks">Tasks</Link>
      <Link href="/users/1">Users</Link>
      <Link href="/search?term=react">Search</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/events">Events</Link>
    </nav>
  );
}
