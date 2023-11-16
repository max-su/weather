import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-8xl flex-wrap items-center bg-rose-400 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <Link href="/">
          <span className="text-xl font-semibold tracking-tight">Weather</span>
        </Link>
      </div>
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
      <Link href="http://maximumperformancerunning.blogspot.com/2013/07/temperature-dew-point.html">
          <span className="text-xl font-semibold tracking-tight">Temperature + Dew Point For Pace Adjustments</span>
        </Link>
      </div>
    </nav>
  );
}
