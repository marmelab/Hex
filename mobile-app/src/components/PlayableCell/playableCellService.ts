import { DEFAULT_CELL_COLOR, PLAYER_1_CELL_COLOR, PLAYER_2_CELL_COLOR, Cell, WINNING_CELL_COLOR } from "../../../utils";

export function getStoneColor(cellValue: Cell, isWinningCell: boolean = false) {
  return isWinningCell ? WINNING_CELL_COLOR : cellValue.value === "white" ? PLAYER_1_CELL_COLOR : cellValue.value === "black" ? PLAYER_2_CELL_COLOR : DEFAULT_CELL_COLOR;
}
