import { useMinesweeper } from "./hooks/useMinesweeper";
import { Cell } from "./components/Cell";

export default function App() {
  const { board, handleCellClick, handleRightClick, status, resetGame } =
    useMinesweeper(9, 9, 10);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>マインスイーパー</h1>

      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <button
          onClick={resetGame}
          style={{ padding: "5px 15px", cursor: "pointer" }}
        >
          最初からやり直す
        </button>

        {status === "lost" && (
          <span style={{ color: "red", fontWeight: "bold" }}>
            ゲームオーバー...
          </span>
        )}
        {status === "won" && (
          <span style={{ color: "blue", fontWeight: "bold" }}>
            ゲームクリア！
          </span>
        )}
      </div>

      <div
        style={{
          display: "inline-block",
          backgroundColor: "#c0c0c0",
          padding: "10px",
          borderStyle: "outset",
          borderWidth: "3px",
        }}
      >
        {board.map((row, y) => (
          <div key={y} style={{ display: "flex" }}>
            {row.map((cell, x) => (
              <Cell
                key={x}
                cell={cell}
                onClick={() => handleCellClick(x, y)}
                onRightClick={(e) => {
                  e.preventDefault();
                  handleRightClick(x, y);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
