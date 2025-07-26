"use client";

import { useQuiz } from "@/hooks/useQuiz";
import { useQuizData } from "@/hooks/useQuizData";
import { useSingleChoiceInput } from "@/hooks/useSingleChoiceInput";
import ResultSection from "./result-section";
import TimerDisplay from "./timer-display";

export default function QuizSection() {
  const { questions, loading, error } = useQuizData();
  const { currentQuestion, score, isQuizComplete, submitAnswer } = useQuiz({
    questions,
    onQuizComplete: () => {
      console.log(`Quiz Completed!!`);
    },
  });

  const { selectedOption, getInputProps } = useSingleChoiceInput({
    name: "chosenOption",
    onChange: (val) => {
      console.log("User selected: ", val);
    },
  });

  if (loading)
    return <p className="text-center py-10 text-white">Loading questions...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (isQuizComplete) return <ResultSection score={score} />;
  if (!questions.length)
    return (
      <p className="text-center py-10 text-white">No questions available.</p>
    );
  if (!currentQuestion)
    return (
      <div className="text-white text-center py-10">No question available</div>
    );

  return (
    <section className="bg-gray-900 text-white px-4 sm:px-8 md:px-16 py-10 space-y-10 min-h-screen">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Quiz Section</h2>
        <h3 className="text-xl sm:text-2xl mt-2">
          Score: <span className="text-blue-400 font-semibold">{score}</span>
        </h3>
      </div>

      <form
        key={currentQuestion.id}
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const { chosenOption } = Object.fromEntries(formData);
          submitAnswer(Number(chosenOption));
          form.reset();
        }}
        className="flex flex-col space-y-6 max-w-3xl mx-auto w-full"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl sm:text-2xl font-medium">
            {currentQuestion.id}. {currentQuestion.statement}
          </h3>
          <TimerDisplay
            key={currentQuestion.id}
            totalSeconds={15}
            enableRestartAfterComplete={true}
            onTimerComplete={() => {
              if (selectedOption) submitAnswer(Number(selectedOption));
              else submitAnswer(-1);
            }}
          />
        </div>

        <div className="flex flex-col space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-3 bg-gray-800 px-4 py-3 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <input
                {...getInputProps(idx)}
                className="form-radio text-blue-500 w-5 h-5"
              />
              <span className="text-base sm:text-lg">{option}</span>
            </label>
          ))}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="py-3 px-8 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg font-semibold disabled:opacity-50 transition-all"
            disabled={selectedOption === null}
          >
            Submit Answer
          </button>
        </div>
      </form>
    </section>
  );
}
