import { describe, it, expect } from "vitest";
import { createBoard } from "./board";

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
