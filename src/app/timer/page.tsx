"use client";

import TimerDisplay from "@/components/timer-display";
import { useState } from "react";

export default function TimerPage() {
  const [isTimerComplete, setIsTimerComplete] = useState(false);

  return (
    <section className="my-28 mx-36 text-2xl">
      <div>
        <h1>Timer Demo Page</h1>
      </div>
      <div>
        {!isTimerComplete ? (
          <TimerDisplay
            totalSeconds={15}
            setIsTimerComplete={setIsTimerComplete}
            className=" py-2 max-w-fit px-5 rounded-lg"
          />
        ) : (
          <p>Time's Up!!</p>
        )}
      </div>
    </section>
  );
}
