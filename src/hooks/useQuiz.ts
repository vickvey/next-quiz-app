"use client";

import { Question } from "@/interfaces";
import { useEffect, useState } from "react";

export const useQuiz = ({
  questions,
  onQuizComplete,
}: {
  questions: Question[];
  onQuizComplete?: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const currentQuestion = questions[currentIndex] ?? null;

  const goToNextQuestion = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;

      if (nextIndex >= questions.length) {
        setIsQuizComplete(true);
      }

      return nextIndex;
    });
  };

  const submitAnswer = (chosenOption: number) => {
    if (chosenOption === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    goToNextQuestion();
  };

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentIndex(0);
      setScore(0);
      setIsQuizComplete(false);
    }
  }, [questions]);

  useEffect(() => {
    if (isQuizComplete && onQuizComplete) {
      onQuizComplete();
    }
  }, [isQuizComplete, onQuizComplete]);

  return {
    currentQuestion,
    currentIndex,
    score,
    isQuizComplete,
    goToNextQuestion,
    submitAnswer,
  };
};
