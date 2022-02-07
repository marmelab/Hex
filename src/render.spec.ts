import expect from "expect";
import { getRenderedGameState } from "./render";
import { GameState, CellValue } from "./gamestate";

describe("Draw a boad from a game state object", () => {
  it("Draw 2-rows board with all cells empty", () => {
    const twoRowsAllCellsEmpty: GameState = {
      board: [
        [{ value: CellValue.Empty }, { value: CellValue.Empty }],
        [{ value: CellValue.Empty }, { value: CellValue.Empty }],
      ],
    };
    expect(getRenderedGameState(twoRowsAllCellsEmpty)).toBe("⬡⬡\n ⬡⬡\n");
  });
  it("Draw 2-rows board with all cells black", () => {
    const twoRowsWithAllCellsBlack = {
      board: [
        [{ value: CellValue.Black }, { value: CellValue.Black }],
        [{ value: CellValue.Black }, { value: CellValue.Black }],
      ],
    };
    expect(getRenderedGameState(twoRowsWithAllCellsBlack)).toBe("⬢⬢\n ⬢⬢\n");
  });
  it("Draw 2-rows board with mixed cells values", () => {
    const twoRowsWithMixedCellValues = {
      board: [
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
      ],
    };
    expect(getRenderedGameState(twoRowsWithMixedCellValues)).toBe("⬡⬢\n ⬡⬢\n");
  });
  it("Draw 5-rows board with mixed cells values", () => {
    const fiveRowsWithMixedCellValues = {
      board: [
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
      ],
    };
    expect(getRenderedGameState(fiveRowsWithMixedCellValues)).toBe(
      "⬡⬢\n ⬡⬢\n  ⬡⬢\n   ⬡⬢\n    ⬡⬢\n"
    );
  });
});
