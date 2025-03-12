import React from "react";
import { Quiz } from "@/interfaces/interface";
import { QuizResultsProps } from "@/interfaces/interface";

const QuizResults: React.FC<QuizResultsProps> = ({
  quizzes,
  userAnswers,
  score,
  onRestart,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">結果発表</h2>
      <p className="mb-4">
        あなたのスコア: {score} / {quizzes.length}
      </p>
      <ul className="bg-white p-4 rounded shadow max-w-lg w-full">
        {quizzes.map((quiz, index) => (
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
              {/*正解なら緑、不正解なら赤*/}
              あなたの答え: {userAnswers[index]}
            </p>
            <p className="text-blue-500">正解: {quiz.answer}</p>
            <p className="text-gray-600">{quiz.explanation}</p>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onRestart}
      >
        {/* useEffectが起動されリセットされる */}
        トップに戻る
      </button>
    </div>
  );
};

export default QuizResults;
