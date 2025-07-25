import { useFormattedTime, useTimer } from "@/hooks";
import { SetStateAction } from "react";

export default function TimerDisplay({
  totalSeconds,
  setIsTimerComplete,
  className = "",
}: {
  totalSeconds: number;
  setIsTimerComplete: React.Dispatch<SetStateAction<boolean>>;
  className?: string;
}) {
  const { secondsLeft } = useTimer({
    totalSeconds,
    onComplete: () => {
      setIsTimerComplete(true);
    },
  });
  const { formattedHours, formattedMinutes, formattedSeconds } =
    useFormattedTime(secondsLeft);

  const tailwindStyles = `py-2 max-w-fit px-5 rounded-lg transition-colors duration-800 ${
    Number(formattedSeconds) < 10 ? "bg-red-900" : "bg-green-800"
  }`;

  return (
    <p className={className ? className + tailwindStyles : tailwindStyles}>
      {formattedHours}
      <span className="mx-1 font-extrabold">:</span>
      {formattedMinutes}
      <span className="mx-1 font-extrabold">:</span>
      {formattedSeconds}
    </p>
  );
}
