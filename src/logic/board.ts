import type { Cell } from "./type.ts";

export const createBoard = (
  width: number,
  height: number,
  bombs: number,
): Cell[][] => {
  const board: Cell[][] = [];

  for (let y = 0; y < height; y++) {
    const row: Cell[] = [];

    for (let x = 0; x < width; x++) {
      row.push({ isMine: false, state: "hidden", adjacentMines: 0 });
    }
    board.push(row);
  }

  const totalCells = width * height;
  const allPositions: number[] = [];

  for (let i = 0; i < totalCells; i++) {
    allPositions.push(i);
  }

  for (let i = 0; i < bombs; i++) {
    // 残っている札の中からランダムな位置を選ぶ
    const randomIndex = Math.floor(Math.random() * allPositions.length);

    // spliceで配列から抜き出し、その番号を取得する
    const bombPosition = allPositions.splice(randomIndex, 1)[0];

    const x = bombPosition % width;
    const y = Math.floor(bombPosition / width);

    board[y][x].isMine = true;
  }

  return board;
};
