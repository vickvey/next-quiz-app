import { useTimer } from "@/hooks";

export default function TimerDisplay({
  totalSeconds = 10,
  setIsTimerComplete,
}: {
  totalSeconds: number;
  setIsTimerComplete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { secondsLeft } = useTimer(totalSeconds, () => {
    setIsTimerComplete(true);
  });

  return (
    <section>
      <div>{secondsLeft} seconds remaining ...</div>
    </section>
  );
}
