import { useEffect, useState } from "react";

const useTimer = (totalSeconds: number = 10, onComplete: () => void) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(totalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const start = () => {
    setIsCompleted(false);
    setIsRunning(true);
  };
  const pause = () => {
    setIsRunning(false);
  };
  const resume = () => {
    if (!isRunning) {
      setIsCompleted(false);
      setIsRunning(true);
    }
  };
  const reset = () => {
    setSecondsLeft(totalSeconds);
    setIsCompleted(false);
  };
  const restart = () => {
    reset();
    setIsRunning(true);
  };

  useEffect(() => {
    if (secondsLeft === 0 && !isCompleted) {
      setIsCompleted(true);
      onComplete();
      setIsRunning(false);
      return;
    }
  }, [secondsLeft, isCompleted, onComplete]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return {
    secondsLeft,
    isRunning,
    isCompleted,
    start,
    pause,
    resume,
    reset,
    restart,
  };
};
