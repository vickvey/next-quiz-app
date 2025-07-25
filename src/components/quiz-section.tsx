"use client";

import { useQuiz } from "@/hooks/useQuiz";
import { useQuizData } from "@/hooks/useQuizData";
import { useSingleChoiceInput } from "@/hooks/useSingleChoiceInput";
import ResultSection from "./result-section";

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

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (isQuizComplete) return <ResultSection score={score} />;
  if (!questions.length) return <p>No questions available.</p>;
  if (!currentQuestion) return <div>No question available</div>;

  return (
    <section className="bg-gray-800 text-lg flex flex-col items-center py-12 space-y-8">
      <div>
        <h2 className="text-4xl font-bold">Quiz Section</h2>
      </div>
      <div>
        <h3 className="font-bold text-2xl">
          score: <span className="text-blue-600">{score}</span>
        </h3>
      </div>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const { chosenOption } = Object.fromEntries(formData);
            submitAnswer(Number(chosenOption));
            form.reset();
          }}
          className="flex flex-col space-y-6"
        >
          <div className="flex items-center space-x-16">
            <h3 className="text-2xl">
              {currentQuestion.id}. {currentQuestion.statement}
            </h3>
            <div className="bg-purple-400 font-bold bg-clip-text text-transparent w-96 gap-2 text-2xl flex">
              {/* <p>{secondsLeft}</p> */}
              <span>seconds remaining ...</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {currentQuestion.options.map((option, idx) => (
              <label key={idx}>
                <input {...getInputProps(idx)} />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="py-2 px-7 bg-blue-500 rounded-lg hover:opacity-85 cursor-pointer transition-colors duration-400 disabled:opacity-50"
              disabled={selectedOption === null}
            >
              Submit Answer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
