"use client";

import Timer from "@/components/timer";
import { useState } from "react";

export default function HomePage() {
  const [isStopped, setIsStopped] = useState<boolean>(false);
  const [isTimerComplete, setIsTimerComplete] = useState<boolean>(false);

  return (
    <div className="m-64">
      {!isTimerComplete && (
        <Timer
          totalSeconds={10}
          isStopped={isStopped}
          setIsTimerComplete={setIsTimerComplete}
        />
      )}
      {isTimerComplete && (
        <div>
          <p>Time's Up!!</p>
        </div>
      )}

      <button
        onClick={() => setIsStopped((prev) => !prev)}
        className="bg-blue-500 text-bold py-2.5 px-7 disabled:opacity-45"
        disabled={isTimerComplete}
      >
        {isStopped ? "Resume Timer" : "Stop Timer"}
      </button>
    </div>
  );
}
