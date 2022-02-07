import expect from "expect";
import { getRenderedGameState } from "./render";
import { GameState, CellValue } from "./gamestate";

function get2RowsGameStateAllCellsEmpty(): GameState {
  return {
    board: [
      [{ value: CellValue.Empty }, { value: CellValue.Empty }],
      [{ value: CellValue.Empty }, { value: CellValue.Empty }],
    ],
  };
}

function get2RowsGameStateAllCellsBlack(): GameState {
  return {
    board: [
      [{ value: CellValue.Black }, { value: CellValue.Black }],
      [{ value: CellValue.Black }, { value: CellValue.Black }],
    ],
  };
}

function get2RowsGameStateMixedCellsValues(): GameState {
  return {
    board: [
      [{ value: CellValue.Empty }, { value: CellValue.Black }],
      [{ value: CellValue.Empty }, { value: CellValue.Black }],
    ],
  };
}

describe("Get 2-rows board with all cells empty must return it", () => {
  it("should pass", () => {
    expect(getRenderedGameState(get2RowsGameStateAllCellsEmpty())).toBe(
      "⬡⬡\n ⬡⬡"
    );
  });
});

describe("Get 2-rows board with all cells black must return it", () => {
  it("should pass", () => {
    expect(getRenderedGameState(get2RowsGameStateAllCellsBlack())).toBe(
      "⬢⬢\n ⬢⬢"
    );
  });
});

describe("Get 2-rows board with mixed cells values must return it", () => {
  it("should pass", () => {
    expect(getRenderedGameState(get2RowsGameStateMixedCellsValues())).toBe(
      "⬡⬢\n ⬡⬢"
    );
  });
});
