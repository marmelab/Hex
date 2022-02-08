import expect from "expect";
import { GameState } from "./gamestate";
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
        [{ value: "black" }, { value: "empty" }, { value: "black" }],
        [{ value: "empty" }, { value: "empty" }, { value: "empty" }],
        [{ value: "empty" }, { value: "empty" }, { value: "empty" }],
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

  it("should throw an error if a col is missing in a row", () => {
    // given
    const input = `[
      [{ "value": 1 }, { "value": null }, { "value": 1 }],
      [{ "value": null }, { "value": null }],
      [{ "value": null }, { "value": null }, { "value": null }]
    ]`;
    const filePath = "configfile.json";
    // when
    const func = () => parseConfigFile(input, filePath);
    // then
    expect(func).toThrowError(
      "Malformed config file configfile.json: all rows should contain 3 cells"
    );
  });

  it("should throw an error if an unrecognized value is found", () => {
    // given
    const input = `[
      [{ "value": 1 }, { "value": 2 }, { "value": 1 }],
      [{ "value": null }, { "value": null }, { "value": null }],
      [{ "value": null }, { "value": null }, { "value": null }]
    ]`;
    const filePath = "configfile.json";
    // when
    const func = () => parseConfigFile(input, filePath);
    // then
    expect(func).toThrowError("Cannot parse config file: Invalid value: 2");
  });

  it("should load a an empty board when the file is empty", () => {
    // given
    const input = `[
    ]`;
    const filePath = "configfile.json";
    // when
    const ouput = parseConfigFile(input, filePath);
    // then
    const expected: GameState = {
      board: [],
    };
    expect(ouput).toStrictEqual(expected);
  });
});
