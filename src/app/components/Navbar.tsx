import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-8xl flex-wrap items-center justify-between bg-rose-400 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <Link href="/">
          <span className="text-xl font-semibold tracking-tight">Weather</span>
        </Link>
      </div>
    </nav>
  );
}
