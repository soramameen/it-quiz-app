"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import fetchNewsFromApi from "@/lib/fetchNewsFromApi";
import { Quiz, NewsResponse } from "@/interfaces/interface";

export const QuizApp: React.FC = () => {
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const router = useRouter();
  console.log("news", news);
  useEffect(() => {
    async function getNewsAndQuizzes() {
      try {
        // ニュースを取得
        const response: NewsResponse = await fetchNewsFromApi();
        setNews(response);

        // クイズ生成
        const generatedQuizzes: Quiz[] = [];
        for (const article of response.articles.slice(0, 5)) {
          const quizResponse = await fetch("/api/generateQuiz", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: `title:${article.title} content:${article.description}`,
            }),
          });

          if (quizResponse.ok) {
            const quiz = await quizResponse.json();
            generatedQuizzes.push(quiz);
          } else {
            console.error("Failed to generate quiz for:", article.title);
          }
        }
        setQuizzes(generatedQuizzes);
      } catch (error) {
        console.error("ニュースの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    }

    getNewsAndQuizzes();
  }, []);

  const handleAnswer = (selectedOption: string) => {
    const correctAnswer = quizzes?.[currentQuiz].answer;
    if (selectedOption === correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers([...userAnswers, selectedOption]);

    if (currentQuiz < (quizzes?.length || 0) - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ニュースとクイズを読み込み中...</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">結果発表</h2>
        <p className="mb-4">
          あなたのスコア: {score} / {quizzes?.length}
        </p>
        <ul className="bg-white p-4 rounded shadow max-w-lg w-full">
          {quizzes?.map((quiz, index) => (
            <li key={index} className="mb-4">
              <p>
                {index + 1}. {quiz.question}
              </p>
              <p
                className={`mt-2 ${
                  userAnswers[index] === quiz.answer
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                あなたの答え: {userAnswers[index]}
              </p>
              <p className="text-blue-500">正解: {quiz.answer}</p>
              <p className="text-gray-600">{quiz.explanation}</p>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push("/")}
        >
          トップに戻る
        </button>
      </div>
    );
  }

  const currentQuestion = quizzes?.[currentQuiz];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">クイズ</h2>
      <div className="bg-white shadow p-6 rounded max-w-lg w-full">
        <p className="mb-4">
          {currentQuiz + 1}. {currentQuestion?.question}
        </p>
        <div className="space-y-2">
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4 text-right">
          <span>
            {currentQuiz + 1} / {quizzes?.length}
          </span>
        </div>
      </div>
    </div>
  );
};
