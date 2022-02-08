import expect from "expect";
import { CellValue, GameState } from "./gamestate";
import { parseConfigFile } from "./parseConfigFile";

describe("load game state from a config file content", () => {
  it("should load a valid string without error", () => {
    // given
    const input = `[
      [{ "value": 1 }, { "value": null }, { "value": 1 }],
      [{ "value": null }, { "value": null }, { "value": null }],
      [{ "value": null }, { "value": null }, { "value": null }]
    ]`;
    const filePath = "configfile.json";
    // when
    const ouput = parseConfigFile(input, filePath);
    // then
    const expected: GameState = {
      board: [
        [
          { value: CellValue.Black },
          { value: CellValue.Empty },
          { value: CellValue.Black },
        ],
        [
          { value: CellValue.Empty },
          { value: CellValue.Empty },
          { value: CellValue.Empty },
        ],
        [
          { value: CellValue.Empty },
          { value: CellValue.Empty },
          { value: CellValue.Empty },
        ],
      ],
    };
    expect(ouput).toStrictEqual(expected);
  });

  it("should throw an error if the content is not valid JSON", () => {
    // given
    const input = `[
      [{ value: 1 }],
    ]`; // value instead of "value"
    const filePath = "configfile.json";
    // when
    const func = () => parseConfigFile(input, filePath);
    // then
    expect(func).toThrowError("Unable to parse config file configfile.json");
  });
});
