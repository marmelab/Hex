import expect from "expect";
import { CellValue, GameState } from "./gamestate";
import { loadGameStateFromFile } from "./parseConfigFile";

describe("load game state from a valid config file", () => {
  it("should load configfile01.json without error", () => {
    const expected: GameState = {
      board: [
        [ { value: CellValue.Black }, { value: CellValue.Empty }, { value: CellValue.Black } ],
        [ { value: CellValue.Empty }, { value: CellValue.Empty }, { value: CellValue.Empty } ],
        [ { value: CellValue.Empty }, { value: CellValue.Empty }, { value: CellValue.Empty } ]
      ]
    };
    expect(loadGameStateFromFile("src/fixtures/configfile01.json")).toStrictEqual(expected);
  });
});
