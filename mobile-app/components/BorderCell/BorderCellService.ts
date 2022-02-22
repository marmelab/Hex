
import { PLAYER_1_CELL_COLOR, PLAYER_2_CELL_COLOR } from "../../utils";
import { RenderedCellType } from "../../utils";

export function getBorderColor(cellType: RenderedCellType) {
  return cellType === "player1Border" ? PLAYER_1_CELL_COLOR : PLAYER_2_CELL_COLOR;
}
