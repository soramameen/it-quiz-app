"use client";

import Link from "next/link";

const StartScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-6">IT ニュースクイズアプリ</h1>
      <p className="text-lg mb-10">
        最新のトレンドを基にしたクイズで速攻でキャッチアップ！
      </p>
      <div className="space-y-4">
        <Link href="/quiz">
          <button className="px-6 py-3 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition">
            クイズを開始
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartScreen;
