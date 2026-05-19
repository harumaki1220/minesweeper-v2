import type { Cell } from "./type.ts";

const DIRECTIONS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

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

  return calculateAdjacentMines(board);
};

export const calculateAdjacentMines = (board: Cell[][]): Cell[][] => {
  const height = board.length;
  const width = board[0]?.length || 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = board[y][x];

      if (cell.isMine === true) {
        continue;
      }

      let count = 0;

      for (const [dx, dy] of DIRECTIONS) {
        const ny = y + dy; // 次に調べるy座標
        const nx = x + dx; // 次に調べるx座標

        if (
          ny >= 0 &&
          ny < height &&
          nx >= 0 &&
          nx < width &&
          board[ny][nx].isMine === true
        ) {
          count++;
        }
      }

      cell.adjacentMines = count;
    }
  }

  return board;
};
