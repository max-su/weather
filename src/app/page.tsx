import Image from "next/image";
import SunnyDay from "../assets/day.svg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-inherit p-6">
      <div className="mx-auto flex max-w-sm items-center rounded-xl bg-black p-6 shadow-lg">
        <Image src={SunnyDay} width={128} height={128} alt="Sunny Day" />
        <div className="-ml-5">
          <div className="text-5xl font-medium text-white">71°F</div>
          <div className="text-sm font-medium text-white">Feels 71°F</div>
        </div>
      </div>
    </main>
  );
}