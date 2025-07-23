"use client";

import PlayQuestionSection from "@/components/play-question-section";
import ResultSection from "@/components/result-section";
import { Question } from "@/interfaces";
import { useEffect, useState } from "react";

export default function StartQuizPage() {
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await fetch("/data/questions.json");
        if (!res.ok) throw new Error("Fetch Method Failed");
        const data = await res.json();
        if (!data || !data.questions) throw new Error("No questions found");
        if (!Array.isArray(data.questions)) {
          throw new Error("Questions data is not a valid array");
        }
        setQuestions(data.questions);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Error: Fetching Questions, ${error.message}`);
        } else setError(`Error: Some Unknown Error Occured!`);
      }
    };

    loadQuestions();
  }, []);

  console.log("SCORE:", score);
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-4xl font-extrabold">Loading ...</p>
      </div>
    );
  } else
    return (
      <div className="my-24 mx-36">
        <div>
          <h1 className="text-3xl font-bold">Play Quiz Page</h1>
          <h3 className="text-lg">
            score: <span className="text-blue-500">{score}</span>
          </h3>
        </div>
        <hr className="my-6" />

        {!error && currentQuestionIndex >= questions.length && (
          <ResultSection score={score} />
        )}
        {!error && currentQuestionIndex < questions.length && (
          <PlayQuestionSection
            question={questions[currentQuestionIndex]}
            setScore={setScore}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        )}
      </div>
    );
}
