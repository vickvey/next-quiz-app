"use client";

import { useCounter } from "@/hooks";
import Link from "next/link";

export default function LearnPage() {
  const [count, increment, decrement, reset] = useCounter(0);

  return (
    <div className="mx-24 my-28 flex flex-col">
      <section className="flex flex-col space-y-8">
        <div>
          <h1 className="text-5xl font-extralight">Simple Counter</h1>
        </div>
        <h2 className="font-bold text-3xl">count: {count}</h2>
        <button
          className="py-2.5 px-7 bg-blue-500 font-bold rounded-lg"
          onClick={increment}
        >
          increment
        </button>
        <button
          className="py-2.5 px-7 bg-blue-500 font-bold rounded-lg"
          onClick={decrement}
        >
          decrement
        </button>
        <button
          className="py-2.5 px-7 bg-blue-500 font-bold rounded-lg"
          onClick={reset}
        >
          reset
        </button>

        <Link href={"/timer"}>Timer Page</Link>
      </section>
    </div>
  );
}
