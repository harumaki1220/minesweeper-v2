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

  const handleCellClick = (x: number, y: number) => {
    if (status !== "playing") return;

    const cell = board[y][x];

    if (cell.state === "opened" || cell.state === "flagged") return;

    if (cell.isMine) {
      setStatus("lost");
      const newBoard = structuredClone(board);
      newBoard[y][x].state = "opened";
      setBoard(newBoard);
      return;
    }

    const newBoard = openCell(board, x, y);
    setBoard(newBoard);
  };

  const handleRightClick = (x: number, y: number) => {
    if (status !== "playing") return;

    const cell = board[y][x];

    if (cell.state === "opened") return;

    const newBoard = structuredClone(board);

    if (cell.state === "hidden") {
      newBoard[y][x].state = "flagged";
    } else if (cell.state === "flagged") {
      newBoard[y][x].state = "hidden";
    }

    setBoard(newBoard);
  };

  return {
    board,
    status,
    handleCellClick,
    handleRightClick,
  };
};
