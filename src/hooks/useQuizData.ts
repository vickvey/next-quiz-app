import { Question } from "@/interfaces";
import { useEffect, useState } from "react";

// Fetches Questions and returns usefull attributes
export const useQuizData = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch("/data/questions.json");

        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();

        if (!data?.questions || !Array.isArray(data.questions)) {
          throw new Error("Invalid or missing questions in response");
        }

        if (data.questions.length === 0) {
          throw new Error("Questions array is empty");
        }
        setQuestions(data.questions);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(`Error: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
    console.log(questions);
  }, []);

  return {
    questions,
    loading,
    error,
  };
};
