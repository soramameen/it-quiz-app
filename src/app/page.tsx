import "dotenv/config"; // .envファイルを自動的に読み込む
import StartScreen from "./components/StartScreen";

export default function Home() {
  return (
    <>
      <h1>home</h1>
      <StartScreen />
    </>
  );
}
