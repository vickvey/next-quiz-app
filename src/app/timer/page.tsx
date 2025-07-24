"use client";

import { useTimer } from "@/hooks";
import { useState } from "react";

export default function TimerPage() {
  const [isTimerCompleted, setIsCompleted] = useState<boolean>(false);
  const [secondsLeft] = useTimer(5, () => {
    console.log(`Time's up!`);
    setIsCompleted(true);
  });

  return (
    <section className="my-28 mx-36 text-2xl">
      <div>
        <h1>Timer Demo Page</h1>
      </div>
      <div>
        {!isTimerCompleted && <p>{secondsLeft} remaining</p>}
        {isTimerCompleted && <p>Time's up!!!!</p>}
      </div>
    </section>
  );
}
