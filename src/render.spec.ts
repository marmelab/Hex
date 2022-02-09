import expect from "expect";
import { getRenderedGameState } from "./render";
import { GameState } from "./gamestate";

describe("Render a boad in string from a game state object", () => {
  it("Should get a 2-rows board with all cells empty", () => {
    const twoRowsAllCellsEmpty: GameState = {
      board: [
        [{ value: "empty" }, { value: "empty" }],
        [{ value: "empty" }, { value: "empty" }],
      ],
    };

    const renderedGameState = getRenderedGameState(twoRowsAllCellsEmpty);

    expect(renderedGameState).toBe(
      `
 ⬡ ⬡
  ⬡ ⬡
`.substring(1)
    );
  });
  it("Should get a 2-rows board with all cells black", () => {
    const twoRowsWithAllCellsBlack: GameState = {
      board: [
        [{ value: "black" }, { value: "black" }],
        [{ value: "black" }, { value: "black" }],
      ],
    };

    const renderedGameState = getRenderedGameState(twoRowsWithAllCellsBlack);

    expect(renderedGameState).toBe(
      `
 ⬢ ⬢
  ⬢ ⬢
`.substring(1)
    );
  });
  it("Should get a 2-rows board with mixed cells values", () => {
    const twoRowsWithMixedCellValues: GameState = {
      board: [
        [{ value: "empty" }, { value: "black" }],
        [{ value: "empty" }, { value: "black" }],
      ],
    };

    const renderedGameState = getRenderedGameState(twoRowsWithMixedCellValues);

    expect(renderedGameState).toBe(
      `
 ⬡ ⬢
  ⬡ ⬢
`.substring(1)
    );
  });
  it("Should get a 5-rows board with mixed cells values", () => {
    const fiveRowsWithMixedCellValues: GameState = {
      board: [
        [{ value: "empty" }, { value: "black" }],
        [{ value: "empty" }, { value: "black" }],
        [{ value: "empty" }, { value: "black" }],
        [{ value: "empty" }, { value: "black" }],
        [{ value: "empty" }, { value: "black" }],
      ],
    };

    const renderedGameState = getRenderedGameState(fiveRowsWithMixedCellValues);

    expect(renderedGameState).toBe(
      `
 ⬡ ⬢
  ⬡ ⬢
   ⬡ ⬢
    ⬡ ⬢
     ⬡ ⬢
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
    const nonSquareBoard: GameState = {
      board: [[{ value: "empty" }], [{ value: "empty" }, { value: "black" }]],
    };

    const renderedGameState = getRenderedGameState(nonSquareBoard);

    expect(renderedGameState).toBe(
      `
 ⬡
  ⬡ ⬢
`.substring(1)
    );
  });
});
