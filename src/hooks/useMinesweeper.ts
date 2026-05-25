import { useState } from "react";
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
    if (board[y][x].state === "opened" || board[y][x].state === "flagged")
      return;

    let currentBoard = board;

    const isFirstClick = board.every((row) =>
      row.every((cell) => cell.state !== "opened"),
    );

    if (isFirstClick) {
      while (currentBoard[y][x].isMine) {
        currentBoard = createBoard(width, height, bombs);
      }
    }

    const cell = currentBoard[y][x];

    if (cell.isMine) {
      setStatus("lost");
      const newBoard = structuredClone(currentBoard);
      newBoard[y][x].state = "opened";
      setBoard(newBoard);
      return;
    }

    const newBoard = openCell(currentBoard, x, y);

    const isClear = newBoard.every((row) =>
      row.every((cell) => cell.state === "opened" || cell.isMine),
    );

    if (isClear) {
      setStatus("won");
    }

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
