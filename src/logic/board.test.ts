import { describe, it, expect } from "vitest";
import { createBoard, calculateAdjacentMines, openCell } from "./board";

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

describe("openCell", () => {
  it("数字のセル（周囲に爆弾があるセル）を開くと、そのセルだけが開かれること", () => {
    const mockBoard = [
      [
        { isMine: false, state: "hidden", adjacentMines: 1 },
        { isMine: true, state: "hidden", adjacentMines: 0 },
      ],
      [
        { isMine: false, state: "hidden", adjacentMines: 1 },
        { isMine: false, state: "hidden", adjacentMines: 1 },
      ],
    ] as const;

    const board = JSON.parse(JSON.stringify(mockBoard));

    // 左上(x:0, y:0)を開く
    const result = openCell(board, 0, 0);

    // 左上だけが開いていること
    expect(result[0][0].state).toBe("opened");
    // 右上（爆弾）は開いていないこと
    expect(result[0][1].state).toBe("hidden");
  });

  it("0のセル（周囲に爆弾がないセル）を開くと、連鎖して周囲も開かれること", () => {
    // 正しい盤面（爆弾は左下の1つだけ）
    // [0, 0, 0]
    // [1, 1, 0]
    // [爆, 1, 0]
    const mockBoard = [
      [
        { isMine: false, state: "hidden", adjacentMines: 0 },
        { isMine: false, state: "hidden", adjacentMines: 0 },
        { isMine: false, state: "hidden", adjacentMines: 0 },
      ],
      [
        { isMine: false, state: "hidden", adjacentMines: 1 },
        { isMine: false, state: "hidden", adjacentMines: 1 },
        { isMine: false, state: "hidden", adjacentMines: 0 },
      ],
      [
        { isMine: true, state: "hidden", adjacentMines: 0 },
        { isMine: false, state: "hidden", adjacentMines: 1 },
        { isMine: false, state: "hidden", adjacentMines: 0 },
      ],
    ] as const;

    const board = JSON.parse(JSON.stringify(mockBoard));

    // 左上(x:0, y:0)の「0」のセルを開く
    const result = openCell(board, 0, 0);

    // 0の連鎖により、爆弾（2, 0）以外のすべてのマスが開かれること
    expect(result[0][0].state).toBe("opened");
    expect(result[0][1].state).toBe("opened");
    expect(result[0][2].state).toBe("opened");
    expect(result[1][0].state).toBe("opened");
    expect(result[1][1].state).toBe("opened");
    expect(result[1][2].state).toBe("opened");
    expect(result[2][1].state).toBe("opened");
    expect(result[2][2].state).toBe("opened");

    // 爆弾(2, 0)だけは開かれていないこと
    expect(result[2][0].state).toBe("hidden");
  });
});
