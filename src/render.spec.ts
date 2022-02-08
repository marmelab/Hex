import expect from "expect";
import { getRenderedGameState } from "./render";
import { GameState, CellValue } from "./gamestate";

describe("Render a boad in string from a game state object", () => {
  it("Should get a 2-rows board with all cells empty", () => {
    const twoRowsAllCellsEmpty: GameState = {
      board: [
        [{ value: CellValue.Empty }, { value: CellValue.Empty }],
        [{ value: CellValue.Empty }, { value: CellValue.Empty }],
      ],
    };

    const renderedGameState = getRenderedGameState(twoRowsAllCellsEmpty);

    expect(renderedGameState).toBe(
      `
⬡⬡
 ⬡⬡
`.substring(1)
    );
  });
  it("Should get a 2-rows board with all cells black", () => {
    const twoRowsWithAllCellsBlack = {
      board: [
        [{ value: CellValue.Black }, { value: CellValue.Black }],
        [{ value: CellValue.Black }, { value: CellValue.Black }],
      ],
    };

    const renderedGameState = getRenderedGameState(twoRowsWithAllCellsBlack);

    expect(renderedGameState).toBe(
      `
⬢⬢
 ⬢⬢
`.substring(1)
    );
  });
  it("Should get a 2-rows board with mixed cells values", () => {
    const twoRowsWithMixedCellValues = {
      board: [
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
      ],
    };

    const renderedGameState = getRenderedGameState(twoRowsWithMixedCellValues);

    expect(renderedGameState).toBe(
      `
⬡⬢
 ⬡⬢
`.substring(1)
    );
  });
  it("Should get a 5-rows board with mixed cells values", () => {
    const fiveRowsWithMixedCellValues = {
      board: [
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
      ],
    };

    const renderedGameState = getRenderedGameState(fiveRowsWithMixedCellValues);

    expect(renderedGameState).toBe(
      `
⬡⬢
 ⬡⬢
  ⬡⬢
   ⬡⬢
    ⬡⬢
`.substring(1)
    );
  });
  it("Should get an empty board", () => {
    const emptyBoard = {
      board: [],
    };

    const renderedGameState = getRenderedGameState(emptyBoard);

    expect(renderedGameState).toBe("");
  });
  it("Should get an non square board", () => {
    const nonSquareBoard = {
      board: [
        [{ value: CellValue.Empty }],
        [{ value: CellValue.Empty }, { value: CellValue.Black }],
      ],
    };

    const renderedGameState = getRenderedGameState(nonSquareBoard);

    expect(renderedGameState).toBe(
      `
⬡
 ⬡⬢
`.substring(1)
    );
  });
});
