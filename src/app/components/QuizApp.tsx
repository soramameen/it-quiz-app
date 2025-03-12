"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchNewsAndGenerateQuizzes } from "@/lib/newsQuizService";
import { Quiz } from "@/interfaces/interface";
import QuizResults from "@/app/components/QuizResults";
import QuizQuestion from "@/app/components/QuizQuestion";

const QuizApp: React.FC = () => {
  /*
    quizzes: クイズの配列
    loading: ニュースを読み込んでいるかどうか
    currentQuiz: 現在のクイズのインデックス
    userAnswers: ユーザーの回答の配列
    showResults: 結果を表示するかどうか
    score: ユーザーのスコア
  */
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const generatedQuizzes = await fetchNewsAndGenerateQuizzes();
        if (generatedQuizzes.length > 0) {
          setQuizzes(generatedQuizzes);
        } else {
          console.warn("クイズが取得できませんでした");
        }
      } catch (error) {
        console.error("ニュースの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuizzes();
  }, []);

  const handleAnswer = (selectedOption: string) => {
    if (quizzes[currentQuiz]?.answer === selectedOption) {
      setScore((prev) => prev + 1);
    }
    setUserAnswers([...userAnswers, selectedOption]);

    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  if (loading) return <p>ニュースとクイズを読み込み中...</p>;

  if (showResults)
    return (
      <QuizResults
        quizzes={quizzes}
        userAnswers={userAnswers}
        score={score}
        onRestart={() => router.push("/")}
      />
    );

  return quizzes.length > 0 ? (
    <QuizQuestion
      quiz={quizzes[currentQuiz]}
      currentQuiz={currentQuiz}
      totalQuizzes={quizzes.length}
      onAnswer={handleAnswer}
    />
  ) : (
    <p>クイズを取得できませんでした。</p>
  );
};

export default QuizApp;
