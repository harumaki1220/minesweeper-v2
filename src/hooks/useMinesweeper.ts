import { useState } from "react";
import type { Cell } from "../logic/types";
import { createBoard, openCell } from "../logic/board";

export type GameStatus = "playing" | "won" | "lost";

export const useMinesweeper = (
  width: number,
  height: number,
  bombs: number,
) => {
  const [board, setBoard] = useState(() => createBoard(width, height, bombs));
  const [status, setStatus] = useState<GameStatus>("playing");

  // マスをクリックしたときの処理（handleCellClick）の枠組みを作る。
  const handleCellClick = (x: number, y: number) => {
    // 処理は後で書く
  };

  return {
    board,
    status,
    handleCellClick,
  };
};
