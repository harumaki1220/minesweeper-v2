import { useMinesweeper } from "./hooks/useMinesweeper";
import { Cell } from "./components/Cell";

export default function App() {
  const { board, handleCellClick } = useMinesweeper(9, 9, 10);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>マインスイーパー</h1>

      {/* グレーの背景枠 */}
      <div
        style={{
          display: "inline-block",
          backgroundColor: "#c0c0c0",
          padding: "10px",
          borderStyle: "outset",
          borderWidth: "3px",
        }}
      >
        {/* 盤面 */}
        {board.map((row, y) => (
          // 行（横1列）をまとめる div。
          // Reactで配列を map で回す時は、必ず一番外側の要素に一意の key を渡す必要があります。
          <div key={y} style={{ display: "flex" }}>
            {row.map((cell, x) => (
              // 【課題】ここに Cell コンポーネントを配置してください。
              // 渡さなければいけない Props は3つあります。
              // ・key (一意の識別子。今回は x を使えばOK)
              // ・cell (マス目のデータ)
              // ・onClick (クリックされたときに handleCellClick(x, y) を実行する関数)
              <Cell key={x} cell={cell} onClick={() => handleCellClick(x, y)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
