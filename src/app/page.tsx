
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr] items-start justify-items-start min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <Link className="bg-amber-500 py-0.5 px-2 rounded text-sm font-bold" href="/subscriptions">Subscriptions</Link>
    </div>
  );
}
