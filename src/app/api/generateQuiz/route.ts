import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// type Quiz = {
//   question: string;
//   options: string[];
//   answer: string;
//   explanation: string;
// };
export async function POST(req: NextRequest) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "your-api-key-here",
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that generates multiple-choice quizzes from content.",
        },
        {
          role: "user",
          content: `あなたはニュース記事を基に三択クイズを作成するAIです。以下のニュースをもとに、三択クイズを生成してください。

**ニュース記事**:
    [${content}]

**出力形式**:
以下の形式でJSON形式で出力してください（整形済みのJSONとして出力してください）。もちろん内容はすべて日本語で答えてください．
{
  "question": "ニュースの内容に基づくクイズの質問",
  "options": ["選択肢1", "選択肢2", "選択肢3"],
  "answer": "正しい選択肢",
  "explanation": "クイズの正答に関する1行の補足説明"
}

**条件**:
- 質問はニュース記事の重要なポイントに基づいて作成してください。
- 選択肢は正解1つと不正解2つを含め、内容がそれぞれニュースと関連するものにしてください。
- 補足説明には、ニュース記事の一部を簡潔に要約してください。

**例**:
ニュース: 「AIが進化を続け、さまざまな分野で利用され始めています。特に医療分野では診断支援が注目されています。」 
出力:
{
  "question": "AIが特に注目されている分野はどれですか？",
  "options": ["農業", "医療", "建築"],
  "answer": "医療",
  "explanation": "AIは医療分野で診断支援に注目されています。"
}

それでは、ニュースを基にクイズを作成してください。`,
        },
      ],
    });

    const quiz = JSON.parse(completion.choices[0]?.message?.content || "{}");
    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
