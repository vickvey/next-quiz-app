"use client";
import { SetStateAction, useEffect, useState } from "react";

export default function Timer({
  totalSeconds,
  setIsTimerComplete,
  isStopped,
}: {
  totalSeconds: number;
  setIsTimerComplete: React.Dispatch<SetStateAction<boolean>>;
  isStopped: boolean;
}) {
  const [seconds, setSeconds] = useState<number>(totalSeconds);
  useEffect(() => {
    if (isStopped) return;
    if (seconds === 0) {
      setIsTimerComplete(true);
      return;
    }
    const timeout = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [seconds, isStopped, setSeconds, setIsTimerComplete]);

  return (
    <div className={`${isStopped ? "text-white/50" : "text-white"}`}>
      {seconds} remaining ...
    </div>
  );
}
