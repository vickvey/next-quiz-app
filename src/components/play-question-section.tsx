"use client";

import { Question } from "@/interfaces";
import { useState, useEffect } from "react";
import Timer from "./timer";

export default function PlayQuestionSection({
  question,
  setScore,
  setCurrentQuestionIndex,
}: {
  question: Question;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isTimerComplete, setIsTimerComplete] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);

  useEffect(() => {
    if (isTimerComplete) {
      if (selectedOption === question.correct) {
        setScore((prev) => prev + 1);
      }
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [isTimerComplete]);

  useEffect(() => {
    setSelectedOption(0); // Reset selection when question changes
    setIsTimerComplete(false); // Reset timer flag
  }, [question]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Selected:", selectedOption, "Correct:", question.correct);
    if (selectedOption === question.correct) {
      setScore((prev) => prev + 1);
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Timer
          key={question.id}
          totalSeconds={5}
          setIsTimerComplete={setIsTimerComplete}
          isStopped={false}
        />
        <h1 className="text-2xl font-bold">
          {question.id}. {question.statement}
        </h1>

        <div className="flex flex-col">
          {question.options.map((option, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name="chosenOption"
                checked={selectedOption === idx}
                onChange={() => setSelectedOption(idx)}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>

        <div>
          <button
            type="submit"
            className="py-2.5 px-7 bg-blue-500 rounded-xl hover:cursor-pointer hover:bg-blue-500/80 transition-colors duration-200 disabled:opacity-50"
            disabled={isTimerComplete}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
