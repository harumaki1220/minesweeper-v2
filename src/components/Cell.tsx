import type { Cell as CellType } from "../logic/type";

type Props = {
  cell: CellType;
  onClick: () => void;
};

// セルの状態に合わせて画像のX座標を計算する関数
const getBackgroundPosition = (cell: CellType): string => {
  if (cell.state === "flagged") {
    return "-270px";
  }

  if (cell.state === "opened" && cell.isMine) {
    return "-300px";
  }

  if (cell.state === "opened" && cell.adjacentMines > 0) {
    return `${(cell.adjacentMines - 1) * -30}px`;
  }

  return "";
};

export const Cell = ({ cell, onClick }: Props) => {
  const bgPosX = getBackgroundPosition(cell);

  // 画像を表示するかどうかの判定
  // （まだ開いていないマスや、0のマスにはアイコンを表示しない）
  const hasIcon = bgPosX !== "";

  return (
    <div
      onClick={onClick}
      style={{
        width: "30px",
        height: "30px",
        boxSizing: "border-box",
        backgroundColor: "#c0c0c0",
        borderStyle: cell.state === "hidden" ? "outset" : "solid",
        borderWidth: cell.state === "hidden" ? "3px" : "1px",
        borderColor: cell.state === "hidden" ? "" : "#7b7b7b",
        backgroundImage: hasIcon ? "url('/icons.png')" : "none",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${bgPosX} 0px`,
      }}
    />
  );
};
