import React from "react";
import { Quiz } from "@/interfaces/interface";

interface QuizQuestionProps {
  quiz: Quiz;
  currentQuiz: number;
  totalQuizzes: number;
  onAnswer: (selectedOption: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  quiz,
  currentQuiz,
  totalQuizzes,
  onAnswer,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">クイズ</h2>
      <div className="bg-white shadow p-6 rounded max-w-lg w-full">
        <p className="mb-4">
          {currentQuiz + 1}. {quiz?.question}
        </p>
        <div className="space-y-2">
          {quiz?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4 text-right">
          <span>
            {currentQuiz + 1} / {totalQuizzes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
