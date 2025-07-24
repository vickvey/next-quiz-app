"use client";

import { useEffect, useState } from "react";

export const useTimer = (totalSeconds: number = 5, onComplete: () => void) => {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (secondsLeft === 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return [secondsLeft];
};
