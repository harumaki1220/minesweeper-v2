// セルの見た目・操作状態
export type CellState = "hidden" | "opened" | "flagged";

// セル1つが持つデータ
export interface Cell {
  isMine: boolean; // 爆弾かどうか
  state: CellState; // 現在の状態
  adjacentMines: number; // 周囲の爆弾の数 (0-8)
}

// ゲームの進行状態
export type GameStatus = "playing" | "won" | "lost";
