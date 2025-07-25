import { useTimer } from "@/hooks";
import { SetStateAction } from "react";

export default function TimerDisplay({
  totalSeconds,
  setIsTimerComplete,
  enableControls = false,
}: {
  totalSeconds: number;
  setIsTimerComplete: React.Dispatch<SetStateAction<boolean>>;
  enableControls?: boolean;
}) {
  const {
    secondsLeft,
    isCompleted,
    isRunning,
    start,
    pause,
    resume,
    reset,
    restart,
  } = useTimer(totalSeconds, () => {
    setIsTimerComplete(true);
  });

  if (!enableControls) {
    return <p>{secondsLeft}</p>;
  }

  return (
    <div className="bg-gray-800 text-white font-medium text-2xl py-24 px-32">
      {!isCompleted && <p>{secondsLeft} time remaining !!!</p>}
      {isCompleted && <p>Time's Up!!</p>}

      <div className="flex flex-col space-y-8">
        <h1>Control Buttons</h1>
        <button
          onClick={start}
          className="bg-blue-500 rounded-lg py-2 px-7 hover:cursor-pointer disabled:opacity-50"
          disabled={isRunning}
        >
          start
        </button>
        <button
          onClick={isRunning ? pause : resume}
          className="bg-blue-500 rounded-lg py-2 px-7 hover:cursor-pointer disabled:opacity-50"
          disabled={isCompleted}
        >
          {isRunning ? "pause" : "resume"}
        </button>
        <button
          onClick={reset}
          className="bg-blue-500 rounded-lg py-2 px-7 hover:cursor-pointer disabled:opacity-50"
        >
          reset
        </button>
        <button
          onClick={restart}
          className="bg-blue-500 rounded-lg py-2 px-7 hover:cursor-pointer disabled:opacity-50"
        >
          restart
        </button>
      </div>
    </div>
  );
}
