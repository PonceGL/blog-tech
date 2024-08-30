import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full p-4 flex flex-col items-center justify-between">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </main>
  );
}
