import { useMemo } from "react";

// Custom hook to format time as hh:mm:ss
export const useFormattedTime = (secondsLeft: number) => {
  const formattedTime = useMemo(() => {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft / 60) % 60);
    const seconds = secondsLeft % 60;

    const formattedHours = hours > 99 ? hours : String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return { formattedHours, formattedMinutes, formattedSeconds };
  }, [secondsLeft]);

  return formattedTime;
};
