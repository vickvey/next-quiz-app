import { useFormattedTime, useTimer } from "@/hooks";

export default function TimerDisplay({
  totalSeconds,
  enableRestartAfterComplete = false,
  onTimerComplete,
  className = "",
}: {
  totalSeconds: number;
  enableRestartAfterComplete: boolean;
  onTimerComplete?: () => void;
  className?: string;
}) {
  const { secondsLeft, restart } = useTimer({
    totalSeconds,
    onComplete: () => {
      onTimerComplete?.();
      if (enableRestartAfterComplete) restart();
    },
  });
  const { formattedHours, formattedMinutes, formattedSeconds } =
    useFormattedTime(secondsLeft);

  const tailwindStyles = `py-2 max-w-fit px-5 rounded-lg transition-colors duration-800 ${
    secondsLeft < 10 ? "bg-red-900" : "bg-green-800"
  }`;

  return (
    <p className={`${className} ${tailwindStyles}`.trim()}>
      {formattedHours}
      <span className="mx-1 font-extrabold">:</span>
      {formattedMinutes}
      <span className="mx-1 font-extrabold">:</span>
      {formattedSeconds}
    </p>
  );
}
