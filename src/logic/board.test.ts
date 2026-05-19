import { describe, it, expect } from "vitest";
import { createBoard, calculateAdjacentMines } from "./board";

describe("createBoard", () => {
  it("指定された幅と高さの盤面が生成されること", () => {
    const width = 9;
    const height = 9;
    const bombs = 10;

    const board = createBoard(width, height, bombs);

    // 縦の長さ（行数）が height と一致すること
    expect(board.length).toBe(height);
    // 横の長さ（列数）が width と一致すること
    expect(board[0].length).toBe(width);
  });

  it("指定された数の爆弾が配置されていること", () => {
    const width = 9;
    const height = 9;
    const bombs = 10;

    const board = createBoard(width, height, bombs);

    // 盤面全体の中から isMine が true のものを数える
    const mineCount = board.flat().filter((cell) => cell.isMine).length;
    expect(mineCount).toBe(bombs);
  });

  it("すべてのセルが初期状態（hidden）であること", () => {
    const board = createBoard(5, 5, 5);
    const allHidden = board.flat().every((cell) => cell.state === "hidden");

    expect(allHidden).toBe(true);
  });
});

describe("calculateAdjacentMines", () => {
  it("周囲の爆弾の数が正しく計算されること", () => {
    // 3x3のテスト用盤面
    // [空, 空, 空]
    // [空, 爆, 空]
    // [空, 空, 爆]
    const mockBoard = [
      [
        { isMine: false, state: "hidden" as const, adjacentMines: 0 },
        { isMine: false, state: "hidden" as const, adjacentMines: 0 },
        { isMine: false, state: "hidden" as const, adjacentMines: 0 },
      ],
      [
        { isMine: false, state: "hidden" as const, adjacentMines: 0 },
        { isMine: true, state: "hidden" as const, adjacentMines: 0 },
        { isMine: false, state: "hidden" as const, adjacentMines: 0 },
      ],
      [
        { isMine: false, state: "hidden" as const, adjacentMines: 0 },
        { isMine: false, state: "hidden" as const, adjacentMines: 0 },
        { isMine: true, state: "hidden" as const, adjacentMines: 0 },
      ],
    ];

    // 関数を実行して計算結果の盤面を受け取る
    const result = calculateAdjacentMines(mockBoard);

    // [期待される計算結果]
    // 1行目は 周囲に爆弾が1つなので [1, 1, 1]
    expect(result[0][0].adjacentMines).toBe(1);
    expect(result[0][1].adjacentMines).toBe(1);
    expect(result[0][2].adjacentMines).toBe(1);

    // 2行目は [1, 爆弾(そのまま), 2]
    expect(result[1][0].adjacentMines).toBe(1);
    expect(result[1][2].adjacentMines).toBe(2);

    // 3行目は [1, 2, 爆弾(そのまま)]
    expect(result[2][0].adjacentMines).toBe(1);
    expect(result[2][1].adjacentMines).toBe(2);
  });
});
